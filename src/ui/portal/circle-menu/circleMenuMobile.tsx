'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './circleMenu.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface MenuItem {
  text: string;
  position: {
    top: string;
    left: string;
  };
  subItems?: MenuItem[];
}

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

  const router = useRouter();
  const searchParams = useSearchParams();

  // Manejo del cambio en breadcrumb
  useEffect(() => {
    if (breadcrumb.length === 0) {
      setActiveItems(items); // Volver al menú principal si no hay breadcrumb
    }
  }, [breadcrumb]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setActiveItems(items);
  }, [items]);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.subItems) {
      console.log(`Clicked on item with subitems: ${item.text}`);
      setActiveItems(item.subItems); // Actualiza el estado con los subItems
      setCentralTitle(item.text);
      // Agregar al breadcrumb
      setBreadcrumb(prev => [...prev, item.text]);
    } else {
      // No hay subItems, ir a /Category
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
      newBreadcrumb.pop(); // Remover el último elemento para retroceder
      return newBreadcrumb;
    });

    // Buscar el nuevo menú en base al breadcrumb restante
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

  const circleDivStyle = isOpen
    ? { transform: 'translate(-110%, -53%)', textAlign: 'center' as 'center' }
    : {};

  return (
    <div
      onClick={(e) => { e.stopPropagation(); toggleMenu(); }}
      className={`${styles.ball}`}
      style={{
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        position: 'fixed',
        left: '50%',
        top: '50%',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
        userSelect: 'none',
        outline: 'none',  // Asegurarse de que no se muestre el borde azul
        ...circleDivStyle
      }}
    >
      {centralTitle}
      {breadcrumb.length > 0 && (
        <div
          onClick={(e) => { e.stopPropagation(); handleBackClick(); }}
          style={{
            position: 'absolute',
            top: 'calc(100% - 62px)', // Posiciona la flecha debajo del título central
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'white'
          }}
        >
          <ArrowLeftIcon className="h-6 w-6" /> {/* Icono de flecha */}
        </div>
      )}
      {isOpen && activeItems.map((item, index) => (
        <div key={index}
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
        </div>
      ))}
    </div>
  );
};

export default CircleMenuMobile;
