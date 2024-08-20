import React, { useEffect, useState } from 'react';
import { useBucket } from '@/app/context/BucketContext';
import ReactPlayer from 'react-player';
import { FaRegHeart, FaHeart, FaRegClock, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import { useProgress } from '@/app/context/ProgressContext';
import { useRouter } from 'next/navigation';
import { 
  extractNumberFromTitle, 
  getTitleWithoutExtension, 
  handleFavoriteToggle, 
  handleWatchLaterToggle, 
  handlePlay,
  cleanVideoId,
  throttle,
  handleVideoProgress
} from '@/utils/videoUtils';
import { Progress } from '@/app/types/types';
import styles from './cardComponente.module.css';

interface CardComponentProps {
  item: string;
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

const CardComponent: React.FC<CardComponentProps> = ({ item, userId }) => {
  const { keys } = useBucket();
  const [videoData, setVideoData] = useState<{ url: string; title: string; key: KeyItem }[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const { favorites, setFavorites } = useFavorites();
  const { watchLater, setWatchLater } = useWatchLater();
  const { progress, setProgress } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (!item) return;

    const fetchVideoData = () => {
      try {
        const upperCaseItem = item.toUpperCase();
        const filteredKeys = keys.filter((keyItem: KeyItem) =>
          keyItem.Key.includes(upperCaseItem) &&
          (keyItem.Key.endsWith('.mp4') || keyItem.Key.endsWith('.mov'))
        );

        const videoData = filteredKeys.map((keyItem: KeyItem) => {
          const url = `https://dz9uj6zxn56ls.cloudfront.net/${keyItem.Key}`;
          const parts = keyItem.Key.split('/');
          const fileName = parts[parts.length - 1];
          const title = getTitleWithoutExtension(fileName); // Utiliza la nueva función
          return { url, title, key: keyItem };
        });

        const sortedVideoData = videoData.sort((a, b) =>
          extractNumberFromTitle(a.title) - extractNumberFromTitle(b.title)
        );

        setVideoData(sortedVideoData);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [keys, item]);

  const handleDoubleClick = (videoUrl: string) => {
    const videoFileName = videoUrl.split('/').pop();
    const videoId = videoFileName ? getTitleWithoutExtension(videoFileName) : '';
    const videoTitle = videoId ? cleanVideoId(videoId) : '';
    
    const params = new URLSearchParams({ videoTitle: videoTitle, videoUrl });
    router.push(`/portal/categorias/video-player?${params.toString()}`);
  };

  // Usar throttle en la función handleVideoProgress
  const throttledHandleVideoProgress = throttle(async (
    played: number,
    index: number,
    videoData: { url: string; title: string; key: KeyItem }[],
    progress: Progress[],
    setProgress: React.Dispatch<React.SetStateAction<Progress[]>>,
    userId: string
  ) => {
    const progressPercentage = played * 100;
    const { title, url } = videoData[index];

    // Verificar si el progreso ya está registrado en el estado
    const existingProgress = progress.some((pg) => pg.url === url);

    if (progressPercentage >= 90 && !existingProgress) {
      // Llamar a handleVideoProgress si el progreso no existe
      await handleVideoProgress(played, index, videoData, progress, setProgress, userId);
    }
  }, 5000);

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
        const isViewed = progress.some((pg) => pg.url === url); // Verifica si el video ha sido visto

        return (
          <div
            key={index}
            className={styles.cardContainer}
            onMouseEnter={() => setHoveredVideo(index)}
            onMouseLeave={() => setHoveredVideo(null)}
            onDoubleClick={() => handleDoubleClick(url)}
          >
            <div className={`${styles.cardContainer_01} relative`}>
              <ReactPlayer
                url={url}
                controls={hoveredVideo === index}
                width="100%"
                height="100%"
                className={styles.cardPlayer}
                playing={false}
                onPlay={() => { handlePlay(key); }}
                onProgress={({ played }) => {
                  throttledHandleVideoProgress(played, index, videoData, progress, setProgress, userId);
                }}
                config={{
                  file: {
                    attributes: {
                      onDoubleClick: () => handleDoubleClick(url),
                    },
                  },
                }}
              />
              {isViewed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md rounded-md">
                  <span className="text-white text-4xl font-bold">Visto</span>
                </div>
              )}
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
              <p className={styles.title}>{title}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default CardComponent;
