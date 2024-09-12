// src/app/context/WatchLaterContext.tsx
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getWatchLaterByUserId } from '@/lib/watchLaterData'; // Importamos la función de API y el tipo WatchLater
import { WatchLater } from '../types/types';
import { useUser } from '@/app/context/UserContext';

interface WatchLaterContextProps {
  watchLater: WatchLater[];
  setWatchLater: React.Dispatch<React.SetStateAction<WatchLater[]>>;
}

export const WatchLaterContext = createContext<WatchLaterContextProps | undefined>(undefined);

interface WatchLaterProviderProps {
  children: ReactNode;
}

export const WatchLaterProvider: React.FC<WatchLaterProviderProps> = ({ children }) => {
  const [watchLater, setWatchLater] = useState<WatchLater[]>([]);
  const { user, userId, loading } = useUser();

  useEffect(() => {
    if (loading) {
      return; // Espera a que termine de cargar el usuario
    }

    if (!userId) {
      setWatchLater([]); // Opcional: Limpiar los datos si no hay usuario
      return;
    }

    const fetchWatchLater = async (userId: string) => {
      try {
        const fetchedWatchLater = await getWatchLaterByUserId(userId);
        setWatchLater(fetchedWatchLater);
      } catch (error) {
        console.error('Error fetching watch later:', error);
      }
    };

    fetchWatchLater(userId);
  }, [loading, userId]);

  useEffect(() => {
    console.log('WatchLater updated in context:', watchLater);
  }, [watchLater]);

  return (
    <WatchLaterContext.Provider value={{ watchLater, setWatchLater }}>
      {children}
    </WatchLaterContext.Provider>
  );
};

export const useWatchLater = (): WatchLaterContextProps => {
  const context = useContext(WatchLaterContext);
  if (!context) {
    throw new Error('useWatchLater must be used within a WatchLaterProvider');
  }
  return context;
};
