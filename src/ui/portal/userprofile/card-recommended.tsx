// /src/ui/portal/userprofile/CardProfile.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoRender from '../categorias/video-Render';
import useAuthUser from '@/app/hooks/use-auth-user';
import { getMostViewedVideos, getRecommendedVideos } from '@/lib/recommendations'; // Ajusta la ruta según tu estructura
import { useFavorites } from '@/app/context/FavoritesContext';
import { useProgress } from '@/app/context/ProgressContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import styles from './cardComponent.module.css';
import { formatTitle } from '@/utils/videoUtils'; // Asegúrate de ajustar la ruta según tu estructura
import { roboto } from '@/app/fonts';
// Define the Video type
interface Video {
  id: string;
  videoId: string;
  title: string;
  category: string;
  totalViews: number;
}

const pageTransition = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const CardProfile: React.FC = () => {
  const { userId, loading: userLoading } = useAuthUser();
  const { favorites } = useFavorites();
  const { progress } = useProgress();
  const { watchLater } = useWatchLater();
  const [activeTab, setActiveTab] = useState<'recommended' | 'mostViewed'>('recommended');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userLoading || !userId) return;

    const fetchVideos = async () => {
      setLoading(true);
      try {
        if (activeTab === 'recommended') {
          // Fetch recommended videos
          const recommended = await getRecommendedVideos(userId, progress, favorites, watchLater);
          setVideos(recommended);
        } else if (activeTab === 'mostViewed') {
          // Fetch most viewed videos
          const mostViewed = await getMostViewedVideos(progress, favorites, watchLater);
          setVideos(mostViewed);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeTab, userId, userLoading, progress, favorites, watchLater]);

  const handleTabChange = (tab: 'recommended' | 'mostViewed') => {
    setActiveTab(tab);
  };

  if (loading) return <p>Loading...</p>;
  if (!userId) return <p>No user found.</p>;

  return (
    <motion.div initial="hidden" animate="show" exit="exit" variants={pageTransition} className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={`${activeTab === 'recommended' ? styles.activeTab : styles.tab} ${roboto.className}`}
          onClick={() => handleTabChange('recommended')}
        >
          Recomendaciones
        </div>
        <div
          className={`${activeTab === 'mostViewed' ? styles.activeTab : styles.tab} ${roboto.className}`}
          onClick={() => handleTabChange('mostViewed')}
        >
          Más vistas
        </div>
      </div>
      <div className="video-list">
        <VideoRender 
          videoData={videos.map(video => ({
            url: `https://dz9uj6zxn56ls.cloudfront.net/${video.videoId}`, // Cambia la URL según sea necesario
            title:  formatTitle(video.title),
            key: { Key: video.videoId }
          }))}
          userId={userId}
        />
      </div>
    </motion.div>
  );
};

export default CardProfile;
