'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getWatchLaterByUserId } from '@/lib/watchLaterData'; // Importamos la función de API y el tipo WatchLater
import { WatchLater } from '../types/types';

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

  useEffect(() => {
    const fetchWatchLater = async (userId: string) => {
      try {
        const fetchedWatchLater = await getWatchLaterByUserId(userId);
        setWatchLater(fetchedWatchLater);
      } catch (error) {
        console.error('Error fetching watch later:', error);
      }
    };

    const userId = 'c6a2c274-8001-7060-0a1c-87077fd101e1'; // Ejemplo: obtén el userId de alguna manera (por ejemplo, desde props o contextos superiores)
    fetchWatchLater(userId);
  }, []);

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
