import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaClock } from 'react-icons/fa';
import styles from './cardComponent.module.css';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext'; // Importa el contexto WatchLater
import useAuthUser from '@/app/hooks/use-auth-user';
import { Favorite } from '@/app/types/types';
import axios from 'axios'; // Importar axios para realizar la solicitud DELETE

const pageTransition = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const CardProfile: React.FC = () => {
  const { favorites, setFavorites } = useFavorites();
  const { watchLater, setWatchLater } = useWatchLater(); // Usar el contexto WatchLater
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchLater'>('favorites');
  const [error, setError] = useState<string | null>(null);
  const user = useAuthUser();
  const userId = user ? user.userId : 'null';

  const handleTabChange = (tab: 'favorites' | 'watchLater') => {
    setActiveTab(tab);
  };

  const handleFavoriteClick = async (videoId: string | null) => {
    if (!videoId) {
      console.error('videoId es null o undefined');
      return;
    }

    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${videoId}`);
      // Realizar la solicitud DELETE para eliminar el video de favoritos
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.videoId !== videoId));
    } catch (error) {
      console.error('Error al eliminar video de favoritos:', error);
      setError('Error al eliminar video de favoritos');
    }
  };

  const handleWatchLaterClick = async (videoId: string | null) => {
    if (!videoId) {
      console.error('videoId es null o undefined');
      return;
    }

    try {
      await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${videoId}`);
      // Realizar la solicitud DELETE para eliminar el video de "ver más tarde"
      setWatchLater(prevWatchLater => prevWatchLater.filter(video => video.videoId !== videoId));
    } catch (error) {
      console.error('Error al eliminar video de "ver más tarde":', error);
      setError('Error al eliminar video de "ver más tarde"');
    }
  };

  const renderVideoCards = (videos: Favorite[]) => (
    <div className={styles.videoGrid}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={video.id} className={styles.cardContainer} onMouseEnter={() => setHoveredVideo(index)} onMouseLeave={() => setHoveredVideo(null)}>
            <div className={styles.cardContainer_01}>
              <video src={video.url} controls={hoveredVideo === index} className={styles.cardPlayer} />
            </div>
            {hoveredVideo === index && (
              <div className={styles.cardIcons}>
                {activeTab === 'favorites' && (
                  <div className={styles.cardIcon} onClick={() => handleFavoriteClick(video.videoId)}>
                    <FaHeart size={24} />
                  </div>
                )}
                {activeTab === 'watchLater' && (
                  <div className={styles.cardIcon} onClick={() => handleWatchLaterClick(video.videoId)}>
                    <FaClock size={24} />
                  </div>
                )}
              </div>
            )}
            <div>
              <p className={styles.title}>{video.videoTitle}</p>
              <p className={styles.ptitle}>500 visualizaciones -</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: 'white' }}>No hay videos disponibles.</p>
      )}
    </div>
  );

  return (
    <motion.div initial="hidden" animate="show" exit="exit" variants={pageTransition} className={styles.container}>
      <div className={styles.tabs}>
        <div className={activeTab === 'favorites' ? styles.activeTab : styles.tab} onClick={() => handleTabChange('favorites')}>
          Favoritos
        </div>
        <div className={activeTab === 'watchLater' ? styles.activeTab : styles.tab} onClick={() => handleTabChange('watchLater')}>
          Ver más tarde
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {renderVideoCards(activeTab === 'favorites' ? favorites : watchLater)}
    </motion.div>
  );
};

export default CardProfile;
