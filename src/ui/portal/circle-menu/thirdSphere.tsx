import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './circleMenu.module.css';

interface ThirdSphereProps {
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

const ThirdSphere: React.FC<ThirdSphereProps> = ({ text, position, onClick }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleClick = () => {
    setIsAnimating(!isAnimating); // Detiene o inicia la animación
    onClick()
  };

  return (
    <>
      <motion.div
        className={styles.thirdSphere} // Asegúrate de definir los estilos para thirdSphere
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          width: '120px', // Ajusta el tamaño de la esfera
          height: '120px', // Ajusta el tamaño de la esfera
          borderRadius: '50%',
          backgroundColor: '#d0d0d0', // Color de la esfera
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
        <p className='pl-2 pr-2 leading-[1.13rem] text-[1rem]'>
          {text}
        </p>
      </motion.div>
    </>
  );
};

export default ThirdSphere;
