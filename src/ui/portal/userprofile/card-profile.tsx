'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaClock } from 'react-icons/fa';
import styles from './cardComponent.module.css';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import { useBucket } from '@/app/context/BucketContext';

interface KeyItem {
  Key: string;
  LastModified: string;
}

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
  const { watchLater, setWatchLater } = useWatchLater();
  const { keys } = useBucket();

  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchLater' | 'mostViewed' | 'recommended' | 'latestUploads'>('favorites');
  const [favoriteVideos, setFavoriteVideos] = useState<{ url: string; key: string }[]>([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState<{ url: string; key: string }[]>([]);
  const [mostViewedVideos, setMostViewedVideos] = useState<{ url: string; key: string }[]>([]);
  const [recommendedVideos, setRecommendedVideos] = useState<{ url: string; key: string }[]>([]);
  const [latestUploadsVideos, setLatestUploadsVideos] = useState<{ url: string; key: string }[]>([]);

  useEffect(() => {
    const favoriteUrls = favorites.map(favKey => ({ url: `https://dz9uj6zxn56ls.cloudfront.net/${favKey}`, key: favKey }));
    const watchLaterUrls = watchLater.map(watchKey => ({ url: `https://dz9uj6zxn56ls.cloudfront.net/${watchKey}`, key: watchKey }));
    setFavoriteVideos(favoriteUrls);
    setWatchLaterVideos(watchLaterUrls);
  }, [favorites, watchLater]);


  const handleFavoriteRemove = (index: number) => {
    const videoKey = favoriteVideos[index].key;
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav !== videoKey));
  };

  const handleWatchLaterRemove = (index: number) => {
    const videoKey = watchLaterVideos[index].key;
    setWatchLater(prevWatchLater => prevWatchLater.filter(watch => watch !== videoKey));
  };

  const handleTabChange = (tab: 'favorites' | 'watchLater') => {
    setActiveTab(tab);
  };

  const renderVideoCards = (videos: { url: string; key: string }[]) => (
    <div className={styles.videoGrid}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={video.key} className={styles.cardContainer} onMouseEnter={() => setHoveredVideo(index)} onMouseLeave={() => setHoveredVideo(null)}>
            <div className={styles.cardContainer_01}>
              <video src={video.url} controls={hoveredVideo === index} className={styles.cardPlayer} />
            </div>
            {hoveredVideo === index && (
              <div className={styles.cardIcons}>
                {activeTab === 'favorites' && (
                  <div className={styles.cardIcon} onClick={() => handleFavoriteRemove(index)}>
                    <FaHeart size={24} />
                  </div>
                )}
                {activeTab === 'watchLater' && (
                  <div className={styles.cardIcon} onClick={() => handleWatchLaterRemove(index)}>
                    <FaClock size={24} />
                  </div>
                )}
              </div>
            )}
            <div>
              <p className={styles.title}>{video.key.split('/').pop()?.replace('.mp4', '')}</p>
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
      {renderVideoCards(activeTab === 'favorites' ? favoriteVideos :  watchLaterVideos )}
    </motion.div>
  );
};

const getUrls = (keys: KeyItem[]) => keys.map(item => ({ url: `https://dz9uj6zxn56ls.cloudfront.net/${item.Key}`, key: item.Key }));

export default CardProfile;
