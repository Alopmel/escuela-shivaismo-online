// /src/app/portal/ page.tsx
'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBucket } from '@/app/context/BucketContext';
import SearchCardComponent from '@/ui/portal/search/search-card-component';

const Page = () => {
  const { keys } = useBucket(); // Obtén los datos del bucket
  const [filteredVideos, setFilteredVideos] = useState<{ url: string; title: string; key: { Key: string } }[]>([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || '';

  useEffect(() => {
    if (searchTerm) {
      const upperCaseTerm = searchTerm.toUpperCase();
      const filteredKeys = keys.filter((keyItem) =>
        keyItem.Key.toUpperCase().includes(upperCaseTerm) &&
        (keyItem.Key.endsWith('.mp4') || keyItem.Key.endsWith('.mov'))
      );

      const videoData = filteredKeys.map((keyItem) => {
        const url = `https://dz9uj6zxn56ls.cloudfront.net/${keyItem.Key}`;
        const fileName = keyItem.Key.split('/').pop() || '';
        const title = fileName.replace(/\.(mp4|mov)$/i, ''); // Remueve extensión
        return { url, title, key: keyItem };
      });

      setFilteredVideos(videoData);
    }
  }, [searchTerm, keys]);

  return (
    <div>
      <h1>Resultados de la búsqueda: {searchTerm}</h1>
      <SearchCardComponent item={searchTerm} userId="" videoData={filteredVideos} />
    </div>
  );
};

export default Page;
