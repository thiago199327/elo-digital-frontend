import { useState, useEffect } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { conversationService } from '@/app/services/api';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: 'ai' | 'human';
}

interface ConversationsViewProps {
  onNavigate: (view: 'home' | 'conversations' | 'discover' | 'profile' | 'chat', chatId?: string) => void;
}

export default function ConversationsView({ onNavigate }: ConversationsViewProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const data = await conversationService.getConversations();
      
      // Always show AI companion at the top
      const aiConversation: Conversation = {
        id: 'ai-companion',
        name: 'Meu Elo',
        avatar: '🤖',
        lastMessage: 'Estou aqui sempre que precisar!',
        timestamp: 'Agora',
        unread: 0,
        type: 'ai',
      };

      setConversations([aiConversation, ...(data.conversations || [])]);
    } catch (error: any) {
      // Even if there's an error, show AI companion
      const aiConversation: Conversation = {
        id: 'ai-companion',
        name: 'Meu Elo',
        avatar: '🤖',
        lastMessage: 'Estou aqui sempre que precisar!',
        timestamp: 'Agora',
        unread: 0,
        type: 'ai',
      };
      setConversations([aiConversation]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando conversas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 text-white">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Conversas</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
            <input
              type="text"
              placeholder="Buscar conversas..."
              className="w-full bg-white/20 backdrop-blur-sm rounded-full px-10 py-3 text-white placeholder-white/70 outline-none focus:bg-white/30 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onNavigate('chat', conversation.id)}
              className="w-full px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-2xl">
                    {conversation.avatar}
                  </div>
                  {conversation.type === 'ai' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>

                {conversation.unread > 0 && (
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-semibold">{conversation.unread}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <MessageCircle size={64} className="text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Nenhuma conversa ainda</h3>
            <p className="text-gray-600 mb-6">
              Comece conversando com seu Elo ou descubra novas pessoas!
            </p>
            <button
              onClick={() => onNavigate('discover')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Descobrir Pessoas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}