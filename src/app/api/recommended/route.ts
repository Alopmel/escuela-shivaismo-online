// /src/app/api/recommended/route.ts
import axios from 'axios';

const API_URL = 'https://ks45tt0ipc.execute-api.eu-west-2.amazonaws.com/recommended';

export const updateVideoViews = async (videoId: string) => {
  try {
    const encodedVideoId = encodeURIComponent(videoId);
    const response = await axios.put(`${API_URL}/${encodedVideoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar visualizaciones de video:', error);
    throw new Error('Error al actualizar visualizaciones de video');
  }
};
