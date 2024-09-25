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

const FourthSphere: React.FC<FourthSphereProps> = ({ text, position, onClick }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleClick = () => {
    setIsAnimating(!isAnimating); // Detiene o inicia la animación
    onClick();
  };

  return (
    <>
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
        <p className='pl-4 pr-4 leading-[1.13rem] text-[1rem]'>
          {text}
        </p>
      </motion.div>
    </>
  );
};

export default FourthSphere;
