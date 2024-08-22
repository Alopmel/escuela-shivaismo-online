// /src/ui/portal/userprofile/CardProfile.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import useAuthUser from '@/app/hooks/use-auth-user';
import VideoRender from '../categorias/video-Render';
import styles from './cardComponent.module.css';


const pageTransition = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const CardProfile: React.FC = () => {
  const { favorites } = useFavorites();
  const { watchLater } = useWatchLater();
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchLater'>('favorites');
  const user = useAuthUser();
  const userId = user?.userId ?? ''; // Asegúrate de que userId sea un string

  const handleTabChange = (tab: 'favorites' | 'watchLater') => {
    setActiveTab(tab);
  };

  return (
    <motion.div initial="hidden" animate="show" exit="exit" variants={pageTransition} className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={activeTab === 'favorites' ? styles.activeTab : styles.tab}
          onClick={() => handleTabChange('favorites')}
        >
          Favoritos
        </div>
        <div
          className={activeTab === 'watchLater' ? styles.activeTab : styles.tab}
          onClick={() => handleTabChange('watchLater')}
        >
          Ver más tarde
        </div>
      </div>
      {activeTab === 'favorites' ? (
        <VideoRender 
          videoData={favorites.map(({ url, videoTitle , key}) => ({
            url,
            title: videoTitle, 
            key: { Key: key }
          }))} 
          userId={userId} 
        />
      ) : (
        <VideoRender 
          videoData={watchLater.map(({ url, videoTitle, key }) => ({
            url, 
            title: videoTitle, 
            key: { Key: key }
          }))} 
          userId={userId} 
        />
      )}
    </motion.div>
  );
};

export default CardProfile;
