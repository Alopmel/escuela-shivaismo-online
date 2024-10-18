'use client'
import { useState } from 'react';
import AWS from 'aws-sdk';
import { useBucket } from '@/app/context/BucketContext'; // Importar el contexto

interface VideoUploaderProps {
  bucketName: string; // El nombre del bucket S3
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ bucketName }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [folder, setFolder] = useState<string>(''); // Carpeta en S3
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Progreso de subida
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const { refreshKeys } = useBucket(); // Obtener la función refreshKeys

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(event.target.value);
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolder(event.target.value);
  };

  const handleUpload = async () => {
    if (!videoFile || !videoTitle || !folder) {
      alert('Por favor, selecciona un video, ingresa un título y especifica una carpeta.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    // Configura AWS S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REGION,
      signatureVersion: 'v4',
    });

    try {
      // Nombre del archivo en S3 con el título y la carpeta especificada
      const fileName = `${folder}/${videoTitle}.${videoFile.name.split('.').pop()}`;

      // Crear multipart upload
      const createMultipartUploadResponse = await s3
        .createMultipartUpload({
          Bucket: bucketName,
          Key: fileName,
          ContentType: videoFile.type,
        })
        .promise();

      const uploadId = createMultipartUploadResponse.UploadId;

      // Configuración para dividir el archivo en partes (5MB mínimo por parte)
      const chunkSize = 5 * 1024 * 1024; // 5MB
      const numParts = Math.ceil(videoFile.size / chunkSize);

      const uploadPromises = [];

      for (let i = 0; i < numParts; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, videoFile.size);
        const partNumber = i + 1;

        const partParams = {
          Bucket: bucketName,
          Key: fileName,
          PartNumber: partNumber,
          UploadId: uploadId,
          Body: videoFile.slice(start, end),
        };

        const uploadPromise = s3.uploadPart(partParams as AWS.S3.UploadPartRequest).promise();
        uploadPromises.push(uploadPromise);

        // Actualiza el progreso de subida
        uploadPromise.then(() => {
          const progress = ((partNumber / numParts) * 100).toFixed(2);
          setUploadProgress(Number(progress));
        });
      }

      // Espera a que todas las partes se suban
      const uploadedParts = await Promise.all(uploadPromises);

      // Completar la subida multipart
      const completeParams = {
        Bucket: bucketName,
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadedParts.map((part, index) => ({
            ETag: part.ETag,
            PartNumber: index + 1,
          })),
        },
      };

      // Asegurarse de que uploadId no sea undefined antes de llamar a completeMultipartUpload
      if (uploadId) {
        await s3.completeMultipartUpload({
          ...completeParams,
          UploadId: uploadId
        }).promise();

        setUploadResult(`Video subido exitosamente a la carpeta: ${fileName}`);
        await refreshKeys(); // Llama a refreshKeys para actualizar la lista de videos
      } else {
        throw new Error('UploadId es undefined');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setUploadResult('Error al subir el archivo.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Subir video</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Selecciona un video:</label>
        <input type="file" accept="video/*" onChange={handleVideoChange} className="w-full mt-2 p-2 border" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Título del video:</label>
        <input
          type="text"
          value={videoTitle}
          onChange={handleTitleChange}
          className="w-full mt-2 p-2 border"
          placeholder="Escribe el título del video"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Carpeta de destino:</label>
        <input
          type="text"
          value={folder}
          onChange={handleFolderChange}
          className="w-full mt-2 p-2 border"
          placeholder="Especifica la carpeta"
        />
      </div>

      <button
        onClick={handleUpload}
        className={`w-full py-2 px-4 text-white bg-blue-500 rounded ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={uploading}
      >
        {uploading ? `Subiendo (${uploadProgress}%)...` : 'Subir video'}
      </button>

      {uploadResult && (
        <div className="mt-4 text-center">
          <p className="text-gray-800">{uploadResult}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
