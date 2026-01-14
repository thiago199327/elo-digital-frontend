import { ArrowLeft, Sparkles, User as UserIcon } from 'lucide-react';

interface UserData {
    name: string;
    avatar: string;
    location: string;
    memberSince: string;
    isPremium: boolean;
}

interface AiProfileReadingViewProps {
  onBack: () => void;
  user: UserData;
}

export default function AiProfileReadingView({ onBack, user }: AiProfileReadingViewProps) {
  // Simulação de dados do relatório de IA
  const aiReport = {
    personality: 'Extrovertido e aventureiro',
    interests: 'Trilhas, culinária e tecnologia',
    compatibility: 'Alta (85%) com base em interesses em comum e localização próxima).',
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold">Leitura de Perfil por IA</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <UserIcon size={32} className="text-purple-600" />
            </div>
            <div>
                <p className="text-lg font-semibold">Perfil de {user.name}</p>
                <p className="text-sm text-gray-500">Analisado pelo Elo Digital AI</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2"><Sparkles size={16} /> Personalidade</h2>
            <p className="text-gray-600">{aiReport.personality}</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2"><Sparkles size={16} /> Interesses</h2>
            <p className="text-gray-600">{aiReport.interests}</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2"><Sparkles size={16} /> Compatibilidade</h2>
            <p className="text-gray-600">{aiReport.compatibility}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
