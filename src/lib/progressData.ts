// /src/lib/favoriteData.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Progress } from '@/app/types/types';

const API_BASE_URL = 'https://kqyeh8sa4j.execute-api.eu-west-2.amazonaws.com/progress';

export const getProgressByUserId = async (userId: string): Promise<Progress[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data as Progress[];
  } catch (error) {
    console.error('Error fetching Progress:', error);
    throw error;
  }
};

const progressHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (!userId || Array.isArray(userId)) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }
  try {
    const favorites = await getProgressByUserId(userId as string);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

export default progressHandler;
