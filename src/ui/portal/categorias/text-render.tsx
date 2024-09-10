import React from 'react';
import { Roboto } from 'next/font/google';
import { MdOutlineDownloading } from 'react-icons/md';

// Carga la fuente Roboto
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface RouteType {
  title: string;
  route: string;
}

interface TextItem {
  text: string;
  title?: string;
  description: string;
  routes: RouteType | RouteType[];
}

const path = 'https://dz9uj6zxn56ls.cloudfront.net/';
const texts: TextItem[] = [
  {
    text: 'Vijñanabhairava-tantra',
    title: 'Uno de los textos más importantes del tantra de Cachemira, transmitido de manera oral hasta que se puso por escrito a principios de nuestra era.',
    description: 'Aquí compartimos dos versiones, la de Daniel Odier y la de Christopher Wallis, que vistas en conjunto te ayudan a comprender gran parte de las 112 técnicas...',
    routes: [
      { 
        title: 'Vijñanabhairava-tantra - Daniel Odier',
        route: 'Textos/Vijñanabhairava-tantra_Daniel_Odier.pdf' 
      },
      { 
        title: 'Vijñanabhairava-tantra - Christopher Wallis',
        route: 'Textos/Vijñanabhairava_tantra_Christopher_Wallis.pdf' 
      },
    ]
  },
  {
    text: 'Kaulajñananirnaya-tantra de Masyendranath',
    title: 'Escrito en el SVII u VIII. Texto que define la escuela Kaula.',
    description: 'Compartimos una versión completa en castellano de Stella Dupuis...',
    routes: [
      { 
        title: 'Kaulajñananirnaya-tantra',
        route: 'Textos/Kaulajñananirnaya.pdf' 
      },
      { 
        title: 'Kaulajñananirnaya-tantra - Traducción',
        route: 'Textos/Kaulajnananiraya_traduccion.pdf' 
      },
    ]
  },
  {
    text: 'Shiva-sutras de Vasagupta',
    title: 'Escritos en el SIX. Textos clave "descargados" de la consciencia"',
    description: 'En este enlace os adjuntamos una versión española...',
    routes: [
      { 
        title: 'Shiva Sutras, El Despertas Supremo ',
        route: 'Textos/Shiva_Sutras_The_Supreme_Awakening_Swami_Lakshmanjoo.pdf' 
      },
      { 
        title: 'The Aphorims of Siva',
        route: 'Textos/The_Aphorisms_of_Siva.pdf' 
      },
    ]
  },
  {
    text: 'Spandakarika de Vasagupta y/o Kallata',
    title: 'Escrito en el SIX.',
    description: 'Compartimos la versión en castellano de Daniel Odier...',
    routes: [
      { 
        title: 'The Stanzas on Vibration - Mark S. G. Dyczkowski',
        route: 'Textos/The_Stanzas_on_Vibration_Dyczkowski.pdf' 
      },
      { 
        title: 'Spandakarika',
        route: 'Textos/Spandakarika.pdf' 
      },
    ]
  },
  {
    text: 'Pratyabijña-hrdayam de Ksemaraja',
    title: 'Escrito en el SX.',
    description: 'Compartimos la versión en castellano de Daniel Odier...',
    routes: [
      { 
        title: 'Pratyabijña-hrdayam - Daniel Odier',
        route: 'Textos/Pratiabhidjnahridayam_Tantra_Daniel_Odier.pdf' 
      },
      { 
        title: 'The Recognition Sutras - Chistopher Wallis',
        route: 'Textos/The_Recognition_Sutras_Christopher_Wallis.pdf' 
      },
    ]
  },
  {
    text: 'Textos Bonus',
    title: '',
    description: 'Hemos adjuntado otros 2 textos más...',
    routes: [
      { 
        title: 'Himnos a la Divinidad - Abhinavagupta',
        route: 'Textos/Himos_a_la_divinidad_Abhinavagupta.doc' 
      },
      { 
        title: 'El canto de Hsing Ming de la consciencia - Maestro Chan',
        route: 'Textos/Hsing_Ming_El_canto_de_la_conciencia.pdf' 
      },
    ]
  },
  {
    text: 'Tantrasara by Abhinavagupta',
    title: '',
    description: 'El Tantrasara es una versión reducida del Tantraloka...',
    routes: [
      { 
        title: 'Tantrasara - Abhinavagupta',
        route: 'Textos/Tantrasara_of_Abhinavagupta.pdf' 
      }
    ]
  }
];

const TextRenderer: React.FC = () => {
  return (
    <div className={`p-6 grid grid-cols-1 gap-6 ${roboto.className}`}>
      {texts.map((item, index) => (
        <div
          key={index}
          className="bg-white bg-opacity-10 border border-white/30 p-6 rounded-lg shadow-lg backdrop-blur-md"
          style={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <h2 className="text-xl font-bold mb-2 text-white">{item.text}</h2>
          {item.title && <h3 className="text-lg mb-2 italic text-white">{item.title}</h3>}
          <p className="mb-4 text-white">{item.description}</p>
          <div className="flex flex-wrap">
            {(Array.isArray(item.routes) ? item.routes : [item.routes]).map((route, idx) => (
              <a
                key={idx}
                href={`${path}${route.route}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d731a5] font-bold mr-4 flex items-center no-underline hover:text-[#f78bd7] transition-colors duration-300"
              >
                {route.title}
                <MdOutlineDownloading className="ml-2" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextRenderer;
