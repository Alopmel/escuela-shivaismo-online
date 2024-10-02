'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import axios from 'axios';

export type KeyItem = {
  Key: string;
  LastModified?: string;
};

interface BucketResponse {
  Contents: KeyItem[];
}

interface BucketContextData {
  keys: KeyItem[];
  refreshBucketContents: () => Promise<void>;
}

const BucketContext = createContext<BucketContextData>({ 
  keys: [],
  refreshBucketContents: async () => {}
});

interface BucketProviderProps {
  children: ReactNode;
}

export const BucketProvider: React.FC<BucketProviderProps> = ({ children }) => {
  const [keys, setKeys] = useState<KeyItem[]>([]);

  const fetchBucketData = async () => {
    try {
      const response = await axios.get<BucketResponse>('/api/video');
      setKeys(response.data.Contents);
    } catch (error) {
      console.error('Error fetching bucket data:', error);
    }
  };

  useEffect(() => {
    fetchBucketData();
  }, []);

  const refreshBucketContents = async () => {
    await fetchBucketData();
    console.log('Cambiado')
  };

  const value = useMemo(() => ({ keys, refreshBucketContents }), [keys]);

  return (
    <BucketContext.Provider value={value}>
      {children}
    </BucketContext.Provider>
  );
};

export const useBucket = () => useContext(BucketContext);