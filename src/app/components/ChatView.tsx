import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, Settings, Circle } from 'lucide-react';
import { messageService } from '@/app/services/api';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
}

interface ChatViewProps {
  chatId: string | null;
  onBack: () => void;
}

const aiResponses = [
  "Fico feliz em conversar com você! Como está se sentindo hoje?",
  "Entendo... conte-me mais sobre isso.",
  "Você é importante e suas emoções são válidas.",
  "Estou aqui para você, sempre que precisar.",
  "Que interessante! Me fale mais sobre essa experiência.",
  "Você está indo muito bem. Como posso te ajudar mais?",
  "É completamente normal sentir isso. Vamos explorar juntos?",
];

const suggestedTopics = [
  "Como foi seu dia?",
  "Quero desabafar",
  "Me conte algo inspirador",
  "Preciso de conselhos",
];

export default function ChatView({ chatId, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAIChat = chatId === 'ai-companion';

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    if (!chatId) return;
    
    setLoading(true);
    try {
      const data = await messageService.getMessages(chatId);
      setMessages(data.messages || []);
      
      // If no messages and it's AI chat, send welcome message
      if ((!data.messages || data.messages.length === 0) && isAIChat) {
        setMessages([{
          id: '1',
          text: 'Olá! Que bom ter você aqui. Sou o seu Elo Digital, e estou aqui para conversar, ouvir e te acompanhar. Como posso te ajudar hoje?',
          senderId: 'ai-companion',
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch (error: any) {
      toast.error('Erro ao carregar mensagens');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || !chatId) return;

    const messageText = inputText;
    setInputText('');

    // Add user message optimistically
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      senderId: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      await messageService.sendMessage(chatId, messageText, isAIChat ? 'ai-companion' : chatId);
      
      // Poll for AI response if it's an AI chat
      if (isAIChat) {
        setTimeout(async () => {
          await loadMessages();
        }, 1500);
      }
    } catch (error: any) {
      toast.error('Erro ao enviar mensagem');
      console.error(error);
    }
  };

  const handleSuggestedTopic = (topic: string) => {
    setInputText(topic);
    inputRef.current?.focus();
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando mensagens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-4 text-white shadow-md">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">{isAIChat ? '🤖' : '👤'}</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">{isAIChat ? 'Meu Elo' : 'Chat'}</h2>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <Circle size={8} fill="currentColor" />
                <span>Online</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message) => {
            const isUser = message.senderId === 'user';
            return (
              <div
                key={message.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    isUser
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isUser ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Topics */}
      {isAIChat && (
        <div className="px-4 pb-2">
          <div className="max-w-md mx-auto flex gap-2 overflow-x-auto pb-2">
            {suggestedTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedTopic(topic)}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm whitespace-nowrap hover:bg-purple-200 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
            <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <Mic size={20} className="text-gray-600" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}