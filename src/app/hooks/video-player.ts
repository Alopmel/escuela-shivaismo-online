import { useRouter } from 'next/navigation';
import { getTitleWithoutExtension, cleanVideoId } from '@/utils/videoUtils';

export const useVideoPlayer = () => {
  const router = useRouter();

  const handleDoubleClick = (videoUrl: string) => {
    console.log('videoUrl')
    const videoFileName = videoUrl.split('/').pop();
    const videoId = videoFileName ? getTitleWithoutExtension(videoFileName) : '';
    const videoTitle = videoId ? cleanVideoId(videoId) : '';

    const params = new URLSearchParams({ videoTitle, videoUrl });
    router.push(`/portal/categorias/video-player?${params.toString()}`);
  };

  const videoConfig = {
    file: {
      attributes: {
        controlsList: 'nodownload',
      },
    },
  };

  return { handleDoubleClick, videoConfig };
};
