'use client';

import React, { useEffect, useState } from 'react';
import { useBucket } from '@/app/context/BucketContext';
import {
  extractNumberFromTitle,
  getTitleWithoutExtension,
} from '@/utils/videoUtils';
import VideoRender from './video-Render';
import ConferenceSchedule from './conference-schedule'; // Importa el componente ConferenceSchedule
import AvailableResources from './available-resources';
import WelcomePlayer from './welcome-player';
import TextRenderer from './text-render';
import BookRenderer from './book-render'; // Importa el componente BookRenderer

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
        // console.log('Item:', item); // Verificar que el item es correcto
        const upperCaseItem = item.toUpperCase();
        // console.log('UpperCase Item:', upperCaseItem); // Verificar la conversión a mayúsculas

        const filteredKeys = keys.filter((keyItem: KeyItem) => {
          const parts = keyItem.Key.split('/'); // Separa la categoría del resto
          const category = parts[0].toUpperCase(); // Convierte la categoría a mayúsculas
          const matches = category === upperCaseItem &&
            (keyItem.Key.endsWith('.mp4') || keyItem.Key.endsWith('.mov'));
          
          // console.log(`Category: ${category}, Key: ${keyItem.Key}, Matches: ${matches}`); // Verificar si la clave coincide con el filtro
          return matches;
        });

        // console.log('Filtered Keys:', filteredKeys); // Verificar las claves filtradas

        const videoData = filteredKeys.map((keyItem: KeyItem) => {
          const url = `https://dz9uj6zxn56ls.cloudfront.net/${keyItem.Key}`;
          const parts = keyItem.Key.split('/');
          const fileName = parts[parts.length - 1];
          const title = getTitleWithoutExtension(fileName);
          // console.log(`URL: ${url}, Title: ${title}`); // Verificar la URL y el título generados
          return { url, title, key: keyItem }; // Aquí pasamos todo el key
        });

        const sortedVideoData = videoData.sort((a, b) =>
          extractNumberFromTitle(a.title) - extractNumberFromTitle(b.title)
        );

        // console.log('Sorted Video Data:', sortedVideoData); // Verificar los datos ordenados

        setVideoData(sortedVideoData);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [keys, item]);

  return (
    <div style={{ userSelect: 'none' }}> {/* Desactiva la selección de texto */}
      {item === 'Fechas conferencias y recursos' ? (
        <>
          <WelcomePlayer />
          <ConferenceSchedule />
          <AvailableResources />
        </>
      ) : item === 'Textos en PDF' ? (
        <TextRenderer /> 
      ) : item === 'Libros Recomendados' ? (
        <BookRenderer />
      ) : (
        <VideoRender videoData={videoData} userId={userId} />
      )}
    </div>
  );
};

export default CardComponent;
