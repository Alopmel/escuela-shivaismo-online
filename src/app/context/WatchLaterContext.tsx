'use client'
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface WatchLaterContextProps {
  watchLater: string[];
  setWatchLater: React.Dispatch<React.SetStateAction<string[]>>;
}

const WatchLaterContext = createContext<WatchLaterContextProps | undefined>(undefined);

interface WatchLaterProviderProps {
  children: ReactNode;
}

export const WatchLaterProvider: React.FC<WatchLaterProviderProps> = ({ children }) => {
  const [watchLater, setWatchLater] = useState<string[]>([]);

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
