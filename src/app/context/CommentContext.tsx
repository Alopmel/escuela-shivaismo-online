// src/app/context/CommentContext.tsx
'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { getCommentVideo } from '@/lib/commentData';
import { Comment } from '../types/types';

interface CommentContextProps {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  fetchComments: (videoId: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

interface CommentProviderProps {
  children: ReactNode;
}

export const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async (videoId: string) => {
    try {
      const fetchedComments = await getCommentVideo();
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <CommentContext.Provider value={{ comments, setComments, fetchComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = (): CommentContextProps => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};
