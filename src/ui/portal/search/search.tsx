// src/ui/portal/search/Search.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBucket } from '@/app/context/BucketContext';
import { IoSearchCircleOutline } from "react-icons/io5"; // Import the search icon

const Search: React.FC = () => {
  const { keys } = useBucket(); // Obtén los datos del bucket
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const handleSearch = () => {
    // Redirige a la página de resultados con el término de búsqueda como parámetro
    const params = new URLSearchParams({ searchTerm });
    router.push(`/portal/search?${params.toString()}`);
  };

  return (
    <div className="fixed top-[41rem] sm:top-4 right-4 p-4 flex items-center gap-2 z-50">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[211px] sm:w-auto p-2 sm:p-4 rounded-lg border-none bg-white/10 backdrop-blur-md text-white text-sm sm:text-base outline-none flex-1"
      />
      <button
        onClick={handleSearch}
        className="flex items-center justify-center p-2 rounded-lg border-none bg-transparent text-white text-2xl cursor-pointer outline-none transition duration-300 ease-in-out hover:bg-white/10"
      >
        <IoSearchCircleOutline />
      </button>
    </div>
  );
};

export default Search;
