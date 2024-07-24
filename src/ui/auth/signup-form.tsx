"use client";

import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignUp } from "@/lib/cognitoActions";
import { motion } from 'framer-motion';
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

  return errorMessages[message] || "Error desconocido";
};

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleSignUp, undefined);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      console.log("Error de Cognito:", errorMessage); // Añadido console.log para ver errores de Cognito
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

  return (
    <motion.div 
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
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

      <form action={dispatch} className="space-y-3">
        <motion.div
          style={{ 
            borderRadius: '50%', 
            background: 'radial-gradient(circle at 50% 50%, #cc8cc3, #ca1eb3)', 
            width: '400px', 
            height: '400px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            alignItems: 'center' , 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            boxShadow: '0 0 30px rgba(0,0,0,0.4)' 
          }}
          variants={levitateAnimation}
          animate={isAnimating ? "animate" : ""}   
        >
          <Image src="/logo_login.png" alt="Logo" width={50} height={50} priority style={{ marginTop: '15px' }}/>
          <h1 className="mb-3 text-white text-[26px]">
            Crear Cuenta
          </h1>
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"                  
                id="name"
                type="text"
                name="name"
                minLength={4}
                placeholder="Inserta tu nombre"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="mt-2 relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"                  
                id="email"
                type="email"
                name="email"
                placeholder="Inserta tu email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="mt-2 relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"                  
                id="password"
                type="password"
                name="password"
                placeholder="Inserta tu contraseña"
                required
                minLength={8}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
              />
              <KeyIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              {showPasswordRequirements && (
                <div className="absolute top-[2.5rem] left-1/2 transform -translate-x-1/2 w-3/5 p-3 bg-white border border-gray-300 rounded-lg shadow-lg text-sm z-100">
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
          <SignUpButton />
        </motion.div>
      </form>
      <motion.div 
        style={{ width: '300px', height: '50px', borderRadius: '50%', marginTop: '65px', background: 'rgba(0, 0, 0, 0.2)', filter: 'blur(10px)' }}
        variants={shadowAnimation}
        animate={isAnimating ? "animate" : ""}
      /> 
    </motion.div>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-[71%] h-8 mt-4 rounded-full" aria-disabled={pending}>
      Crear Cuenta <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
