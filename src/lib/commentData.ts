// /src/lib/commentData.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '@/app/types/types';

const API_BASE_URL = 'https://ac0msttmkc.execute-api.eu-west-2.amazonaws.com/';

export const getCommentVideo = async (): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}comment`);
    return response.data as Comment[];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


