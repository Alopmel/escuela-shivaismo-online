import React, { useEffect, useState } from 'react';
import { useBucket } from '@/app/context/BucketContext';
import ReactPlayer from 'react-player';
import { FaRegHeart, FaHeart, FaRegClock, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import { v4 as uuidv4 } from 'uuid';
import styles from './cardComponente.module.css';
import axios from 'axios';
import { Favorite, WatchLater } from '@/app/types/types';
import { useRouter } from 'next/navigation';

interface CardComponentProps {
  item: string;
  search: string;
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

// Utilidad para extraer número de título
const extractNumberFromTitle = (title: string): number => {
  const match = title.match(/\d+/g);
  return match ? parseInt(match[0], 10) : 0;
};

// Nueva función para extraer el título sin la extensión del archivo
const getTitleWithoutExtension = (fileName: string): string => {
  return fileName.replace(/\.(mp4|mov)$/i, ''); // Reemplaza .mp4 o .mov con cadena vacía
};

const CardComponent: React.FC<CardComponentProps> = ({ item, userId }) => {
  const { keys } = useBucket();
  const [videoData, setVideoData] = useState<{ url: string; title: string; key: KeyItem }[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const { favorites, setFavorites } = useFavorites();
  const { watchLater, setWatchLater } = useWatchLater();
  
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

  const handleFavoriteToggle = async (index: number, isFavorite: boolean) => {
    const { title, url } = videoData[index];
    const favorite = favorites.find((fav) => fav.videoTitle === title);

    if (isFavorite && favorite) {
      // Remove from favorites
      try {
        await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${favorite.videoId}`);
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.videoId !== favorite.videoId));
      } catch (error) {
        console.error('Error removing video from favorites:', error);
      }
    } else if (!isFavorite) {
      // Add to favorites
      const newFavorite: Favorite = {
        id: uuidv4(),
        userId,
        videoId: uuidv4(),
        category: 'favorites',
        videoTitle: title,
        url,
        creationDate: new Date().toISOString(),
        lastView: null,
      };

      try {
        await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newFavorite);
        setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
      } catch (error) {
        console.error('Error adding video to favorites:', error);
      }
    }
  };

  const handleWatchLaterToggle = async (index: number, isWatchLater: boolean) => {
    const { title, url } = videoData[index];
    const watchLaterItem = watchLater.find((wl) => wl.videoTitle === title);

    if (isWatchLater && watchLaterItem) {
      // Remove from watch later
      try {
        await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${watchLaterItem.videoId}`);
        setWatchLater((prevWatchLater) => prevWatchLater.filter((watch) => watch.videoId !== watchLaterItem.videoId));
      } catch (error) {
        console.error('Error removing video from "Watch Later":', error);
      }
    } else if (!isWatchLater) {
      // Add to watch later
      const newWatchLater: WatchLater = {
        id: uuidv4(),
        userId,
        videoId: uuidv4(),
        category: 'watchlater',
        videoTitle: title,
        url,
        creationDate: new Date().toISOString(),
        lastView: null,
      };

      try {
        await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newWatchLater);
        setWatchLater((prevWatchLater) => [...prevWatchLater, newWatchLater]);
      } catch (error) {
        console.error('Error adding video to "Watch Later":', error);
      }
    }
  };

  const handlePlay = async (key: KeyItem) => {
    const videoId = encodeURIComponent(key.Key); // Codifica el videoId para usarlo en la URL
    console.log('Playing video key:', videoId); // Mostrar solo el nombre del archivo

    if (!videoId) {
      console.error('Error: videoId is empty');
      return;
    }

    // Ajusta la URL sin parámetros
    const url = `https://xe6258whge.execute-api.eu-west-2.amazonaws.com/recommended/${videoId}`; // El {id} se reemplaza con el valor correcto en Lambda

    try {
      const response = await axios.get(url);
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating video views:', error);
      throw error;
    }
  };

  const handleDoubleClick = (videoUrl: string) => {
    console.log('Video URL:', videoUrl); // Mostrar URL en consola
    const videoFileName = videoUrl.split('/').pop();
    const videoId = videoFileName ? getTitleWithoutExtension(videoFileName) : ''; // Utiliza la nueva función
    const params = new URLSearchParams({ videoUrl: videoId });
    router.push(`/portal/categorias/video-player?${params.toString()}`);
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
                onPlay={() => handlePlay(key)}
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
                <div className={styles.cardIcon} onClick={() => handleFavoriteToggle(index, isFavorite)}>
                  {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </div>
                <div className={styles.cardIcon} onClick={() => handleWatchLaterToggle(index, isWatchLater)}>
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
