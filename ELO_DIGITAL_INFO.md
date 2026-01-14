# Elo Digital - Aplicativo de Conexões

## 🎯 Visão Geral

O **Elo Digital** é uma plataforma completa que combina três funcionalidades principais:

1. **Parceiro Virtual (IA)** - Companhia digital sem julgamentos
2. **Assistente de Relacionamento** - Fortalecimento de conexões existentes
3. **Cupido IA** - Matchmaking inteligente para encontrar pessoas

## ✨ Funcionalidades Principais

### Autenticação
- ✅ Cadastro de novos usuários
- ✅ Login com email e senha
- ✅ Sessão persistente
- ✅ Logout seguro

### Chat com IA
- ✅ Conversas ilimitadas com companheiro digital
- ✅ Respostas automáticas personalizadas
- ✅ Sugestões inteligentes de tópicos
- ✅ Interface de chat moderna com balões coloridos
- ✅ Histórico de mensagens persistente

### Sistema de Matchmaking
- ✅ Perfis de usuários com compatibilidade em %
- ✅ Interface estilo cartões (swipe)
- ✅ Sistema de curtidas e passes
- ✅ Criação automática de conversas em matches

### Perfil do Usuário
- ✅ Estatísticas personalizadas
- ✅ Banner premium (monetização)
- ✅ Configurações e preferências
- ✅ Gerenciamento de conta

### Navegação
- ✅ Barra inferior com 4 seções
- ✅ Transições suaves entre telas
- ✅ Design responsivo

## 🎨 Design

- **Cores principais**: Gradiente roxo (#9333EA) para rosa (#EC4899)
- **Estilo**: Moderno, clean, com cantos arredondados
- **Tipografia**: Interface amigável e acolhedora
- **Ícones**: Lucide React

## 🔧 Tecnologias

### Frontend
- React 18
- TypeScript
- Tailwind CSS v4
- Lucide React (ícones)
- Sonner (notificações toast)

### Backend
- Supabase
- Hono (Web Framework)
- Deno Edge Functions
- KV Store (persistência de dados)

## 📦 Estrutura de Dados

### Usuário (KV Store)
```
user:{userId} = {
  id, email, name, avatar, location, 
  isPremium, memberSince
}
```

### Mensagens
```
message:{messageId} = {
  id, conversationId, senderId, 
  receiver, text, timestamp
}
```

### Conversas
```
conversation:{userId}:{conversationId} = {
  id, participants, createdAt
}
```

### Matches
```
match:{userId}:{targetUserId} = {
  id, userId, targetUserId, timestamp
}
```

## 🚀 Como Usar

1. **Criar uma conta**: Insira email, senha (min. 6 caracteres) e nome
2. **Fazer login**: Use suas credenciais
3. **Conversar com IA**: Clique em "Conversar com Meu Elo" na Home
4. **Descobrir pessoas**: Navegue para "Descobrir" e curta perfis
5. **Ver conversas**: Acesse todas as conversas na aba "Conversas"

## 💎 Modelo de Monetização

### Gratuito
- Conversas básicas com IA
- Dicas diárias
- Matches limitados

### Premium (Elo Premium)
- Conversas ilimitadas
- Cupido IA ilimitado
- Análise de comunicação
- Recursos exclusivos
- Sem anúncios

### Microtransações
- Customização da IA (voz, aparência)
- Presentes virtuais opcionais
- Recursos estéticos únicos

## 🎯 Próximos Passos

- [ ] Integração com API de IA real (OpenAI, Anthropic)
- [ ] Sistema de notificações em tempo real
- [ ] Chat de voz e áudio
- [ ] Filtros avançados de descoberta
- [ ] Sistema de verificação de perfil
- [ ] Recursos premium completos
- [ ] Analytics e insights do usuário
- [ ] Modo escuro

## 📱 Compatibilidade

- Desktop: ✅
- Mobile: ✅ (Responsivo)
- Tablet: ✅

---

**Versão**: 1.0.0  
**Desenvolvido com**: ❤️ Figma Make
