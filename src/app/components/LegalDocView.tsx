import { ArrowLeft, Shield, FileText, Info } from 'lucide-react';
import { ScrollArea } from "@/app/components/ui/scroll-area";

type DocType = 'privacy' | 'terms' | 'about';

interface LegalDocViewProps {
  type: DocType;
  onBack: () => void;
}

export default function LegalDocView({ type, onBack }: LegalDocViewProps) {
  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Política de Privacidade',
          icon: <Shield size={24} className="text-green-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p><strong>1. Coleta de Dados:</strong> O Elo Digital coleta dados fornecidos pelo usuário (nome, fotos, preferências) e dados de uso para melhorar o matchmaking.</p>
              <p><strong>2. Uso das Informações:</strong> Utilizamos suas informações para personalizar a IA, sugerir matches compatíveis e processar compras na loja.</p>
              <p><strong>3. Compartilhamento:</strong> Seus dados não são vendidos a terceiros. Compartilhamos apenas o estritamente necessário com processadores de pagamento.</p>
              <p><strong>4. Segurança:</strong> Utilizamos criptografia de ponta a ponta para proteger suas conversas e dados pessoais.</p>
              <p><strong>5. Seus Direitos:</strong> Você pode solicitar a exclusão ou cópia dos seus dados a qualquer momento através da Central de Ajuda.</p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Termos de Uso',
          icon: <FileText size={24} className="text-blue-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p><strong>1. Aceitação:</strong> Ao usar o Elo Digital, você concorda com estes termos. O serviço é destinado a maiores de 18 anos.</p>
              <p><strong>2. Conduta:</strong> É proibido assédio, discurso de ódio, nudez explícita ou qualquer atividade ilegal. A violação resultará em banimento imediato.</p>
              <p><strong>3. Assinaturas:</strong> Planos Premium renovam-se automaticamente a menos que cancelados 24h antes do fim do período.</p>
              <p><strong>4. Responsabilidade:</strong> O Elo Digital não se responsabiliza por encontros presenciais. Sempre tome precauções de segurança.</p>
            </div>
          )
        };
      case 'about':
        return {
          title: 'Sobre o Elo Digital',
          icon: <Info size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>O <strong>Elo Digital</strong> nasceu em 2026 com uma missão simples: acabar com a solidão na era digital.</p>
              <p>Combinamos o melhor da Inteligência Artificial com a imprevisibilidade humana para criar conexões reais.</p>
              <p>Seja conversando com nosso Companheiro IA empático ou encontrando sua alma gêmea humana, o Elo é o seu lugar seguro.</p>
              <div className="mt-8 p-4 bg-purple-50 rounded-xl text-center">
                <p className="font-bold text-purple-800">Versão 2.1.0 (Build 2026)</p>
                <p className="text-xs text-purple-600">Desenvolvido com ❤️ por IAs e Humanos.</p>
              </div>
            </div>
          )
        };
    }
  };

  const data = getContent();

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b flex items-center gap-3 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
            {data.icon}
            <h1 className="text-xl font-bold text-gray-900">{data.title}</h1>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-2xl mx-auto pb-20">
            {data.content}
        </div>
      </ScrollArea>
    </div>
  );
}
