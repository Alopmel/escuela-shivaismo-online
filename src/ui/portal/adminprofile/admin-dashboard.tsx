"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Select } from "./select";
import styles from './AdminDashboard.module.css';
import { useBucketFolders } from '@/app/hooks/use-bucket-folder';
import { FolderContents } from "./folder-contents";
import { IoCloudUploadSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import AWS from 'aws-sdk';
import Image from 'next/image';

const BUCKET_NAME = "videos-tantra-shivaita";

export function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [uploadInfo, setUploadInfo] = useState<{ key: string; url: string; size: number; type: string } | null>(null);
  const folders = useBucketFolders();
  const [error, setError] = useState<string | null>(null);
  const [refreshFolderContents, setRefreshFolderContents] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadStatus("");
      setUploadProgress(0);
      setUploadInfo(null);
      setVideoKey(null);
      console.log("Archivo seleccionado:", e.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("No se puede iniciar la carga. No se ha seleccionado ningún archivo.");
      return;
    }

    setUploading(true);
    setUploadStatus("Preparando archivo para subir...");
    setUploadProgress(0);
    setUploadInfo(null);
    setVideoKey(null);

    let fileName = customName || file.name;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && !fileName.endsWith(`.${fileExtension}`)) {
      fileName += `.${fileExtension}`;
    }
    const fileType = file.type;
    const actualFolderName = newFolder || selectedFolder || 'default';
    const Key = `${actualFolderName}/${fileName}`;

    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REGION,
      signatureVersion: 'v4',
    });

    try {
      setUploadStatus("Subiendo al BucketS3...0%");
      let totalProgress = 0;

      const createMultipartUploadResponse = await s3
        .createMultipartUpload({
          Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME || '',
          Key,
          ContentType: fileType,
        })
        .promise();

      const uploadId = createMultipartUploadResponse.UploadId;

      const chunkSize = 5 * 1024 * 1024;
      const numParts = Math.ceil(file.size / chunkSize);

      const uploadPromises = [];

      for (let i = 0; i < numParts; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const partNumber = i + 1;

        const partParams = {
          Bucket: BUCKET_NAME,
          Key,
          PartNumber: partNumber,
          UploadId: uploadId,
          Body: file.slice(start, end),
        };

        const uploadPromise = s3.uploadPart(partParams as AWS.S3.UploadPartRequest).promise();
        uploadPromises.push(uploadPromise);

        uploadPromise.then(() => {
          totalProgress += (1 / numParts) * 100;
          const progress = Math.min(totalProgress, 100).toFixed(2);
          setUploadProgress(Number(progress));
          setUploadStatus(`Subiendo al BucketS3...${progress}%`);
        });
      }

      const uploadedParts = await Promise.all(uploadPromises);

      const completeParams = {
        Bucket: BUCKET_NAME,
        Key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadedParts.map((part, index) => ({
            ETag: part.ETag,
            PartNumber: index + 1,
          })),
        },
      };
      if (uploadId) {
        await s3.completeMultipartUpload(completeParams as AWS.S3.CompleteMultipartUploadRequest).promise();

        setUploadStatus("Carga completa");
        setVideoKey(Key);
        setUploadInfo({ 
          key: Key, 
          url: `https://dz9uj6zxn56ls.cloudfront.net/${Key}`,
          size: file.size,
          type: file.type
        });
        setRefreshFolderContents(prev => prev + 1);
      } else {
        throw new Error('UploadId es undefined');
      }
    } catch (error) {
      console.error('Error durante la carga:', error);
      setError('Ocurrió un error durante la carga. Por favor, inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const renderPreview = () => {
    if (!uploadInfo) return null;
    const fileUrl = uploadInfo.url;
    const fileType = uploadInfo.type.split('/')[0];

    switch (fileType) {
      case 'video':
        return (
          <div className={styles.playerWrapper}>
            <ReactPlayer 
              url={fileUrl} 
              controls 
              width="100%"
              height="auto"
              className={styles.reactPlayer}
            />
          </div>
        );
      case 'image':
        return (
          <div className={styles.imageWrapper}>
            <Image 
              src={fileUrl} 
              alt="Uploaded image" 
              layout="responsive"
              width={800}
              height={600}
              objectFit="contain"
            />
          </div>
        );
      case 'application':
        if (uploadInfo.type === 'application/pdf') {
          return (
            <div className={styles.pdfWrapper}>
              <iframe 
                src={`${fileUrl}#view=fit`} 
                width="100%" 
                height="600px" 
                style={{border: 'none'}}
              />
            </div>
          );
        }
        // Para otros tipos de aplicación, caer en el caso por defecto
      default:
        return (
          <div className={styles.documentWrapper}>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <Image 
                src="/document-icon.png" 
                alt="Document" 
                width={100}
                height={100}
              />
              <p>Click para abrir el documento</p>
            </a>
          </div>
        );
    }
  };

  return (
    <main className={styles.dashboard}>
      <h1 className={styles.title}>Panel de Administración</h1>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="video/*,image/*,text/*,application/pdf"
            className={styles.fileInput}
            id="fileInput"
          />
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            {file ? file.name : "Ningún archivo seleccionado"}
            <IoCloudUploadSharp className={styles.uploadIcon} />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <Select
            options={folders}
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            placeholder="Selecciona una carpeta existente"
            className={styles.select}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder="O crea una nueva carpeta"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Nombre personalizado del archivo"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <Button onClick={handleUpload} disabled={uploading || !file} className={styles.uploadButton}>
            {uploading ? uploadStatus : "Subir Archivo"}
          </Button>
        </div>
      </div>
      {uploading && (
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {uploadInfo && (
        <div className={styles.uploadInfo}>
          <h3>Información de la subida:</h3>
          <p>Estatus: {uploadStatus}</p>
          <p>Nombre del archivo: {uploadInfo.key.split('/').pop()}</p>
          <p>Carpeta: {uploadInfo.key.split('/').slice(0, -1).join('/')}</p>
          <p>Tamaño: {(uploadInfo.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>Tipo: {uploadInfo.type}</p>
          <p>URL: <a href={uploadInfo.url} target="_blank" rel="noopener noreferrer">{uploadInfo.url}</a></p>
        </div>
      )}
      
      {uploadInfo && renderPreview()}
      
      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
        </div>
      )}
      
      {selectedFolder && (
        <FolderContents folder={selectedFolder} refreshTrigger={refreshFolderContents} />
      )}
    </main>
  );
}