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
        className={styles.shadow}
        animate={isAnimating ? shadowAnimation : {}}
      />
      {/* Esfera con el símbolo de +/x */}
      <motion.div
        className={styles.sideSphere}
        onClick={handleClick}
        style={{
          top: isClicked ? '524px' : '614px',
          left: isClicked ? '255px' : '271px',
          width: isClicked ? '50px' : '60px',
          height: isClicked ? '50px' : '60px',
          transition: 'top 0.5s ease, left 0.5s ease',
          outline: 'none'  // Eliminar borde azul
          tabIndex={-1}
        }}
        animate={{
          rotate: isClicked ? 45 : 0,
          scale: isClicked ? 1.2 : 1,
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
        tabIndex={-1}  // Aplicar tabIndex directamente dentro del componente
      >
        <span className={styles.symbol}><TiPlus /></span>
      </motion.div>
    </>
  );
};

export default SideSphere;
