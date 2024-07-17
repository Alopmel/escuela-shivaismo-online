// src/app/context/api.ts

import axios from 'axios';

export interface Favorite {
  id: string;
  userId: string;
  videoId: string | null;
  videoTitle: string;
  url: string;
  creationDate: string;
  lastView: string | null;
}

const API_BASE_URL = 'https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com';

export const getFavoritesByUserId = async (userId: string): Promise<Favorite[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites/${userId}`);
    return response.data as Favorite[];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};
