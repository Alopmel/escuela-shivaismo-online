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

// Animación para la sombra que se alarga y encoje
const shadowAnimation = {
  scaleY: [1, 1.5, 1], // La sombra se alarga y se encoje verticalmente
  transition: {
    duration: 3, // Mismo tiempo que la esfera para estar sincronizados
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
      {/* Sombra animada */}
      <motion.div
        style={{
          position: 'absolute',
          top: '102%',
          left: '34%',
          width: '38%',
          height: '10px', // Ajusta el tamaño de la sombra
          backgroundColor: 'rgba(0, 0, 0, 0.25)', // Color y opacidad de la sombra
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(2.2px)', 

        }}
        animate={isAnimating ? shadowAnimation : {}} // Solo anima si isAnimating es true
      />

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
        {text}
      </motion.div>
    </div>
  );
};

export default SecondSphere;
