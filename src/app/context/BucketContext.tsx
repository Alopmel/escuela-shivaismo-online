'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import axios from 'axios';

type KeyItem = {
  Key: string;
  LastModified?: string;
  // Incluir aquí otras propiedades si las hay
};

interface BucketResponse {
  Contents: KeyItem[];
  // Incluir otras propiedades de la respuesta si las hay
}

interface BucketContextData {
  keys: KeyItem[];
}

const BucketContext = createContext<BucketContextData>({ keys: [] });

interface BucketProviderProps {
  children: ReactNode;
}

export const BucketProvider: React.FC<BucketProviderProps> = ({ children }) => {
  const [keys, setKeys] = useState<KeyItem[]>([]);

  useEffect(() => {
    const fetchBucketData = async () => {
      try {
        const response = await axios.get<BucketResponse>('/api/video'); // Ajustar el endpoint API según tu configuración real
        setKeys(response.data.Contents);
        console.log('Keys from bucket:', response.data.Contents);
        console.log('Keys from bucket data:', response);

      } catch (error) {
        console.error('Error fetching bucket data:', error);
        // Manejar errores aquí según tus necesidades
      }
    };

    fetchBucketData();
  }, []);

  const value = useMemo(() => ({ keys }), [keys]);

  return (
    <BucketContext.Provider value={value}>
      {children}
    </BucketContext.Provider>
  );
};

export const useBucket = () => useContext(BucketContext);
