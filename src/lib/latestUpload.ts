// src/lib/latestUploads.ts
import { KeyItem } from '@/app/context/BucketContext'; // Asegúrate de que esta ruta esté correcta

// Función para obtener los 10 registros más recientes
export const getLatestUploads = (keys: KeyItem[]): KeyItem[] => {
  if (!keys || keys.length === 0) {
    console.warn('No keys available in the bucket context.');
    return [];
  }

  // Ordenar todos los keys por la fecha de última modificación más reciente
  const latestUploads = keys
    .sort((a, b) => {
      if (a.LastModified && b.LastModified) {
        return new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime();
      }
      return 0;
    })
    .slice(0, 10);

  console.log('Top 10 latest uploads:', latestUploads);
  return latestUploads;
};
