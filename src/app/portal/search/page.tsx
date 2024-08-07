'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBucket } from '@/app/context/BucketContext';
import { useUser } from '@/app/context/UserContext'; // Importa useUser
import SearchCardComponent from '@/ui/portal/search/search-card-component';

const Page = () => {
  const { keys } = useBucket(); // Obtén los datos del bucket
  const [filteredVideos, setFilteredVideos] = useState<{ url: string; title: string; key: { Key: string } }[]>([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || '';

  const { userId, loading } = useUser(); // Usa useUser para obtener userId

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

  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga si los datos del usuario todavía se están cargando
  }

  return (
    <div>
      <h1 className='mt-28 md:mt-32 text-[31px] md:text-[41px] ml-12 md:ml-20 text-white'>Resultados de la búsqueda: {searchTerm}</h1>
      <SearchCardComponent userId={userId || ''} videoData={filteredVideos} />
    </div>
  );
};

export default Page;
