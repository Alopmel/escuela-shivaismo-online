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
  // Normalizar los títulos en progressData, favoritesData, y watchLaterData
  const normalizedViewedTitles = new Set(
    progressData.map(item => normalizeTitle(item.videoTitle))
  );
  const normalizedFavoritesTitles = new Set(
    favoritesData.map(item => normalizeTitle(item.videoTitle))
  );
  const normalizedWatchLaterTitles = new Set(
    watchLaterData.map(item => normalizeTitle(item.videoTitle))
  );

  // Filtrar videos existentes
  const filteredVideos = videos.filter(video => {
    const normalizedTitle = normalizeTitle(video.title);
    return (
      !normalizedViewedTitles.has(normalizedTitle) && 
      !normalizedFavoritesTitles.has(normalizedTitle) && 
      !normalizedWatchLaterTitles.has(normalizedTitle)
    );
  });

  console.log('Filtered videos:', filteredVideos);
  return filteredVideos;
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
    console.log('All videos:', allVideos);

    // Filtrar videos que ya han sido vistos, favoritos o están en "ver más tarde"
    const filteredVideos = filterExistingVideos(allVideos, progressData, favoritesData, watchLaterData);

    // Eliminar los videos que ya existen en watchLater o favorites
    const finalRecommendedVideos = filteredVideos.slice(0, 10); // Obtener los primeros 10 registros

    console.log('Final recommended videos:', finalRecommendedVideos);
    return finalRecommendedVideos;
  } catch (error) {
    console.error('Error fetching recommended videos:', error);
    throw error;
  }
};

// Función para obtener los 10 videos más vistos
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
    console.log('All videos:', allVideos);

    // Ordenar todos los videos por número de visitas de mayor a menor
    const sortedVideos = allVideos
      .sort((a, b) => b.totalViews - a.totalViews);

    // Filtrar videos que ya han sido vistos, favoritos o están en "ver más tarde"
    const filteredVideos = filterExistingVideos(sortedVideos, progressData, favoritesData, watchLaterData);

    // Tomar los primeros 10 videos
    const top10MostViewedVideos = filteredVideos.slice(0, 10);

    console.log('Top 10 most viewed videos:', top10MostViewedVideos);
    return top10MostViewedVideos;
  } catch (error) {
    console.error('Error fetching most viewed videos:', error);
    throw error;
  }
};
