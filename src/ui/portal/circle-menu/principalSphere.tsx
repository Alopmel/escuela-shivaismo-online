'use client';

import { useState } from 'react';
import styles from './circleMenu.module.css';
import { motion } from 'framer-motion';

interface PrincipalSphereProps {
    onClick: () => void;
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

// Animación para la sombra que se alarga y encoje
const shadowAnimation = {
  animate: {
    scaleY: [1, 1.5, 1], // La sombra se alarga y se encoje verticalmente
    transition: {
      duration: 3, // Mismo tiempo que la esfera para estar sincronizados
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

  const PrincipalSphere: React.FC<PrincipalSphereProps> = ({ onClick }) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(true);
    const [isClicked, setIsClicked] = useState<boolean>(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
      setIsAnimating(!isAnimating); // Detiene o inicia la animación
      onClick(); // Llama a la función onClick pasada como prop
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
              style={{
                userSelect: 'none'
              }}
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
          <motion.div
            style={{ 
              width: isClicked ? '205px' : '300px', 
              height: isClicked ? '19px' : '50px', 
              borderRadius: '50%', 
              background: isClicked ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.7)', 
              position: 'absolute', 
              top: isClicked ? '342px' : '484px', 
              left: isClicked ? '99px' : '100px',
              filter: 'blur(9px)', 
              display: 'flex',
              pointerEvents: 'none',
              transition: 'all 0.5s ease'
            }}
            variants={shadowAnimation}
            animate={isAnimating && !isClicked ? "animate" : ""}
          />
        </div>
      );
      
  };
  
  export default PrincipalSphere;