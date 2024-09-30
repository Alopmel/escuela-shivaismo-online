'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/video');
      // Asumiendo que la respuesta contiene un campo 'CommonPrefixes' con las carpetas
      const folders = response.data.CommonPrefixes?.map((prefix: any) => prefix.Prefix?.slice(0, -1)) || [];
      setCategories(folders);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };

  const handleCreateCategory = async () => {
    if (!newCategory) return;

    try {
      await axios.post('/api/video', { categoryName: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpload = async () => {
    if (!file || (!selectedCategory && !newCategory)) {
      setUploadError('Por favor, selecciona un archivo y una categoría para subir.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', selectedCategory || newCategory);

    try {
      const response = await axios.post('/api/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          setUploadProgress(percentCompleted);
        },
      });

      console.log('Archivo subido exitosamente:', response.data);
      setUploadProgress(100);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        setFile(null);
        setSelectedCategory('');
      }, 1000);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setUploadError('Ocurrió un error al subir el archivo. Por favor, intenta de nuevo.');
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Cargando categorías...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard de Administrador</h1>
      <div className={styles.uploadSection}>
        <h2>Subir Video</h2>
        <input type="file" onChange={handleFileChange} accept="video/*" />
        
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <div>
          <input 
            type="text" 
            value={newCategory} 
            onChange={handleNewCategoryChange} 
            placeholder="Nueva categoría" 
          />
          <button onClick={handleCreateCategory}>Crear Categoría</button>
        </div>
        
        <button onClick={handleUpload} disabled={!file || uploading || (!selectedCategory && !newCategory)}>
          {uploading ? 'Subiendo...' : 'Subir Video'}
        </button>
        
        {uploading && (
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
        {uploadError && <p className={styles.error}>{uploadError}</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;