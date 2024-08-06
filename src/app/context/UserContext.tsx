// src/app/context/UserContext.tsx
'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import useAuthUser from '@/app/hooks/use-auth-user';

interface UserContextProps {
  user: Record<string, any> | null;
  userId: string | null;
  email: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, userId, email, loading } = useAuthUser();

  return (
    <UserContext.Provider value={{ user, userId, email, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
