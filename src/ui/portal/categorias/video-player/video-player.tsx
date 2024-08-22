// src/app/components/VideoPlayer.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { throttle,handleVideoProgress, putComment } from '@/utils/videoUtils'; // Importa las funciones necesarias
import { Progress, Comment } from '@/app/types/types';
import { useComments } from '@/app/context/CommentContext'; // Usa el contexto actualizado
import { useUser } from "@/app/context/UserContext";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VideoPlayer: React.FC = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('videoUrl') || '';
  const videoTitle = searchParams.get('videoTitle') || '';

  const { comments, setComments, fetchComments } = useComments();
  const [newComment, setNewComment] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState<Progress[]>([]);
  const { userId, name } = useUser();

  useEffect(() => {
    setIsClient(true);
    if (videoUrl) {
      fetchComments(videoUrl); // Usar fetchComments del contexto
    }
  }, [videoUrl]);

  const handleCommentSubmit = async () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      const comment: Comment = {
        id: new Date().toISOString(), // Genera un ID único para el comentario
        userId: userId || '',
        videoId: videoUrl,
        userName: name || 'Anonymous',
        text: trimmedComment,
        creationDate: new Date().toLocaleString(),
      };

      setComments([...comments, comment]); // Actualiza el estado local de los comentarios
      setNewComment(''); // Limpia el campo de comentario

      try {
        await putComment(videoUrl, videoTitle, userId || '', name || 'Anonymous', trimmedComment);
      } catch (error) {
        console.error('Error al enviar el comentario:', error);
      }
    } else {
      console.warn('El comentario está vacío y no se enviará.');
    }
  };

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

  // Filtra los comentarios para mostrar solo los del video actual
  const filteredComments = comments.filter(comment => comment.videoId === videoUrl);

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
              {filteredComments.map((comment) => (
                <div key={comment.id} className="bg-white bg-opacity-30 backdrop-blur-md p-2 my-2 rounded-md shadow-sm">
                  <p className="font-bold">{comment.userName}</p>
                  <p>{comment.text}</p>
                  <p className="text-sm text-gray-500">{comment.creationDate}</p>
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
