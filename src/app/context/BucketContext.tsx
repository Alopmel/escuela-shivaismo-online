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
  error: string | null;
}

const BucketContext = createContext<BucketContextData>({ 
  keys: [],
  refreshBucketContents: async () => {},
  error: null
});

interface BucketProviderProps {
  children: ReactNode;
}

export const BucketProvider: React.FC<BucketProviderProps> = ({ children }) => {
  const [keys, setKeys] = useState<KeyItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBucketData = async () => {
    try {
      const response = await axios.get<BucketResponse>('/api/video');
      setKeys(response.data.Contents);
      setError(null);
    } catch (error) {
      console.error('Error fetching bucket data:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        setError(`Error: ${error.response?.data?.error || 'Unknown error'}`);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    fetchBucketData();
  }, []);

  const refreshBucketContents = async () => {
    await fetchBucketData();
    console.log('Bucket contents refreshed');
  };

  const value = useMemo(() => ({ keys, refreshBucketContents, error }), [keys, error]);

  return (
    <BucketContext.Provider value={value}>
      {children}
    </BucketContext.Provider>
  );
};

export const useBucket = () => useContext(BucketContext);