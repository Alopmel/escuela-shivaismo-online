// src/ui/portal/userprofile/LatestUpload.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { getLatestUploads } from '@/lib/latestUpload';
import VideoRender from '../categorias/video-Render';
import { useBucket } from '@/app/context/BucketContext';
import { useUser } from '@/app/context/UserContext';
import { formatTitle } from '@/utils/videoUtils';

interface Video {
  id: string;
  videoId: string;
  title: string;
  category: string;
  totalViews: number;
}

const LatestUpload: React.FC = () => {
  const { keys } = useBucket(); // Obtener las claves del bucket
  const { userId, loading } = useUser();
  const [latestUploads, setLatestUploads] = useState<Video[]>([]);
  const [loadingLatestUploads, setLoadingLatestUploads] = useState<boolean>(true);

  useEffect(() => {
    if (loading || !userId) return;

    const fetchLatestUploads = async () => {
      try {
        if (keys && keys.length > 0) {
          const uploads = getLatestUploads(keys);
          // Mapea los `KeyItem` a objetos `Video`, puedes ajustar esto según tu estructura
          const videos = uploads.map((item) => ({
            id: item.Key,
            videoId: item.Key, // Ajusta esto si `videoId` es diferente
            title: item.Key,  // Ajusta esto si `title` es diferente
            category: 'unknown', // Ajusta esto si `category` es diferente
            totalViews: 0,     // Ajusta esto si `totalViews` es necesario
          }));
          setLatestUploads(videos);
        } else {
          console.warn('No keys available to fetch latest uploads.');
        }
      } catch (error) {
        console.error('Error fetching latest uploads:', error);
      } finally {
        setLoadingLatestUploads(false);
      }
    };

    fetchLatestUploads();
  }, [userId, loading, keys]);

  if (loadingLatestUploads) return <p>Loading latest uploads...</p>;
  if (!userId) return null;

  return (
    <div className="latest-uploads-videos">
      <VideoRender 
        videoData={latestUploads.map(video => ({
          url: `https://dz9uj6zxn56ls.cloudfront.net/${video.videoId}`, // Cambia la URL según sea necesario
          title:  formatTitle(video.title) ,
          key: { Key: video.videoId }
        }))}
        userId={userId}
      />
    </div>
  );
};

export default LatestUpload;
