import { ArrowLeft, Shield, FileText, HelpCircle, Info } from 'lucide-react';
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";

type InfoType = 'privacy' | 'terms' | 'about' | 'help';

interface InfoViewProps {
  type: InfoType;
  onBack: () => void;
}

export default function InfoView({ type, onBack }: InfoViewProps) {
  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Política de Privacidade',
          icon: <Shield size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p><strong>Última atualização: Janeiro 2026</strong></p>
              <p>O Elo Digital valoriza sua privacidade. Esta política descreve como coletamos e usamos seus dados.</p>
              
              <h3 className="text-gray-900 font-bold mt-4">1. Coleta de Dados</h3>
              <p>Coletamos informações que você fornece diretamente (perfil, fotos, mensagens) e dados de uso (interações, localização).</p>
              
              <h3 className="text-gray-900 font-bold mt-4">2. Uso das Informações</h3>
              <p>Usamos seus dados para fornecer o serviço de matchmaking, melhorar o algoritmo da IA e garantir a segurança da plataforma.</p>
              
              <h3 className="text-gray-900 font-bold mt-4">3. Compartilhamento</h3>
              <p>Não vendemos seus dados pessoais. Compartilhamos apenas com prestadores de serviço essenciais para o funcionamento do app (ex: servidores).</p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Termos de Uso',
          icon: <FileText size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>Ao usar o Elo Digital, você concorda com estes termos.</p>
              
              <h3 className="text-gray-900 font-bold mt-4">1. Elegibilidade</h3>
              <p>Você deve ter pelo menos 18 anos para usar este serviço.</p>
              
              <h3 className="text-gray-900 font-bold mt-4">2. Código de Conduta</h3>
              <p>É proibido: assédio, discurso de ódio, conteúdo explícito não solicitado e criação de perfis falsos.</p>
              
              <h3 className="text-gray-900 font-bold mt-4">3. Cancelamento</h3>
              <p>O Elo Digital reserva-se o direito de suspender contas que violem estes termos sem aviso prévio.</p>
            </div>
          )
        };
      case 'about':
        return {
          title: 'Sobre o Elo Digital',
          icon: <Info size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p className="text-lg font-medium text-purple-900">Conectando corações, digitais e reais.</p>
              <p>O Elo Digital nasceu em 2025 com uma missão simples: combater a solidão através da tecnologia humanizada.</p>
              <p>Acreditamos que a Inteligência Artificial pode ser uma ponte para o autoconhecimento e que a tecnologia deve facilitar encontros reais e significativos.</p>
              <p>Sediados em São Paulo, somos uma equipe apaixonada por conexões humanas.</p>
              <div className="bg-purple-50 p-4 rounded-xl mt-4">
                <p className="font-bold text-purple-900">Versão do App: 2.1.0 (Build 2026)</p>
                <p>Desenvolvido com ❤️ e React.</p>
              </div>
            </div>
          )
        };
      case 'help':
        return {
          title: 'Central de Ajuda',
          icon: <HelpCircle size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Como funciona o "Meu Elo"?</AccordionTrigger>
                  <AccordionContent>
                    O "Meu Elo" é seu companheiro de IA. Ele aprende com você para oferecer conversas significativas e apoio emocional 24/7.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Como cancelo minha assinatura?</AccordionTrigger>
                  <AccordionContent>
                    Vá em Configurações > Conta > Gerenciar Assinatura. Você pode cancelar a qualquer momento sem taxas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como denuncio um perfil?</AccordionTrigger>
                  <AccordionContent>
                    No perfil do usuário, clique nos três pontos no canto superior direito e selecione "Denunciar". Nossa equipe analisará em até 24h.
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                  <AccordionTrigger>O Modo Invisível é seguro?</AccordionTrigger>
                  <AccordionContent>
                    Sim. Quando ativado, seu perfil não aparece no Feed de Descoberta para ninguém, mas você ainda pode conversar com seus matches atuais.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8 p-4 bg-gray-100 rounded-xl text-center">
                <p className="font-medium text-gray-900">Ainda precisa de ajuda?</p>
                <button className="mt-2 text-purple-600 font-bold hover:underline">
                    Fale com o Suporte
                </button>
              </div>
            </div>
          )
        };
    }
  };

  const data = getContent();

  return (
    <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
             <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
                {data?.icon}
                <h1 className="text-xl font-bold text-gray-900">{data?.title}</h1>
            </div>
        </div>

        {/* Content - Scrollable */}
        <ScrollArea className="flex-1">
            <div className="p-6 pb-20">
                {data?.content}
            </div>
        </ScrollArea>
    </div>
  );
}
