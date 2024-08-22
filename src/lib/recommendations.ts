import axios from 'axios';
import { Progress, Favorite, WatchLater } from '@/app/types/types';

const API_BASE_URL = 'https://xe6258whge.execute-api.eu-west-2.amazonaws.com/recommended';

interface Video {
  id: string;
  videoId: string;
  title: string;
  category: string;
  totalViews: number;
  key: string;
}

// Función para normalizar un título eliminando caracteres no alfabéticos y convirtiendo a minúsculas
const normalizeTitle = (title: string): string => {
  return title
    .replace(/[^a-zA-Z\s]/g, '')  // Elimina todo excepto letras y espacios
    .toLowerCase()                // Convierte a minúsculas
    .trim();                      // Elimina espacios en los extremos
};

// Función auxiliar para filtrar videos existentes
const filterExistingVideos = (
  videos: Video[], 
  progressData: Progress[], 
  favoritesData: Favorite[], 
  watchLaterData: WatchLater[]
): Video[] => {
  // Normalizar los títulos en progressData
  const normalizedViewedTitles = new Set(
    progressData.map(item => normalizeTitle(item.videoTitle))
  );

  // Crear conjuntos de palabras clave extraídas de cada set
  const favoriteVideoKeys = new Set(favoritesData.map(item => item.key));
  const watchLaterVideoKeys = new Set(watchLaterData.map(item => item.key));

  // Filtrar videos existentes
  return videos.filter(video => {
    const normalizedTitle = normalizeTitle(video.title);
    return (
      !normalizedViewedTitles.has(normalizedTitle) && 
      !favoriteVideoKeys.has(video.key) && 
      !watchLaterVideoKeys.has(video.key)
    );
  });
};

// Función para obtener videos recomendados
export const getRecommendedVideos = async (
  userId: string,
  progressData: Progress[],
  favoritesData: Favorite[],
  watchLaterData: WatchLater[]
): Promise<Video[]> => {
  try {
    // Obtener todos los videos
    const response = await axios.get<Video[]>(API_BASE_URL);
    const allVideos = response.data;

    // Filtrar videos que ya han sido vistos, favoritos o están en "ver más tarde"
    const filteredVideos = filterExistingVideos(allVideos, progressData, favoritesData, watchLaterData);

    // Ordenar los videos restantes por número de visitas y tomar los 10 primeros
    const recommendedVideos = filteredVideos
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 10);

    console.log('recommendedVideos -->', recommendedVideos);
    return recommendedVideos;
  } catch (error) {
    console.error('Error fetching recommended videos:', error);
    throw error;
  }
};

// Función para obtener los 10 videos más vistos
export const getMostViewedVideos = async (
  progressData: Progress[],
  favoritesData: Favorite[],
  watchLaterData: WatchLater[]
): Promise<Video[]> => {
  try {
    // Obtener todos los videos
    const response = await axios.get<Video[]>(API_BASE_URL);
    const allVideos = response.data;

    // Filtrar videos que ya han sido vistos, favoritos o están en "ver más tarde"
    const filteredVideos = filterExistingVideos(allVideos, progressData, favoritesData, watchLaterData);

    // Ordenar los videos restantes por número de visitas y tomar los 10 primeros
    const mostViewedVideos = filteredVideos
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 10);

    console.log('mostViewedVideos -->', mostViewedVideos);
    return mostViewedVideos;
  } catch (error) {
    console.error('Error fetching most viewed videos:', error);
    throw error;
  }
};
