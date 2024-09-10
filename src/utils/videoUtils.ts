import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Favorite, WatchLater, Progress } from '@/app/types/types';

// Define KeyItem type
type KeyItem = {
  Key: string;
};

interface Video {
  id: string;
  videoId: string;
  // Otros atributos del video si son necesarios
}

export const formatTitle = (title: string): string => {
  // Extraer la parte después del '/'
  const partAfterSlash = title.split('/').pop() || '';

  // Eliminar el número y el '.' al principio, y la extensión al final
  const formattedTitle = partAfterSlash
    .replace(/^\d+\./, '') // Quitar número y '.'
    .replace(/\.(mp4|mov)$/, ''); // Quitar extensión de archivo

  return formattedTitle.trim(); // Eliminar espacios en blanco alrededor
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
  // console.log('handleFavoriteToggle called with:', {
  //   index,
  //   title,
  //   url,
  //   key,
  //   favorites,
  //   userId,
  // });

  const favorite = favorites.find((fav) => fav.url === url);

  if (favorite) {
    // Remove from favorites
    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${favorite.videoId}`);
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.videoId !== favorite.videoId));
      // console.log(`Removed from favorites: ${url}`);
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
      // console.log(`Added to favorites: ${url}`);
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
  // console.log('handleWatchLaterToggle called with:', {
  //   index,
  //   title,
  //   url,
  //   key,
  //   watchLater,
  //   userId,
  // });

  const watchLaterItem = watchLater.find((wl) => wl.url === url);
  // console.log('watchLater' ,watchLater)

  if (watchLaterItem) {
    // Remove from watch later
    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${watchLaterItem.videoId}`);
      setWatchLater((prevWatchLater) => prevWatchLater.filter((watch) => watch.videoId !== watchLaterItem.videoId));
      // console.log(`Removed from watch later: ${url}`);
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
      // console.log(`Added to watch later: ${url}`);
    } catch (error) {
      console.error('Error adding video to "Watch Later":', error);
    }
  }
};


export const handlePlay = async (key: { Key: string }) => {
  // console.log('handlePlay called with key:', key);

  const videoTitle = key.Key;
  // console.log('Playing video with title:', videoTitle);

  try {
    // Paso 1: Obtener todas las clases
    const response = await axios.get<Video[]>('https://n8rv8ni618.execute-api.eu-west-2.amazonaws.com/clases');

    // Paso 2: Buscar el video por su título
    const video = response.data.find((v) => v.videoId === videoTitle);

    if (!video) {
      console.error(`No se encontró el video con el título: ${videoTitle}`);
      return;
    }

    const videoId = video.id;

    // Paso 3: Hacer la actualización del video
    const updateResponse = await axios.put(`https://n8rv8ni618.execute-api.eu-west-2.amazonaws.com/clases/${videoId}`);

    // console.log(`Updated video views for: ${videoId}`, updateResponse.data);
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

    // console.log('handleProgressToggle called with:', {
    //   index,
    //   title,
    //   url,
    //   progress,
    //   userId,
    // });

    if (progressPercentage >= 90) {
      // Verificar si el progreso ya existe
      // console.log('progress', progress)
      const progressItem = progress.find((pg) => pg.url === url);
      // console.log('progressItem-->', progressItem);

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
          // console.log(`Added to progress: ${url}`);
        } catch (error) {
          console.error('Error adding video to "Progress":', error);
        }
      } else {
        // console.log(`Progress already exists for videoId ${progressItem.videoId}, no action taken.`);
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


// Funcion para manejar los comentarios
export const putComment = async (videoId: string, videoTitle: string, userId: string, userName: string, text: string) => {
  const newComment = {
    id: uuidv4(), // Asegúrate de que el ID esté bien generado
    videoId,
    videoTitle,
    userId,
    userName,
    text, // Este campo debe estar presente
    creationDate: new Date().toISOString(),
  };

  try {
    const response = await axios.put('https://ac0msttmkc.execute-api.eu-west-2.amazonaws.com/comment', newComment);
    // console.log('Comment added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};


export const getComments = async (videoId: string) => {
  try {
    const videoIdC = encodeURIComponent(videoId);
    // console.log('videoIdC--', videoIdC);

    const response = await axios.get(`https://ac0msttmkc.execute-api.eu-west-2.amazonaws.com/comment/${videoIdC}`);
    // console.log('Fetched comments:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Funcion para manejar
export const getRecommendedVideos = async (videoId: string) => {
  try {
    const response = await axios.get(`https://ac0msttmkc.execute-api.eu-west-2.amazonaws.com/comment/${videoId}`);
    // console.log('Recommended videos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended videos:', error);
    throw error;
  }
};