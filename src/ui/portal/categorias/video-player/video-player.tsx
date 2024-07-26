'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';

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
    const params = new URLSearchParams(searchParams.toString());
    const videoUrl = params.get('videoUrl') || '';

    const fileName = videoUrl.split('/').pop() || '';
    const rawTitle = fileName.replace(/\.[^/.]+$/, '');
    const videoTitle = rawTitle.replace(/^\d+\.\s*/, ''); // Eliminar el número y el punto al inicio
    
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const username = 'Alba'; // Nombre del usuario hardcodeado

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                text: newComment,
                user: username,
                date: new Date().toLocaleString()
            };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    // Solo renderiza el player en el cliente
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

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
