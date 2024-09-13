// src/app/context/ProgressContext.tsx
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getProgressByUserId } from '@/lib/progressData';
import { Progress } from '../types/types';
import { useUser } from '@/app/context/UserContext';

interface ProgressContextProps {
  progress: Progress[];
  setProgress: React.Dispatch<React.SetStateAction<Progress[]>>;
}

export const ProgressContext = createContext<ProgressContextProps | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const { userId, loading } = useUser();

  useEffect(() => {
    if (loading || !userId) {
      return;
    }

    // console.log('User ID from useUser:', userId); // Asumiendo que `userId` es el ID del usuario

    const fetchProgress = async (userId: string) => {
      try {
        const fetchedProgress = await getProgressByUserId(userId);
        setProgress(fetchedProgress);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress(userId);
  }, [loading, userId]);

  useEffect(() => {
    // console.log('Progress updated in context:', progress);
  }, [progress]);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextProps => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
