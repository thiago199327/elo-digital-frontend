import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { jwtDecode } from "npm:jwt-decode";
import import * as kv from "./kv_store.tsx"; // CORRIGIDO: Caminho de importação correto
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase clients
const getSupabaseAdmin = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const getSupabaseClient = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/elo-api-server/health", (c) => {
  return c.json({ status: "ok" });
});

// Helper function to get user ID from JWT
const getUserIdFromAuth = (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return null;
    const accessToken = authHeader.split(' '); // Pega o segundo item da lista (depois de "Bearer")
    if (!accessToken) return null;

    try {
        const decoded = jwtDecode(accessToken);
        return decoded.sub; // 'sub' field contains the user ID
    } catch (e) {
        console.error("Error decoding JWT:", e);
        return null;
    }
};


// Auth Routes
app.post("/elo-api-server/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password e nome são obrigatórios' }, 400);
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      avatar: '👤',
      location: '',
      isPremium: false,
      memberSince: new Date().toISOString(),
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Erro ao criar conta' }, 500);
  }
});

app.post("/elo-api-server/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email e password são obrigatórios' }, 400);
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Signin error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      session: data.session,
      user: data.user 
    });
  } catch (error) {
    console.log('Signin error:', error);
    return c.json({ error: 'Erro ao fazer login' }, 500);
  }
});

// Get current user profile
app.get("/elo-api-server/profile", async (c) => {
  try {
    const userId = getUserIdFromAuth(c);
    if (!userId) {
        return c.json({ error: 'Não autorizado' }, 401);
    }
    
    const profile = await kv.get(`user:${userId}`);
    return c.json({ profile: profile || { id: userId, email: "default", name: "default" } });
  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ error: 'Erro ao buscar perfil' }, 500);
  }
});

// Update user profile
app.put("/elo-api-server/profile", async (c) => {
  try {
    const userId = getUserIdFromAuth(c);
    if (!userId) {
        return c.json({ error: 'Não autorizado' }, 401);
    }

    const updates = await c.req.json();
    const currentProfile = await kv.get(`user:${userId}`) || {};
    const updatedProfile = { ...currentProfile, ...updates, id: userId }; 
    
    await kv.set(`user:${userId}`, updatedProfile);
    return c.json({ profile: updatedProfile });
  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ error: 'Erro ao atualizar perfil' }, 500);
  }
});

// Rota para atualizar as configurações do AI
app.put("/elo-api-server/profile/ai-config", async (c) => {
    try {
        const userId = getUserIdFromAuth(c);
        if (!userId) {
            return c.json({ error: 'Não autorizado' }, 401);
        }

        const configUpdates = await c.req.json();
        const currentProfile = await kv.get(`user:${userId}`) || {};
        const updatedProfile = { 
            ...currentProfile, 
            ...configUpdates,
            id: userId 
        }; 
        
        await kv.set(`user:${userId}`, updatedProfile);
        return c.json({ profile: updatedProfile });
    } catch (error) {
        console.log('Update AI config error:', error);
        return c.json({ error: 'Erro ao atualizar configurações do AI' }, 500);
    }
});


// Messages Routes
app.post("/elo-api-server/messages", async (c) => {
  try {
    const userId = getUserIdFromAuth(c);
    if (!userId) {
        return c.json({ error: 'Não autorizado' }, 401);
    }

    const { conversationId, text, receiver } = await c.req.json();
    
    const message = {
      id: crypto.randomUUID(),
      conversationId,
      senderId: userId,
      receiver,
      text,
      timestamp: new Date().toISOString(),
    };

    await kv.set(`message:${message.id}`, message);
    
    await kv.set(`conversation:${conversationId}:lastMessage`, {
      text,
      timestamp: message.timestamp,
    });

    if (receiver === 'ai-companion') {
      setTimeout(async () => {
        const aiResponses = [
          "Fico feliz em conversar com você! Como está se sentindo hoje?",
          "Entendo... conte-me mais sobre isso.",
          "Você é importante e suas emoções são válidas.",
          "Estou aqui para você, sempre que precisar.",
          "Que interessante! Me fale mais sobre essa experiência.",
          "Você está indo muito bem. Como posso te ajudar mais?",
          "É completamente normal sentir isso. Vamos explorar juntos?",
        ];
        
        const aiMessage = {
          id: crypto.randomUUID(),
          conversationId,
          senderId: 'ai-companion',
          receiver: userId,
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          timestamp: new Date().toISOString(),
        };
        
        await kv.set(`message:${aiMessage.id}`, aiMessage);
        await kv.set(`conversation:${conversationId}:lastMessage`, {
          text: aiMessage.text,
          timestamp: aiMessage.timestamp,
        });
      }, 1000);
    }

    return c.json({ message });
  } catch (error) {
    console.log('Send message error:', error);
    return c.json({ error: 'Erro ao enviar mensagem' }, 500);
  }
});

app.get("/elo-api-server/messages/:conversationId", async (c) => {
  try {
    const userId = getUserIdFromAuth(c);
    if (!userId) {
        return c.json({ error: 'Não autorizado' }, 401);
    }

    const conversationId = c.req.param('conversationId');
    const allMessages = await kv.getByPrefix(`message:`);
    
    const messages = allMessages
      .filter(msg => msg.conversationId === conversationId && (msg.senderId === userId || msg.receiver === userId))
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return c.json({ messages });
  } catch (error) {
    console.log('Get messages error:', error);
    return c.json({ error: 'Erro ao buscar mensagens' }, 500);
  }
});

// Conversations Routes
app.get("/elo-api-server/conversations", async (c) => {
  try {
    const userId = getUserIdFromAuth(c);
    if (!userId) {
        return c.json({ error: 'Não autorizado' }, 401);
    }

    const allMessages = await kv.getByPrefix(`message:`);
    const userConversations = allMessages.filter(msg => msg.senderId === userId || msg.receiver === userId);
    
    const conversationIds = [...new Set(userConversations.map(msg => msg.conversationId))];

    return c.json({ conversations: conversationIds.map(id => ({ id, name: id === 'ai-companion' ? 'Meu Elo' : 'Outro Usuário', avatar: '👤', lastMessage: 'Olá', timestamp: 'Agora', unread: 0, type: id === 'ai-companion' ? 'ai' : 'human'})) });

  } catch (error) {
    console.log('Get conversations error:', error);
    return c.json({ error: 'Erro ao buscar conversas' }, 500);
  }
});


// Make sure your Hono app is exported correctly at the very end.
Deno.serve(app.fetch);
