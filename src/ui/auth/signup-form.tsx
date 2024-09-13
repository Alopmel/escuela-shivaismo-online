"use client";

import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { IoEyeOff, IoEye } from 'react-icons/io5'; // Importar iconos de react-icons
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignUp } from "@/lib/cognitoActions";
import { motion } from 'framer-motion';
import { CSSProperties } from "react";
import Image from 'next/image';
import logoRed from '../../../public/logo_red.png'; // Asegúrate de que la ruta sea correcta
import logoGreen from '../../../public/logo_green.png'; // Asegúrate de que la ruta sea correcta

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

const shadowAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const translateErrorMessage = (message: string): string => {
  const errorMessages: { [key: string]: string } = {
    "User already exists": "El usuario ya existe",
    "Incorrect username or password": "Nombre de usuario o contraseña incorrectos",
    "User is not confirmed": "El usuario no está confirmado",
    "Password does not conform to policy": "La contraseña no cumple con la política",
    "Invalid verification code provided": "Código de verificación proporcionado inválido",
    "Username cannot be empty": "El nombre de usuario no puede estar vacío",
    "Password did not conform with policy: Password must have uppercase characters.": "La contraseña debe contener un carácter en mayúscula"
    // Agrega más mapeos según sea necesario
  };

  return errorMessages[message] || message;
};

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleSignUp, undefined);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para gestionar la visibilidad de la contraseña

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
    if (errorMessage) {
      // console.log("Error de Cognito:", errorMessage); // Añadido console.log para ver errores de Cognito
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [errorMessage]); // Cambiado a errorMessage para reaccionar a cambios en este estado

  const handlePasswordFocus = (e: FocusEvent<HTMLInputElement>) => {
    setShowPasswordRequirements(true);
  };

  const handlePasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    setShowPasswordRequirements(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const passwordMeetsCriteria = (criteria: string): boolean => {
    switch (criteria) {
      case 'minLength':
        return password.length >= 8;
      case 'number':
        return /\d/.test(password);
      case 'specialChar':
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
      case 'uppercase':
        return /[A-Z]/.test(password);
      case 'lowercase':
        return /[a-z]/.test(password);
      default:
        return false;
    }
  };

  // Cambia el tipo de retorno de getLogoSrc a JSX.Element
  const getLogoSrc = (criteria: string): JSX.Element => {
    return (
      <Image
        src={passwordMeetsCriteria(criteria) ? logoGreen : logoRed}
        alt="Logo"
        width={11}
        height={15}
      />
    );
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
      {showError && errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[60%] sm:w-3/5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg text-sm z-50">
          <button
            className="absolute top-2 right-2 p-1 text-red-700 border-none bg-transparent"
            onClick={handleCloseError}
            aria-label="Cerrar mensaje de error"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          
          <ExclamationCircleIcon className="inline h-5 w-5 mr-2" />
          {translateErrorMessage(errorMessage)}
        </div>
      )}

      <form action={dispatch} className="space-y-3 stageF">
        <motion.div
          className="ballF"
          style={containerStyle}
          variants={levitateAnimation}
          animate={isAnimating ? "animate" : ""}
        >
          <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', zIndex: -1 }}>
            <motion.div 
              style={{ width: isDesktop ? '300px' : '150px', height: isDesktop ? '50px' : '25px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.2)', filter: 'blur(10px)' }}
              variants={shadowAnimation}
              animate={isAnimating ? "animate" : ""}
            />
          </div>
          <Image src="/logo.svg" alt="Logo" className='logo-white'  width={isDesktop ? 100 : 50} height={isDesktop ? 100 : 50} priority style={imageStyle} />
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <h2 className="mb-4 text-white" style={{ fontSize: '1.5rem' }}> Crea tu cuenta </h2>
            </div> 
            <div className="relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border py-[9px] pl-14 outline-2 placeholder:text-[#c7aacc]"
                id="name"
                type="text"
                name="name"
                minLength={4}
                placeholder="Inserta tu nombre"
                required
                style={{ 
                  fontSize: isDesktop ? '1rem' : '0.75rem',
                  borderColor: '#BB42CE', // Borde del color neón
                  boxShadow: '0 0 8px #BB42CE, 0 0 15px #BB42CE', // Estilo de neón
                  color: '#422147', // Color del texto del input
                }}
              />
              <UserCircleIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#c7aacc] peer-focus:text-[#c7aacc]" />
              </div>
            <div className="mt-2 relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border py-[9px] pl-14 outline-2 placeholder:text-[#c7aacc]"
                id="email"
                type="email"
                name="email"
                placeholder="Inserta tu email"
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
            <div className="mt-2 relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border py-[9px] pl-14 outline-2 placeholder:text-[#c7aacc]"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Inserta tu contraseña"
                required
                minLength={8}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
                style={{ 
                  fontSize: isDesktop ? '1rem' : '0.75rem',
                  borderColor: '#BB42CE', // Borde del color neón
                  boxShadow: '0 0 8px #BB42CE, 0 0 15px #BB42CE', // Estilo de neón
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
              {showPasswordRequirements && (
                <div className="absolute top-[2.5rem] left-1/2 transform -translate-x-1/2 w-3/5 p-3 bg-white border border-gray-300 rounded-lg shadow-lg text-sm">
                  <div className="flex items-center mb-2">
                    {getLogoSrc('minLength')}
                    <p className="text-left ml-2" style={{ color: passwordMeetsCriteria('minLength') ? 'green' : 'red' }}>
                      Longitud mínima de 8 caracteres
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    {getLogoSrc('number')}
                    <p className="text-left ml-2" style={{ color: passwordMeetsCriteria('number') ? 'green' : 'red' }}>
                      Contiene 1 número
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    {getLogoSrc('specialChar')}
                    <p className="text-left ml-2" style={{ color: passwordMeetsCriteria('specialChar') ? 'green' : 'red' }}>
                      Contiene 1 carácter especial
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    {getLogoSrc('uppercase')}
                    <p className="text-left ml-2" style={{ color: passwordMeetsCriteria('uppercase') ? 'green' : 'red' }}>
                      Contiene 1 letra mayúscula
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    {getLogoSrc('lowercase')}
                    <p className="text-left ml-2" style={{ color: passwordMeetsCriteria('lowercase') ? 'green' : 'red' }}>
                      Contiene 1 letra minúscula
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <SignUpButton isDesktop={isDesktop} />
        </motion.div>
      </form>
      {/* <motion.div 
        style={{ width: '300px', height: '50px', borderRadius: '50%', marginTop: '65px', background: 'rgba(0, 0, 0, 0.2)', filter: 'blur(10px)' }}
        variants={shadowAnimation}
        animate={isAnimating ? "animate" : ""}
      />  */}
    </motion.div>
  );
}

function SignUpButton({ isDesktop }: { isDesktop: boolean }): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button 
    className={`w-[74%] h-8 mt-4 rounded-full relative overflow-hidden flex items-center justify-end`} // Añadido flex y justify-end para alinear texto a la derecha
    aria-disabled={pending}
    style={{
      fontSize: isDesktop ? '1rem' : '1rem',
      width: '50%',
      backgroundColor: 'white', // Fondo blanco
      border: '2px solid #dfdddf', // Borde con color específico
      boxShadow: '0 0 8px #BB42CE, 0 0 15px #BB42CE', // Estilo de neón
      color: '#BB42CE', // Texto del botón
      zIndex: '-1'
    }}
    >
      <span className="mr-2">Crear Cuenta </span> {/* Añadido margen a la derecha */}
      <ArrowRightIcon className="h-5 w-5 text-[#BB42CE]" />
    </Button>
  );
}
