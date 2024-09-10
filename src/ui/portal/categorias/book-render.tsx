import React from 'react';
import { Roboto } from 'next/font/google';
import { MdOutlineDownloading } from 'react-icons/md';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Carga la fuente Roboto
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface BookItem {
  img: string;
  title?: string;
  description: string;
  url: string;
}

const pageTransition = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};

const books: BookItem[] = [
    {
      img: '/deseo_pasion.png',
      title: 'Deseo, Pasión y Espiritualidad. Daniel Odier',
      description: 'Aquí compartimos dos versiones, la de Daniel Odier y la de Christopher Wallis, que vistas en conjunto te ayudan a comprender gran parte de las 112 técnicas...',
      url:'https://www.amazon.es/Deseo-pasi%C3%B3n-espiritualidad-unidad-del/dp/849388300X/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=DESEO%2C+PASION+Y+ESPIRITUALIDAD&qid=1571929274&sr=8-1'
    },
    {
      img: '/tantra_daniel_odier.png',
      title: 'TANTRA. Daniel Odier.',
      description: 'Un relato en forma de novela que cuenta cómo se inicia Daniel Odier en el Tantra a través de la lista de Lalita Devi, la dakini de quién aprendera la vía del amor total que conduce a la libertad del ser.',
      url: 'https://www.amazon.es/Tantra-Daniel-Odier/dp/8486797241/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=TANTRA+DANIEL+ODIER&qid=1587406382&s=books&sr=1-1'
    },
    {
      img: '/adios_guru.png',
      title: 'Adiós Guru . Daniel Odier.',
      description: 'Se rebela contra las vías espirituales, del concepto de maestro como ejemplo a seguir, es un libro muy tántrico que rompe con muchos esquemas quizás para alguien que ya conozca la no via.',
      url: 'https://www.amazon.es/Adi%C3%B3s-Gur%C3%BA-Daniel-Odier/dp/8493883069/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=ADIOS+GURU+ODIER&qid=1587406421&s=books&sr=1-1'
    },
    {
      img: '/las_puertas_de_la_alegria.png',
      title: 'Las Puertas de la Alegría . Daniel Odier.',
      description: 'Meditaciones muy sencillas de leer pero una profundidad muy grande que te conecta con tu cuerpo y con la alegría de la presencia, ideal para iniciarse en las micro prácticas',
      url: 'https://www.amazon.es/Las-puertas-alegr%C3%ADa-meditaciones-aut%C3%A9ntica-ebook/dp/B00IPPBJUW/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=LAS+PUERTAS+DE+LA+ALEGRIA&qid=1587406448&s=books&sr=1-1'
    },
    {
      img: '/shiva_sutras.png',
      title: 'Shiva Sutras, El despertar Supremo. Lakshmanjoo.',
      description: 'Comentarios sobre los Shiva Sutras, uno de los sutras mas antiguos y profundos del Shivaismo de Cachemira. Este libro es una transcripcion de diferentes ponencias de Laksmanjoo, uno de los maestros shivaitas mas importantes de nuestra era.',
      url: 'https://www.amazon.es/Shiva-Sutras-El-Despertar-Supremo/dp/1947241036/ref=sr_1_7?crid=1ROPJTDKDDTIW&keywords=lakshmanjoo&qid=1642532056&sprefix=lakshmanhoo%2Caps%2C68&sr=8-7'
    },
    {
      img: '/shivaismo.png',
      title: 'Shivaismo de Cachemira, El despertar Supremo. Lakshmanjoo.',
      description: 'Lakshmanjoo resume en este libro las diferentes aproximaciones a la consciencia recogidas por el Shivaismo de Cachemira, una de las vías espirituales mas antiguas que existen.',
      url: 'https://www.amazon.es/Shaivismo-Cachemira-El-Supremo-Secreto/dp/0996636587/ref=sr_1_4?crid=1ROPJTDKDDTIW&keywords=lakshmanjoo&qid=1642532056&sprefix=lakshmanhoo%2Caps%2C68&sr=8-4'
    },
    {
      img: '/tantra_iluminado.png',
      title: 'Tantra Iluminado',
      description: 'Uno de los mayores estudios sobre el Shivaismo de Cachemira que se ha realizado. Libro escrito por el sanscritólogo y profesor Christopher Wallis. Si tienes una verdadera sed de conocimiento y de profundizar en los orígenes y profundidad del Tantra, este es tu libro.',
      url: 'https://www.amazon.es/gp/product/099868872X'
    },
  ];

const BookRenderer: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className={`grid gap-6 ${roboto.className} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
    >
      {books.map((item, index) => (
        <div
          key={index}
          className="bg-white bg-opacity-10 border border-white/30 p-4 rounded-lg shadow-lg backdrop-blur-md flex flex-col items-center"
          style={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <div className="flex-shrink-0 mb-4">
            <Image
              src={item.img}
              alt={item.title || 'Book cover'}
              width={200}
              height={200}
              className="w-[200px] h-auto"
            />
          </div>
          <div className="text-center">
            {item.title && <h3 className="text-lg mb-2 italic text-white">{item.title}</h3>}
            <p className="mb-4 text-white">{item.description}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d731a5] font-bold flex items-center justify-center no-underline hover:text-[#f78bd7] transition-colors duration-300"
            >
              Cómpralo ahora
              <MdOutlineDownloading className="ml-2" />
            </a>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default BookRenderer;
