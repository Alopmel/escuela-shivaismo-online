'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo , useCallback} from 'react';
import axios from 'axios';

export type KeyItem = {
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
  refreshKeys: () => Promise<void>;
}

const BucketContext = createContext<BucketContextData>({ 
  keys: [], 
  refreshKeys: async () => {} 
});

interface BucketProviderProps {
  children: ReactNode;
}

export const BucketProvider: React.FC<BucketProviderProps> = ({ children }) => {
  const [keys, setKeys] = useState<KeyItem[]>([]);


  const fetchBucketData = async () => {
    try {
      const response = await axios.get<BucketResponse>('/api/video'); // Ajustar el endpoint API según tu configuración real
      setKeys(response.data.Contents);
    } catch (error) {
      console.error('Error fetching bucket data:', error);
      // Manejar errores aquí según tus necesidades
    }
  };

  useEffect(() => {
    fetchBucketData();
  }, []);

  const refreshKeys = useCallback(async () => {
    await fetchBucketData();
  }, []);

  const value = useMemo(() => ({ keys, refreshKeys }), [keys, refreshKeys]);
  return (
    <BucketContext.Provider value={value}>
      {children}
    </BucketContext.Provider>
  );
};

export const useBucket = () => useContext(BucketContext);