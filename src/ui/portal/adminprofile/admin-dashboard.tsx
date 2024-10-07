"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Select } from "./select";
import styles from './AdminDashboard.module.css';
import { useBucketFolders } from '@/app/hooks/use-bucket-folder';
import { FolderContents } from "./folder-contents";
import { IoCloudUploadSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { fetchAuthSession } from "aws-amplify/auth";
import useAuthUser from '@/app/hooks/use-auth-user';
import { AwsCredentialIdentity } from "@aws-sdk/types";

const s3Client = new S3Client({ region: "eu-west-2" });
const BUCKET_NAME = "videos-tantra-shivaita";

const ALLOWED_EMAILS = ['lempola@gmail.com', 'jjquesada.87@gmail.com'];

export function AdminDashboard() {
  const { user, loading } = useAuthUser();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [finalUploadMessage, setFinalUploadMessage] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [uploadInfo, setUploadInfo] = useState<{ key: string; url: string } | null>(null);
  const folders = useBucketFolders();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("AdminDashboard - Estado de carga:", loading);
    console.log("AdminDashboard - Usuario:", user);
  }, [user, loading]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadStatus("");
      setFinalUploadMessage([]);
      setUploadProgress(0);
      setUploadInfo(null);
      setVideoKey(null);
      console.log("Archivo seleccionado:", e.target.files[0].name);
    }
  };

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk

  const handleUpload = async () => {
    if (!file || !user) {
      console.log("No se puede iniciar la carga. Archivo:", file, "Usuario:", user);
      return;
    }
  
    setUploading(true);
    setUploadStatus("Preparando archivo para subir...");
    setUploadProgress(0);
    setUploadInfo(null);
    setVideoKey(null);
    setFinalUploadMessage([]);
  
    let fileName = customName || file.name;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && !fileName.endsWith(`.${fileExtension}`)) {
      fileName += `.${fileExtension}`;
    }
    const fileType = file.type;
    const actualFolderName = newFolder || selectedFolder || 'default';
    const Key = `${actualFolderName}/${fileName}`;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  
    console.log("Iniciando carga. Archivo:", fileName, "Carpeta:", actualFolderName);

    try {
      console.log("Obteniendo credenciales...");
      const session = await fetchAuthSession();
      const credentials = session.credentials;

      if (!credentials) {
        throw new Error("No se pudieron obtener las credenciales");
      }

      console.log("Credenciales obtenidas:", credentials);

      const credentialsProvider = async () => {
        return credentials as AwsCredentialIdentity;
      };

      s3Client.config.credentials = credentialsProvider;

      console.log("Iniciando carga multiparte...");
      const { UploadId } = await s3Client.send(new CreateMultipartUploadCommand({
        Bucket: BUCKET_NAME,
        Key,
        ContentType: fileType,
      }));

      console.log("UploadId obtenido:", UploadId);

      const uploadPromises = [];
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const uploadPartCommand = new UploadPartCommand({
          Bucket: BUCKET_NAME,
          Key,
          UploadId,
          PartNumber: i + 1,
          Body: chunk,
        });

        uploadPromises.push(
          s3Client.send(uploadPartCommand).then(response => ({
            PartNumber: i + 1,
            ETag: response.ETag,
          }))
        );

        setUploadProgress(((i + 1) / totalChunks) * 100);
      }

      console.log("Subiendo chunks...");
      const uploadResults = await Promise.all(uploadPromises);

      console.log("Chunks subidos. Finalizando carga multiparte...");
      await s3Client.send(new CompleteMultipartUploadCommand({
        Bucket: BUCKET_NAME,
        Key,
        UploadId,
        MultipartUpload: { Parts: uploadResults },
      }));

      console.log("Carga multiparte completada");
      setUploadStatus("Archivo subido con éxito");
      setFinalUploadMessage(["Archivo subido con éxito", `Nombre: ${fileName}`, `Carpeta: ${actualFolderName}`]);
      setUploadInfo({ key: Key, url: `https://${BUCKET_NAME}.s3.amazonaws.com/${Key}` });
      setVideoKey(Key);
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setUploadStatus("Error al subir el archivo");
      setError("Hubo un error al subir el archivo. Por favor, inténtalo de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    console.log("AdminDashboard - Renderizando estado de carga...");
    return <div>Cargando...</div>;
  }

  if (!user) {
    console.log("AdminDashboard - Usuario no encontrado");
    return <div>No se ha encontrado un usuario autenticado.</div>;
  }

  const isAllowedUser = user.isAdmin || ALLOWED_EMAILS.includes(user.email);

  if (!isAllowedUser) {
    console.log("AdminDashboard - Usuario no tiene permisos:", user);
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  console.log("AdminDashboard - Renderizando panel de administración para:", user);

  return (
    <main className={styles.dashboard}>
      <h1 className={styles.title}>Panel de Administración</h1>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="video/*,image/*,text/*"
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
          {uploadInfo && (
            <p>
              Archivo cargado: <a href={uploadInfo.url} target="_blank" rel="noopener noreferrer">{uploadInfo.key}</a>
            </p>
          )}
        </div>
      )}
      {videoKey && (
        <div className={styles.playerContainer}>
          <ReactPlayer url={`https://your-cloudfront-url/${videoKey}`} controls />
        </div>
      )}
      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
        </div>
      )}
    </main>
  );
}