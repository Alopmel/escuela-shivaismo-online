import React from 'react'
import { motion } from 'framer-motion';
import { antonio } from '@/app/fonts';
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
      className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap"
    >
      <div className={`p-6 mt-5 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-white border-opacity-30 ${antonio.className} w-[90%] md:w-[800px]`}>
         <ReactPlayer
            url="https://dz9uj6zxn56ls.cloudfront.net/Fechas conferencias y recursos/1.BIENVENIDA AL GRUPO.mp4"
            controls={true}
            width="100%"
            height="100%"
            className="rounded-lg overflow-hidden"
         />
      </div>
    </motion.div>
  )
}

export default WelcomePlayer;
