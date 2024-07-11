'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './circleMenu.module.css';

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
    { text: 'Empieza por aquí', position: { top: 'calc(50% - 257px)', left: 'calc(50% - 49px)' } },
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
            { text: 'Vijñana Bhairava: La Práctica', position: { top: 'calc(50% - 50.622px)', left: 'calc(50% + 98px)' } },
            { text: 'Los 36 Tattvas', position: { top: 'calc(50% + 82.378px)', left: 'calc(50% + 14px)' } }
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
      text: 'Aplicación en tu vida', position: { top: 'calc(50% - 109px)', left: 'calc(50% + 153px)' },
      subItems: [
        {
          text: 'Preguntas y respuestas',
          position: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' }
        },
        {
          text: 'Conferencias por Temas',
          position: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' }
        }
      ]
    },
    {
      text: 'Prácticas en diferido', position: { top: 'calc(50% + 14.6218px)', left: 'calc(50% + 153px)' },
      subItems: [
        {
          text: 'Tandava con Juanjo y Mar',
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
    { text: 'Chamanismo', position: { top: 'calc(50% + 112.6218px)', left: 'calc(50% + 67px)' } },
    { text: 'Últimos videos subidos', position: { top: 'calc(142% + 0px)', left: 'calc(50% - 50px)' } },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeItems, setActiveItems] = useState<MenuItem[]>(items);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [centralTitle, setCentralTitle] = useState<string>('Escuela de Shivaismo de Cachemira');

  const router = useRouter();
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda usando useSearchParams
  const params = new URLSearchParams(searchParams.toString());

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveItems(items);
    setCentralTitle('Escuela de Shivaismo de Cachemira');
    setBreadcrumb([]);
  };

  const handleItemClick = (item: MenuItem) => {
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
        breadcrumb: JSON.stringify([...breadcrumb, item.text])
      });
      router.push(`/portal/categorias?${params.toString()}`);
    }
  };

  const circleDivStyle = isOpen
    ? { transform: 'translate(-128%, -53%)', textAlign: 'center' as 'center'}
    : {};

  return (
    <div
      onClick={(e) => { e.stopPropagation(); toggleMenu(); }}
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
        background: 'radial-gradient(circle at 50% 50%, #cc8cc3, #ca1eb3)',
        color: 'white',
        ...circleDivStyle
      }}
    >
      {centralTitle}
      {isOpen && activeItems.map((item, index) => (
        <div key={index} className={styles.menuItemM} style={{ position: 'absolute', top: item.position.top, left: item.position.left }} onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default CircleMenuMobile;
