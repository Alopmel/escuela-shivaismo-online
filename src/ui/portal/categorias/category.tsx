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
  console.log('Item cicleMenu' + item)
  let items: string[] = [];
  if (params.has('breadcrumb')) {
    items = JSON.parse(params.get('breadcrumb') || '[]') as string[];
    console.log(items)
  } else {
    items = [
      params.get('firstClickedContent') || '',
      params.get('secondClickedContent') || '',
      params.get('thirdClickedContent') || '',
      params.get('fourthClickedContent') || '',
    ].filter(Boolean) as string[];
  }

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
      <h1 className="mt-28 md:mt-32 text-[31px] md:text-[41px] ml-4 md:ml-20 text-white">
        {item}
      </h1>
      
      {/* Aquí puedes crear el breadcrumb dinámico */}
      <nav className="mb-5 ml-12 md:ml-20 whitespace-nowrap flex flex-wrap">        
        {items.map((item, index) => (
          <span key={item}>
            <span key={item} className="transition duration-300 mr-5 mb-3 md:mb-0 text-[#cfcdcd]"
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