'use client';
import React, { useEffect, useState } from 'react';
import { getMostViewedVideos } from '@/lib/recommendations'; // Ajusta la ruta si es necesario
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

const CardMoreViews: React.FC = () => {
  const [mostViewedVideos, setMostViewedVideos] = useState<Video[]>([]);
  const { userId, loading } = useUser();
  const { favorites } = useFavorites();
  const { progress } = useProgress();
  const { watchLater } = useWatchLater();
  const [loadingMostViewedVideos, setLoadingMostViewedVideos] = useState<boolean>(true);

  useEffect(() => {
    if (loading || !userId) return;
    
    const fetchMostViewedVideos = async () => {
      try {
        const videos = await getMostViewedVideos(progress, favorites, watchLater);
        setMostViewedVideos(videos);
      } catch (error) {
        console.error('Error fetching most viewed videos:', error);
      } finally {
        setLoadingMostViewedVideos(false);
      }
    };

    fetchMostViewedVideos();
  }, [userId, loading, progress, favorites, watchLater]);

  if (loadingMostViewedVideos) return <p>Loading most viewed videos...</p>;
  if (!userId) return null;

  return (
    <div className="most-viewed-videos">
      <VideoRender 
        videoData={mostViewedVideos.map(video => ({
          url: `https://dz9uj6zxn56ls.cloudfront.net/${video.videoId}`, // Cambia la URL según sea necesario
          title: video.title,
          key: { Key: video.videoId }
        }))}
        userId={userId}
      />
    </div>
  );
};

export default CardMoreViews;
