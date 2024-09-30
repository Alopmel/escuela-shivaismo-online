import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './sideSphere.module.css';
import { ImCross } from "react-icons/im";

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
      <motion.div
        className={styles.sideSphere}
        onClick={handleClick}
        style={{
          top: isClicked ? '72%' : '87.5%',
          left: isClicked ? '70%' : '75%',
          width: isClicked ? '50px' : '60px',
          height: isClicked ? '50px' : '60px',
          transition: 'top 0.5s ease, left 0.5s ease, width 0.5s ease, height 0.5s ease',
          outline: 'none',
          boxShadow: 'none',
        }}

      >
        <motion.div
          initial={{ rotate: 45 }}
          animate={{ rotate: isClicked ? 0 : 45 }}
          transition={{ duration: 0.3 }}
          className={`mt-2 ${styles.symbol}`}
          tabIndex={-1}
        >
          <ImCross 
            style={{
              marginRight: isClicked ? '0' : '5px',
            }}
            />
        </motion.div>
      </motion.div>
    </>
  );
};

export default SideSphere;