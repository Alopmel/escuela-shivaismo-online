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
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', padding: '1rem' }}
    >
      <div className={`p-6 mt-5 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-white border-opacity-30 ${roboto.className} w-full sm:w-[600px] md:w-[800px]`}>
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-white text-center">Horarios Conferencias en Directo</h1>
        <ul className="list-none pl-0 md:pl-6 mb-6 text-white">
          {[
            { time: 'Lunes 22:00h', description: 'Clase Tandava (Irene)' },
            { time: 'Martes 22:00h', description: 'Clase Tandava (Ana)' },
            { time: 'Miércoles 10:00h', description: 'Tandava y Prácticas del Vijñana Bhairava Tantra (Mar o Juanjo)' },
            { time: 'Miércoles 22:00h', description: 'Conferencias Temáticas (Mar y Juanjo)' },
            { time: 'Jueves 10:00h', description: 'Clase Tandava (Gloria)' },
            { time: 'Jueves 22:00h', description: 'Tandava y Prácticas del Vijñana Bhairava Tantra (Mar o Juanjo)' }
          ].map(({ time, description }, index) => (
            <li key={index} className="mb-4 flex items-start">
              <Image
                src="/logo_red.png"
                alt="Logo"
                width={20} // Ajusta el tamaño según sea necesario
                height={16}
                className="w-4 mr-4 rounded-lg"
                style={{ filter: 'invert(1)' }}
              />
              <strong>{time}:</strong> {description}
            </li>
          ))}
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
