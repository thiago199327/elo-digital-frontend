import { useState } from 'react';
import { ArrowLeft, Save, Sparkles, Zap, Brain, Heart, Sliders, Clock, MessageSquare, ShieldAlert } from 'lucide-react';
import { Slider } from '@/app/components/ui/slider';
import { Switch } from '@/app/components/ui/switch';

interface UserData {
    aiCompanionName?: string;
    aiCompanionPersonality?: string;
    aiCompanionAvatar?: string;
    aiTraits?: { formality: number; humor: number; proactivity: number };
    aiMemory?: string;
    aiTopics?: { focus: string[]; avoid: string[] };
    isPremium?: boolean;
    [key: string]: any;
}

interface AiCompanionSetupViewProps {
  onBack: () => void;
  user: UserData;
  onSaveAiConfig: (updates: any) => void;
}

const personalities = [
  { id: 'amoroso', name: 'Calmo, Acolhedor e Amoroso', icon: Heart },
  { id: 'motivador', name: 'Energético e Motivador', icon: Zap },
  { id: 'logico', name: 'Analítico e Lógico', icon: Brain },
];

const avatars = [
    '🤖', '🌟', '🦉', '🧘‍♀️', '👽', '🐶', '😺', '👻', '🦊', '🦁'
];

const availableTopics = ["Fitness", "Política", "Tecnologia", "Filosofia", "Arte", "Carreira", "Viagens", "Relacionamento"];

export default function AiCompanionSetupView({ onBack, user, onSaveAiConfig }: AiCompanionSetupViewProps) {
  const [name, setName] = useState(user.aiCompanionName || 'Meu Elo');
  const [personality, setPersonality] = useState(user.aiCompanionPersonality || 'amoroso');
  const [avatar, setAvatar] = useState(user.aiCompanionAvatar || '🤖');
  
  // New States
  const [traits, setTraits] = useState(user.aiTraits || { formality: 50, humor: 50, proactivity: 50 });
  const [memory, setMemory] = useState(user.aiMemory || 'medium');
  const [topics, setTopics] = useState<{focus: string[], avoid: string[]}>(user.aiTopics || { focus: [], avoid: [] });

  const handleSave = () => {
    onSaveAiConfig({
        aiCompanionName: name,
        aiCompanionPersonality: personality,
        aiCompanionAvatar: avatar,
        aiTraits: traits,
        aiMemory: memory,
        aiTopics: topics
    });
  };

  const toggleTopic = (topic: string, type: 'focus' | 'avoid') => {
      setTopics(prev => {
          const currentList = prev[type];
          const newList = currentList.includes(topic) 
            ? currentList.filter(t => t !== topic)
            : [...currentList, topic];
            
          // Ensure topic isn't in both lists
          const otherType = type === 'focus' ? 'avoid' : 'focus';
          const otherList = prev[otherType].filter(t => t !== topic);
          
          return { ...prev, [type]: newList, [otherType]: otherList };
      });
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Configurar Meu Elo</h1>
        </div>

        {/* Identidade */}
        <section className="space-y-4 bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Sparkles size={20} />
                <h2 className="font-semibold text-lg">Identidade</h2>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Avatar</label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {avatars.map(a => (
                        <button
                            key={a}
                            onClick={() => setAvatar(a)}
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all border-2 ${
                                avatar === a ? 'border-purple-600 bg-purple-100 scale-110' : 'border-gray-200 bg-gray-50'
                            }`}
                        >
                            {a}
                        </button>
                    ))}
                </div>
            </div>
        </section>

        {/* Personalidade Base */}
        <section className="space-y-4 bg-white p-5 rounded-2xl shadow-sm">
             <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Brain size={20} />
                <h2 className="font-semibold text-lg">Núcleo de Personalidade</h2>
            </div>
             <div className="space-y-3">
            {personalities.map((p) => {
                const Icon = p.icon;
                return (
                    <button
                        key={p.id}
                        onClick={() => setPersonality(p.id)}
                        className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all border ${
                            personality === p.id 
                            ? 'bg-purple-50 border-purple-500 shadow-sm' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        <Icon size={20} className={personality === p.id ? 'text-purple-600' : 'text-gray-400'} />
                        <span className={`font-medium ${personality === p.id ? 'text-purple-900' : 'text-gray-600'}`}>{p.name}</span>
                    </button>
                );
            })}
          </div>
        </section>

        {/* Traços de Conversação */}
        <section className="space-y-6 bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Sliders size={20} />
                <h2 className="font-semibold text-lg">Traços de Conversação</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Casual</span>
                        <span className="font-medium text-gray-700">Formalidade</span>
                        <span className="text-gray-500">Formal</span>
                    </div>
                    <Slider 
                        defaultValue={[traits.formality]} 
                        max={100} 
                        step={1} 
                        onValueChange={(val) => setTraits({...traits, formality: val[0]})} 
                        className="py-2"
                    />
                </div>

                 <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Sério</span>
                        <span className="font-medium text-gray-700">Humor</span>
                        <span className="text-gray-500">Engraçado</span>
                    </div>
                    <Slider 
                        defaultValue={[traits.humor]} 
                        max={100} 
                        step={1} 
                        onValueChange={(val) => setTraits({...traits, humor: val[0]})} 
                         className="py-2"
                    />
                </div>

                 <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Reativo</span>
                        <span className="font-medium text-gray-700">Proatividade</span>
                        <span className="text-gray-500">Proativo</span>
                    </div>
                    <Slider 
                        defaultValue={[traits.proactivity]} 
                        max={100} 
                        step={1} 
                        onValueChange={(val) => setTraits({...traits, proactivity: val[0]})} 
                         className="py-2"
                    />
                </div>
            </div>
        </section>

        {/* Memória */}
         <section className="space-y-4 bg-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Clock size={20} />
                <h2 className="font-semibold text-lg">Nível de Memória</h2>
                {!user.isPremium && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold ml-auto">PREMIUM</span>}
            </div>
            
            <div className="flex gap-2">
                {['curta', 'media', 'longa'].map((m) => (
                    <button
                        key={m}
                        disabled={!user.isPremium && m !== 'curta'}
                        onClick={() => setMemory(m)}
                        className={`flex-1 py-3 rounded-lg text-sm font-medium border transition-all ${
                            memory === m 
                            ? 'bg-purple-600 text-white border-purple-600' 
                            : !user.isPremium && m !== 'curta' 
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {m === 'curta' ? 'Curta' : m === 'media' ? 'Média' : 'Longa'}
                    </button>
                ))}
            </div>
            {!user.isPremium && (
                <p className="text-xs text-center text-gray-500 mt-2">Faça o upgrade para permitir que seu Elo se lembre de tudo.</p>
            )}
        </section>


        {/* Tópicos */}
        <section className="space-y-4 bg-white p-5 rounded-2xl shadow-sm">
             <div className="flex items-center gap-2 text-purple-600 mb-2">
                <MessageSquare size={20} />
                <h2 className="font-semibold text-lg">Tópicos</h2>
            </div>
            
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                        Focar em...
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {availableTopics.map(t => (
                            <button
                                key={`focus-${t}`}
                                onClick={() => toggleTopic(t, 'focus')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                                    topics.focus.includes(t)
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : 'bg-gray-50 text-gray-500 border-gray-200'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                 <div>
                    <h3 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                         Evitar...
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {availableTopics.map(t => (
                            <button
                                key={`avoid-${t}`}
                                onClick={() => toggleTopic(t, 'avoid')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                                    topics.avoid.includes(t)
                                    ? 'bg-red-100 text-red-800 border-red-200'
                                    : 'bg-gray-50 text-gray-500 border-gray-200'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Botão de Salvar */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  );
}
