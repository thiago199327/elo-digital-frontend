import { ArrowLeft, Shield, FileText, Info } from 'lucide-react';

type LegalType = 'privacy' | 'terms' | 'about';

interface LegalViewProps {
  type: LegalType;
  onBack: () => void;
}

export default function LegalView({ type, onBack }: LegalViewProps) {
  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Política de Privacidade',
          icon: <Shield size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p><strong>Última atualização: Janeiro de 2026</strong></p>
              <p>O Elo Digital valoriza sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">1. Coleta de Dados</h3>
              <p>Coletamos informações que você fornece diretamente (nome, fotos, preferências) e dados de uso automático (logs, dispositivo).</p>
              
              <h3 className="font-bold text-gray-900 mt-4">2. Uso das Informações</h3>
              <p>Utilizamos seus dados para fornecer o serviço de matchmaking, personalizar o companheiro de IA e melhorar a segurança da plataforma.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">3. Compartilhamento</h3>
              <p>Não vendemos seus dados pessoais. Compartilhamos apenas com provedores de serviço essenciais (ex: hospedagem, pagamentos) sob sigilo.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">4. Segurança</h3>
              <p>Implementamos criptografia de ponta a ponta em mensagens e proteções robustas em nossos servidores.</p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Termos de Uso',
          icon: <FileText size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>Ao utilizar o Elo Digital, você concorda com os seguintes termos:</p>
              
              <h3 className="font-bold text-gray-900 mt-4">1. Elegibilidade</h3>
              <p>Você deve ter pelo menos 18 anos de idade para usar este aplicativo.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">2. Código de Conduta</h3>
              <p>É proibido assédio, discurso de ódio, nudez explícita ou atividades ilegais. Violações resultarão em banimento imediato.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">3. Compras no App</h3>
              <p>Itens virtuais e assinaturas não são reembolsáveis, exceto quando exigido por lei.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">4. Isenção de Responsabilidade</h3>
              <p>O Elo Digital não se responsabiliza por encontros offline. Tome precauções de segurança sempre.</p>
            </div>
          )
        };
      case 'about':
        return {
          title: 'Sobre o Elo Digital',
          icon: <Info size={24} className="text-purple-600" />,
          content: (
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p className="text-lg font-medium text-purple-600">Conectando corações na era digital.</p>
              <p>O <strong>Elo Digital</strong> nasceu em 2026 com uma missão simples: combater a solidão através da tecnologia humanizada.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">Nossa Missão</h3>
              <p>Criar um espaço seguro onde a Inteligência Artificial serve como ponte para o autoconhecimento e para relacionamentos humanos reais.</p>
              
              <h3 className="font-bold text-gray-900 mt-4">A Equipe</h3>
              <p>Somos um time apaixonado de desenvolvedores, psicólogos e designers trabalhando para tornar o mundo menos solitário.</p>
              
              <div className="mt-8 p-4 bg-purple-50 rounded-xl text-center">
                <p className="font-bold text-purple-900">Versão 1.0.0 (Beta)</p>
                <p className="text-xs text-purple-700">Feito com ❤️</p>
              </div>
            </div>
          )
        };
    }
  };

  const data = getContent();

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header Fixo */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-white z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
            {data.icon}
            <h1 className="text-xl font-bold text-gray-900">{data.title}</h1>
        </div>
      </div>

      {/* Conteúdo Rolante */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="max-w-md mx-auto">
            {data.content}
        </div>
      </div>
    </div>
  );
}
