'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button } from "./button";
import { Input } from "./input";
import { Select } from "./select";
import styles from './AdminDashboard.module.css';
import { useBucketFolders } from '@/app/hooks/use-bucket-folder';
import { FolderContents } from "./folder-contents";
import { IoCloseCircleOutline, IoCloudUploadSharp, IoPencil } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa6";
import UploadCard from "./upload-card";
import AWS from 'aws-sdk';
import UploadRender from "./upload-render";

const BUCKET_NAME = "videos-tantra-shivaita";

export function AdminDashboard() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [customName, setCustomName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [controllers, setControllers] = useState<AbortController[]>([]);
  const folders = useBucketFolders();
  const [error, setError] = useState<string | null>(null);
  const [refreshFolderContents, setRefreshFolderContents] = useState(0);
  const [customNames, setCustomNames] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{fileName: string, customName: string, folder: string, url: string}[]>([]);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [showUploadedFiles, setShowUploadedFiles] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length > 0 && !isUploadComplete) {
      setShowUploadedFiles(true);
    } else {
      const timer = setTimeout(() => setShowUploadedFiles(false), 500);
      return () => clearTimeout(timer);
    }
  }, [uploadedFiles, isUploadComplete]);

  const resetUploadState = () => {
    setFiles([]);
    setUploading(false);
    setUploadStatus("");
    setUploadProgress([]);
    setCustomName("");
    setControllers([]);
    setError(null);
    setCustomNames([]);
    setIsUploadComplete(false);
    setUploadedFiles([]); // Añadido para limpiar los archivos subidos
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const newFiles = Array.from(fileList);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setUploadProgress(prevProgress => [
        ...prevProgress,
        ...Array(newFiles.length).fill(0)
      ]);
      setControllers(prevControllers => [
        ...prevControllers,
        ...Array(newFiles.length).fill(null)
      ]);
      setCustomNames(prevNames => [
        ...prevNames,
        ...Array(newFiles.length).fill("")
      ]);
      
      // Si la carga anterior está completa, reseteamos el estado de carga
      if (isUploadComplete) {
        setIsUploadComplete(false);
        setUploadedFiles([]);
      }
    }
  };

  const handleCustomNameChange = (index: number, name: string) => {
    setCustomNames(prev => {
      const newNames = [...prev];
      newNames[index] = name;
      return newNames;
    });
  };

  const removeFile = (index: number) => {
    if (controllers[index]) {
      controllers[index].abort();
    }
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setUploadProgress(prevProgress => prevProgress.filter((_, i) => i !== index));
    setControllers(prevControllers => prevControllers.filter((_, i) => i !== index));
    setCustomNames(prevNames => prevNames.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      //console.log("No se puede iniciar la carga. No se ha seleccionado ningún archivo.");
      return;
    }

    setUploading(true);
    setUploadStatus("Subiendo archivos...");
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REGION,
      signatureVersion: 'v4',
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let fileName = customNames[i] || file.name;
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension && !fileName.endsWith(`.${fileExtension}`)) {
        fileName += `.${fileExtension}`;
      }
      const actualFolderName = newFolder || selectedFolder || 'default';
      const Key = `${actualFolderName}/${fileName}`;
      
      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME || '',        
        Key,
        Body: file,
        ContentType: file.type,
      };

      const controller = new AbortController();
      setControllers(prev => {
        const newControllers = [...prev];
        newControllers[i] = controller;
        return newControllers;
      });

      try {
        await s3.upload(params, {
          partSize: 5 * 1024 * 1024,
          queueSize: 1,
        }).on('httpUploadProgress', (progress) => {
          const percentage = Math.round((progress.loaded / progress.total) * 100);
          setUploadProgress(prevProgress => {
            const newProgress = [...prevProgress];
            newProgress[i] = percentage;
            return newProgress;
          });
        }).promise();

        // Añadir el archivo subido a la lista de archivos subidos
        setUploadedFiles(prev => [...prev, {
          fileName: file.name,
          customName: customNames[i] || file.name,
          folder: actualFolderName,
          url: `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${Key}`
        }]);

      } catch (error) {
        if (controller.signal.aborted) {
         // console.log(`Carga de archivo ${file.name} cancelada`);
        } else {
          console.error('Error durante la carga:', error);
          setError('Ocurrió un error durante la carga. Por favor, inténtalo de nuevo.');
        }
      }
    }

    setUploading(false);
    setRefreshFolderContents(prev => prev + 1);
    setIsUploadComplete(true);
  };

  return (
    <main className={`${styles.dashboard} w-full max-w-7xl`}>
      <h1 className={styles.title}>Panel de Administración</h1>
      <div className={styles.inputWrapper}>
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
            type="file"
            onChange={handleFileChange}
            accept="video/*,image/*,text/*,application/pdf"
            className={styles.fileInput}
            id="fileInput"
            multiple
          />
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            Seleccionar archivos
            <IoCloudUploadSharp className={styles.uploadIcon} />
          </label>
        </div>

        <div className={styles.inputContainer}>
          <Input
            type="text"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder="O crea una nueva carpeta"
            className={`${styles.input} ${styles.darkInput}`}
            icon="folder-plus"
          />
        </div>

        <div className={styles.inputContainer}>
          <Input
            type="text"
            value={customName}
            onChange={(e) => {
              setCustomName(e.target.value);
              if (files.length > 0) {
                handleCustomNameChange(files.length - 1, e.target.value);
              }
            }}
            placeholder="Nombre personalizado"
            className={styles.input}
            icon="pencil"
          />
        </div>
        

        {files.length > 0 && (
          <div className={styles.fileList}>
            {files.map((file, index) => (
              <UploadCard
                key={file.name + index}
                fileName={file.name}
                customName={customNames[index]}
                folder={newFolder || selectedFolder || 'default'}
                uploadProgress={uploadProgress[index]}
                onCancel={() => removeFile(index)}
              />
            ))}
          </div>
        )}

        <div className={styles.inputContainer}>
          <Button onClick={handleUpload} disabled={uploading || files.length === 0} className={styles.uploadButton}>
            {uploading ? uploadStatus : "Subir Archivos"}
          </Button>
        </div>
      </div>
      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className={styles.uploadedFiles}>
          <h2>Archivos Subidos</h2>
          {uploadedFiles.map((file, index) => (
            <UploadRender
              key={index}
              fileName={file.fileName}
              customName={file.customName}
              folder={file.folder}
              url={file.url}
            />
          ))}
        </div>
      )}
      
      {isUploadComplete && (
        <div className={styles.uploadCompleteMessage}>
          <p>Todos los archivos se han subido correctamente.</p>
          <Button onClick={resetUploadState} className={styles.resetButton}>
            Subir más archivos
          </Button>
        </div>
      )}
      {selectedFolder && (
        <FolderContents folder={selectedFolder} refreshTrigger={refreshFolderContents} />
      )}
    </main>
  );
}