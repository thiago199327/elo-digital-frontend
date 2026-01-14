import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Helper to get Supabase Client
// CRITICAL: MUST use the URL and Key from Deno.env
const getSupabaseAdmin = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  {
      auth: {
          autoRefreshToken: false,
          persistSession: false
      }
  }
);

// Helper for anon client (used for auth mostly)
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
    allowHeaders: ["Content-Type", "Authorization", "x-client-info"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-fa85f322/health", (c) => {
  return c.json({ status: "ok" });
});

// Also support non-prefixed health check for easier debugging
app.get("/health", (c) => {
    return c.json({ status: "ok" });
});

// Helper function to get user ID from Supabase Auth
const getUserIdFromAuth = async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
      console.log("No Authorization header found");
      return null;
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
      console.log("No token found in Authorization header");
      return null;
  }

  try {
    const supabase = getSupabaseClient();
    // Validate the token against Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.log("Auth error validating token:", error);
      return null;
    }
    return user.id;
  } catch (e) {
    console.error("Exception validating token:", e);
    return null;
  }
};


// Auth Routes
// Support both prefixed and non-prefixed for robustness
const handleSignup = async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password e nome são obrigatórios' }, 400);
    }

    const supabase = getSupabaseAdmin();
    // Use admin to create user so we can confirm email immediately if desired
    // Or allow normal signup. Code used admin previously.
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

    // Initialize user profile in KV
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      avatar: '👤',
      location: '',
      isPremium: false,
      memberSince: new Date().toISOString(),
      // New profile fields default empty
      bio: '',
      job: '',
      education: '',
      height: '',
      bodyType: '',
      relationshipStatus: '',
      religion: '',
      languages: [],
      interests: [],
      habits: [],
      idealMatch: '',
      nonNegotiables: [],
      // AI Defaults
      aiCompanionName: 'Meu Elo',
      aiCompanionPersonality: 'amoroso',
      aiCompanionAvatar: '🤖',
      aiTraits: { formality: 50, humor: 50, proactivity: 50 },
      aiMemory: 'medium',
      aiTopics: []
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup exception:', error);
    return c.json({ error: 'Erro ao criar conta: ' + error.message }, 500);
  }
};

app.post("/make-server-fa85f322/auth/signup", handleSignup);
app.post("/auth/signup", handleSignup);


const handleSignin = async (c) => {
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
    console.log('Signin exception:', error);
    return c.json({ error: 'Erro ao fazer login' }, 500);
  }
};

app.post("/make-server-fa85f322/auth/signin", handleSignin);
app.post("/auth/signin", handleSignin);

// Get current user profile
const handleGetProfile = async (c) => {
  try {
    const userId = await getUserIdFromAuth(c);
    if (!userId) {
        return c.json({ error: 'Não autorizado' }, 401);
    }
    
    const profile = await kv.get(`user:${userId}`);
    return c.json({ profile: profile || { id: userId, email: "default", name: "default" } });
  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ error: 'Erro ao buscar perfil' }, 500);
  }
};

app.get("/make-server-fa85f322/profile", handleGetProfile);
app.get("/profile", handleGetProfile);


// Update user profile
const handleUpdateProfile = async (c) => {
  try {
    const userId = await getUserIdFromAuth(c);
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
};

app.put("/make-server-fa85f322/profile", handleUpdateProfile);
app.put("/profile", handleUpdateProfile);

// AI Config Route (legacy support, but useful)
app.put("/make-server-fa85f322/profile/ai-config", handleUpdateProfile);
app.put("/profile/ai-config", handleUpdateProfile);


// Messages Routes
const handleSendMessage = async (c) => {
  try {
    const userId = await getUserIdFromAuth(c);
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
      // Simulate AI response delay
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
};

app.post("/make-server-fa85f322/messages", handleSendMessage);
app.post("/messages", handleSendMessage);


const handleGetMessages = async (c) => {
  try {
    const userId = await getUserIdFromAuth(c);
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
};

app.get("/make-server-fa85f322/messages/:conversationId", handleGetMessages);
app.get("/messages/:conversationId", handleGetMessages);


// Conversations Routes
const handleGetConversations = async (c) => {
  try {
    const userId = await getUserIdFromAuth(c);
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
};

app.get("/make-server-fa85f322/conversations", handleGetConversations);
app.get("/conversations", handleGetConversations);


Deno.serve(app.fetch);
