'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { unicaOne } from "@/app/fonts";

const levitateAnimation = {
  animate: {
    transform: ["translateY(0%)", "translateY(-2%)", "translateY(0%)"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Home: React.FC = () => {
  const [backgroundClass, setBackgroundClass] = useState('home-background-mob');
  const [ballClass, setBallClass] = useState('ball-mob'); // Nueva clase para la bola

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setBackgroundClass('home-background');
        setBallClass('ball'); // Cambia la clase de la bola en pantallas más grandes
      } else {
        setBackgroundClass('home-background-mob');
        setBallClass('ball-mob'); // Cambia la clase de la bola en pantallas móviles
      }
    };

    handleResize(); // Verificar el tamaño inicial
    window.addEventListener('resize', handleResize); // Escuchar cambios en el tamaño

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el evento al desmontar
    };
  }, []);

  return (
    <div className={`${backgroundClass} flex items-center justify-center`}>
      <motion.section className="stage flex items-center justify-center">
        <Link href="/auth/login">
          <motion.figure
            className={`${ballClass} flex items-center justify-center`} // Usar la clase dinámica para la bola
            animate={levitateAnimation.animate}
          >
            <div className={`" text-white text-center text-2xl px-2 cursor-pointer no-select ${unicaOne.className}`}>
              <div>Accede</div>
              <div>a la Sabiduría</div>
              <div>del Trika</div>
            </div>
          </motion.figure>
        </Link>
      </motion.section>
    </div>
  );
}

export default Home;