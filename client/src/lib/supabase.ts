import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Store Supabase credentials
let SUPABASE_URL: string | null = null;
let SUPABASE_ANON_KEY: string | null = null;

// Initialize supabase client as undefined
let supabaseClient: SupabaseClient | null = null;

// Function to get or create the Supabase client
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase is not initialized. Call initSupabase() first.');
    }
    // TypeScript type assertion to avoid null check errors
    supabaseClient = createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string);
  }
  return supabaseClient;
};

// Function to initialize the Supabase client
export const initSupabase = async (): Promise<boolean> => {
  try {
    // If already initialized, return true
    if (SUPABASE_URL && SUPABASE_ANON_KEY && supabaseClient) {
      return true;
    }
    
    const response = await fetch('/api/config');
    if (!response.ok) {
      throw new Error('Failed to fetch Supabase configuration');
    }
    
    const config = await response.json();
    
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      throw new Error('Invalid Supabase configuration');
    }
    
    SUPABASE_URL = config.supabaseUrl;
    SUPABASE_ANON_KEY = config.supabaseAnonKey;
    
    console.log('Supabase URL:', SUPABASE_URL ? 'Available' : 'Not available');
    console.log('Supabase Anon Key:', SUPABASE_ANON_KEY ? 'Available' : 'Not available');
    
    // Initialize the client
    supabaseClient = createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string);
    return true;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return false;
  }
};

// Initialize Supabase on load
initSupabase();

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const supabase = getSupabaseClient();
  console.log(`Attempting to sign in with email: ${email}`);
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Supabase signin error:", error);
      throw error;
    }
    
    console.log("Sign-in successful:", data.user?.id);
    return data;
  } catch (error) {
    console.error("Detailed sign-in error:", error);
    throw error;
  }
};

export const signOut = async () => {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const supabase = getSupabaseClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) throw error;
  return session?.user || null;
};
