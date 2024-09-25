import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import CardComponent from './card-component';
import { roboto } from '@/app/fonts';

interface CategoryProps {
  userId: string;
}

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

const Category: React.FC<CategoryProps> = ({ userId }) => {
  const [hoveredItems, setHoveredItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const item = params.get('item') || '';
   
  // Obtenemos el breadcrumb y removemos el último ítem
  let breadcrumb = params.get('breadcrumb')?.split(',') || [];
  if (breadcrumb.length > 0) {
    breadcrumb = breadcrumb.slice(0, breadcrumb.length - 1);
  }
   
  // Agregamos "Escuela de Shivaismo de Cachemira" como el primer ítem
  const fullBreadcrumb = ['Escuela de Shivaismo de Cachemira', ...breadcrumb];

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

  const handleGoTo = (index: number) => {
    const breadcrumbItem = fullBreadcrumb[index];

    if (isMobile) {
      // En móvil, enviamos solo el breadcrumbItem
      // console.log('breadcrumbItem', breadcrumbItem);
      router.push(`/portal?breadcrumbItem=${breadcrumbItem}`);
    } else {
      // En escritorio, lógica existente
      if (index === 0) {
        router.push('/portal');
      } else {
        const previousItem = fullBreadcrumb[index - 1];
        const newBreadcrumb = fullBreadcrumb.slice(0, index).join(',');

        router.push(`/portal?item=${previousItem}&breadcrumb=${newBreadcrumb}`);
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className='m-4 p-4 pt-20 md:m-10 md:p-20'
    >
      <div>
        <h1 className="text-[31px] md:text-[41px] text-white" style={{ userSelect: 'none' }}>
          {item}
        </h1>        
        <nav className={`mb-5 whitespace-nowrap flex flex-wrap ${roboto.className}`}>
          {fullBreadcrumb.map((breadcrumbItem, index) => (
            <span key={breadcrumbItem}>
              <span
                className="transition duration-300 mr-3 mb-3 md:mb-0 text-[#e5e5e5] text-[1.1rem]"
                onMouseEnter={() => handleMouseEnter(breadcrumbItem)}
                onMouseLeave={() => handleMouseLeave(breadcrumbItem)}
                onClick={() => handleGoTo(index)}
                style={{ cursor: index < fullBreadcrumb.length - 1 ? 'pointer' : 'default' }}
              >
                {breadcrumbItem}
                {index < fullBreadcrumb.length - 1 && <span style={{ color: '#c6c6c6' }}> / </span>}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <CardComponent 
        userId={userId} 
        item={item} 
      />
    </motion.div>
  );
};

export default Category;
