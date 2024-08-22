'use client';
import React, { useEffect, useState } from 'react';
import { useBucket } from '@/app/context/BucketContext';
import {
  extractNumberFromTitle,
  getTitleWithoutExtension,
} from '@/utils/videoUtils';
import VideoRender from './video-Render';
interface CardComponentProps {
  item: string;
  userId: string;
}

type KeyItem = {
  Key: string;
  LastModified?: string;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
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
          const title = getTitleWithoutExtension(fileName);
          return { url, title, key: keyItem }; // Aquí pasamos todo el key
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

  return (
    <VideoRender videoData={videoData} userId={userId} />
  );
};

export default CardComponent;
