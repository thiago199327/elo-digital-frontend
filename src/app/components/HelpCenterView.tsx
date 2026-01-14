import { ArrowLeft, MessageCircle, HelpCircle, FileText, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";

interface HelpCenterViewProps {
  onBack: () => void;
}

export default function HelpCenterView({ onBack }: HelpCenterViewProps) {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 z-10 sticky top-0">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Central de Ajuda</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* FAQ Section */}
        <section>
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <HelpCircle className="text-purple-600" size={20} />
            Perguntas Frequentes
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="px-4">
                <AccordionTrigger>Como funciona o "Meu Elo"?</AccordionTrigger>
                <AccordionContent>
                  O "Meu Elo" é seu companheiro de IA. Ele está aqui para conversar, dar conselhos ou apenas ouvir. Você pode configurar sua personalidade e nível de memória nas configurações.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="px-4">
                <AccordionTrigger>O modo invisível é realmente anônimo?</AccordionTrigger>
                <AccordionContent>
                  Sim! Com o Elo Pro, você pode ativar o Modo Invisível e navegar pelos perfis sem aparecer na lista de "Quem viu seu perfil" das outras pessoas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="px-4">
                <AccordionTrigger>Como cancelo minha assinatura?</AccordionTrigger>
                <AccordionContent>
                  Você pode gerenciar sua assinatura nas configurações do seu dispositivo (Apple ID ou Google Play Store).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Mail className="text-purple-600" size={20} />
                Fale Conosco
            </h2>
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                <p className="text-sm text-gray-600">Não encontrou o que procurava? Envie uma mensagem para nossa equipe de suporte.</p>
                <button className="w-full py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    Enviar E-mail
                </button>
            </div>
        </section>
      </div>
    </div>
  );
}
