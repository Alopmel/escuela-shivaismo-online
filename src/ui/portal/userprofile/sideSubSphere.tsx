'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './sideSphere.module.css';

interface SideSubSphereProps {
//   onClick: () => void;
  text: string;
  position: {
    top: string;
    left: string;
  };
}

// Animación para la esfera levitando
const levitateAnimation = {
  y: ["0%", "-3%", "0%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Animación para la sombra que se alarga y encoje
const shadowAnimation = {
  scaleY: [1, 1.5, 1], // La sombra se alarga y se encoje verticalmente
  transition: {
    duration: 3, // Mismo tiempo que la esfera para estar sincronizados
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const SideSubSphere: React.FC<SideSubSphereProps> = ({ text, position}) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleClick = () => {
    setIsAnimating(!isAnimating); // Detiene o inicia la animación
    // onClick(); // Llama a la función onClick pasada como prop
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: '100px',
        height: '100px',
      }}
      onClick={handleClick} // Añadir el evento onClick aquí
    >
      {/* Sombra animada */}
      <motion.div
        className={styles.shadow}
        animate={isAnimating ? shadowAnimation : {}} // Solo anima si isAnimating es true
      />

      {/* Esfera animada */}
      <motion.div
        className={styles.subSphere}
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#361072',
          userSelect: 'none',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 2 // Asegurarse de que la esfera esté por encima de la sombra
        }}
        animate={isAnimating ? levitateAnimation : {}} // Solo anima si isAnimating es true
      >
        {text}
      </motion.div>
    </div>
  );
};

export default SideSubSphere;