import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBucket } from '@/app/context/BucketContext';

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
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 1000,  // Asegúrate de que este valor sea mayor que el z-index de otros elementos
      }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            fontSize: '1rem',
            outline: 'none',
            flex: '1',  // Permite que el input ocupe el espacio disponible
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            border: '2px solid #ffffff',
            background: 'transparent',
            color: '#ffffff',
            fontSize: '1rem',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
