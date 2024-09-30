'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import useAuthUser from '@/app/hooks/use-auth-user';
import VideoRender from '../categorias/video-Render';
import styles from './cardComponent.module.css';
import { formatTitle } from '@/utils/videoUtils';
import { roboto } from '@/app/fonts';

const CardProfile: React.FC = () => {
  const { favorites } = useFavorites();
  const { watchLater } = useWatchLater();
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchLater'>('favorites');
  const user = useAuthUser();
  const userId = user?.userId ?? '';

  const handleTabChange = (tab: 'favorites' | 'watchLater') => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <motion.div
          className={`${activeTab === 'favorites' ? styles.activeTab : styles.tab} ${roboto.className}`}
          onClick={() => handleTabChange('favorites')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Favoritos
        </motion.div>
        <motion.div
          className={`${activeTab === 'watchLater' ? styles.activeTab : styles.tab} ${roboto.className}`}
          onClick={() => handleTabChange('watchLater')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver después
        </motion.div>
      </div>
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.tabContent}
      >
        <VideoRender 
          videoData={activeTab === 'favorites' 
            ? favorites.map(({ url, videoTitle, key }) => ({
                url,
                title: formatTitle(videoTitle),
                key: { Key: key }
              }))
            : watchLater.map(({ url, videoTitle, key }) => ({
                url,
                title: formatTitle(videoTitle),
                key: { Key: key }
              }))
          }
          userId={userId}
        />
      </motion.div>
    </div>
  );
};

export default CardProfile;