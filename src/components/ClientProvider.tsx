'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

type User = {
  token: string;
  role: string | null;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function ClientProvider({ user: initialUser, children }: { user: User | null; children: ReactNode }) {
  const [user, setUser] = useState<User | null>(initialUser);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
