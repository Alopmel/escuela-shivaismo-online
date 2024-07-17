// src/app/context/FavoritesContext.tsx

'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getFavoritesByUserId } from '../api/favorites/route'; // Importamos la función de API y el tipo Favorite
import { Favorite } from '../types/types';

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

  useEffect(() => {
    const fetchFavorites = async (userId: string) => {
      try {
        const fetchedFavorites = await getFavoritesByUserId(userId);
        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    // Aquí podrías tener una función para obtener el userId del usuario actual
    const userId = 'c6a2c274-8001-7060-0a1c-87077fd101e1'; // Ejemplo: obtén el userId de alguna manera (por ejemplo, desde props o contextos superiores)
    fetchFavorites(userId);
  }, []);

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
