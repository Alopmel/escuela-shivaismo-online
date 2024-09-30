import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { unicaOne } from '@/app/fonts';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const pageTransition = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const WelcomePlayer = () => {
  const [width, setWidth] = useState('100%');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setWidth(mobile ? '100%' : '80%');
    };

    const handleScroll = () => {
      if (!isMobile) {
        if (window.scrollY > 100) {
          setWidth('73%');
        } else {
          setWidth('80%');
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="flex flex-wrap justify-center items-center"
    >
      <div 
        className={`mt-2 ${unicaOne.className} transition-all duration-300`}
        style={{ 
          width: width,
          borderRadius: '8px',
          overflow: 'hidden',
          border: '3px solid rgba(147, 147, 147, 0.11)',
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <ReactPlayer
            url="https://dz9uj6zxn56ls.cloudfront.net/Fechas conferencias y recursos/1.BIENVENIDA AL GRUPO.mp4"
            controls={true}
            width="100%"
            height="100%"
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePlayer;