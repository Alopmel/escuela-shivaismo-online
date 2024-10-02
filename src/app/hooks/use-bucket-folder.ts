import { useState, useEffect } from 'react';
import { useBucket } from '../context/BucketContext';

export const useBucketFolders = () => {
  const { keys } = useBucket();
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    const extractFolders = () => {
      if (!keys || keys.length === 0) {
        return;
      }

      const uniqueFolders = Array.from(new Set(
        keys.map(item => {
          if (!item || !item.Key) {
            return '';
          }
          const parts = item.Key.split('/');
          return parts.length > 1 ? parts[0] : '';
        }).filter(Boolean)
        
      ));

      setFolders(uniqueFolders.sort());
    };

    extractFolders();
  }, [keys]);

  return folders;
};