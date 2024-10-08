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

const levitateAnimation = {
  y: ["0%", "-3%", "0%"],
  transition: {
    duration: 3,
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
    { text: 'Últimos vídeos subidos', position: { top: 'calc(142% + 0px)', left: 'calc(50% - 62px)' } },
  ];

 const [isOpen, setIsOpen] = useState(false);
  const [activeItems, setActiveItems] = useState<MenuItem[]>(items);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [centralTitle, setCentralTitle] = useState<string>('Escuela de Shivaismo de Cachemira');
  const [itemFromParams, setItemFromParams] = useState<string | null>(null); // Inicialmente nulo
  const [isNew, setIsNew] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const item = params.get('breadcrumbItem');
    if (item) {
      setItemFromParams(item); // Establecer el valor de itemFromParams
      //console.log('item', item); // Asegúrate de que este valor es el correcto
    }
  }, [searchParams]);
  
  useEffect(() => {
    if (itemFromParams) {
      //console.log('itemFromParams actualizado:', itemFromParams);
      // Aquí puedes implementar la lógica adicional que necesites
    }
  }, [itemFromParams]);  

  const toggleMenu = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setActiveItems(items);
  }, [items]);


  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.subItems) {
      setActiveItems(item.subItems);
      setIsNew(true)
      setCentralTitle(item.text);
      setBreadcrumb(prev => [...prev, item.text]);
      //console.log('breadcrumb', breadcrumb)
      //console.log('active items', activeItems)
    } else {
      const params = new URLSearchParams({
        item: item.text,
        breadcrumb: [...breadcrumb, item.text].join()
      });
      router.push(`/portal/categorias?${params.toString()}`);
    }
  }, [breadcrumb, items, router]);

  const handleBackClick = useCallback(() => {
    if(breadcrumb.length){
      setIsOpen(true);     
    } else {
      setIsOpen(false);
    }

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

  return (
    <motion.div
      animate={{ 
        x: isOpen ? '0%' : '0%', // Ajusta la posición para la transición
        transition: { duration: 0.5, ease: 'easeInOut' }
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'relative' }}
    >
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
        className={`${styles.ball}`}
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          userSelect: 'none',
          position: 'relative',
          // left: isOpen || breadcrumb.length ? '-97px' : ''

        }}
        animate={{ 
          y: ["0%", "-3%", "0%"],
          x: isOpen || breadcrumb.length ? ["-60%"] : ["0%"],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      > 
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.09rem' }}>
          {centralTitle}
        </div>  
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={isNew ? { opacity: 0, scale: 0.5 } : {}}
              animate={isNew ? { opacity: 1, scale: 1 } : {}}
              exit={ isNew ? { opacity: 0, scale: 0.5 } : {}}
              transition={isNew ? { duration: 0.5, ease: "easeInOut" } : {}}
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              {activeItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
                  style={{
                    position: 'absolute',
                    top: item.position.top,
                    left: item.position.left,
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    color:'#361072',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item);
                  }}
                  className={styles.secondSphere}
                >
                  <motion.div
                    animate={levitateAnimation}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <p className={`p-4 text-[1rem] ${styles.textContent}`}>
                    {item.text}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
              {/* Flecha en la esquina inferior izquierda */}
              <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: 'fixed',  // Fijo en la pantalla
              bottom: '16px',     // 16px desde la parte inferior
              left: '16px',       // 16px desde la parte izquierda
              cursor: 'pointer',
              fontSize: '20px',
              color: 'white',
              zIndex: 1000,       // Asegura que esté por encima de otros elementos
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleBackClick();
            }}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CircleMenuMobile;