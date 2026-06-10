import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  // Monitor Supabase authentication state or fallback to local mock storage
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // 1. Get current session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          const user = session.user;
          setCurrentUser({
            uid: user.id,
            email: user.email,
            displayName: user.user_metadata?.full_name || user.email.split('@')[0],
            photoURL: user.user_metadata?.avatar_url || null
          });
        } else {
          setCurrentUser(null);
        }
        setIsMock(false);
        setLoading(false);
      });

      // 2. Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          const user = session.user;
          setCurrentUser({
            uid: user.id,
            email: user.email,
            displayName: user.user_metadata?.full_name || user.email.split('@')[0],
            photoURL: user.user_metadata?.avatar_url || null
          });
        } else {
          setCurrentUser(null);
        }
        setIsMock(false);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Mock Authentication Mode using localStorage
      const mockSession = localStorage.getItem('safeher_mock_session');
      if (mockSession) {
        try {
          setCurrentUser(JSON.parse(mockSession));
        } catch (e) {
          localStorage.removeItem('safeher_mock_session');
        }
      }
      setIsMock(true);
      setLoading(false);
    }
  }, []);

  // 1. Sign Up Function
  async function signup(email, password, displayName = '') {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName
          }
        }
      });
      if (error) throw error;
      
      const user = data.user;
      if (user) {
        const u = {
          uid: user.id,
          email: user.email,
          displayName: user.user_metadata?.full_name || displayName || user.email.split('@')[0],
          photoURL: null
        };
        return u;
      }
      return null;
    } else {
      // Mock Sign Up
      const mockUsers = JSON.parse(localStorage.getItem('safeher_mock_users') || '[]');
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('Email already exists (mock).');
      }
      const newUser = { 
        uid: 'mock-uid-' + Math.random().toString(36).substr(2, 9), 
        email, 
        displayName: displayName || email.split('@')[0],
        photoURL: null
      };
      mockUsers.push({ email, password, ...newUser });
      localStorage.setItem('safeher_mock_users', JSON.stringify(mockUsers));
      
      // Auto Login
      localStorage.setItem('safeher_mock_session', JSON.stringify(newUser));
      setCurrentUser(newUser);
      return newUser;
    }
  }

  // 2. Login Function
  async function login(email, password) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      
      const user = data.user;
      const u = {
        uid: user.id,
        email: user.email,
        displayName: user.user_metadata?.full_name || user.email.split('@')[0],
        photoURL: user.user_metadata?.avatar_url || null
      };
      setCurrentUser(u);
      return u;
    } else {
      // Mock Login
      const mockUsers = JSON.parse(localStorage.getItem('safeher_mock_users') || '[]');
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid email or password (mock).');
      }
      const loggedUser = { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL };
      localStorage.setItem('safeher_mock_session', JSON.stringify(loggedUser));
      setCurrentUser(loggedUser);
      return loggedUser;
    }
  }

  // 3. Google Login Function
  async function loginWithGoogle() {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) throw error;
      return data;
    } else {
      // Mock Google Login
      const googleUser = {
        uid: 'mock-google-uid-12345',
        email: 'safety.user@gmail.com',
        displayName: 'Google Safety User',
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      };
      localStorage.setItem('safeher_mock_session', JSON.stringify(googleUser));
      setCurrentUser(googleUser);
      return googleUser;
    }
  }

  // 4. Logout Function
  async function logout() {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setCurrentUser(null);
    } else {
      // Mock Logout
      localStorage.removeItem('safeher_mock_session');
      setCurrentUser(null);
    }
  }

  // 5. Password Reset Function
  async function resetPassword(email) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login'
      });
      if (error) throw error;
      return true;
    } else {
      // Mock Password Reset
      const mockUsers = JSON.parse(localStorage.getItem('safeher_mock_users') || '[]');
      if (!mockUsers.some(u => u.email === email)) {
        throw new Error('Email not found (mock).');
      }
      return true;
    }
  }

  const value = {
    currentUser,
    isMock,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
