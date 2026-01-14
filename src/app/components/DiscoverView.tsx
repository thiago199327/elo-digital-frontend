import { useState } from 'react';
import { Search, Heart, X, Filter, MapPin, Briefcase, GraduationCap, Ruler, AlertCircle } from 'lucide-react';
import { discoverService } from '@/app/services/api';
import { toast } from 'sonner';
import { Slider } from '@/app/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";

interface UserData {
    id: string;
    name: string;
    isPremium: boolean;
    [key: string]: any;
}

interface DiscoverViewProps {
  user: UserData;
}

// Extended Mock Profiles
const mockProfiles = [
    { 
        id: 'user1', 
        name: 'Juliana', 
        age: 26,
        avatar: '👩', 
        location: 'Rio de Janeiro, RJ', 
        job: 'Designer', 
        education: 'PUC-RIO',
        height: '1.65m',
        bio: 'Amo café, design e gatos. Procurando alguém para dividir a conta da Netflix.',
        distance: 5,
        smoker: false,
        drinker: true,
        sports: false
    },
    { 
        id: 'user2', 
        name: 'Pedro', 
        age: 30,
        avatar: '👨', 
        location: 'São Paulo, SP',
        job: 'Engenheiro',
        education: 'USP',
        height: '1.80m',
        bio: 'Engenheiro de dia, gamer de noite. Bora jogar?',
        distance: 12,
        smoker: false,
        drinker: false,
        sports: true
    },
    { 
        id: 'user3', 
        name: 'Carla', 
        age: 28,
        avatar: '👧', 
        location: 'Belo Horizonte, MG',
        job: 'Médica',
        education: 'UFMG',
        height: '1.70m',
        bio: 'Plantões intermináveis, mas sempre arrumo tempo para um bom vinho.',
        distance: 45,
        smoker: false,
        drinker: true,
        sports: true
    },
    { 
        id: 'user4', 
        name: 'Marcos', 
        age: 35,
        avatar: '🧔', 
        location: 'Curitiba, PR',
        job: 'Chef',
        education: 'Le Cordon Bleu',
        height: '1.78m',
        bio: 'Cozinho melhor que sua mãe. Duvida?',
        distance: 80,
        smoker: true,
        drinker: true,
        sports: false
    },
];

export default function DiscoverView({ user }: DiscoverViewProps) {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [matchesLeft, setMatchesLeft] = useState(user.isPremium ? 9999 : 5);
  
  // Filter States
  const [maxDistance, setMaxDistance] = useState([50]);
  const [ageRange, setAgeRange] = useState([18, 50]);
  const [lifestyle, setLifestyle] = useState({
      nonSmoker: false,
      socialDrinker: false,
      active: false
  });

  const handleAction = async (action: 'like' | 'pass', targetUserId: string) => {
    if (!user.isPremium && matchesLeft <= 0) {
      toast.error("Você atingiu seu limite diário de matches! Assine o Elo Pro para matches ilimitados.");
      return;
    }

    try {
        await discoverService.createMatch(targetUserId, action);
        setProfiles(prev => prev.slice(1));
        
        if (!user.isPremium) {
            setMatchesLeft(prev => prev - 1);
        }
        
        if (action === 'like') {
            toast.success("Like enviado!");
        }
    } catch (error) {
        // toast.error("Erro ao registrar ação.");
        console.error(error);
        // Fallback for demo
        setProfiles(prev => prev.slice(1));
    }
  };

  const filteredProfiles = profiles.filter(p => {
      if (p.distance > maxDistance[0]) return false;
      if (p.age < ageRange[0] || p.age > ageRange[1]) return false;
      if (lifestyle.nonSmoker && p.smoker) return false;
      if (lifestyle.socialDrinker && !p.drinker) return false;
      if (lifestyle.active && !p.sports) return false;
      return true;
  });

  const currentProfile = filteredProfiles[0];

  return (
    <div className="h-full flex flex-col bg-gray-50 p-4">
        <div className="max-w-md mx-auto flex-1 flex flex-col w-full relative">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-900">Descobrir</h1>
                
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="p-2 bg-white rounded-full shadow-sm text-purple-600 hover:bg-purple-50 transition-colors">
                            <Filter size={20} />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="rounded-t-3xl h-[80vh]">
                        <SheetHeader className="mb-6">
                            <SheetTitle>Filtros de Descoberta</SheetTitle>
                        </SheetHeader>
                        
                        <div className="space-y-6 overflow-y-auto pb-10">
                            {/* Pro Banner in Filter */}
                            {!user.isPremium && (
                                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                                    <AlertCircle className="text-amber-600 shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-amber-800 text-sm">Filtros são exclusivos Elo Pro</h4>
                                        <p className="text-xs text-amber-700 mt-1">Atualize agora para filtrar por distância, idade e estilo de vida.</p>
                                    </div>
                                </div>
                            )}

                            <div className={!user.isPremium ? "opacity-50 pointer-events-none" : ""}>
                                {/* Distance */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700">Distância Máxima</span>
                                        <span className="text-purple-600 font-bold">{maxDistance[0]} km</span>
                                    </div>
                                    <Slider 
                                        defaultValue={[50]} 
                                        max={200} 
                                        step={1} 
                                        value={maxDistance}
                                        onValueChange={setMaxDistance}
                                    />
                                </div>

                                {/* Age */}
                                <div className="space-y-3 mt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700">Faixa Etária</span>
                                        <span className="text-purple-600 font-bold">{ageRange[0]} - {ageRange[1]} anos</span>
                                    </div>
                                    <Slider 
                                        defaultValue={[18, 50]} 
                                        max={100} 
                                        min={18}
                                        step={1} 
                                        value={ageRange}
                                        onValueChange={setAgeRange}
                                    />
                                </div>

                                {/* Lifestyle */}
                                <div className="space-y-3 mt-6">
                                    <h4 className="font-medium text-gray-700 text-sm">Estilo de Vida</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <button 
                                            onClick={() => setLifestyle(prev => ({...prev, nonSmoker: !prev.nonSmoker}))}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${lifestyle.nonSmoker ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-gray-200 text-gray-600'}`}
                                        >
                                            🚭 Não Fumante
                                        </button>
                                        <button 
                                            onClick={() => setLifestyle(prev => ({...prev, socialDrinker: !prev.socialDrinker}))}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${lifestyle.socialDrinker ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-gray-200 text-gray-600'}`}
                                        >
                                            🍷 Bebe Socialmente
                                        </button>
                                        <button 
                                            onClick={() => setLifestyle(prev => ({...prev, active: !prev.active}))}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${lifestyle.active ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-gray-200 text-gray-600'}`}
                                        >
                                            🏃 Pratica Esportes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Profile Card Stack */}
            <div className="flex-1 relative">
                {!currentProfile ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">😢</div>
                        <h3 className="font-bold text-gray-900 mb-2">Sem mais perfis</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Não encontramos ninguém com esses filtros. Tente expandir sua busca!
                        </p>
                        <button 
                            onClick={() => {
                                setMaxDistance([200]);
                                setAgeRange([18, 100]);
                                setLifestyle({ nonSmoker: false, socialDrinker: false, active: false });
                            }}
                            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium"
                        >
                            Limpar Filtros
                        </button>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                        {/* Image Area */}
                        <div className="h-3/5 bg-gray-200 relative flex items-center justify-center text-[10rem] bg-gradient-to-b from-gray-100 to-gray-300">
                            {currentProfile.avatar}
                            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h2 className="text-3xl font-bold flex items-end gap-2">
                                    {currentProfile.name} 
                                    <span className="text-xl font-normal opacity-90">{currentProfile.age}</span>
                                </h2>
                                <p className="text-white/90 text-sm flex items-center gap-1">
                                    <MapPin size={14} /> {currentProfile.location} • {currentProfile.distance}km
                                </p>
                            </div>
                        </div>

                        {/* Info Area */}
                        <div className="flex-1 p-5 overflow-y-auto">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {currentProfile.job && (
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                                        <Briefcase size={12} /> {currentProfile.job}
                                    </span>
                                )}
                                {currentProfile.education && (
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                                        <GraduationCap size={12} /> {currentProfile.education}
                                    </span>
                                )}
                                {currentProfile.height && (
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                                        <Ruler size={12} /> {currentProfile.height}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">Sobre</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {currentProfile.bio}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 bg-white border-t border-gray-50 flex justify-center items-center gap-6">
                            <button 
                                onClick={() => handleAction('pass', currentProfile.id)}
                                className="w-14 h-14 rounded-full bg-white border border-gray-200 text-red-500 shadow-sm flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:scale-110 transition-all"
                            >
                                <X size={28} />
                            </button>
                            <button 
                                onClick={() => handleAction('like', currentProfile.id)}
                                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200 flex items-center justify-center hover:scale-110 transition-all"
                            >
                                <Heart size={32} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {!user.isPremium && (
                <p className="text-center mt-4 text-xs text-gray-500">
                    {matchesLeft} matches gratuitos hoje
                </p>
            )}
        </div>
    </div>
  );
}
