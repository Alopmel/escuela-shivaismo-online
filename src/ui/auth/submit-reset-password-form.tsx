"use client";
import { useState, useEffect } from "react";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  XMarkIcon,  // Importa el ícono de cierre
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleResetPassword } from "@/lib/cognitoActions";
import { motion } from 'framer-motion';
import { CSSProperties } from "react";
import Image from 'next/image';
import styles from './auth.module.css'

// Animaciones
const pageTransition = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
};

const levitateAnimation = {
  animate: {
    y: ["0%", "3%", "0%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function SubmitResetPasswordForm() {
  const [errorMessage, dispatch] = useFormState(handleResetPassword, undefined);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(!!errorMessage);

  const handleInputFocus = () => {
    setIsAnimating(false);
  };

  const checkWindowSize = () => {
    if (typeof window !== 'undefined') {
      const windowWidth = window.innerWidth;
      setIsDesktop(windowWidth >= 1024);
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => window.removeEventListener('resize', checkWindowSize);
  }, []);

  useEffect(() => {
    setShowError(!!errorMessage);
  }, [errorMessage]);

  const containerStyle: CSSProperties = {
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Centra el contenido verticalmente
    width: isDesktop ? '450px' : '345px',
    height: isDesktop ? '450px' : '345px',
    position: 'relative', // Necesario para el posicionamiento absoluto de la sombra
  };

  const imageStyle: CSSProperties = {
    marginBottom: isDesktop ? '0px' : '15px',
    marginTop: isDesktop ? '-30px' : '-25px'
  };

  return (
    <motion.div 
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden' }}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
    >
      {/* Mensaje de error */}
      {showError && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[60%] p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg text-sm z-50 flex items-center justify-between">
          <div className="flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <p>{errorMessage}</p>
          </div>
          <button onClick={() => setShowError(false)} className="text-red-700 hover:text-red-900 border-none bg-transparent">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <form action={dispatch} className={`space-y-3 ${styles.stage}`}>
        <motion.div
          className={styles.ball}
          style={containerStyle}
          variants={levitateAnimation}
          animate={isAnimating ? "animate" : ""}
        >
          <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', zIndex: -1 }}>
          </div>
          <Image src="/logo.svg" alt="Logo" className='logo-white'  width={isDesktop ? 100 : 50} height={isDesktop ? 100 : 50} priority style={imageStyle} />
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <h2 className="mb-4 text-white" style={{ fontSize: '1.5rem' }}> Recupera tu contraseña</h2>
            </div> 
            <div className="relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border py-[9px] pl-14 outline-2 placeholder:text-[#c7aacc]"
                id="email"
                type="email"
                name="email"
                placeholder="Introduce tu email"
                required
                style={{ 
                  fontSize: isDesktop ? '1rem' : '0.75rem',
                  borderColor: '#BB42CE', // Borde del color neón
                  boxShadow: '0 0 8px #BB42CE, 0 0 15px #BB42CE', // Estilo de neón
                  color: '#422147', // Color del texto del input
                }}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#c7aacc] peer-focus:text-[#c7aacc]" />
            </div>  
          </div>
          <SendConfirmationCodeButton isDesktop={isDesktop} />
        </motion.div>
      </form>
    </motion.div>
  );
}

function SendConfirmationCodeButton({ isDesktop }: { isDesktop: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={`w-[74%] h-8 mt-4 rounded-full relative overflow-hidden flex items-center justify-end`} // Añadido flex y justify-end para alinear texto a la derecha
      aria-disabled={pending}
      style={{
        fontSize: isDesktop ? '1rem' : '1rem',
        width: '50%' ,
        backgroundColor: 'white', // Fondo blanco
        border: '2px solid #dfdddf', // Borde con color específico
        boxShadow: '0 0 8px #BB42CE, 0 0 15px #BB42CE', // Estilo de neón
        color: '#BB42CE', // Texto del botón
      }}
    >
      <span className="mr-2">Enviar código</span> {/* Añadido margen a la derecha */}
      <ArrowRightIcon className="h-5 w-5 text-[#BB42CE]" />
    </Button>
  );
}
