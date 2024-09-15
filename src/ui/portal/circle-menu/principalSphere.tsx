// PrincipalSphere.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './circleMenu.module.css';

interface PrincipalSphereProps {
  onClick: () => void;
  isClicked: boolean; // Nueva propiedad
}

// Animación para la esfera levitando
const levitateAnimation = {
  animate: {
    y: ["0%", "-3%", "0%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const PrincipalSphere: React.FC<PrincipalSphereProps> = ({ onClick, isClicked }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
 
  const handleClick = () => {
    setIsAnimating(!isAnimating);
    onClick();
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      position: 'relative',
      perspective: '1000px' 
    }}>
      <div style={{ position: 'relative' }}>
        <motion.section
          initial="hidden"
          animate="animate"
          exit="exit"
          variants={isClicked ? {} : levitateAnimation}
          className={styles.stage}
          style={{ userSelect: 'none' }}
        >
          <motion.figure 
            className={styles.ball}
            style={{ 
              width: isClicked ? '240px' : '400px', 
              height: isClicked ? '240px' : '400px',
              transition: 'width 0.5s ease, height 0.5s ease'
            }}
            onClick={handleClick}
          >
            <div className={styles.text} style={{ 
              fontSize: isClicked ? '1.9rem' : '2.7rem', 
              transition: 'font-size 0.5s ease'
            }}>
              Escuela <br />
              De Shivaismo <br />
              De Cachemira
            </div>
            <div className={styles.clickHere} style={{ 
              fontSize: isClicked ? '0.9rem' : '1.1rem',
              transition: 'font-size 0.5s ease'
            }}>
              Click aquí
            </div>
          </motion.figure>
        </motion.section>
      </div>
    </div>
  );
};

export default PrincipalSphere;
