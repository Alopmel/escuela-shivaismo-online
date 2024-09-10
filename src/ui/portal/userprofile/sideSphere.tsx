'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './sideSphere.module.css';
import { TiPlus } from "react-icons/ti";

interface SideSphereProps {
  onClick: () => void;
}

const levitateAnimation = {
  y: ["0%", "-3%", "0%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const shadowAnimation = {
  scaleY: [1, 1.5, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const SideSphere: React.FC<SideSphereProps> = ({ onClick }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsAnimating(!isAnimating);
    onClick();
  };

  return (
    <>
      {/* Sombra animada debajo de la esfera */}
      <motion.div
        className={styles.shadow} // Añadir clase para la sombra desde CSS
        animate={isAnimating ? shadowAnimation : {}} // Animar si isAnimating es true
      />
      {/* Esfera con el símbolo de +/x */}
      <motion.div
        className={styles.sideSphere} // Usar la clase CSS para los estilos de la esfera
        onClick={handleClick}
        style={{ 
          top: isClicked ? '524px' : '614px', 
          left: isClicked ? '255px' : '271px',
          width: isClicked ? '50px' : '60px',
          height: isClicked ? '50px' : '60px',
          transition: 'top 0.5s ease, left 0.5s ease',
          outline: 'none' // Eliminar el borde de selección azul
        }}
        animate={{
          rotate: isClicked ? 45 : 0, // Girar para formar una X
          scale: isClicked ? 1.2 : 1, // Ligeramente más grande cuando se hace clic
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
      >
        <span className={styles.symbol}><TiPlus /></span> {/* Cambia el símbolo */}
      </motion.div>
    </>
  );
};

export default SideSphere;
