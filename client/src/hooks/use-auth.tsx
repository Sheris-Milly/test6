import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getSupabaseClient, signIn, signUp, signOut, getCurrentUser, initSupabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

// Extended user type that includes fields from our database schema
export interface ExtendedUser extends SupabaseUser {
  username?: string;
  firstName?: string;
  lastName?: string;
}

type AuthContextType = {
  user: ExtendedUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<any, Error, { email: string; password: string }>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<any, Error, { email: string; password: string }>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [initialLoading, setInitialLoading] = useState(true);
  const [supabaseInitialized, setSupabaseInitialized] = useState(false);
  
  // Use state to store the current user
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null);
  const [authError, setAuthError] = useState<Error | null>(null);
  
  // Initialize Supabase first
  useEffect(() => {
    const init = async () => {
      try {
        const initialized = await initSupabase();
        setSupabaseInitialized(initialized);
        if (!initialized) {
          throw new Error("Failed to initialize Supabase");
        }
      } catch (error) {
        console.error("Supabase initialization error:", error);
        setAuthError(error as Error);
        setInitialLoading(false);
      }
    };
    
    init();
  }, []);
  
  // Fetch the current user after Supabase is initialized
  useEffect(() => {
    if (!supabaseInitialized) return;
    
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        setAuthError(error as Error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    // Subscribe to auth changes
    const supabase = getSupabaseClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user || null);
      }
    );
    
    fetchUser();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseInitialized]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      try {
        return await signIn(credentials.email, credentials.password);
      } catch (error) {
        console.error("Login error:", error);
        // Include more details about the error for debugging
        if (error instanceof Error) {
          throw new Error(`Login failed: ${error.message}`);
        }
        throw new Error("Login failed. Please check your credentials and try again.");
      }
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      
      // Check if email is confirmed
      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Email verification required",
          description: "Please confirm your email address before accessing the dashboard. Check your inbox for a verification link.",
          variant: "destructive",
          duration: 6000,
        });
      } else {
        toast({
          title: "Login successful",
          description: `Welcome back!`,
        });
      }
    },
    onError: (error: Error) => {
      console.error("Login mutation error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. If you're using an existing Supabase account, make sure your password is correct.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await signUp(credentials.email, credentials.password);
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account before accessing the dashboard",
        duration: 6000,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut();
    },
    onSuccess: () => {
      setCurrentUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoading: initialLoading,
        error: authError,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
