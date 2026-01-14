import { ArrowLeft, Heart, MessageCircle, Trash2 } from 'lucide-react';
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { toast } from 'sonner';

interface FavoritesViewProps {
  onBack: () => void;
  onNavigateToChat: (chatId: string) => void;
}

// Mock Data
const FAVORITES = [
  { id: '1', name: 'Juliana', age: 26, avatar: '👩', location: 'Rio de Janeiro', job: 'Designer' },
  { id: '2', name: 'Pedro', age: 30, avatar: '👨', location: 'São Paulo', job: 'Engenheiro' },
  { id: '3', name: 'Carla', age: 28, avatar: '👧', location: 'Belo Horizonte', job: 'Médica' },
  { id: '4', name: 'Lucas', age: 24, avatar: '👱‍♂️', location: 'Curitiba', job: 'Dev' },
  { id: '5', name: 'Mariana', age: 27, avatar: '👩‍🦰', location: 'Salvador', job: 'Arquiteta' },
];

export default function FavoritesView({ onBack, onNavigateToChat }: FavoritesViewProps) {
  
  const handleRemove = (name: string) => {
    toast.success(`${name} removido dos favoritos.`);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="p-4 bg-white border-b flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Heart size={20} className="text-red-500" fill="currentColor" />
            Meus Favoritos
        </h1>
      </div>

      <ScrollArea className="flex-1 p-4">
        {FAVORITES.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 pb-20">
            {FAVORITES.map((fav) => (
              <div key={fav.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-6xl relative">
                  {fav.avatar}
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-bold text-sm">{fav.name}, {fav.age}</p>
                    <p className="text-white/90 text-xs">{fav.location}</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-center justify-between gap-2">
                   <button 
                    onClick={() => onNavigateToChat(fav.id)}
                    className="flex-1 py-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-purple-100"
                   >
                     <MessageCircle size={14} /> Conversar
                   </button>
                   <button 
                    onClick={() => handleRemove(fav.name)}
                    className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
            <Heart size={48} className="mb-4 text-gray-300" />
            <p>Você ainda não favoritou ninguém.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
