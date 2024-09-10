import React from 'react';
import { roboto } from '@/app/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';

const pageTransition = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};

const ConferenceSchedule: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="flex flex-wrap justify-center items-start p-4 md:p-6" // Ajustar padding
    >
      <div className={`p-4 md:p-6 mt-5 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-white border-opacity-30 ${roboto.className} w-full lg:w-[800px]`}>
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Horarios Conferencias en Directo</h1>
        <ul className="list-none pl-0 mb-6 text-white">
          <li className="mb-4 flex items-start">
            <Image 
                src="/logo_red.png"
                alt="Logo"
                width={25}
                height={25}
                className="w-4 mr-4 mt-[0.9rem] rounded-lg"
                style={{ filter: 'invert(1)' }}
            />
            <strong>Lunes 22:00h:</strong> Clase Tandava (Irene)
          </li>
          <li className="mb-4 flex items-start">
            <Image 
                src="/logo_red.png"
                alt="Logo"
                width={25}
                height={25}
                className="w-4 mr-4 mt-[0.9rem] rounded-lg"
                style={{ filter: 'invert(1)' }}
            />
            <strong>Martes 22:00h:</strong> Clase Tandava (Ana)
          </li>
          <li className="mb-4 flex items-start">
            <Image 
                src="/logo_red.png"
                alt="Logo"
                width={25}
                height={25}
                className="w-4 mr-4 mt-[0.9rem] rounded-lg"
                style={{ filter: 'invert(1)' }}
            />
            <strong>Miércoles 10:00h:</strong> Tandava y Prácticas del Vijñana Bhairava Tantra (Mar o Juanjo)
          </li>
          <li className="mb-4 flex items-start">
            <Image 
                src="/logo_red.png"
                alt="Logo"
                width={25}
                height={25}
                className="w-4 mr-4 mt-[0.9rem] rounded-lg"
                style={{ filter: 'invert(1)' }}
            />
            <strong>Miércoles 22:00h:</strong> Conferencias Temáticas (Mar y Juanjo)
          </li>
          <li className="mb-4 flex items-start">
            <Image 
                src="/logo_red.png"
                alt="Logo"
                width={25}
                height={25}
                className="w-4 mr-4 mt-[0.9rem] rounded-lg"
                style={{ filter: 'invert(1)' }}
            />
            <strong>Jueves 10:00h:</strong> Clase Tandava (Gloria)
          </li>
          <li className="mb-4 flex items-start">
            <Image 
                src="/logo_red.png"
                alt="Logo"
                width={25}
                height={25}
                className="w-4 mr-4 mt-[0.9rem] rounded-lg"
                style={{ filter: 'invert(1)' }}
            />
            <strong>Jueves 22:00h:</strong> Tandava y Prácticas del Vijñana Bhairava Tantra (Mar o Juanjo)
          </li>
        </ul>
        <p className="mb-6 text-white text-center">
          Eventualmente se harán clases extras de apoyo y de algún tema particular que anunciaremos en el grupo de WhatsApp.
        </p>
        <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md">
          <p className="font-semibold mb-3 text-white">Enlace y Contraseña para Asistir a las Conferencias:</p>
          <p className="text-white mb-2">
            <strong>Enlace Conferencias:</strong> 
            <a href="https://zoom.us/j/487385294" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">
              https://zoom.us/j/487385294
            </a>
          </p>
          <p className="text-white">
            <strong>Contraseña Conferencias:</strong> 69Tantra69
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConferenceSchedule;
