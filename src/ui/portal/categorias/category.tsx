'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Importa Link de next para crear enlaces
import { useSearchParams } from 'next/navigation'; // Asegúrate de que la importación sea correcta
import { motion } from 'framer-motion';
import CardComponent from './card-component';

const pageTransition = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Category: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Obtener los parámetros de búsqueda usando useSearchParams
  const searchParams = useSearchParams();

  // Convertir los parámetros de búsqueda en un objeto URLSearchParams
  const params = new URLSearchParams(searchParams.toString());

  const item = params.get('item') || '';
  const firstClickedContent = params.get('firstClickedContent') || '';
  const secondClickedContent = params.get('secondClickedContent') || '';
  const thirdClickedContent = params.get('thirdClickedContent') || '';
  const fourthClickedContent = params.get('fourthClickedContent') || '';

  // Construir el breadcrumb con enlaces
  const breadcrumb = (
    <>
      <Link href={`/?item=${firstClickedContent}`}>
        {firstClickedContent}
      </Link>
      {' / '}
      <Link href={`/?item=${secondClickedContent}`}>
        {secondClickedContent}
      </Link>
      {' / '}
      <Link href={`/?item=${thirdClickedContent}`}>
        {thirdClickedContent}
      </Link>
      {' / '}
      <Link href={`/?item=${fourthClickedContent}`}>
        {fourthClickedContent}
      </Link>
    </>
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBreadcrumbClick = () => {
    // Implementa la lógica para el breadcrumb si es necesario
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
    >
      <h1
        style={{
          marginTop: isMobile ? '67px' : '168px',
          marginLeft: isMobile ? '12px' : '93px',
          color: 'rgb(251 251 251)',
          fontSize: 41,
        }}
      >
        {item}
      </h1>
      <p
        style={{
          marginTop: '-29px',
          marginLeft: isMobile ? '12px' : '97px',
          marginBottom: '50px',
          color: hovered ? 'rgb(150, 150, 150)' : 'rgb(198, 198, 198)',
          fontSize: 16,
          cursor: 'pointer',
        }}
        onClick={handleBreadcrumbClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {breadcrumb}
      </p>
      <CardComponent item={item} search={`?item=${item}`} />
    </motion.div>
  );
};

export default Category;
