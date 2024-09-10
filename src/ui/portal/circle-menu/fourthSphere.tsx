import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './circleMenu.module.css';

interface FourthSphereProps {
  onClick: () => void;
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
  scaleY: [1, 1.5, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const FourthSphere: React.FC<FourthSphereProps> = ({ text, position, onClick }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleClick = () => {
    setIsAnimating(!isAnimating); // Detiene o inicia la animación
    onClick();
  };

  return (
    <>
      <motion.div
        style={{
          position: 'absolute',
          top: `calc(${position.top} + 113px)`, // Ajusta la sombra más arriba
          left: `calc(${position.left} + 34px)`, // Centra la sombra horizontalmente debajo de la esfera
          width: '46px', // Ajusta el tamaño de la sombra para que coincida con el ancho de la esfera
          height: '6px', // Ajusta el tamaño de la sombra
          backgroundColor: 'rgba(0, 0, 0, 0.25)', // Color y opacidad de la sombra
          borderRadius: '50%',
          transform: 'translateX(-50%)', // Asegura que la sombra esté centrada horizontalmente
          filter: 'blur(2.2px)', 
        }}
        animate={isAnimating ? shadowAnimation : {}} // Solo anima si isAnimating es true
      />
      <motion.div
        className={styles.fourthSphere}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          width: '110px', // Tamaño de la esfera
          height: '110px', // Tamaño de la esfera
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color:'#112484',
          userSelect: 'none',
        }}
        onClick={handleClick}
        animate={isAnimating ? levitateAnimation : {}} // Solo anima si isAnimating es true
      >
        {text}
      </motion.div>
    </>
  );
};

export default FourthSphere;
