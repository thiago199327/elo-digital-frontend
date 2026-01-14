import React, { useState } from 'react';
import SettingsView from './SettingsView';
// Importe ou crie outros componentes como HomeView, ProfileEditView, etc.

export default function AppScreen() {
  const [currentView, setCurrentView] = useState('home'); // Começa na home

  const handleLogout = () => {
    alert("Usuário deslogado!");
    // Lógica real para deslogar (ex: limpar token de autenticação)
  };

  const handleNavigateToProfileEdit = () => {
    alert("Navegando para a tela de edição de perfil!");
    setCurrentView('edit-profile'); // Define a view para edição do perfil
  };
  
  const handleNavigateToSettings = () => {
    setCurrentView('settings'); // Define a view para configurações
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };
  
  // Função para renderizar a tela correta
  const renderView = () => {
    if (currentView === 'settings') {
      return <SettingsView onLogout={handleLogout} onNavigateToProfileEdit={handleNavigateToProfileEdit} />;
    }
    // Adicione a lógica para outras telas aqui
    if (currentView === 'home') {
      return (
        <div>
          <h1 className="text-2xl p-4">Bem-vindo(a) à Home!</h1>
          <button onClick={handleNavigateToSettings} className="p-4 bg-blue-500 text-white rounded m-4">Ir para Configurações</button>
        </div>
      );
    }
    // Adicione a lógica para a tela de edição de perfil aqui
    if (currentView === 'edit-profile') {
        return (
            <div>
                <h1 className="text-2xl p-4">Tela de Edição de Perfil</h1>
                <button onClick={handleBackToHome} className="p-4 bg-gray-500 text-white rounded m-4">Voltar</button>
            </div>
        )
    }

    return null;
  };

  return (
    <div className="h-screen w-screen">
      {renderView()}
    </div>
  );
}
