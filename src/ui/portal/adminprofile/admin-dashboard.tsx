"use client"

import { ChangeEvent, useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Select } from "./select";
import axios from "axios";
import styles from './AdminDashboard.module.css';
import { useBucket } from '@/app/context/BucketContext';
import { useBucketFolders } from '@/app/hooks/use-bucket-folder';
import { FolderContents } from "./folder-contents";
import { IoCloudUploadSharp } from "react-icons/io5";
import ReactPlayer from "react-player";

export function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [finalUploadMessage, setFinalUploadMessage] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [s3UploadStartTime, setS3UploadStartTime] = useState<number | null>(null);
  const [uploadInfo, setUploadInfo] = useState<{ key: string; url: string } | null>(null);
//  const { refreshBucketContents } = useBucket();
  const folders = useBucketFolders();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadStatus("");
      setFinalUploadMessage([]);
      setUploadProgress(0);
      setUploadInfo(null);
      setVideoKey(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus("Iniciando carga de video...");
    setUploadProgress(0);
    setUploadInfo(null);
    setVideoKey(null);
    setFinalUploadMessage([]);

    let fileName = customName || file.name;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && (fileExtension === 'mp4' || fileExtension === 'mov')) {
      if (!fileName.endsWith(`.${fileExtension}`)) {
        fileName += `.${fileExtension}`;
      }
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      formData.append('fileType', file.type);
      formData.append('folder', newFolder || selectedFolder);
      formData.append('customName', fileName);

      console.log('Datos a enviar:', {
        fileName,
        fileType: file.type,
        folder: newFolder || selectedFolder,
        customName: fileName
      });

      const response = await axios.post("https://n5x3uutny0.execute-api.eu-west-2.amazonaws.com/upload", 
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
            setUploadProgress(percentCompleted);
            setUploadStatus(`Iniciando carga de video...${percentCompleted}%`);
            if (percentCompleted === 100) {
              setUploadStatus("Iniciando carga a S3...");
              setS3UploadStartTime(Date.now());
              console.log('Cambiado')
            }
          },
        }
      );

      setVideoKey(response.data.data.key);
      setUploadInfo({
        key: response.data.data.key,
        url: response.data.data.url
      });
      setFinalUploadMessage([
        "Carga a S3 completada.",
        `Carpeta: ${newFolder || selectedFolder}`,
        `Nombre del video: ${fileName}`
      ]);
      //await refreshBucketContents();
    } catch (error) {
      console.error("Error al subir el video:", error);
      setFinalUploadMessage(["Error al subir el video"]);
    } finally {
      setUploading(false);
      setS3UploadStartTime(null);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (s3UploadStartTime) {
      timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - s3UploadStartTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        setUploadStatus(`Cargando a S3... ${minutes}m ${seconds}s`);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [s3UploadStartTime]);

  return (
    <main className={styles.dashboard}>
      <h1 className={styles.title}>Panel de admin</h1>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            className={styles.fileInput}
            id="fileInput"
          />
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            {file ? file.name : "Ningún video seleccionado"}
            <IoCloudUploadSharp className={styles.uploadIcon} />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <Select
            options={folders}
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            placeholder="Selecciona una carpeta"
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
            placeholder="Nombre personalizado del video"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <Button onClick={handleUpload} disabled={uploading || !file} className={styles.uploadButton}>
            {uploading ? uploadStatus : "Subir Video"}
          </Button>
        </div>
      </div>
      {uploading && (
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBar} 
            style={{width: `${uploadProgress}%`}}
          ></div>
        </div>
      )}
      {(uploadInfo || finalUploadMessage.length > 0) && (
        <div className={styles.uploadInfo}>
          <h3>Información de carga:</h3>
          {finalUploadMessage.length > 0 ? (
            finalUploadMessage.map((line, index) => (
              <p key={index}>{line}</p>
            ))
          ) : (
            <p>{uploadStatus}</p>
          )}
        </div>
      )}
      {selectedFolder && <FolderContents folder={selectedFolder} />}
      {videoKey && (
        <div className={styles.playerWrapper}>
          <ReactPlayer
            url={`https://dz9uj6zxn56ls.cloudfront.net/${videoKey}`}
            controls={true}
            width="100%"
            height="100%"
            className={styles.previewVideo}
          />
        </div>
      )}
    </main>
  );
}