'use client';

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
        FaRegHeart, 
        FaHeart, 
        FaRegClock, 
        FaClock, 
        FaCheckCircle,
        FaRegCheckCircle 
    } from 'react-icons/fa';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useWatchLater } from '@/app/context/WatchLaterContext';
import { useProgress } from '@/app/context/ProgressContext';
import { 
        throttle, 
        handleVideoProgress, 
        handleWatchLaterToggle, 
        handleFavoriteToggle, 
        handlePlay 
    } from '@/utils/videoUtils';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './VideoRender.module.css';
import { roboto } from '@/app/fonts';
import { extractNumberFromTitle } from '@/utils/videoUtils';

interface VideoRenderProps {
    videoData: { url: string; title: string; key: { Key: string } }[];
    userId: string;
}

const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';

    const numberPart = extractNumberFromTitle(text);
    const restOfText = text.slice(numberPart.toString().length + 1).trim();

    if (restOfText.length === 0) return '';

    const firstChar = restOfText.charAt(0);
    const restOfTextLower = restOfText.slice(1).toLowerCase();

    return firstChar.toUpperCase() + restOfTextLower;
};

const VideoRender: React.FC<VideoRenderProps> = ({ videoData, userId }) => {
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
    const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const { favorites, setFavorites } = useFavorites();
    const { watchLater, setWatchLater } = useWatchLater();
    const { progress, setProgress } = useProgress();
    const [isProgress, setIsProgress] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDoubleClick = (videoUrl: string) => {
        const video = videoData.find((v) => v.url === videoUrl);
        if (video) {
            const params = new URLSearchParams({
                videoUrl: video.url,
                videoTitle: video.title,
                key: JSON.stringify(video.key),
            });
            router.push(`/portal/categorias/video-player?${params.toString()}`);
        }
    };

    const throttledHandleVideoProgress = throttle(
        async (played: number, index: number) => {
            setIsProgress(true);
            await handleVideoProgress(played, index, videoData, progress, setProgress, userId);
            setIsProgress(false);
        },
        5000
    );

    return (
        <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.5 } },
                exit: { opacity: 0, transition: { duration: 0.5 } },
            }}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: isMobile ? '1rem' : '3rem',
            }}
        >
            {videoData.map(({ url, title, key }, index) => {
                const isFavorite = favorites.some((fav) => fav.url === url);
                const isWatchLater = watchLater.some((wl) => wl.url === url);
                const isViewed = progress.some((pg) => pg.url === url);
                const isPlaying = playingVideoIndex === index;

                const formattedTitle = capitalizeFirstLetter(title);

                return (
                    <div
                        key={index}
                        className={styles.cardContainer}
                        onMouseEnter={() => setHoveredVideo(index)}
                        onMouseLeave={() => setHoveredVideo(null)}
                        onDoubleClick={() => (isMobile ? handleDoubleClick(url) : null)}
                    >
                        <div className={`${styles.cardContainer_01} relative`}>
                            <ReactPlayer
                                url={url}
                                controls={hoveredVideo === index}
                                width="100%"
                                height="100%"
                                className={styles.cardPlayer}
                                playing={isPlaying && !isMobile}
                                onPlay={() => {
                                    if (!isMobile) {
                                        handlePlay(key);
                                        setPlayingVideoIndex(index);
                                    }
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
                            {!isPlaying && hoveredVideo !== index && (
                                <div className="absolute inset-0 flex items-center px-16 justify-center bg-black bg-opacity-70">
                                    <p
                                        className={`font-bold text-center ${roboto.className} ${styles.title}`}
                                        style={{ 
                                            color: 'white',
                                            fontSize: isMobile ? '1.2rem' : '1.4rem',
                                            // filter: 'drop-shadow(0 0 1px #00d1d1) drop-shadow(0 0 1px #00d1d1)',
                                            // textShadow: '0 0 2px #00d1d1, 0 0 1px #00d1d1'
                                        }}
                                    >
                                        {formattedTitle}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Íconos visibles siempre si son true */}
                        <div
                            className={`${styles.cardIcons} transition-opacity duration-500 ease-in-out ${
                                hoveredVideo === index || isFavorite || isWatchLater || isViewed ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {/* Ícono de favorito */}
                            {(hoveredVideo === index || isFavorite) && (
                                <div
                                    className={styles.cardIcon}
                                    onClick={() =>
                                        handleFavoriteToggle(index, videoData, favorites, setFavorites, userId)
                                    }
                                >
                                    {isFavorite ? <FaHeart 
                                                    style={{ 
                                                        color: 'white',
                                                        // filter: 'drop-shadow(0 0 4px #00d1d1) drop-shadow(0 0 4px #00d1d1)',
                                                        // textShadow: '0 0 4px #00d1d1, 0 0 2px #00d1d1'
                                                    }}
                                                    size={28} /> 
                                                    : 
                                                <FaRegHeart 
                                                    style={{ 
                                                        color: 'white',
                                                        // filter: 'drop-shadow(0 0 4px #00d1d1) drop-shadow(0 0 4px #00d1d1)',
                                                        // textShadow: '0 0 4px #00d1d1, 0 0 2px #00d1d1'
                                                    }}
                                                    size={28} /> }
                                </div>
                            )}

                            {/* Ícono de ver más tarde */}
                            {(hoveredVideo === index || isWatchLater) && (
                                <div
                                    className={styles.cardIcon}
                                    onClick={() =>
                                        handleWatchLaterToggle(index, videoData, watchLater, setWatchLater, userId)
                                    }
                                >
                                    {isWatchLater ? <FaClock 
                                                        style={{ 
                                                            color: 'white',
                                                            // filter: 'drop-shadow(0 0 4px #00d1d1) drop-shadow(0 0 4px #00d1d1)',
                                                            // textShadow: '0 0 4px #00d1d1, 0 0 2px #00d1d1'
                                                        }}
                                                        size={28} />
                                                         :
                                                    <FaRegClock 
                                                        style={{ 
                                                            color: 'white',
                                                            // filter: 'drop-shadow(0 0 4px #00d1d1) drop-shadow(0 0 4px #00d1d1)',
                                                            // textShadow: '0 0 4px #00d1d1, 0 0 2px #00d1d1'
                                                        }}
                                                        size={28} />
                                                        }
                                </div>
                            )}

                            {/* Ícono de visto */}
                            {(hoveredVideo === index || isViewed) && (
                                <div className={styles.cardIcon}>
                                    {isViewed ? <FaCheckCircle 
                                                    style={{ 
                                                        color: 'white',
                                                        // filter: 'drop-shadow(0 0 4px #00d1d1) drop-shadow(0 0 4px #00d1d1)',
                                                        // textShadow: '0 0 4px #00d1d1, 0 0 2px #00d1d1'
                                                    }}
                                                    size={28} /> 
                                                    : 
                                                <FaRegCheckCircle 
                                                    style={{ 
                                                        color: 'white',
                                                        // filter: 'drop-shadow(0 0 4px #00d1d1) drop-shadow(0 0 4px #00d1d1)',
                                                        // textShadow: '0 0 4px #00d1d1, 0 0 2px #00d1d1'
                                                    }}
                                                    size={28} />}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default VideoRender;
