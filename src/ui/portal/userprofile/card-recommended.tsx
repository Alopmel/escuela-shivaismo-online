'use client';
import React, { useEffect, useState } from 'react';
import { getRecommendedVideos } from '@/lib/recommendations'; // Ajusta la ruta si es necesario
import VideoRender from '../categorias/video-Render';
import { useUser } from '@/app/context/UserContext';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useProgress } from '@/app/context/ProgressContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';

interface Video {
  id: string;
  videoId: string;
  title: string;
  category: string;
  totalViews: number;
}

const CardRecommended: React.FC = () => {
  const { userId, loading } = useUser();
  const { favorites } = useFavorites();
  const { progress } = useProgress();
  const { watchLater } = useWatchLater();
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState<boolean>(true);

  useEffect(() => {
    if (loading || !userId) return;

    const fetchRecommendations = async () => {
      try {
        const videos = await getRecommendedVideos(userId, progress, favorites, watchLater);
        setRecommendedVideos(videos);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [userId, loading, progress, favorites, watchLater]);

  if (loadingRecommendations) return <p>Loading recommendations...</p>;
  if (!userId) return null;
  
  return (
    <div className="recommended-videos">
      <VideoRender 
        videoData={recommendedVideos.map(video => ({
          url: `https://dz9uj6zxn56ls.cloudfront.net/${video.videoId}`, // Cambia la URL según sea necesario
          title: video.title,
          key: { Key: video.videoId }
        }))}
        userId={userId}
      />
    </div>
  );
};

export default CardRecommended;
