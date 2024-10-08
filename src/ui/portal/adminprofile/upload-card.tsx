import React from 'react';
import { Card, CardHeader, CardBody, Button, CircularProgress } from "@nextui-org/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import styles from './AdminDashboard.module.css';

interface UploadCardProps {
  fileName: string;
  customName: string;
  folder: string;
  uploadProgress: number;
  onCancel: () => void;
}

const UploadCard: React.FC<UploadCardProps> = ({ fileName, customName, folder, uploadProgress, onCancel }) => {
  const isCompleted = uploadProgress === 100;
  const displayName = customName || fileName;

  return (
    <Card className={`${styles.uploadCard} ${styles.fadeInUp}`}>
      <CardHeader className="pb-0 pt-1 px-2 flex-col items-start">
        <h4 className={`${styles.cardTitle} font-bold text-small w-full`}>{displayName}</h4>
        <p className={`${styles.cardSubtitle} text-tiny text-default-500`}>Carpeta: {folder}</p>
      </CardHeader>
      <CardBody className={`${styles.cardBody} py-2`}>
        {isCompleted ? (
          <IoCheckmarkCircle 
            className={`w-20 h-20 text-[#00d1d1] drop-shadow-[0_0_2px_#00d1d1] ${styles.checkIcon}`}
            aria-label="Carga completada"
          />
        ) : (
          <CircularProgress
            aria-label="Progreso de carga"
            size="lg"
            value={uploadProgress}
            color="primary"
            showValueLabel={true}
            classNames={{
              svg: "w-20 h-20",
              indicator: "stroke-[#00d1d1] drop-shadow-[0_0_2px_#00d1d1] transition-all",
              track: "stroke-white/10",
              value: "text-xl font-semibold text-white drop-shadow-[0_0_2px_#ffffff]",
            }}
          />
        )}
        {!isCompleted && (
          <Button
            className={`${styles.uploadButtonCard} mt-2`}
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default UploadCard;