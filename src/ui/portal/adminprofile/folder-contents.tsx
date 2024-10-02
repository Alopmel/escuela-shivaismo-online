import React, { useMemo, useState } from 'react';
import { useBucket } from '@/app/context/BucketContext';
import styles from './AdminDashboard.module.css';

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
    }).slice(0, 10);
  }, [keys, folder]);

  const toggleOpen = () => setIsOpen(!isOpen);
  console.log('Cambiado')
  return (
    <div className={styles.folderContents}>
      <div className={styles.folderHeader} onClick={toggleOpen}>
        <h2>Contenido de la carpeta: {folder}</h2>
        <button 
          className={`${styles.folderToggle} ${isOpen ? styles.open : ''}`}
        >
          ▼
        </button>
      </div>
      <div className={`${styles.folderContentsList} ${isOpen ? styles.open : ''}`}>
        {folderContents.length > 0 ? (
          <ul>
            {folderContents.map((item) => (
              <li key={item.Key}>{item.Key.split('/').pop()}</li>
            ))}
          </ul>
        ) : (
          <p>No hay archivos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};