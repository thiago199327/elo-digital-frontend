import { useState } from 'react';
import { ArrowLeft, Heart, Ban, Trash2, UserX } from 'lucide-react';
import { toast } from 'sonner';

type ListType = 'favorites' | 'blocked';

interface UserListsViewProps {
  type: ListType;
  onBack: () => void;
}

// Mock Data
const MOCK_FAVORITES = [
    { id: '1', name: 'Juliana', avatar: '👩', location: 'Rio de Janeiro', age: 26 },
    { id: '2', name: 'Pedro', avatar: '👨', location: 'São Paulo', age: 30 },
    { id: '3', name: 'Carla', avatar: '👧', location: 'Belo Horizonte', age: 28 },
];

const MOCK_BLOCKED = [
    { id: '99', name: 'Marcos', avatar: '👿', reason: 'Comportamento inadequado' },
    { id: '98', name: 'Fake Account', avatar: '🤖', reason: 'Perfil falso' },
];

export default function UserListsView({ type, onBack }: UserListsViewProps) {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const [blocked, setBlocked] = useState(MOCK_BLOCKED);

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(u => u.id !== id));
    toast.success("Removido dos favoritos");
  };

  const handleUnblock = (id: string) => {
    setBlocked(prev => prev.filter(u => u.id !== id));
    toast.success("Usuário desbloqueado");
  };

  const isFavorites = type === 'favorites';

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center gap-4 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
            {isFavorites ? <Heart className="text-pink-600" fill="currentColor" /> : <Ban className="text-red-600" />}
            <h1 className="text-xl font-bold text-gray-900">
                {isFavorites ? 'Meus Favoritos' : 'Usuários Bloqueados'}
            </h1>
        </div>
      </div>

      {/* Lista Rolante */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-3">
            {isFavorites ? (
                favorites.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Você ainda não favoritou ninguém.</p>
                    </div>
                ) : (
                    favorites.map(user => (
                        <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-2xl">
                                {user.avatar}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{user.name}, {user.age}</h3>
                                <p className="text-xs text-gray-500">{user.location}</p>
                            </div>
                            <button 
                                onClick={() => handleRemoveFavorite(user.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))
                )
            ) : (
                blocked.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        <Shield size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Nenhum usuário bloqueado.</p>
                    </div>
                ) : (
                    blocked.map(user => (
                        <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 opacity-75">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl grayscale">
                                {user.avatar}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{user.name}</h3>
                                <p className="text-xs text-red-500">{user.reason}</p>
                            </div>
                            <button 
                                onClick={() => handleUnblock(user.id)}
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200"
                            >
                                Desbloquear
                            </button>
                        </div>
                    ))
                )
            )}
        </div>
      </div>
    </div>
  );
}
