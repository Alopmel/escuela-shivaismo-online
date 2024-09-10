import React from 'react';
import { Skeleton } from '../../components/ui/skeleton';

const SkeletonCard: React.FC = () => {
  const array = new Array(8).fill(null);
  return (
    <div className="flex flex-col p-4 space-y-4 max-w-sm mx-auto bg-gray-800 rounded-md overflow-hidden shadow-lg">
      {/* Contenedor del video */}
      {array.map((_, i) => (
        <div key={i} className="relative w-full h-40 bg-gray-600 rounded-md">
          <Skeleton className="w-full h-full" />
          {/* Añade un fondo de color gris para imitar el video */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      ))}
      {/* Información del video */}
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-6 w-3/4 bg-gray-500" />
        <Skeleton className="h-4 w-1/2 bg-gray-500" />
      </div>
    </div>
  );
};

export default SkeletonCard;