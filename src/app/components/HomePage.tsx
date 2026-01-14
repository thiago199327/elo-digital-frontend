import { useState } from 'react';
import { 
  Sun, 
  CloudSun, 
  BookOpen, 
  Video, 
  Newspaper, 
  TrendingUp, 
  Play, 
  ShoppingCart, 
  Heart,
  Zap,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Badge } from "@/app/components/ui/badge";
import { toast } from 'sonner';

interface HomePageProps {
  onNavigate: (view: any) => void;
}

// Mock Data
const NEWS_ITEMS = [
  {
    id: 1,
    category: 'Relacionamento',
    title: 'A Ciência da Atração: O que realmente importa?',
    time: '2h atrás',
    image: '🧠',
    isLive: false
  },
  {
    id: 2,
    category: 'Mundo',
    title: 'Novas tendências de encontros para 2026',
    time: 'Ao Vivo',
    image: '🌍',
    isLive: true
  },
  {
    id: 3,
    category: 'Bem-estar',
    title: 'Como manter a individualidade namorando',
    time: '4h atrás',
    image: '🧘‍♀️',
    isLive: false
  }
];

const BOOKS = [
  {
    id: 1,
    title: "A Arte da Conquista",
    author: "Dra. Ana Silva",
    price: "R$ 49,90",
    cover: "📚",
    rating: 4.8
  },
  {
    id: 2,
    title: "Comunicação Não-Violenta",
    author: "Marshall R.",
    price: "R$ 35,00",
    cover: "🗣️",
    rating: 4.9
  },
  {
    id: 3,
    title: "Psicologia do Amor",
    author: "Carl Jung",
    price: "R$ 59,90",
    cover: "❤️",
    rating: 4.7
  },
  {
    id: 4,
    title: "Linguagens do Amor",
    author: "Gary Chapman",
    price: "R$ 42,90",
    cover: "💍",
    rating: 4.9
  }
];

const TUTORIALS = [
  {
    id: 1,
    title: "5 Erros no Primeiro Encontro",
    duration: "10:45",
    views: "12k",
    thumbnail: "🎬"
  },
  {
    id: 2,
    title: "Como criar um perfil magnético",
    duration: "08:20",
    views: "8.5k",
    thumbnail: "📱"
  },
  {
    id: 3,
    title: "Linguagem Corporal na Prática",
    duration: "15:00",
    views: "25k",
    thumbnail: "👀"
  }
];

const TIPS = [
    { title: "Mantenha contato visual", description: "O olhar transmite confiança e interesse genuíno." },
    { title: "Escuta Ativa", description: "Faça perguntas abertas e mostre interesse nas respostas." },
    { title: "Seja Autêntico", description: "A honestidade é a base de qualquer conexão real." }
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [currentDate] = useState(new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }));

  const handleBuyBook = (title: string) => {
      toast.success(`${title} adicionado ao carrinho!`);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header Fixo */}
      <div className="bg-white px-6 pt-8 pb-4 shadow-sm z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-500 text-sm capitalize">{currentDate}</p>
            <h1 className="text-2xl font-bold text-gray-900">Olá, Visitante! 👋</h1>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <CloudSun size={20} className="text-blue-500" />
            <span className="text-sm font-medium text-blue-700">28°C</span>
          </div>
        </div>

        {/* Daily Insight Card */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <Zap size={16} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-wider">Dica do Dia</span>
            </div>
            <p className="font-medium text-lg leading-snug">
              "A verdadeira conexão começa quando você se permite ser vulnerável."
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Heart size={120} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Conteúdo com Abas */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="feed" className="h-full flex flex-col">
          <div className="px-6 bg-white border-b border-gray-100">
            <TabsList className="grid w-full grid-cols-3 mb-2">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="books">Livraria</TabsTrigger>
              <TabsTrigger value="academy">Academy</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 bg-gray-50">
            {/* ABAS: FEED (Notícias e Vídeos) */}
            <TabsContent value="feed" className="p-6 space-y-6 mt-0">
              {/* Seção de Notícias */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Newspaper size={18} className="text-purple-600" />
                    Últimas Notícias
                  </h2>
                </div>
                <div className="space-y-3">
                  {NEWS_ITEMS.map((item) => (
                    <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase">
                            {item.category}
                          </span>
                          {item.isLive && (
                            <Badge variant="destructive" className="text-[10px] h-5 animate-pulse bg-red-500 gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                              AO VIVO
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={10} /> {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seção de Vídeos em Alta */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp size={18} className="text-red-500" />
                    Vídeos em Alta
                  </h2>
                </div>
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-md group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={24} fill="white" className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-medium text-sm">Entrevista Exclusiva: O Futuro do Namoro</p>
                    <p className="text-gray-300 text-xs">Canal Elo • 15k visualizações</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ABAS: LIVRARIA */}
            <TabsContent value="books" className="p-6 mt-0">
              <div className="mb-6">
                <div className="bg-amber-100 border border-amber-200 rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-amber-900 flex items-center gap-2">
                    <BookOpen size={18} />
                    Clube do Livro
                  </h3>
                  <p className="text-sm text-amber-800 mt-1">
                    Leituras selecionadas para evoluir seus relacionamentos.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {BOOKS.map((book) => (
                    <div key={book.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-100 group">
                      <div className="aspect-[2/3] bg-gray-50 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                        {book.cover}
                      </div>
                      <div className="p-3 flex-1 flex flex-col relative bg-white">
                        <div className="flex items-center gap-1 mb-1 absolute -top-8 right-2 bg-white px-2 py-0.5 rounded-full shadow-sm">
                          <Heart size={10} fill="#F59E0B" className="text-amber-500" />
                          <span className="text-[10px] font-bold text-gray-500">{book.rating}</span>
                        </div>
                        <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{book.title}</h4>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{book.author}</p>
                        <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                          <span className="font-bold text-purple-700 text-sm">{book.price}</span>
                          <button 
                            onClick={() => handleBuyBook(book.title)}
                            className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 active:bg-purple-300 transition-colors"
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* ABAS: ACADEMY (DICAS & TUTORIAIS) */}
            <TabsContent value="academy" className="p-6 mt-0">
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Sparkles size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-purple-900 mb-1">Elo Academy</h2>
                    <p className="text-sm text-purple-700">Aprenda, pratique e conquiste com confiança.</p>
                  </div>
                </div>

                {/* Vídeos de Tutorial */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Video size={18} className="text-pink-500" />
                    Aulas em Vídeo
                  </h3>
                  <div className="space-y-3">
                    {TUTORIALS.map((video) => (
                      <div key={video.id} className="flex gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="w-28 aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-2xl relative overflow-hidden shrink-0">
                          {video.thumbnail}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded font-medium">
                            {video.duration}
                          </div>
                        </div>
                        <div className="flex-1 py-1 flex flex-col justify-center">
                          <h4 className="font-semibold text-sm text-gray-900 leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{video.views} visualizações</p>
                          <div className="mt-2 flex items-center text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Assistir <ChevronRight size={12} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dicas Rápidas */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap size={18} className="text-yellow-500" />
                    Dicas Rápidas
                  </h3>
                  <div className="grid gap-3">
                     {TIPS.map((tip, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border-l-4 border-yellow-400 shadow-sm">
                            <h4 className="font-bold text-gray-800 text-sm mb-1">{tip.title}</h4>
                            <p className="text-xs text-gray-600">{tip.description}</p>
                        </div>
                     ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
