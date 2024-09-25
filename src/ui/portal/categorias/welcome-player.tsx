import React from 'react';
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
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="flex flex-wrap justify-center items-center p-2 md:p-4" // Reducido padding
    >
      <div className={`mt-2 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-white border-opacity-30 ${unicaOne.className} w-full sm:w-[500px] md:w-[600px]`}>
        <ReactPlayer
          url="https://dz9uj6zxn56ls.cloudfront.net/Fechas conferencias y recursos/1.BIENVENIDA AL GRUPO.mp4" // Cambia esta URL por la de tu video
          controls={true}
          width="100%"
          height="auto"
          className="rounded-lg overflow-hidden" // Agrega border-radius al video
        />
      </div>
    </motion.div>
  );
};

export default WelcomePlayer;
