import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaClock } from 'react-icons/fa';
import styles from './cardComponent.module.css';
import { useFavorites } from '@/app/context/FavoritesContext'; // Ajusta la ruta de importación según tu configuración
import useAuthUser from '@/app/hooks/use-auth-user';
import { Favorite } from '@/app/types/types';

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
  const { favorites } = useFavorites(); // Obtenemos los favoritos del contexto
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchLater'>('favorites');
  const [error, setError] = useState<string | null>(null);
  const user = useAuthUser();
  const userId = user ? user.userId : 'null';

  const handleTabChange = (tab: 'favorites' | 'watchLater') => {
    setActiveTab(tab);
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
                  <div className={styles.cardIcon}>
                    <FaHeart size={24} />
                  </div>
                )}
                {activeTab === 'watchLater' && (
                  <div className={styles.cardIcon}>
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
      {renderVideoCards(activeTab === 'favorites' ? favorites : [])}
    </motion.div>
  );
};

export default CardProfile;
