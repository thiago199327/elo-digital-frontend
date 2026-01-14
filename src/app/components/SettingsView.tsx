import { useState } from 'react';
import { ArrowLeft, Settings, LogOut, User, Lock, Bell, HelpCircle, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { Switch } from '@/app/components/ui/switch';

interface UserData {
  invisibleMode?: boolean;
  notificationSettings?: {
    messages: boolean;
    matches: boolean;
    news: boolean;
  };
  isPremium?: boolean;
  [key: string]: any;
}

interface SettingsViewProps {
  user: UserData;
  onBack: () => void;
  onLogout: () => void;
  onNavigateToProfileEdit: () => void;
  onUpdateSettings: (updates: any) => void;
  onNavigateToBlocked: () => void;
  onNavigateToHelp: () => void;
}

export default function SettingsView({ 
    user, 
    onBack, 
    onLogout, 
    onNavigateToProfileEdit, 
    onUpdateSettings,
    onNavigateToBlocked,
    onNavigateToHelp
}: SettingsViewProps) {
  const [invisibleMode, setInvisibleMode] = useState(user.invisibleMode || false);
  const [notifications, setNotifications] = useState(user.notificationSettings || { messages: true, matches: true, news: true });

  const handleInvisibleModeChange = (checked: boolean) => {
    setInvisibleMode(checked);
    onUpdateSettings({ invisibleMode: checked });
  };

  const handleNotificationChange = (key: keyof typeof notifications, checked: boolean) => {
    const newSettings = { ...notifications, [key]: checked };
    setNotifications(newSettings);
    onUpdateSettings({ notificationSettings: newSettings });
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        </div>

        {/* Elo Pro - Modo Invisível */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-sm overflow-hidden border border-purple-200">
           <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {invisibleMode ? <EyeOff className="text-purple-600" size={24} /> : <Eye className="text-gray-600" size={24} />}
                    <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            Modo Invisível
                            {!user.isPremium && <span className="text-[10px] bg-amber-400 text-white px-1.5 py-0.5 rounded font-bold">PRO</span>}
                        </h3>
                        <p className="text-xs text-gray-600">Navegue sem ser visto por ninguém.</p>
                    </div>
                </div>
                <Switch 
                    checked={invisibleMode} 
                    onCheckedChange={handleInvisibleModeChange}
                    disabled={!user.isPremium} 
                />
           </div>
        </div>


        {/* Conta */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h2 className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider bg-gray-50/50">Conta</h2>
          <button 
            onClick={onNavigateToProfileEdit} 
            className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <User size={20} className="text-gray-400" />
            <span className="flex-1 text-left font-medium text-gray-900">Editar Perfil</span>
          </button>
          <button className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <Lock size={20} className="text-gray-400" />
            <span className="flex-1 text-left font-medium text-gray-900">Privacidade e Segurança</span>
          </button>
        </div>

        {/* Notificações */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h2 className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider bg-gray-50/50">Notificações</h2>
          
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <span className="text-gray-900">Mensagens</span>
            <Switch checked={notifications.messages} onCheckedChange={(c) => handleNotificationChange('messages', c)} />
          </div>
          
           <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <span className="text-gray-900">Novos Matches</span>
            <Switch checked={notifications.matches} onCheckedChange={(c) => handleNotificationChange('matches', c)} />
          </div>

           <div className="px-6 py-4 flex items-center justify-between">
            <span className="text-gray-900">Novidades e Ofertas</span>
            <Switch checked={notifications.news} onCheckedChange={(c) => handleNotificationChange('news', c)} />
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h2 className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider bg-gray-50/50">Segurança</h2>
          <button onClick={onNavigateToBlocked} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <Shield size={20} className="text-gray-400" />
            <span className="flex-1 text-left font-medium text-gray-900">Gerenciar Bloqueios</span>
          </button>
           <button onClick={onNavigateToHelp} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <AlertTriangle size={20} className="text-gray-400" />
            <span className="flex-1 text-left font-medium text-gray-900">Central de Denúncias</span>
          </button>
        </div>

        {/* Botão de Sair */}
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-white rounded-xl shadow-md flex items-center justify-center gap-2 text-red-600 font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Sair da Conta</span>
        </button>

         <p className="text-center text-xs text-gray-400 pt-4">ID: {user.id || 'N/A'}</p>
      </div>
    </div>
  );
}
