'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBucket } from '@/app/context/BucketContext';
import { IoSearchCircleOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

const Search: React.FC = () => {
  const { keys } = useBucket();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const params = new URLSearchParams({ searchTerm });
      router.push(`/portal/search?${params.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // Espera que la animación de cierre del input termine antes de cambiar el estado
  };

  return (
    <div className="fixed top-[1.4rem] sm:top-4 right-4 p-4 flex items-center gap-2 z-50 .no-select">
      <div className="relative flex items-center">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isClicked ? 0 : 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute z-10"
        >
          <IoSearchCircleOutline
            className="w-[50px] h-[50px] cursor-pointer"
            style={{ 
              color: '#00d1d1',
              filter: 'drop-shadow(0 0 3px #00d1d1) drop-shadow(0 0 5px #00d1d1)',
              textShadow: '0 0 3px #00d1d1, 0 0 5px #00d1d1'
            }}
            onClick={handleClick}
          />
        </motion.div>

        <motion.input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isClicked ? '150px' : 0, opacity: isClicked ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`w-36 h-7 pl-12 p-2 text-[#00d1d1] border-2 rounded-full border-sky-200 shadow-[0_0_2px_#d8feff,inset_0_0_2px_#b2e8f1,0_0_4px_#00d1d1,0_0_8px_#00d1d1,0_0_12px_#00d1d1] placeholder-[#00d1d1] bg-white/10 backdrop-blur-lg ${isClicked ? 'ml-8' : ''}`}
          style={{
            transformOrigin: 'right center', // Alinea la expansión desde la derecha
          }}
        />

        {isClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute right-3 cursor-pointer z-10"
          >
            <IoSearchCircleOutline
              onClick={handleSearch}
              className="text-3xl"
              style={{ color: '#00d1d1' }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
