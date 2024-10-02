import React, { useMemo, useState } from 'react';
import { useBucket } from '@/app/context/BucketContext';
import styles from './AdminDashboard.module.css';
import { Button } from './button';

interface FolderContentsProps {
  folder: string;
}

export const FolderContents: React.FC<FolderContentsProps> = ({ folder }) => {
  const { keys } = useBucket();
  const [isOpen, setIsOpen] = useState(false);

  const folderContents = useMemo(() => {
    const contents = keys.filter(item => item.Key.startsWith(folder));
    return contents.sort((a, b) => {
      const aNum = parseInt(a.Key.split('/').pop()?.split('.')[0] || '0');
      const bNum = parseInt(b.Key.split('/').pop()?.split('.')[0] || '0');
      return aNum - bNum;
    }).slice(0, 10); // Limitar a los 10 primeros elementos
  }, [keys, folder]);

  return (
    <div className={`${styles.folderContents} ${isOpen ? styles.open : ''}`}>
      <div className={styles.folderHeader}>
        <h2>Contenido de la carpeta: {folder}</h2>
        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          className={styles.folderToggle}
        >
          {isOpen ? '▲' : '▼'}
        </Button>
      </div>
      <div className={styles.folderContentsList}>
        {folderContents.length > 0 ? (
          <ul>
            {folderContents.map((item) => (
              <li key={item.Key}>{item.Key.split('/').pop()}</li>
            ))}
          </ul>
        ) : (
          <p>No hay archivos en esta carpeta.</p>
        )}
      </div>
    </div>
  );
};