import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import styles from './AdminDashboard.module.css';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <p>Cargando reproductor...</p>
});

interface UploadRenderProps {
  fileName: string;
  customName: string;
  folder: string;
  url: string;
}

const UploadRender: React.FC<UploadRenderProps> = ({ fileName, customName, folder, url }) => {
  const displayName = customName || fileName;

  return (
    <Card className={`${styles.uploadRender} ${styles.fadeInUp}`}>
      <CardBody className={`${styles.uploadRenderBody} ${styles.customCardBody}`}>
        <div className={styles.uploadRenderContent}>
          <div className={styles.playerContainer}>
            {url ? (
              <ReactPlayer
                url={url}
                className={styles.reactPlayer}
                height="100%"
                width="100%"
                controls
              />
            ) : (
              <div className={styles.noUrlAvailable}>
                No hay URL disponible
              </div>
            )}
          </div>

          <div className={styles.infoContainer}>
            <p className={styles.infoItem}>
              <span className={styles.infoLabel}>Nombre:</span>
              <span className={styles.infoValue}>{displayName}</span>
            </p>
            <p className={styles.infoItem}>
              <span className={styles.infoLabel}>Carpeta:</span>
              <span className={styles.infoValue}>{folder}</span>
            </p>
            <p className={styles.infoItem}>
              <span className={styles.infoLabel}>URL:</span>
              <a href={url} target="_blank" rel="noopener noreferrer" className={styles.urlLink}>
                {url}
              </a>
            </p>
            <p className={styles.infoItem}>
              <span className={styles.infoLabel}>Estado:</span>
              <span className={styles.infoValue}>Subido Correctamente</span>
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UploadRender;