import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Favorite } from '@/app/types/types';

const API_BASE_URL = 'https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com';

export const getFavoritesByUserId = async (userId: string): Promise<Favorite[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites/${userId}/favorites`);
    return response.data as Favorite[];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (!userId || Array.isArray(userId)) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }
  try {
    const favorites = await getFavoritesByUserId(userId as string);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};
