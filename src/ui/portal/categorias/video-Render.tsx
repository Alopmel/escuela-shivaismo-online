// /src/ui/components/VideoRender.tsx
'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaRegHeart, FaHeart, FaRegClock, FaClock } from 'react-icons/fa';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import { useProgress } from '@/app/context/ProgressContext';
import {
    throttle,
    handleVideoProgress,
    handleWatchLaterToggle,
    handleFavoriteToggle,
    handlePlay,
    getTitleWithoutExtension,
    cleanVideoId
} from '@/utils/videoUtils';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './VideoRender.module.css';

interface VideoRenderProps {
    videoData: { url: string; title: string; key: { Key: string } }[];
    userId: string;
}

const VideoRender: React.FC<VideoRenderProps> = ({ videoData, userId }) => {
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
    const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
    const { favorites, setFavorites } = useFavorites();
    const { watchLater, setWatchLater } = useWatchLater();
    const { progress, setProgress } = useProgress();
    const router = useRouter();

    const handleDoubleClick = (videoUrl: string) => {
        const videoFileName = videoUrl.split('/').pop();
        const videoId = videoFileName ? getTitleWithoutExtension(videoFileName) : '';
        const videoTitle = videoId ? cleanVideoId(videoId) : '';

        const params = new URLSearchParams({ videoTitle, videoUrl });
        router.push(`/portal/categorias/video-player?${params.toString()}`);
    };

    const throttledHandleVideoProgress = throttle(
        async (played: number, index: number) => {
            const progressPercentage = played * 100;
            const { url } = videoData[index];
            const existingProgress = progress.some((pg) => pg.url === url);

            if (progressPercentage >= 90 && !existingProgress) {
                await handleVideoProgress(played, index, videoData, progress, setProgress, userId);
            }
        },
        5000
    );

    const pageTransition = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={pageTransition}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}
        >
            {videoData.map(({ url, title, key }, index) => {
                const isFavorite = favorites.some((fav) => fav.url === url);
                const isWatchLater = watchLater.some((wl) => wl.url === url);
                const isViewed = progress.some((pg) => pg.url === url);
                const isPlaying = playingVideoIndex === index;

                return (
                    <div
                        key={index}
                        className={styles.cardContainer}
                        onMouseEnter={() => setHoveredVideo(index)}
                        onMouseLeave={() => setHoveredVideo(null)}
                        onDoubleClick={() => handleDoubleClick(url)}
                    >
                        <div className={`${styles.cardContainer_01} relative`}>
                            <ReactPlayer
                                url={url}
                                controls={hoveredVideo === index}
                                width="100%"
                                height="100%"
                                className={styles.cardPlayer}
                                playing={isPlaying}
                                onPlay={() => {
                                    handlePlay(key);
                                    setPlayingVideoIndex(index);
                                }}
                                onPause={() => setPlayingVideoIndex(null)}
                                onProgress={({ played }) => {
                                    throttledHandleVideoProgress(played, index);
                                }}
                                config={{
                                    file: {
                                        attributes: {
                                            onDoubleClick: () => handleDoubleClick(url),
                                            controlsList: 'nodownload',
                                        },
                                    },
                                }}
                            />
                            {isViewed && !isPlaying && hoveredVideo !== index && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md rounded-md">
                                    <span className="text-white text-4xl font-bold">Visto</span>
                                </div>
                            )}
                        </div>
                        {(hoveredVideo === index || isFavorite || isWatchLater) && (
                            <div className={styles.cardIcons}>
                                <div
                                    className={styles.cardIcon}
                                    onClick={() => handleFavoriteToggle(index, videoData, favorites, setFavorites, userId)}
                                >
                                    {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                                </div>
                                <div
                                    className={styles.cardIcon}
                                    onClick={() => handleWatchLaterToggle(index, videoData, watchLater, setWatchLater, userId)}
                                >
                                    {isWatchLater ? <FaClock size={24} /> : <FaRegClock size={24} />}
                                </div>
                            </div>
                        )}
                        <div>
                            <p className={styles.title}>{title}</p>
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default VideoRender;
