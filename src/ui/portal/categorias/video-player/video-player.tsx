'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { throttle, handleVideoProgress, putComment, handlePlay } from '@/utils/videoUtils';
import { Progress, Comment } from '@/app/types/types';
import { useComments } from '@/app/context/CommentContext';
import { useUser } from "@/app/context/UserContext";
import { roboto } from '@/app/fonts';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VideoPlayer: React.FC = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('videoUrl') || '';
  const videoTitle = searchParams.get('videoTitle') || '';
  const keyString = searchParams.get('key') || '{}';
  const key = JSON.parse(keyString); 

  const { comments, setComments, fetchComments } = useComments();
  const [newComment, setNewComment] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState<Progress[]>([]);
  const { userId, name } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (videoUrl) {
      fetchComments(videoUrl); 
    }
  }, [videoUrl]);

  const handleCommentSubmit = async () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      const comment: Comment = {
        id: new Date().toISOString(),
        userId: userId || '',
        videoId: videoUrl,
        userName: name || 'Anonymous',
        text: trimmedComment,
        creationDate: new Date().toLocaleString(),
      };

      setComments([...comments, comment]);
      setNewComment('');

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

  // Ajustar el tamaño del textarea al contenido
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '1rem';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newComment]);

  const filteredComments = comments.filter(comment => comment.videoId === videoUrl);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-white text-left w-full max-w-screen-lg">
        {videoTitle}
      </h1>
      <div className="flex flex-col items-center w-full max-w-screen-lg">
      <div className="w-full p-2">
        {isClient && (
          <div className="rounded-lg overflow-hidden"> {/* Agregamos rounded-lg y overflow-hidden */}
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="100%"
              playing={false}
              onPlay={() => {
                handlePlay(key);
              }}
              onProgress={({ played }) => {
                throttledHandleVideoProgress(played, 0, [{ url: videoUrl, title: videoTitle, key }], progress, setProgress, userId);
              }}
            />
          </div>
        )}
      </div>
        <div className="w-full p-2">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-4 flex flex-col">
            <div className="flex items-center">
            <p className={`text-lg text-white mr-4 mb-4 ${roboto.className}`}>
              ¿Quieres comentar algo?
            </p>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 bg-white bg-opacity-20 backdrop-blur-lg resize-none overflow-hidden"
                style={{ 
                  borderRadius: '50px', 
                  height: '1rem', // Altura del textarea
                  padding: '0.5rem 0.5rem', // Espacio alrededor del texto para centrar verticalmente
                  caretColor: '#00d1d1', // Color del cursor (barra espaciadora)
                  boxSizing: 'border-box', // Asegura que padding se incluye en el height total
                }}
                ref={textareaRef}
                onInput={adjustTextareaHeight}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleCommentSubmit}
                className="py-1 px-6 mt-4 mb-3 text-lg text-[#00d1d1] border-2 rounded-full border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_4px_#00d1d1,0_0_8px_#00d1d1,0_0_12px_#00d1d1] hover:bg-[#00d1d1] hover:text-white transition-colors bg-transparent"
              >
                Enviar
              </button>
            </div>
          </div>
          <div className="mt-4">
            {filteredComments.map((comment) => (
              <div key={comment.id} className={`bg-white bg-opacity-30 backdrop-blur-md p-2 my-2 rounded-md shadow-sm ${roboto.className}`}>
                <p className="font-bold text-[#e8e8e8]">
                  {comment.userName}
                </p>
                <p className='text-[#e8e8e8] ml-3'>{comment.text}</p>
                <p className="text-sm text-gray-400">{comment.creationDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
