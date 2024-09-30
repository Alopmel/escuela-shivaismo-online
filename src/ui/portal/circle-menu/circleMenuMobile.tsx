'use client';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './circleMenu.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '@/utils/menuItems';
import SecondarySphereMobile from './secondarySphereMobile';
import { useMenu } from '@/app/context/MenuContext';
import { FaArrowLeft } from "react-icons/fa";

const levitateAnimation = {
  y: ["0%", "-3%", "0%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const CircleMenuMobile = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [menuKey, setMenuKey] = useState(0);
  const router = useRouter();
  const { menuState, toggleMenu, selectItem, goBack, getBreadcrumbPath } = useMenu();

  const handleToggleMenu = useCallback(() => {
    setIsMoving(true);
    setTimeout(() => {
      toggleMenu();
      setIsMoving(false);
    }, 500);
  }, [toggleMenu]);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.subItems) {
      selectItem(item);
      setMenuKey(prevKey => prevKey + 1);
    } else {
      const breadcrumbPath = getBreadcrumbPath(item);
      const params = new URLSearchParams({
        item: item.text,
        breadcrumb: breadcrumbPath.join(',')
      });
      router.push(`/portal/categorias?${params.toString()}`);
    }
  }, [selectItem, getBreadcrumbPath, router]);

  const handleBackClick = useCallback(() => {
    goBack();
    setMenuKey(prevKey => prevKey + 1);
  }, [goBack]);

  useEffect(() => {
    if (!menuState.isOpen) {
      setIsMoving(true);
      setTimeout(() => {
        setIsMoving(false);
      }, 500);
    }
  }, [menuState.isOpen]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <motion.div
        animate={menuState.isOpen || isMoving ? { left: '0%' } : { left: '27%' }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <motion.div
          onClick={handleToggleMenu}
          className={`${styles.ball}`}
          animate={levitateAnimation}
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            userSelect: 'none',
          }}
        > 
          <div 
            style={{
              width: '90%',
              height: '90%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.2rem', lineHeight: '1.2', padding: '10px' }}>
              {menuState.centralTitle}
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {menuState.isOpen && !isMoving && (
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
            {menuState.currentItems.map((item, index) => (
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
      
      {menuState.isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '43px',
            left: '216px',
            cursor: 'pointer',
            color: 'white',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleBackClick();
          }}
        >
          <FaArrowLeft className="h-7 w-7"/>
        </div>
      )}
    </div>
  );
};

export default CircleMenuMobile;