import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Favorite, WatchLater, Progress } from '@/app/types/types';

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

export const cleanVideoId = (videoFileName: string): string => {
  // La expresión regular busca un patrón de un número seguido de un punto y un espacio opcional
  return videoFileName.replace(/^\d+\.\s*/, '');
}

// Función para debounce
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Manejar favoritos
export const handleFavoriteToggle = async (
  index: number,
  videoData: { title: string; url: string; key: KeyItem }[],
  favorites: Favorite[],
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>,
  userId: string
) => {
  const { title, url, key } = videoData[index];
  console.log('handleFavoriteToggle called with:', {
    index,
    title,
    url,
    key,
    favorites,
    userId,
  });

  const favorite = favorites.find((fav) => fav.url === url);

  if (favorite) {
    // Remove from favorites
    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${favorite.videoId}`);
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.videoId !== favorite.videoId));
      console.log(`Removed from favorites: ${url}`);
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
      key: key.Key, // Añade la propiedad key
    };

    try {
      await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newFavorite);
      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
      console.log(`Added to favorites: ${url}`);
    } catch (error) {
      console.error('Error adding video to favorites:', error);
    }
  }
};

// Manejar "Watch Later"
export const handleWatchLaterToggle = async (
  index: number,
  videoData: { title: string; url: string; key: KeyItem }[],
  watchLater: WatchLater[],
  setWatchLater: React.Dispatch<React.SetStateAction<WatchLater[]>>,
  userId: string
) => {
  const { title, url, key } = videoData[index];
  console.log('handleWatchLaterToggle called with:', {
    index,
    title,
    url,
    key,
    watchLater,
    userId,
  });

  const watchLaterItem = watchLater.find((wl) => wl.url === url);
  console.log('watchLater' ,watchLater)

  if (watchLaterItem) {
    // Remove from watch later
    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${watchLaterItem.videoId}`);
      setWatchLater((prevWatchLater) => prevWatchLater.filter((watch) => watch.videoId !== watchLaterItem.videoId));
      console.log(`Removed from watch later: ${url}`);
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
      key: key.Key, // Añade la propiedad key
    };

    try {
      await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newWatchLater);
      setWatchLater((prevWatchLater) => [...prevWatchLater, newWatchLater]);
      console.log(`Added to watch later: ${url}`);
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
        videoId: videoId,
      },
    });

    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating video views:', error);
    throw error;
  }
};

// Manejar el progreso del video
export const handleVideoProgress = debounce(
  async (
    played: number,
    index: number,
    videoData: { title: string; url: string; key: KeyItem }[],
    progress: Progress[],
    setProgress: React.Dispatch<React.SetStateAction<Progress[]>>,
    userId: string
  ) => {
    const progressPercentage = played * 100;
    const { title, url } = videoData[index];

    console.log('handleProgressToggle called with:', {
      index,
      title,
      url,
      progress,
      userId,
    });

    if (progressPercentage >= 90) {
      // Verificar si el progreso ya existe
      const progressItem = progress.find((pg) => pg.url === url);
      console.log('progressItem-->', progressItem);

      if (!progressItem) {
        // Si no existe, añadir progreso
        const newProgress: Progress = {
          id: uuidv4(),
          userId,
          url,
          videoId: uuidv4(),
          videoTitle: cleanVideoId(title),
          creationDate: new Date().toISOString(),
        };

        try {
          await axios.put('https://kqyeh8sa4j.execute-api.eu-west-2.amazonaws.com/progress', newProgress);
          setProgress((prevProgress) => [...prevProgress, newProgress]);
          console.log(`Added to progress: ${url}`);
        } catch (error) {
          console.error('Error adding video to "Progress":', error);
        }
      } else {
        console.log(`Progress already exists for videoId ${progressItem.videoId}, no action taken.`);
      }
    }
  },
  1000 // Ajusta el tiempo de debounce según tus necesidades
);

// Función para hacer throttle
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
