import React from 'react';
import { roboto } from '@/app/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';

const pageTransition = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const AvailableResources: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}
    >
      <div className={`p-6 mt-5 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-white border-opacity-30 ${roboto.className} w-full lg:w-[800px]`}>
        <h1 className="text-2xl font-bold mb-4 text-white">Recursos Disponibles</h1>
        <p className="mb-4 text-white">
          Además de las conferencias en directo y el contenido del portal, al acceder a este Grupo de Prácticas tienes acceso a otros recursos que te ayudarán a profundizar en la enseñanza. Abajo los resumo:
        </p>
        <ul className="list-none pl-0 md:pl-6 mb-6">
        <li className="mb-6 flex items-start">
            <Image
              src="/logo_red.png"
              alt="Logo"
              width={16} // Ajusta el ancho según el diseño
              height={16} // Ajusta la altura según el diseño
              className="w-4 mr-4 mt-[0.9rem] rounded-lg"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-white">
              <strong>Glosario de términos en Sanscrito:</strong> 
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <Image
              src="/logo_red.png"
              alt="Logo"
              width={16} // Ajusta el ancho según el diseño
              height={16} // Ajusta la altura según el diseño
              className="w-4 mr-4 mt-[0.9rem] rounded-lg"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-white">
              <strong>Una App gratuita:</strong> Con un reto de 14 días para comenzar a entender el Shivaismo, y las prácticas del Vijñana Bhairava resumidas y explicadas por Mar en videos de menos de 3 minutos. Busca "Tantra Shivaita Aplicado" en tu tienda de aplicaciones.
            </p>
          </li>

          <li className="mb-6 flex items-start">
            <Image
              src="/logo_red.png"
              alt="Logo"
              width={16}
              height={16}
              className="w-4 mr-4 mt-[0.9rem] rounded-lg"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-white">
              <strong>Un Podcast:</strong> Con el nombre <i>"Tantra Shivaita Aplicado"</i> donde Mar comparte reflexiones y resuelve dudas sobre la enseñanza. Disponible en Spotify, Apple Podcasts y iVoox.
            </p>
          </li>

          <li className="mb-6 flex items-start">
            <Image
              src="/logo_red.png"
              alt="Logo"
              width={16}
              height={16}
              className="w-4 mr-4 mt-[0.9rem] rounded-lg"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-white">
              <strong>Un canal de YouTube:</strong> Con audios de meditaciones para seguir profundizando, enseñanzas sobre el Shivaismo y clases de yoga.
            </p>
          </li>

          <li className="mb-6 flex items-start">
            <Image
              src="/logo_red.png"
              alt="Logo"
              width={16}
              height={16}
              className="w-4 mr-4 mt-[0.9rem] rounded-lg"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-white">
              <strong>Un Grupo de Estudio:</strong> En Telegram, donde Mar responde preguntas y comparte contenido adicional para los miembros del grupo.
            </p>
          </li>

          <li className="mb-6 flex items-start">
            <Image
              src="/logo_red.png"
              alt="Logo"
              width={16}
              height={16}
              className="w-4 mr-4 mt-[0.9rem] rounded-lg"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-white">
              <strong>Acceso a las grabaciones de las clases:</strong> Donde podrás ver y repasar el material a tu propio ritmo.
            </p>
          </li>

          <li className="mb-6 flex items-start">
            <Image
              src="/logo_red.png"
              alt="Logo"
              width={16}
              height={16}
              className="w-4 mr-4 mt-[0.9rem] rounded-lg"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-white">
              <strong>Material descargable:</strong> Con explicaciones más detalladas y prácticas que complementan las clases.
            </p>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AvailableResources;
