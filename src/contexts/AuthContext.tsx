'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface User {
  token: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  requireAuth: () => void;
  requireAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    const role = document.cookie.split('; ').find(row => row.startsWith('role='))?.split('=')[1];

    if (token && role) {
      setUser({ token, role });
    } else {
      setUser(null);
    }
  }, []);

  function requireAuth() {
    if (!user) {
      router.push('/auth/login');
    }
  }

  function requireAdmin() {
    if (!user) {
      router.push('/auth/login');
    } else if (user.role !== 'admin') {
      router.push('/dashboard/activities');
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, requireAuth, requireAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
