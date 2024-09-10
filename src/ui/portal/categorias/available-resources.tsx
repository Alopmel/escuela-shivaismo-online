import React from 'react';
import { roboto } from '@/app/fonts';
import { motion } from 'framer-motion';

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
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Una App gratuita:</strong> Con un reto de 14 días para comenzar a entender el Shivaismo, y las prácticas del Vijñana Bhairava resumidas y explicadas por Mar en videos de menos de 3 minutos. Busca "Tantra Shivaita Aplicado" en tu tienda de aplicaciones.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Llamadas personales con Mar y Juanjo:</strong> Siempre y cuando practiques y te veamos en las clases, para temas específicos o situaciones complicadas, estamos disponibles para tener una conversación. Solo tienes que escribirnos por WhatsApp.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Quedadas presenciales entre tantrikas:</strong> Tenemos personas distribuidas por España con experiencia en Tantra Shivaita y medicina chamánica, que pueden ayudarte a salir de algunos estados o guiarte en la práctica de manera presencial. Esto también ayuda a romper el frío del mundo on-line, conociendo a las personas al otro lado de los ordenadores. Las condiciones de estos encuentros se establecen con cada practicante.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Rapé:</strong> El Rapé es la medicina que más acompaña la práctica diaria del tantra. Frena la mente y lleva consciencia al cuerpo de manera muy eficaz. Tenemos rapé brasileño del mejor que podéis encontrar, así como Kuripies o autosopladores. Bego (680659701) es nuestra chamana de rapé oficial. Contactar con ella para que os inicie.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Realización Material:</strong> Es una formación continuada cada dos semanas, paralela a la Escuela de Shivaismo, que te ayuda a ser emprendedor y salir del sistema de explotación laboral que tiene entretenido al rebaño alelado.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>El melón de tu familia:</strong> Este programa es una obra maestra que te ayudará, en tan solo 6 conferencias, a sanar el trauma generado por una familia narcisista/emocionalmente incestuosa y poner a cada uno en su sitio.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Prácticas de Kali:</strong> Aparte del contenido del Grupo de Prácticas, existe otro mini-curso con todas las prácticas preparatorias para el trabajo de Kali, y algunas visualizaciones avanzadas para desintegrar partes de vuestro ego de raíz. Recomendamos que estéis por lo menos 4 semanas en el Grupo de Prácticas para hacer estas visualizaciones.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Shivaismo Aplicado a Relaciones:</strong> Existe también otro mini-curso enfocado a las relaciones sexo/afectivas. Explicamos cómo crear, mantener y destruir vínculos de manera consciente, hablamos de sexo, el que nos hace daño y el que nos nutre, y profundizamos en cómo mantener el amor, la pasión y los cuidados en la pareja.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Retiros Tantrik Yopo:</strong> Cada mes y medio/dos meses hacemos retiros presenciales donde combinamos las enseñanzas tántricas con la toma de Yopo, una medicina chamánica proveniente de la selva de Venezuela. Esto es muy recomendable para personas muy acorazadas con dificultad de conectar con sus emociones, personas con estados emocionales densos prolongados en el tiempo o cualquier otro problema profundo que no se disuelva fácilmente con la práctica. Después de estos retiros se aumenta la sensibilidad y el trabajo tántrico es más agradecido.
            </p>
          </li>
          <li className="mb-6 flex items-start">
            <img src="/logo_red.png" alt="Logo" className="w-4 mr-4 mt-[0.9rem] rounded-lg" style={{ filter: 'invert(1)' }} />
            <p className="text-white">
              <strong>Trabajo Intensivo:</strong> Consiste en pasar un fin de semana con Mar y Juanjo y luego 3 meses de seguimiento individual. Si llevas por lo menos 3 meses en el Grupo de Prácticas, y hay algo profundo en ti que sabes que no está bien y quieres acabar con ello, esta es la manera más radical y profunda que tenemos de ayudarte. Escríbenos por privado para más detalles.
            </p>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AvailableResources;
