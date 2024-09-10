'use client';

import React, { useState } from 'react';
import { useBucket } from '@/app/context/BucketContext';
import ReactPlayer from 'react-player';
import { FaRegHeart, FaHeart, FaRegClock, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import { useRouter } from 'next/navigation';
import { handleFavoriteToggle, handleWatchLaterToggle, getTitleWithoutExtension } from '@/utils/videoUtils';
import styles from '../userprofile/cardComponent.module.css';
import { Roboto } from 'next/font/google';

// Importar la fuente Roboto
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface CardComponentProps {
  videoData: { url: string; title: string; key: KeyItem }[]; 
  userId: string;
}

type KeyItem = {
  Key: string;
};

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

const CardComponent: React.FC<CardComponentProps> = ({ videoData, userId }) => {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const { favorites, setFavorites } = useFavorites();
  const { watchLater, setWatchLater } = useWatchLater();
  const router = useRouter();

  const handleDoubleClick = (videoUrl: string) => {
    const videoFileName = videoUrl.split('/').pop();
    const videoId = videoFileName ? getTitleWithoutExtension(videoFileName) : '';
    const params = new URLSearchParams({ videoUrl: videoId });
    router.push(`/portal/categorias/video-player?${params.toString()}`);
  };

  const cleanTitle = (title: string) => {
    return title.replace(/^\d+\.\s*/, ''); // Elimina números seguidos de un punto
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}
    >
      {videoData.map(({ url, title, key }, index) => {
        const isFavorite = favorites.some((fav) => fav.url === url);
        const isWatchLater = watchLater.some((wl) => wl.url === url);

        return (
          <div
            key={index}
            className={styles.cardContainer}
            onMouseEnter={() => setHoveredVideo(index)}
            onMouseLeave={() => setHoveredVideo(null)}
            onDoubleClick={() => handleDoubleClick(url)}
          >
            <div className={styles.cardContainer_01}>
              <ReactPlayer
                url={url}
                controls={hoveredVideo === index}
                width="100%"
                height="100%"
                className={styles.cardPlayer}
                playing={false}
                config={{
                  file: {
                    attributes: {
                      onDoubleClick: () => handleDoubleClick(url),
                    },
                  },
                }}
              />
            </div>
            {(hoveredVideo === index || isFavorite || isWatchLater) && (
              <div className={styles.cardIcons}>
                <div className={styles.cardIcon} onClick={() => handleFavoriteToggle(index, videoData, favorites, setFavorites, userId)}>
                  {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </div>
                <div className={styles.cardIcon} onClick={() => handleWatchLaterToggle(index, videoData, watchLater, setWatchLater, userId)}>
                  {isWatchLater ? <FaClock size={24} /> : <FaRegClock size={24} />}
                </div>
              </div>
            )}
            <div>
              <p className={`${styles.title} ${roboto.className}`}>{cleanTitle(title)}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default CardComponent;
