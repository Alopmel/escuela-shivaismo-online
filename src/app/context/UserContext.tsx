// src/app/context/UserContext.tsx
'use client'
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import useAuthUser from '@/app/hooks/use-auth-user';

interface UserContextProps {
  user: Record<string, any> | null;
  userId: string | null;
  name: string | null;
  email: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, userId, name, email, loading } = useAuthUser();
  
  useEffect(() => {
    console.log('User updated in context:', user);
  }, [user]);
  
  return (
    <UserContext.Provider value={{ user, userId, name, email, loading }}>
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
