'use client';
import { useEffect, useState, useCallback } from 'react';
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
    // tu estructura de items aquí
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeItems, setActiveItems] = useState<MenuItem[]>(items);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [centralTitle, setCentralTitle] = useState<string>('Escuela de Shivaismo de Cachemira');

  const router = useRouter();
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda usando useSearchParams
  const params = new URLSearchParams(searchParams.toString());
  const breadcrumbItem = params.get('item') || '';

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
    setActiveItems(items);
    setCentralTitle('Escuela de Shivaismo de Cachemira');
    setBreadcrumb([centralTitle]);
  }, [isOpen, items, centralTitle]);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.subItems) {
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
  }, [breadcrumb, router]);

  useEffect(() => {
    if (breadcrumbItem) {
      const findItem = (items: MenuItem[], text: string): MenuItem | undefined => {
        for (const item of items) {
          if (item.text === text) {
            return item;
          }
          if (item.subItems) {
            const found = findItem(item.subItems, text);
            if (found) {
              return found;
            }
          }
        }
        return undefined;
      };

      const item = findItem(items, breadcrumbItem);
      if (item) {
        toggleMenu();
        handleItemClick(item);
      }
    }
  }, [breadcrumbItem, handleItemClick, toggleMenu, items]);

  const circleDivStyle = isOpen
    ? { transform: 'translate(-110%, -53%)', textAlign: 'center' as 'center'}
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
