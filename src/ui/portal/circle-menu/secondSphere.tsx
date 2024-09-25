import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './circleMenu.module.css';

interface SecondSphereProps {
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

const SecondSphere: React.FC<SecondSphereProps> = ({ text, position, onClick }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleClick = () => {
    setIsAnimating(!isAnimating); // Detiene o inicia la animación
    onClick(); // Llama a la función onClick pasada como prop
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: '150px',
        height: '150px',
      }}
      onClick={handleClick} // Añadir el evento onClick aquí
    >
      {/* Esfera animada */}
      <motion.div
        className={styles.secondSphere}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color:'#361072',
          userSelect: 'none',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 2 // Asegurarse de que la esfera esté por encima de la sombra
        }}
        animate={isAnimating ? levitateAnimation : {}} // Solo anima si isAnimating es true
      > 
        <p className={` text-[1.1rem] pl-2 pr-2 leading-[1.13rem] ${styles.textContent}`}>
          {text}
        </p>
        
      </motion.div>
    </div>
  );
};

export default SecondSphere;
