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
  const scheduleItems = [
    { day: 'Lunes', time: '22:00h', event: 'Clase Tandava (Irene)' },
    { day: 'Martes', time: '22:00h', event: 'Clase Tandava (Ana)' },
    { day: 'Miércoles', time: '10:00h', event: 'Tandava y Prácticas del Vijñana Bhairava Tantra (Mar o Juanjo)' },
    { day: 'Miércoles', time: '22:00h', event: 'Conferencias Temáticas (Mar y Juanjo)' },
    { day: 'Jueves', time: '10:00h', event: 'Clase Tandava (Gloria)' },
    { day: 'Jueves', time: '22:00h', event: 'Tandava y Prácticas del Vijñana Bhairava Tantra (Mar o Juanjo)' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="flex flex-wrap justify-center items-start p-2 md:p-4"
    >
      <div className={`p-4 mt-2 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-white border-opacity-30 ${roboto.className} w-full lg:w-[600px]`}>
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">
          Horarios Conferencias en Directo
        </h1>
        <ul className="list-none pl-0 mb-4 text-white">
          {scheduleItems.map(({ day, time, event }, index) => (
            <li key={index} className="mb-3 flex items-start">
              <Image
                src="/logo_red.png"
                alt="Logo"
                width={24} // Tamaño uniforme para todos los íconos
                height={24} // Tamaño uniforme para todos los íconos
                className="w-6 mr-3 rounded-lg"
                style={{ filter: 'invert(1)' }}
              />
              <span>
                <strong>{day} {time}:</strong> {event}
              </span>
            </li>
          ))}
        </ul>
        <p className="mb-4 text-white text-center">
          Eventualmente se harán clases extras de apoyo y de algún tema particular que anunciaremos en el grupo de WhatsApp.
        </p>
        <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md">
          <p className="font-semibold mb-2 text-white">
            Enlace y Contraseña para Asistir a las Conferencias:
          </p>
          <p className="text-white mb-1">
            <strong>Enlace Conferencias:</strong>{' '}
            <a
              href="https://zoom.us/j/487385294"
              className="text-blue-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
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
