import { useState } from 'react';
import { ArrowLeft, Ban, Unlock } from 'lucide-react';
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { toast } from 'sonner';

interface BlockedViewProps {
  onBack: () => void;
}

// Mock Blocked Users
const initialBlocked = [
    { id: 'blk1', name: 'Marcos Silva', date: '12/01/2026', avatar: '😠' },
    { id: 'blk2', name: 'Julia Roberts', date: '10/12/2025', avatar: '😐' },
];

export default function BlockedView({ onBack }: BlockedViewProps) {
  const [blockedList, setBlockedList] = useState(initialBlocked);

  const handleUnblock = (id: string, name: string) => {
      setBlockedList(prev => prev.filter(u => u.id !== id));
      toast.success(`${name} foi desbloqueado.`);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
       <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
             <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
                <Ban size={24} className="text-red-600" />
                <h1 className="text-xl font-bold text-gray-900">Bloqueados</h1>
            </div>
        </div>

        <ScrollArea className="flex-1">
            <div className="p-6 pb-20 space-y-4">
                {blockedList.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        <p>Nenhum usuário bloqueado.</p>
                    </div>
                ) : (
                    blockedList.map(user => (
                        <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl grayscale opacity-70">
                                    {user.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                                    <p className="text-xs text-gray-500">Bloqueado em {user.date}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleUnblock(user.id, user.name)}
                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors"
                                title="Desbloquear"
                            >
                                <Unlock size={20} />
                            </button>
                        </div>
                    ))
                )}
                
                <div className="bg-blue-50 p-4 rounded-xl mt-6 flex gap-3 text-blue-800 text-sm">
                    <div className="min-w-fit">ℹ️</div>
                    <p>Ao desbloquear um usuário, ele poderá ver seu perfil novamente e enviar mensagens.</p>
                </div>
            </div>
        </ScrollArea>
    </div>
  );
}
