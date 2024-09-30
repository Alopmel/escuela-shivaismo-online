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
      className="flex flex-wrap justify-center items-start" 
    >
      <div className={`p-4 md:p-6 mt-5 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg border border-white border-opacity-30 ${roboto.className} w-full md:w-[68.5%]`}>
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-white">Recursos Disponibles</h1>
        <p className="mb-4 text-white">
          Además de las conferencias en directo y el contenido del portal, al acceder a este Grupo de Prácticas tienes acceso a otros recursos que te ayudarán a profundizar en la enseñanza. Abajo los resumo:
        </p>
        <ul className="list-none pl-0 mb-6 w-full">
          {[{
            text: 'Glosario de términos en Sanscrito',
            description: 'Aquí os podéis descargar el PDF con los términos sánscritos básicos para comenzar a entender el Shivaismo',
            route: 'https://dz9uj6zxn56ls.cloudfront.net/Textos/Diccionario_sanscrit.pdf'
          },
          {
            text: 'Libros recomendados',
            description: 'Selección de los libros que consideramos más relevantes',
            route: '/portal/books'
          },
          {
            text: 'Una App gratuita',
            description: 'Con un reto de 14 días para comenzar a entender el Shivaismo, y las prácticas del Vijñana Bhairava resumidas y explicadas por Mar en videos de menos de 3 minutos. Busca "Tantra Shivaita Aplicado" en tu tienda de aplicaciones.',
            route: 'https://play.google.com/store/apps/details?id=com.goodbarber.tantrashivaita'
          },
          {
            text: 'Quedadas presenciales entre tantrikas',
            description: 'Tenemos personas distribuidas por España con experiencia en Tantra Shivaita y medicina chamánica, que pueden ayudarte a salir de algunos estados o guiarte en la práctica de manera presencial. Esto también ayuda a romper el frío del mundo on-line, conociendo a las personas al otro lado de los ordenadores. Las condiciones de estos encuentros se establecen con cada practicante.',
            route: 'https://maphub.net/tantrashivaita/mapa'
          },
          {
            text: 'Un Podcast',
            description: 'Con el nombre "Tantra Shivaita Aplicado" donde Mar comparte reflexiones y resuelve dudas sobre la enseñanza. Disponible en Spotify, Apple Podcasts y iVoox.',
            route: 'https://open.spotify.com/show/5C8hqr1JOEY4BM4gakzxnM?si=e27fdd8689af47c9'
          },
          {
            text: 'Un canal de YouTube',
            description: 'Con audios de meditaciones para seguir profundizando, enseñanzas sobre el Shivaismo y clases de yoga.',
            route: 'https://www.youtube.com/@TantraShivaitaAplicado'
          },
          {
            text: 'Un Grupo de Estudio',
            description: 'En Telegram, donde Mar responde preguntas y comparte contenido adicional para los miembros del grupo.'
          },
          {
            text: 'Acceso a las grabaciones de las clases',
            description: 'Donde podrás ver y repasar el material a tu propio ritmo.'
          },
          {
            text: 'Material descargable',
            description: 'Con explicaciones más detalladas y prácticas que complementan las clases.'
          },
          {
            text: 'Rapé',
            description: 'El Rapé es la medicina que mas acompaña la práctica diaria del tantra. Frena la mente y lleva consciencia al cuerpo muy eficazmente. Tenemos rapé Brasileño del mejor que podéis encontrar, asi como Kuripies, o autosopladores. Bego (680659701) es nuestra chamana de rapé oficial. Contactar con ella para que os inicie.',
            route: 'https://comprarrape.com/acompanamiento-en-sesiones-de-rape/'
          },
          {
            text: 'Realización material',
            description: 'Esto es una formación continuada todas las semanas descansando un jueves al mes, paralela a la Escuela de Shivaismo, que te ayuda a ser emprendedor y salir del sistema de explotación laboral que tiene entretenido al rebaño alelado.',
            route: 'https://www.grupodepracticas.com/offers/2kdjmoXh/checkout'
          },
          {
            text: 'El melón de tu familia',
            description: 'Este programa es una obra maestra que te ayudará, en tan solo 6 conferencias, en sanar el trauma generado por una familia narcisista / emocionalmente incestuosa, y poner a cada uno en su sitio.',
            route: 'https://www.grupodepracticas.com/offers/CBFo27mU/checkout'
          },
          {
            text: 'Prácticas de Kali',
            description: 'A parte del contenido del Grupo de Prácticas, existe otro mini-curso con todas las prácticas preparatorias para el trabajo de Kali, y algunas visualizaciones avanzadas para desintegrar partes de vuestro ego de raíz. Recomendamos que estéis por lo menos 4 semanas en el Grupo de Prácticas para hacer estas visualizaciones.',
          },
          {
            text: 'Shivaísmo aplicado a relaciones',
            description: 'Existe también otro mini-curso enfocado a las relaciones sexo/afectivas. Explicamos como crear, mantener y destruir vínculos de manera consciente, hablamos de sexo, el que nos hace daño y el que nos nutre, y profundizamos en como mantener el amor, la pasión y los cuidados en la pareja.',
            route: 'https://www.grupodepracticas.com/offers/rFzrBzvt/checkout'
          },
          {
            text: 'Retiros Tantrik Yopo',
            description: 'Cada mes y medio / dos meses hacemos retiros presenciales donde combinamos las enseñanzas tántricas con la toma de Yopo, una medicina chamánica proveniente de la selva de Venezuela. Esto es muy recomendable para personas muy acorazadas con dificultad de conectar con sus emociones, personas con estados emocionales densos prolongados en el tiempo o cualquier otro problema profundo que no se disuelva facilmente con la práctica. Después de estos retiros se aumenta la sensibilidad y el trabajo tántrico es más agradecido.',
            route: 'https://www.grupodepracticas.com/offers/dteqk364/checkout'
          },
          {
            text: 'Trabajo Intensivo',
            description: 'Consiste en pasar un fin de semana con Mar y Juanjo y luego 3 meses de seguimiento individual. Si llevas por lo menos 3 meses en el Grupo de Prácticas, y hay algo profundo en ti que sabes que no está bien y quieres acabar con ello, esta es la manera mas radical y profunda que tenemos de ayudarte. Escríbenos por privado para mas detalles.',
            route: 'https://www.grupodepracticas.com/offers/dteqk364/checkout'
          }].map(({ text, description, route }, index) => (
            <li key={index} className="mb-6 flex items-start w-full">
              <Image
                src="/logo_red.png"
                alt="Logo"
                width={25}
                height={25}
                className="w-4 mr-4 mt-[0.9rem] rounded-lg flex-shrink-0"
                style={{ filter: 'invert(1)' }}
              />
              <div className="text-white flex flex-col flex-grow">
                <a
                  href={route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#361072] text-[1.2rem] font-bold no-underline hover:text-[#00d1d1] transition-colors duration-300 mb-1"
                >
                  {text}
                </a>
                <span className="text-[1.1rem]">{description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default AvailableResources;