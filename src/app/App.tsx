import { useState, useEffect } from 'react';
import { Home, MessageCircle, Compass, User, ShoppingCart } from 'lucide-react'; 
import { Toaster } from 'sonner';
import HomePage from '@/app/components/HomePage';
import ChatView from '@/app/components/ChatView';
import ConversationsView from '@/app/components/ConversationsView';
import DiscoverView from '@/app/components/DiscoverView';
import ProfileView from '@/app/components/ProfileView';
import AuthView from '@/app/components/AuthView';
import { authService, profileService } from '@/app/services/api';
import ProfileEditView from '@/app/components/ProfileEditView';
import StoreView from '@/app/components/StoreView';
import AiCompanionSetupView from '@/app/components/AiCompanionSetupView';
import SettingsView from '@/app/components/SettingsView';
import FavoritesView from '@/app/components/FavoritesView';
import BlockedView from '@/app/components/BlockedView';
import HelpCenterView from '@/app/components/HelpCenterView';
import LegalView from '@/app/components/LegalView';

type View = 
  | 'home' 
  | 'conversations' 
  | 'discover' 
  | 'profile' 
  | 'chat' 
  | 'edit-profile' 
  | 'settings' 
  | 'store' 
  | 'ai-setup'
  | 'favorites'
  | 'blocked'
  | 'help'
  | 'legal-privacy'
  | 'legal-terms'
  | 'legal-about';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  // ESTADO CENTRALIZADO DO USUÁRIO
  const [userData, setUserData] = useState({
    name: 'Você',
    email: '',
    avatar: '👤',
    location: 'São Paulo, SP',
    memberSince: 'Janeiro 2026',
    isPremium: false,
    
    // Perfil Detalhado
    bio: '',
    job: '',
    education: '',
    height: '',
    bodyType: '',
    relationshipStatus: '',
    religion: '',
    languages: [],
    interests: [],
    habits: [],
    idealMatch: '',
    nonNegotiables: [],
    
    // Configurações AI
    aiCompanionName: 'Meu Elo',
    aiCompanionPersonality: 'amoroso',
    aiCompanionAvatar: '🤖',
    aiTraits: { formality: 50, humor: 50, proactivity: 50 },
    aiMemory: 'medium', // short, medium, long
    aiTopics: { focus: [], avoid: [] },

    // Configurações do App
    invisibleMode: false,
    notificationSettings: {
      messages: true,
      matches: true,
      news: true,
    }
  });
  

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        try {
          const { profile } = await profileService.getProfile();
          if (profile) {
            setUserData(prev => ({ ...prev, ...profile }));
          }
        } catch (error) {
          console.error("Erro ao carregar perfil:", error);
          // Se falhar a carga do perfil (ex: token inválido), talvez devêssemos deslogar?
          // Por enquanto, mantemos logado mas com dados default/cache
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = async () => {
    setIsAuthenticated(true);
    try {
      const { profile } = await profileService.getProfile();
      if (profile) {
        setUserData(prev => ({ ...prev, ...profile }));
      }
    } catch (error) {
      console.error("Erro ao carregar perfil pós-login:", error);
    }
  };

  const handleLogout = () => {
    authService.signout();
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const handleNavigate = (view: View, chatId?: string) => {
    setCurrentView(view);
    if (chatId) {
      setActiveChatId(chatId);
    }
  };

  const handleUpdateUser = async (updates: any) => {
    setUserData(prev => ({ ...prev, ...updates }));
    try {
      await profileService.updateProfile(updates);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthView onSuccess={handleAuthSuccess} />
        <Toaster position="top-center" />
      </>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'conversations':
        return <ConversationsView onNavigate={handleNavigate} />;
      case 'discover':
        return <DiscoverView user={userData} />;
      case 'profile':
        return (
          <ProfileView 
            user={userData} 
            onLogout={handleLogout} 
            onEditProfile={() => handleNavigate('edit-profile')} 
            onConfigureAi={() => handleNavigate('ai-setup')} 
            onSettings={() => handleNavigate('settings')}
            onNavigateToFavorites={() => handleNavigate('favorites')}
            onNavigateToBlocked={() => handleNavigate('blocked')}
            onNavigateToHelp={() => handleNavigate('help')}
            onNavigateToLegal={(type) => handleNavigate(`legal-${type}` as View)}
          />
        );
      case 'chat':
        return <ChatView chatId={activeChatId} onBack={() => handleNavigate('conversations')} userAiConfig={userData} />;
      case 'edit-profile':
        return (
          <ProfileEditView 
            user={userData} 
            onBack={() => handleNavigate('profile')} 
            onSave={(updates) => {
              handleUpdateUser(updates);
              handleNavigate('profile');
            }} 
          />
        );
      case 'settings':
        return (
            <SettingsView 
                user={userData}
                onBack={() => handleNavigate('profile')}
                onLogout={handleLogout}
                onUpdateSettings={handleUpdateUser}
                onNavigateToProfileEdit={() => handleNavigate('edit-profile')}
                onNavigateToBlocked={() => handleNavigate('blocked')}
                onNavigateToHelp={() => handleNavigate('help')}
            />
        );
      case 'store':
        return <StoreView onBack={() => handleNavigate('home')} />;
      case 'ai-setup':
        return (
          <AiCompanionSetupView 
            user={userData} 
            onBack={() => handleNavigate('profile')} 
            onSaveAiConfig={(updates) => {
              handleUpdateUser(updates);
              handleNavigate('profile');
            }} 
          />
        );
      case 'favorites':
        return <FavoritesView onBack={() => handleNavigate('profile')} onNavigateToChat={(id) => handleNavigate('chat', id)} />;
      case 'blocked':
        return <BlockedView onBack={() => handleNavigate('profile')} />;
      case 'help':
        return <HelpCenterView onBack={() => handleNavigate('profile')} />;
      case 'legal-privacy':
        return <LegalView type="privacy" onBack={() => handleNavigate('profile')} />;
      case 'legal-terms':
        return <LegalView type="terms" onBack={() => handleNavigate('profile')} />;
      case 'legal-about':
        return <LegalView type="about" onBack={() => handleNavigate('profile')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
        </div>

        {/* Hide nav on full-screen views */}
        {['home', 'conversations', 'store', 'discover', 'profile'].includes(currentView) && (
          <nav className="bg-white border-t border-gray-200 px-6 py-3 safe-area-bottom">
            <div className="flex justify-around items-center max-w-md mx-auto">
              <button
                onClick={() => handleNavigate('home')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  currentView === 'home' ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                <Home size={24} />
                <span className="text-xs">Home</span>
              </button>

              <button
                onClick={() => handleNavigate('conversations')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  currentView === 'conversations' ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                <MessageCircle size={24} />
                <span className="text-xs">Conversas</span>
              </button>

              <button
                onClick={() => handleNavigate('store')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  currentView === 'store' ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                <ShoppingCart size={24} />
                <span className="text-xs">Loja</span>
              </button>

              <button
                onClick={() => handleNavigate('discover')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  currentView === 'discover' ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                <Compass size={24} />
                <span className="text-xs">Descobrir</span>
              </button>

              <button
                onClick={() => handleNavigate('profile')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  currentView === 'profile' ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                <User size={24} />
                <span className="text-xs">Perfil</span>
              </button>
            </div>
          </nav>
        )}
      </div>
      <Toaster position="top-center" />
    </>
  );
}
