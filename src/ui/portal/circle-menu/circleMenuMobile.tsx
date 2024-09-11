'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './circleMenu.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  text: string;
  position: {
    top: string;
    left: string;
  };
  subItems?: MenuItem[];
}

// Animación para la esfera levitando
const levitateAnimation = {
  y: ["0%", "-3%", "0%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Animación para la sombra que se alarga y encoje
const shadowAnimation = {
  scaleY: [1, 1.5, 1], // La sombra se alarga y se encoje verticalmente
  transition: {
    duration: 3, // Mismo tiempo que la esfera para estar sincronizados
    repeat: Infinity,
    ease: "easeInOut"
  }
};
const CircleMenuMobile = () => {
  
  const items: MenuItem[] = [
    { text: 'Empieza por aquí', position: { top: 'calc(50% - 257px)', left: 'calc(50% - 62px)' }, 
      subItems: [
        { text: 'Fechas conferencias y recursos', position: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' } },
        { text: 'Conceptos importantes y practicas basicas', position: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' } }
      ]
    },
    {
      text: 'Enseñanza de la vía', position: { top: 'calc(50% - 209.6218px)', left: 'calc(50% + 64px)' },
      subItems: [
        {
          text: 'Comentarios de sutras',
          position: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' },
          subItems: [
            {
              text: 'Shiva Sutras: La Cosmovisión',
              position: { top: 'calc(50% - 189.622px)', left: 'calc(50% + 19px)' },
              subItems: [
                { text: '1 DESPERTAR', position: { top: 'calc(50% - 189.622px)', left: 'calc(50% + 19px)' } },
                { text: '2 DESPERTAR', position: { top: 'calc(50% - 50.622px)', left: 'calc(50% + 98px)' } },
                { text: '3 DESPERTAR', position: { top: 'calc(50% + 82.378px)', left: 'calc(50% + 14px)' } }
              ]
            },
            { text: 'Vijñana Bhairava Tantra: La Práctica', position: { top: 'calc(50% - 50.622px)', left: 'calc(50% + 98px)' } },
            { 
              text: 'Los 36 Tattvas', 
              position: { top: 'calc(50% + 82.378px)', left: 'calc(50% + 14px)' },
              subItems: [
                { text: 'Spandakarika', position: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' } },
                { text: 'Pratiabhidjaridayam', position: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' } }
              ]
            }
          ]
        },
        {
          text: 'Conceptos de apoyo',
          position: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' },
          subItems: [
            { text: 'Sat Sang', position: { top: 'calc(50% - 200.622px)', left: 'calc(50% - 45px)' } },
            { text: 'Textos en PDF', position: { top: 'calc(50% - 118.622px)', left: 'calc(50% + 80px)' } },
            { text: 'Libros Recomendados', position: { top: 'calc(50% + 20.378px)', left: 'calc(50% + 76px)' } },
            { text: 'Pruebas', position: { top: 'calc(50% + 96.378px)', left: 'calc(50% - 43px)' } }
          ]
        }
      ]
    },
    {
      text: 'Aplicación en tu vida', position: { top: 'calc(50% - 115px)', left: 'calc(50% + 153px)' },
      subItems: [
        {
          text: 'Preguntas y respuestas',
          position: { top: 'calc(50% - 189.622px)', left: 'calc(50% + 19px)' }
        },
        {
          text: 'War Room',
          position: { top: 'calc(50% - 50.622px)', left: 'calc(50% + 98px)' }
        },
        {
          text: 'Conferencias temáticas',
          position: { top: 'calc(50% + 82.378px)', left: 'calc(50% + 14px)' }
        }
      ]
    },
    {
      text: 'Prácticas en diferido', position: { top: 'calc(50% + 14.6218px)', left: 'calc(50% + 153px)' },
      subItems: [
        {
          text: 'Tandava y práctica con Mar y Juanjo',
          position: { top: 'calc(50% - 200.622px)', left: 'calc(50% - 45px)' }
        },
        {
          text: 'Yutkis',
          position: { top: 'calc(50% - 118.622px)', left: 'calc(50% + 80px)' }
        },
        {
          text: 'Otras prácticas',
          position: { top: 'calc(50% + 20.378px)', left: 'calc(50% + 76px)' }
        },
        {
          text: 'Visualizaciones',
          position: { top: 'calc(50% + 96.378px)', left: 'calc(50% - 43px)' },
          subItems: [
            { text: 'Kali', position: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' } },
            { text: 'Masyendra', position: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' } }
          ]
        }
      ]
    },
    { text: 'Chamanismo', position: { top: 'calc(50% + 112.6218px)', left: 'calc(50% + 64px)' } },
    { text: 'Últimos videos subidos', position: { top: 'calc(142% + 0px)', left: 'calc(50% - 62px)' } },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeItems, setActiveItems] = useState<MenuItem[]>(items);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [centralTitle, setCentralTitle] = useState<string>('Escuela de Shivaismo de Cachemira');
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const itemFromParams = params.get('breadcrumbItem') || '';
  console.log('itemFromParams --->> ', itemFromParams)

  // Manejo del cambio en breadcrumb
  useEffect(() => {
    if (breadcrumb.length === 0) {
      setActiveItems(items);
    }
  }, [breadcrumb]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setIsAnimating(!isAnimating);
    setActiveItems(items);
  }, [items]);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.subItems) {
      setActiveItems(item.subItems);
      setCentralTitle(item.text);
      setBreadcrumb(prev => [...prev, item.text]);
    } else {
      const params = new URLSearchParams({
        item: item.text,
        breadcrumb: [...breadcrumb, item.text].join()
      });
      router.push(`/portal/categorias?${params.toString()}`);
    }
  }, [breadcrumb, items, router]);

  const handleBackClick = useCallback(() => {
    setBreadcrumb(prev => {
      const newBreadcrumb = [...prev];
      newBreadcrumb.pop();
      return newBreadcrumb;
    });

    const findItemByBreadcrumb = (items: MenuItem[], breadcrumb: string[]): MenuItem[] => {
      let currentItems = items;
      breadcrumb.forEach(crumb => {
        const foundItem = currentItems.find(item => item.text === crumb);
        if (foundItem && foundItem.subItems) {
          currentItems = foundItem.subItems;
        }
      });
      return currentItems;
    };

    const updatedBreadcrumb = breadcrumb.slice(0, -1);
    setActiveItems(findItemByBreadcrumb(items, updatedBreadcrumb));
    setCentralTitle(updatedBreadcrumb[updatedBreadcrumb.length - 1] || 'Escuela de Shivaismo de Cachemira');
  }, [breadcrumb, items]);

  // Estilo y animación para mover la esfera hacia la izquierda
  const circleDivStyle = isOpen
    ? { transform: 'translate(-150%, -53%)', textAlign: 'center' as 'center' } // Desplaza más hacia la izquierda
    : {};

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.ball}
          onClick={(e) => { e.stopPropagation(); toggleMenu(); }}
          animate={levitateAnimation}
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            position: 'fixed',
            left: '28%',
            top: '41%',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            userSelect: 'none',
            outline: 'none',
            ...circleDivStyle
          }}>
          {centralTitle}
        </motion.div>
      </motion.div>
      
      {breadcrumb.length > 0 && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          onClick={(e) => { e.stopPropagation(); handleBackClick(); }}
          animate={levitateAnimation}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 'calc(100% - 62px)',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'white'
          }}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </motion.div>
      </motion.div>        
      )}      
      {isOpen && activeItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        > 
          <motion.div 
            key={index}
            animate={{
              ...isAnimating ? levitateAnimation : {},
              opacity: 1,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: item.position.top,
              left: item.position.left,
              width: '120px',
              height: '120px',
              borderRadius: '50%'
            }}
            onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
            className={styles.secondSphere}
          >
            {item.text}
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default CircleMenuMobile;