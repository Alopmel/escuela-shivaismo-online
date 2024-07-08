'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
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
  const [hoveredItems, setHoveredItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  const router = useRouter()
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda usando useSearchParams

  const params = new URLSearchParams(searchParams.toString());

  // Obtener los valores de los parámetros y eliminar los que están vacíos
  const item = params.get('item') || '';
  console.log(item)
  const items = [
    params.get('firstClickedContent'),
    params.get('secondClickedContent'),
    params.get('thirdClickedContent'),
    params.get('fourthClickedContent'),
  ].filter(Boolean) as string[];
  
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

  const handleMouseEnter = (item: string) => {
    setHoveredItems(prevItems => [...prevItems, item]);
  };

  const handleMouseLeave = (item: string) => {
    setHoveredItems(prevItems => prevItems.filter(i => i !== item));
  };
  const handleGoTo = (item: string) => {
    const params = new URLSearchParams({
      item: item,
    });

    router.push(`/portal?${params.toString()}`);
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
      
      {/* Aquí puedes crear el breadcrumb dinámico */}
      <nav style={{ marginBottom: '20px', marginLeft: '94px', whiteSpace: 'nowrap', display: 'flex'}}>
        {items.map((item, index) => (
          <span key={item}>
            <span 
      
              style={{
                color: hoveredItems.includes(item) ? 'white' : '#c6c6c6',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                marginRight: '5px',
              }}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={() => handleMouseLeave(item)}  
              onClick={() => handleGoTo(item)}
            >
              {item}
              {index < items.length - 1 && <span style={{ color: '#c6c6c6' }}> / </span>}
            </span>
            
          </span>
        ))}
      </nav>

      <CardComponent item={item} search={`?item=${items[0]}`} /> {/* Ejemplo para usar un componente CardComponent */}
    </motion.div>
  );
};

export default Category;
