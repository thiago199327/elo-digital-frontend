import { projectId, publicAnonKey } from '/utils/supabase/info';

// API_BASE agora usa a variável de ambiente configurada na Vercel
const API_BASE = import.meta.env.VITE_API_URL;

interface ApiOptions {
  method?: string;
  body?: any;
  requiresAuth?: boolean;
}

export async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, requiresAuth = true } = options;
  
  const headers: Record<string, string> = {};

  if (body && method !== 'GET') {
    headers['Content-Type'] = 'application/json';
  }

  if (requiresAuth) {
    const session = localStorage.getItem('elo_session');
    if (session) {
      const { access_token } = JSON.parse(session);
      headers['Authorization'] = `Bearer ${access_token}`;
    }
  } else {
    // Isso pode não ser mais necessário se o backend Deno gerencia a auth anônima
    // headers['Authorization'] = `Bearer ${publicAnonKey}`; 
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }
  
  // DEBUG: URL da requisição e configuração (dentro da função!)
  console.log('DEBUG: URL da requisição:', `${API_BASE}${endpoint}`);
  console.log('DEBUG: Configuração da requisição:', config);


  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  // DEBUG: Status e dados da resposta
  console.log('DEBUG: Status da resposta:', response.status);
  const data = await response.json();
  console.log('DEBUG: Dados da resposta:', data);

  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }

  return data;
}

export const authService = {
  async signup(email: string, password: string, name: string) {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: { email, password, name },
      requiresAuth: false,
    });
  },

  async signin(email: string, password: string) {
    const data = await apiCall('/auth/signin', {
      method: 'POST',
      body: { email, password },
      requiresAuth: false,
    });
    
    if (data.session) {
      localStorage.setItem('elo_session', JSON.stringify(data.session));
    }
    
    return data;
  },
  // ... (restante do authService)

  async signout() {
    localStorage.removeItem('elo_session');
  },

  isAuthenticated() {
    const session = localStorage.getItem('elo_session');
    if (!session) return false;
    
    try {
      const { expires_at } = JSON.parse(session);
      return new Date(expires_at * 1000) > new Date();
    } catch {
      return false;
    }
  },

  getSession() {
    const session = localStorage.getItem('elo_session');
    return session ? JSON.parse(session) : null;
  },
};

export const profileService = {
  async getProfile() {
    return apiCall('/profile');
  },
  // ... (restante do profileService, messageService, conversationService, discoverService)
  async updateProfile(updates: any) {
    return apiCall('/profile', {
      method: 'PUT',
      body: updates,
    });
  },
  
  async updateAiConfig(config: any) {
    return apiCall('/profile/ai-config', {
        method: 'PUT',
        body: config,
    });
  },
};

export const messageService = {
  async sendMessage(conversationId: string, text: string, receiver: string) {
    return apiCall('/messages', {
      method: 'POST',
      body: { conversationId, text, receiver },
    });
  },

  async getMessages(conversationId: string) {
    return apiCall(`/messages/${conversationId}`);
  },
};

export const conversationService = {
  async getConversations() {
    return apiCall('/conversations');
  },
};

export const discoverService = {
  async getProfiles() {
    return apiCall('/discover');
  },

  async createMatch(targetUserId: string, action: 'like' | 'pass') {
    return apiCall('/matches', {
      method: 'POST',
      body: { targetUserId, action },
    });
  },
};
