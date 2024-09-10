"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CSSProperties } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { IoEyeOff, IoEye } from 'react-icons/io5'; // Importar iconos de react-icons
import { Button } from '@/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { handleSignIn } from '@/lib/cognitoActions';

// Función para traducir los mensajes de error al español
const translateErrorMessage = (message: string): string => {
  const errorMessages: { [key: string]: string } = {
    "User already exists.": "El usuario ya existe",
    "Incorrect username or password.": "Nombre de usuario o contraseña incorrectos",
    "User is not confirmed.": "El usuario no está confirmado",
    "Password does not conform to policy.": "La contraseña no cumple con la política",
    "Invalid verification code provided.": "Código de verificación proporcionado inválido",
    "Username cannot be empty.": "El nombre de usuario no puede estar vacío",
    "Password did not conform with policy: Password must have uppercase characters.": "La contraseña debe contener un carácter en mayúscula"
    // Agrega más mapeos según sea necesario
  };

  return errorMessages[message] || "Error desconocido";
};

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(!!errorMessage);
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para gestionar la visibilidad de la contraseña

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

  // Animaciones para el cambio de página
  const pageTransition = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  // Animación para el efecto de levitación
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

  // Animación para el efecto de sombra
  const shadowAnimation = {
    animate: {
      scale: [1, 1.1, 1], // La sombra se hace más grande y más pequeña
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
    marginBottom: isDesktop ? '30px' : '15px',
    marginTop: isDesktop ? '-30px' : '-25px'
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    <motion.div 
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' , overflow: 'hidden' }}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
    >
      {/* Mensaje de error */}
      {showError && errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg text-sm z-50 flex items-center justify-between">
          <div className="flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-500" />
            <p>{translateErrorMessage(errorMessage)}</p>
          </div>
          <button onClick={closeError} className="ml-2 text-red-500 hover:text-red-700 border-none bg-transparent">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <form action={dispatch} className="space-y-3 stageF">
        <motion.div
          className="ballF"
          style={containerStyle}
          variants={levitateAnimation}
          animate={isAnimating ? "animate" : ""}
        >
          <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', zIndex: -1 }}>
            <motion.div 
              style={{ width: isDesktop ? '300px' : '150px', height: isDesktop ? '50px' : '25px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.2)', filter: 'blur(10px)' }}
              variants={shadowAnimation}
              animate={isAnimating ? "animate" : ""}
            />
          </div>
          <Image src="/logo.svg" alt="Logo" className='logo-white' width={isDesktop ? 100 : 90} height={isDesktop ? 100 : 90} priority style={imageStyle} />

          <div className="w-full flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-14 outline-2 placeholder:text-[#c7aacc] placeholder:peer-focus:text-[#c7aacc]"                  
                id="email"
                type="email"
                name="email"
                placeholder="Introduce tu email"
                required
                style={{ 
                  fontSize: isDesktop ? '1rem' : '0.75rem',
                  borderColor: '#BB42CE', // Borde del color neón
                  boxShadow: '0 0 6px #BB42CE, 0 0 12px #BB42CE', // Estilo de neón ajustado
                  color: '#422147', // Color del texto del input 
                }}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#c7aacc] peer-focus:text-[#c7aacc]" />
            </div>
            <div className="mt-4 relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-14 outline-2 placeholder:text-[#c7aacc] placeholder:peer-focus:text-[#c7aacc]"                  
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Introduce tu contraseña"
                required
                minLength={6}
                style={{ 
                  fontSize: isDesktop ? '1rem' : '0.75rem',
                  borderColor: '#BB42CE', // Borde del color neón
                  boxShadow: '0 0 6px #BB42CE, 0 0 12px #BB42CE', // Estilo de neón ajustado
                  color: '#422147', // Color del texto del input 
                }}
              />
              <KeyIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#c7aacc] peer-focus:text-[#c7aacc]" />
              {showPassword ? (
                <IoEye
                  className="absolute right-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-[#c7aacc]"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeOff
                  className="absolute right-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-[#c7aacc]"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
          <LoginButton isDesktop={isDesktop} />
          <div className="flex justify-center">
            <Link
              href="/auth/reset-password/submit"
              className="mt-2 cursor-pointer text-white"
              style={{ fontSize: isDesktop ? '1.2rem' : '0.75rem' , marginTop: '28px' }}
            >
              Olvidaste la contraseña?
            </Link>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

function LoginButton({ isDesktop }: { isDesktop: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button 
      className={`w-[75%] h-8 mt-4 rounded-full`} // Botón con borde redondeado
      aria-disabled={pending} 
      style={{ 
        fontSize: isDesktop ? '1.1rem' : '0.75rem',
        backgroundColor: 'transparent', // Fondo transparente
        border: 'none', // Sin borde
        color: 'white', // Color de texto neón
        display: 'flex', // Alinea los elementos en fila
        alignItems: 'center', // Alinea verticalmente
        justifyContent: 'flex-end' // Alinea horizontalmente a la derecha
      }}
    >      
      Acceder 
      <ArrowRightIcon className="ml-2 h-5 w-5 text-[white]" /> {/* Flecha a la derecha del texto */}
    </Button>
  );
}
