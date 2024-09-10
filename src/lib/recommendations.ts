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

// Función para verificar si alguna palabra del videoTitle está presente en el videoId o category
const doesTitleMatch = (titleWords: string[], video: Video): boolean => {
  const videoIdLower = video.videoId.toLowerCase();
  const categoryLower = video.category.toLowerCase();

  return titleWords.some(word => videoIdLower.includes(word) || categoryLower.includes(word));
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
  // console.log('normalizedViewedTitles -->', normalizedViewedTitles);
  
  // Crear un array con las palabras clave extraídas de videoTitle en progressData, favoritos y watchlater
  const progressTitleWords = progressData.flatMap(item => normalizeTitle(item.videoTitle).split(' '));
  const favoriteTitleWords = favoritesData.flatMap(item => normalizeTitle(item.videoTitle).split(' '));
  const watchLaterTitleWords = watchLaterData.flatMap(item => normalizeTitle(item.videoTitle).split(' '));

  const titleWordsSet = new Set([...progressTitleWords, ...favoriteTitleWords, ...watchLaterTitleWords]);
  // console.log('Title words from progress, favorites, and watchlater:', titleWordsSet);

  // Filtrar videos existentes según las palabras clave de los títulos
  const filteredVideos = videos.filter(video => {
    const normalizedTitle = normalizeTitle(video.title);
    const wordsArray = Array.from(titleWordsSet);

    return (
      !normalizedViewedTitles.has(normalizedTitle) && 
      doesTitleMatch(wordsArray, video)
    );
  });

  // console.log('Filtered videos:', filteredVideos);
  return filteredVideos;
};

// Función para eliminar los videos que ya existen en watchLater o favorites de recommendedVideos
const removeExistingTitles = (
  recommendedVideos: Video[], 
  favoritesData: Favorite[], 
  watchLaterData: WatchLater[]
): Video[] => {
  // Crear un conjunto de títulos normalizados de watchLater y favorites
  const normalizedFavoritesTitles = new Set(
    favoritesData.map(item => normalizeTitle(item.videoTitle))
  );
  const normalizedWatchLaterTitles = new Set(
    watchLaterData.map(item => normalizeTitle(item.videoTitle))
  );

  // Filtrar los recommendedVideos para eliminar aquellos que coinciden con títulos en watchLater o favorites
  const filteredRecommendations = recommendedVideos.filter(video => {
    const normalizedTitle = normalizeTitle(video.title);

    return (
      !normalizedFavoritesTitles.has(normalizedTitle) && 
      !normalizedWatchLaterTitles.has(normalizedTitle)
    );
  });

  // console.log('Filtered recommended videos:', filteredRecommendations);
  return filteredRecommendations.slice(0, 10); // Obtener los primeros 10 registros
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
    // console.log('All videos:', allVideos);

    // Filtrar videos que ya han sido vistos, favoritos o están en "ver más tarde"
    const filteredVideos = filterExistingVideos(allVideos, progressData, favoritesData, watchLaterData);

    // Eliminar los videos que ya existen en watchLater o favorites
    const finalRecommendedVideos = removeExistingTitles(filteredVideos, favoritesData, watchLaterData);

    // console.log('Final recommended videos:', finalRecommendedVideos);
    return finalRecommendedVideos;
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
    // console.log('All videos:', allVideos);

    // Ordenar todos los videos por número de visitas de mayor a menor
    const mostViewedVideos = allVideos
      .sort((a, b) => b.totalViews - a.totalViews);

    // Filtrar los videos que ya han sido vistos, favoritos o están en "ver más tarde"
    const filteredVideos = filterExistingVideos(mostViewedVideos, progressData, favoritesData, watchLaterData);

    // Tomar los primeros 10 registros
    const top10MostViewedVideos = filteredVideos.slice(0, 10);

    // console.log('Top 10 most viewed videos:', top10MostViewedVideos);
    return top10MostViewedVideos;
  } catch (error) {
    console.error('Error fetching most viewed videos:', error);
    throw error;
  }
};
