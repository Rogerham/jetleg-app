
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with explicit initial values
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthProvider: Setting up auth listener');
    }
    
    let mounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (mounted) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Auth state changed:', event);
          }
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Initial session check completed');
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('AuthProvider: Cleaning up auth listener');
      }
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, phone: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthProvider: Attempting sign up');
    }
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        },
      },
    });
    
    if (error) {
      console.error('Sign up error:', error.message);
    } else if (process.env.NODE_ENV === 'development') {
      console.log('Sign up successful');
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthProvider: Attempting sign in');
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error.message);
    } else if (process.env.NODE_ENV === 'development') {
      console.log('Sign in successful');
    }
    
    return { error };
  };

  const signOut = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthProvider: Signing out');
    }
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
