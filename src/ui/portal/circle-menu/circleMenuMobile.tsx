'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './circleMenu.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { items, MenuItem } from '@/utils/menuItems';
import SecondarySphereMobile from './secondarySphereMobile';

const levitateAnimation = {
  y: ["0%", "-3%", "0%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const CircleMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [activeItems, setActiveItems] = useState<MenuItem[]>(items);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [centralTitle, setCentralTitle] = useState<string>('Escuela de Shivaismo de Cachemira');
  const [menuKey, setMenuKey] = useState(0);
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsMoving(true);
    setTimeout(() => {
      setIsOpen(prevIsOpen => !prevIsOpen);
      setActiveItems(items);
      setIsMoving(false);
    }, 500);
  }, []);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.subItems) {
      setActiveItems(item.subItems);
      setCentralTitle(item.text);
      setBreadcrumb(prev => [...prev, item.text]);
      setMenuKey(prevKey => prevKey + 1);
    } else {
      const params = new URLSearchParams({
        item: item.text,
        breadcrumb: [...breadcrumb, item.text].join()
      });
      router.push(`/portal/categorias?${params.toString()}`);
    }
  }, [breadcrumb, router]);

  const handleBackClick = useCallback(() => {
    if (breadcrumb.length > 1) {
      const newBreadcrumb = breadcrumb.slice(0, -1);
      setBreadcrumb(newBreadcrumb);
      const parentItem = items.find(item => item.text === newBreadcrumb[newBreadcrumb.length - 1]);
      if (parentItem && parentItem.subItems) {
        setActiveItems(parentItem.subItems);
        setCentralTitle(parentItem.text);
      }
      setMenuKey(prevKey => prevKey + 1);
    } else {
      setIsOpen(false);
      setBreadcrumb([]);
      setActiveItems(items);
      setCentralTitle('Escuela de Shivaismo de Cachemira');
    }
  }, [breadcrumb, items]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <motion.div
        onClick={toggleMenu}
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
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        animate={isOpen || isMoving ? { left: '0%' } : { left: '27%' }}
        transition={{ duration: 0.5 }}
      > 
        <motion.div animate={levitateAnimation}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.09rem' }}>
            {centralTitle}
          </div>
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && !isMoving && (
          <motion.div
            key={menuKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              position: 'absolute', 
              top: '0',
              left: '-100px',
              width: '100%', 
              height: '100%',
            }}
          >
            {activeItems.map((item, index) => (
              <SecondarySphereMobile 
                key={`${menuKey}-${index}`}
                item={item} 
                onClick={handleItemClick} 
                index={index}
                mainSpherePosition={{ top: '50%', left: '0%' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'white',
            zIndex: 1000,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleBackClick();
          }}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
};

export default CircleMenuMobile;