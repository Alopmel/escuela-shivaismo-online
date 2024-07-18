import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { WatchLater } from '@/app/types/types';

const API_BASE_URL = 'https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com';

export const getWatchLaterByUserId = async (userId: string): Promise<WatchLater[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites/${userId}/watchlater`);
    return response.data as WatchLater[];
  } catch (error) {
    console.error('Error fetching watch later:', error);
    throw error;
  }
};

const watchLaterHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  if (!userId || Array.isArray(userId)) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }
  try {
    const watchLater = await getWatchLaterByUserId(userId as string);
    res.status(200).json(watchLater);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch watch later' });
  }
};

export default watchLaterHandler;
