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

interface CardComponentProps {
  item: string;
  search: string;
  userId: string;
}

type KeyItem = {
  Key: string;
};

const pageTransition = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const extractNumberFromTitle = (title: string): number => {
  const match = title.match(/\d+/g);
  return match ? parseInt(match[0], 10) : 0;
};

const CardComponent: React.FC<CardComponentProps> = ({ item, userId, search }) => {
  const { keys } = useBucket();
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [videoTitles, setVideoTitles] = useState<string[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const { favorites, setFavorites } = useFavorites();
  const { watchLater, setWatchLater } = useWatchLater();
  const [filteredKeys, setFilteredKeys] = useState<KeyItem[]>([]);

  useEffect(() => {
    if (!item) return;

    const fetchVideoData = () => {
      try {
        const upperCaseItem = item.toUpperCase();
        const filteredKey = keys.filter((keyItem: KeyItem) => keyItem.Key.includes(upperCaseItem));
        const filteredKeys = filteredKey.filter((keyItem: KeyItem) => keyItem.Key.includes('.mp4'));
        const urls = filteredKeys.map((keyItem: KeyItem) => `https://dz9uj6zxn56ls.cloudfront.net/${keyItem.Key}`);
        const titles = filteredKeys.map((keyItem: KeyItem) => {
          const parts = keyItem.Key.split('/');
          return parts[parts.length - 1].replace('.mp4', '');
        });

        const sortedVideos = titles
          .map((title, index) => ({ title, url: urls[index], keyItem: filteredKeys[index] }))
          .sort((a, b) => extractNumberFromTitle(a.title) - extractNumberFromTitle(b.title));

        setVideoUrls(sortedVideos.map((video) => video.url));
        setVideoTitles(sortedVideos.map((video) => video.title));
        setFilteredKeys(sortedVideos.map((video) => video.keyItem));
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [keys, item]);

  const findWatchLaterByTitle = (title: string): string | null | undefined => {
    const watchLaterItem = watchLater.find((wl) => wl.videoTitle === title);
    return watchLaterItem ? watchLaterItem.videoId : null;
  };

  const handleFavoriteClick = async (index: number) => {
    const videoTitle = videoTitles[index];
    const videoId = findWatchLaterByTitle(videoTitle);

    if (videoId) {
      try {
        await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${videoId}`);
        setFavorites(prevFavorites => prevFavorites.filter(fav => fav.videoId !== videoId));
      } catch (error) {
        console.error('Error al eliminar video de favoritos:', error);
      }
    } else {
      const url = videoUrls[index];
      const currentDate = new Date().toISOString();
      const newFavorite: Favorite = {
        id: uuidv4(),
        userId,
        videoId: uuidv4(),
        category: 'favorites',
        videoTitle,
        url,
        creationDate: currentDate,
        lastView: null,
      };

      try {
        await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newFavorite);
        setFavorites(prevFavorites => [...prevFavorites, newFavorite]);
      } catch (error) {
        console.error('Error al agregar video a favoritos:', error);
      }
    }
  };

  const handleWatchLaterClick = async (index: number) => {
    const videoTitle = videoTitles[index];
    const videoId = findWatchLaterByTitle(videoTitle);

    if (videoId) {
      try {
        await axios.delete(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${videoId}`);
        setWatchLater(prevWatchLater => prevWatchLater.filter(watch => watch.videoId !== videoId));
      } catch (error) {
        console.error('Error al eliminar video de "Ver más tarde":', error);
      }
    } else {
      const url = videoUrls[index];
      const currentDate = new Date().toISOString();
      const newWatchLater: WatchLater = {
        id: uuidv4(),
        userId,
        videoId: uuidv4(),
        category: 'watchlater',
        videoTitle,
        url,
        creationDate: currentDate,
        lastView: null,
      };

      try {
        await axios.put('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites', newWatchLater);
        setWatchLater(prevWatchLater => [...prevWatchLater, newWatchLater]);
      } catch (error) {
        console.error('Error al agregar video a "Ver más tarde":', error);
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}
    >
      {videoUrls.map((url, index) => {
        const isFavorite = favorites.some((fav) => fav.url === url);
        const isWatchLater = watchLater.some((wl) => wl.url === url);
        return (
          <div
            key={index}
            className={styles.cardContainer}
            onMouseEnter={() => setHoveredVideo(index)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <div className={styles.cardContainer_01}>
              <ReactPlayer url={url} controls={hoveredVideo === index} width="100%" height="100%" className={styles.cardPlayer} />
            </div>
            {(hoveredVideo === index || isFavorite || isWatchLater) && (
              <div className={styles.cardIcons}>
                <div className={styles.cardIcon} onClick={() => handleFavoriteClick(index)}>
                  {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </div>
                <div className={styles.cardIcon} onClick={() => handleWatchLaterClick(index)}>
                  {isWatchLater ? <FaClock size={24} /> : <FaRegClock size={24} />}
                </div>
              </div>
            )}
            <div>
              <p className={styles.title}>{videoTitles[index]}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default CardComponent;
