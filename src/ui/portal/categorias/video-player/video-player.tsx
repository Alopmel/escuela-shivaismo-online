'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';
import { throttle, handleVideoProgress } from '@/utils/videoUtils'; // Importa las funciones necesarias
import { Progress } from '@/app/types/types';
import { useUser } from "@/app/context/UserContext";

// Importa ReactPlayer dinámicamente para evitar problemas de hidratación
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface Comment {
  text: string;
  user: string;
  date: string;
}

const VideoPlayer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('videoUrl') || '';
  const videoTitle = searchParams.get('videoTitle') || ''; // Asegúrate de que se está obteniendo correctamente

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState<Progress[]>([]);
  const { userId } = useUser(); // Obtener userId del contexto
  const { name } = useUser(); 

  useEffect(() => {
    setIsClient(true);
    console.log('Video url------->' + videoUrl);
  }, [videoUrl]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        text: newComment,
        user: name || 'Anonymous',
        date: new Date().toLocaleString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  // Usar throttle en la función handleVideoProgress
  const throttledHandleVideoProgress = throttle(async (
    played: number,
    index: number,
    videoData: { url: string; title: string; key: { Key: string } }[],
    progress: Progress[],
    setProgress: React.Dispatch<React.SetStateAction<Progress[]>>,
    userId: string
  ) => {
    await handleVideoProgress(played, index, videoData, progress, setProgress, userId);
  }, 5000);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">{videoTitle}</h1>
      <div className="flex flex-col items-center w-full max-w-screen-lg">
        <div className="w-full p-2">
          {isClient && (
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="100%"
              playing={false}
              onProgress={({ played }) => {
                // Aquí puedes pasar datos adicionales si es necesario
                throttledHandleVideoProgress(played, 0, [{ url: videoUrl, title: videoTitle, key: { Key: 'dummy_key' } }], progress, setProgress, userId);
              }}
            />
          )}
        </div>
        <div className="w-full p-2">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8">
            <p className="text-lg text-white mb-2">¿Quieres comentar algo?</p>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 mb-2 rounded-md border border-gray-300 bg-white bg-opacity-20 backdrop-blur-lg"
              rows={3}
            />
            <div className="flex justify-end">
              <button
                onClick={handleCommentSubmit}
                className="bg-[#5151A1] text-white py-3 px-6 text-lg rounded-md hover:bg-[rgb(52,52,103)] border-none"
              >
                Enviar comentario
              </button>
            </div>
            <div className="mt-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-white bg-opacity-30 backdrop-blur-md p-2 my-2 rounded-md shadow-sm">
                  <p className="font-bold">{comment.user}</p>
                  <p>{comment.text}</p>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
