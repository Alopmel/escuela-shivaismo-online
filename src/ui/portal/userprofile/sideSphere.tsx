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
      {/* Esfera con el símbolo de +/x */}
      <motion.div
        className={styles.sideSphere} /* Asegúrate de que 'sideSphere' esté en el archivo CSS importado */
        onClick={handleClick}
        style={{
          top: isClicked ? '536px' : '614px',
          left: isClicked ? '255px' : '271px',
          width: isClicked ? '50px' : '60px',
          height: isClicked ? '50px' : '60px',
          transition: 'top 0.5s ease, left 0.5s ease',
          outline: 'none', /* Eliminar borde de enfoque */
          boxShadow: 'none',
          /* Eliminar sombra de enfoque */
        }}
        animate={isAnimating ? levitateAnimation : {}} // Solo anima si isAnimating es true
      >
        <span className={` mt-2 {styles.symbol}`} tabIndex={-1}><TiPlus /></span>
      </motion.div>
    </>
  );
};

export default SideSphere;
