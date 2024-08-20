import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import styles from './FavoritesComponent.module.css';
import { Favorite } from '@/app/types/types';


interface FavoritesComponentProps {
  userId: string;
}

const FavoritesComponent: React.FC<FavoritesComponentProps> = ({ userId }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites/${userId}`);
        setFavorites(response.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!favorites.length) {
    return <div>No favorites found</div>;
  }

  
  return (
    <div className={styles.favoritesContainer}>
      {favorites.map((favorite) => (
        <div key={favorite.id} className={styles.videoContainer}>
          <ReactPlayer url={favorite.url} controls width="100%" height="100%" />
          <p>{favorite.videoTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesComponent;
