import React from 'react'
// import ReactPlayer from 'react-player';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const WelcomePlayer = () => {
  return (
    <div>
         <ReactPlayer
            url="https://dz9uj6zxn56ls.cloudfront.net/Fechas conferencias y recursos/1.BIENVENIDA AL GRUPO.mp4" // Cambia esta URL por la de tu video
            controls={true}
            width="100%"
            height="100%"
            className="rounded-lg overflow-hidden w-full lg:w-[800px]" // Agrega border-radius al video                    
         />
    </div>
  )
}

export default WelcomePlayer