// components/FileUpload.tsx
'use client'
import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string>('testfile.txt'); // Valor por defecto
  const [fileType, setFileType] = useState<string>('text/plain'); // Valor por defecto
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submit clicked'); // Registro de depuración

    // Crear el objeto JSON que se enviará a la API
    const payload = {
      fileName,
      fileType,
    };

    console.log('Payload:', payload); // Registro del payload

    try {
      const response = await fetch('https://wvhg9qq0g2.execute-api.eu-west-2.amazonaws.com/1/upload', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response data:', data); // Registro de la respuesta

      if (response.ok) {
        // Verificar si el servidor devuelve un fileName
        if (data.fileName) {
          setMessage(`Archivo subido exitosamente: ${data.fileName}`);
        } else {
          setMessage('');
          setError('No se recibió un nombre de archivo en la respuesta.');
        }
        setError(null);
      } else {
        setMessage('');
        // Detalle del error basado en la respuesta
        if (data.error) {
          setError(data.error);
        } else {
          setError('Error desconocido al subir el archivo.');
        }
      }
    } catch (err) {
      setMessage('');
      setError('Error en la solicitud: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      console.error('Error en la solicitud:', err);
    }
  };

  return (
    <div>
      <h1>Subir Archivo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileName">Nombre del archivo:</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fileType">Tipo de archivo:</label>
          <input
            type="text"
            id="fileType"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Subir</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
