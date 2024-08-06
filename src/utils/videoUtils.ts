// src/utils/videoUtils.ts

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Favorite, WatchLater } from '@/app/types/types';

// Define KeyItem type
type KeyItem = {
    Key: string;
  };
// Utilidad para extraer número de título
export const extractNumberFromTitle = (title: string): number => {
  const match = title.match(/\d+/g);
  return match ? parseInt(match[0], 10) : 0;
};

// Nueva función para extraer el título sin la extensión del archivo
export const getTitleWithoutExtension = (fileName: string): string => {
  return fileName.replace(/\.(mp4|mov)$/i, ''); // Reemplaza .mp4 o .mov con cadena vacía
};

// Manejar favoritos
export const handleFavoriteToggle = async (index: number, videoData: { title: string; url: string; key: KeyItem }[], favorites: Favorite[], setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>, userId: string) => {
  const { title, url, key } = videoData[index];
  const favorite = favorites.find((fav) => fav.url === url);

  if (favorite) {
    // Remove from favorites
    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${favorite.videoId}`);
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.videoId !== favorite.videoId));
    } catch (error) {
      console.error('Error removing video from favorites:', error);
    }
  } else {
    // Add to favorites
    const newFavorite: Favorite = {
      id: uuidv4(),
      userId,
      videoId: uuidv4(),
      category: 'favorites',
      videoTitle: title,
      url,
      creationDate: new Date().toISOString(),
      lastView: null,
      key: key.Key // Añade la propiedad key
    };

    try {
      await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newFavorite);
      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
    } catch (error) {
      console.error('Error adding video to favorites:', error);
    }
  }
};

// Manejar "Watch Later"
export const handleWatchLaterToggle = async (index: number, videoData: { title: string; url: string; key: KeyItem }[], watchLater: WatchLater[], setWatchLater: React.Dispatch<React.SetStateAction<WatchLater[]>>, userId: string) => {
  const { title, url, key } = videoData[index];
  const watchLaterItem = watchLater.find((wl) => wl.url === url);

  if (watchLaterItem) {
    // Remove from watch later
    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${watchLaterItem.videoId}`);
      setWatchLater((prevWatchLater) => prevWatchLater.filter((watch) => watch.videoId !== watchLaterItem.videoId));
    } catch (error) {
      console.error('Error removing video from "Watch Later":', error);
    }
  } else {
    // Add to watch later
    const newWatchLater: WatchLater = {
      id: uuidv4(),
      userId,
      videoId: uuidv4(),
      category: 'watchlater',
      videoTitle: title,
      url,
      creationDate: new Date().toISOString(),
      lastView: null,
      key: key.Key // Añade la propiedad key
    };

    try {
      await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newWatchLater);
      setWatchLater((prevWatchLater) => [...prevWatchLater, newWatchLater]);
    } catch (error) {
      console.error('Error adding video to "Watch Later":', error);
    }
  }
};

// Manejar reproducción de video
export const handlePlay = async (key: { Key: string }) => {
    console.log('handlePlay called with key:', key);
  
    const videoId = encodeURIComponent(key.Key); // Asegúrate de usar `key.Key` aquí
    console.log('Playing video key:', videoId);
  
    if (!videoId) {
      console.error('Error: videoId is empty');
      return;
    }
  
    const url = 'https://xe6258whge.execute-api.eu-west-2.amazonaws.com/recommended';
  
    try {
      const response = await axios.get(url, {
        headers: {
          'videoId': videoId,
        }
      });
  
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating video views:', error);
      throw error;
    }
  };
  
