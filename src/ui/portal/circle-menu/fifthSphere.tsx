import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './circleMenu.module.css';

interface FifthSphereProps {
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

const FifthSphere: React.FC<FifthSphereProps> = ({ text, position, onClick }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleClick = () => {
    setIsAnimating(!isAnimating); // Detiene o inicia la animación
    onClick();
  };

  return (
    <>
      <motion.div
        className={styles.fifthSphere} // Asegúrate de definir los estilos para thirdSphere
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          width: '100px', // Ajusta el tamaño de la esfera
          height: '100px', // Ajusta el tamaño de la esfera
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          userSelect: 'none',
        }}
        onClick={handleClick}
        animate={isAnimating ? levitateAnimation : {}} // Solo anima si isAnimating es true
      >
        <p className={`p-4 text-[1rem] ${styles.textContent}`}>
          {text}
        </p>
      </motion.div>
    </>
  );
};

export default FifthSphere;
