import React from 'react';
import { motion } from 'framer-motion';
import styles from './circleMenu.module.css';
import { MenuItem } from '@/utils/menuItems';

const levitateAnimation = {
  y: ["0%", "-3%", "0%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

interface SecondarySphereMobileProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
  index: number;
  mainSpherePosition: { top: string; left: string };
}

const SecondarySphereMobile: React.FC<SecondarySphereMobileProps> = ({ item, onClick, index, mainSpherePosition }) => {
  const initialPosition = {
    top: mainSpherePosition.top,
    left: mainSpherePosition.left,
  };

  // Proporcionar una posición por defecto si no se encuentra en el objeto item
  const finalPosition = {
    top: item.position?.mobile?.top ?? '50%',
    left: item.position?.mobile?.left ?? '50%',
  };

  console.log('Item:', item);
  console.log('Final Position:', finalPosition);

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        color: '#361072',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(item);
      }}
      className={styles.secondSphere}
      initial={{ 
        ...initialPosition,
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        top: finalPosition.top,
        left: finalPosition.left,
        opacity: 1,
        scale: 1
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.8,
        delay: index * 0.1
      }}
    >
      <motion.div animate={levitateAnimation}>
        <p className={`p-4 text-[1rem] ${styles.textContent}`}>
          {item.text}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SecondarySphereMobile;