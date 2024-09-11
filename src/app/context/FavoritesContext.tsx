// src/app/context/FavoritesContext.tsx
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getFavoritesByUserId } from '@/lib/favoriteData';
import { Favorite } from '../types/types';
import { useUser } from '@/app/context/UserContext';

interface FavoritesContextProps {
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

export const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { userId, loading } = useUser();

  useEffect(() => {
    if (loading || !userId) {
      return;
    }

    console.log('User ID from useUser:', userId); // Asumiendo que `userId` es el ID del usuario

    const fetchFavorites = async (userId: string) => {
      try {
        const fetchedFavorites = await getFavoritesByUserId(userId);
        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites(userId);
  }, [loading, userId]);

  useEffect(() => {
    console.log('Favorites updated in context:', favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
