import { Settings, Crown, Heart, MessageCircle, Users, Calendar, LogOut, Bot, Shield, FileText, Info } from 'lucide-react';

interface UserData {
    name: string;
    avatar: string;
    location: string;
    memberSince: string;
    isPremium: boolean;
    // Add other fields if needed for display
}

interface ProfileViewProps {
  onLogout: () => void;
  onEditProfile: () => void;
  onConfigureAi: () => void;
  onSettings: () => void;
  onNavigateToFavorites: () => void;
  onNavigateToBlocked: () => void;
  onNavigateToHelp: () => void;
  onNavigateToLegal: (type: 'privacy' | 'terms' | 'about') => void;
  user: UserData;
}

export default function ProfileView({ 
    onLogout, 
    onEditProfile, 
    onConfigureAi, 
    onSettings, 
    onNavigateToFavorites,
    onNavigateToBlocked,
    onNavigateToHelp,
    onNavigateToLegal,
    user 
}: ProfileViewProps) {

  const stats = [
    { label: 'Conversas', value: 127, icon: MessageCircle },
    { label: 'Matches', value: 23, icon: Heart },
    { label: 'Conexões', value: 45, icon: Users },
    { label: 'Dias Ativos', value: 30, icon: Calendar },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-4xl">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.location}</p>
              <p className="text-xs text-gray-500 mt-1">Membro desde {user.memberSince}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button 
                onClick={onEditProfile} 
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-900 transition-colors"
            >
                Editar Perfil
            </button>
            <button 
                onClick={onConfigureAi} 
                className="flex-1 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
                <Bot size={18} />
                Meu Elo
            </button>
          </div>
         
        </div>

        {/* Premium Banner */}
        {!user.isPremium && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-3">
              <Crown size={28} fill="currentColor" />
              <div className="flex-1">
                <h3 className="font-bold mb-2">Seja Elo Premium</h3>
                <p className="text-sm opacity-90 mb-4">
                  Conversas ilimitadas, matches sem limites e recursos exclusivos!
                </p>
                <button className="w-full py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-md transition-all">
                  Assinar Agora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Icon className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <button onClick={onSettings} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <Settings size={20} className="text-gray-600" />
            <span className="flex-1 text-left font-medium text-gray-900">Configurações</span>
          </button>
          
          <button onClick={onNavigateToFavorites} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <Heart size={20} className="text-gray-600" />
            <span className="flex-1 text-left font-medium text-gray-900">Meus Favoritos</span>
          </button>
          
          <button onClick={onNavigateToBlocked} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <Users size={20} className="text-gray-600" />
            <span className="flex-1 text-left font-medium text-gray-900">Bloqueados</span>
          </button>
          
          <button onClick={onNavigateToHelp} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <MessageCircle size={20} className="text-gray-600" />
            <span className="flex-1 text-left font-medium text-gray-900">Central de Ajuda</span>
          </button>
        </div>

        {/* Privacy & Legal */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <button onClick={() => onNavigateToLegal('privacy')} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
             <Shield size={20} className="text-gray-600" />
            <span className="flex-1 text-left text-sm text-gray-700">Política de Privacidade</span>
          </button>
          
          <button onClick={() => onNavigateToLegal('terms')} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <FileText size={20} className="text-gray-600" />
            <span className="flex-1 text-left text-sm text-gray-700">Termos de Uso</span>
          </button>
          
          <button onClick={() => onNavigateToLegal('about')} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <Info size={20} className="text-gray-600" />
            <span className="flex-1 text-left text-sm text-gray-700">Sobre o Elo Digital</span>
          </button>
        </div>

        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-white rounded-xl shadow-md flex items-center justify-center gap-2 text-red-600 font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Sair da Conta</span>
        </button>

        {/* Version Info */}
        <p className="text-center text-xs text-gray-500">Versão 2.1.0</p>
      </div>
    </div>
  );
}
