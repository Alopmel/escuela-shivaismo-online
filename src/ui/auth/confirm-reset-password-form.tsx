"use client";

import { useState, useEffect, FocusEvent, ChangeEvent } from "react";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  XMarkIcon, // Importa el ícono de la cruz
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmResetPassword } from "@/lib/cognitoActions";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CSSProperties } from "react";
import logoGreen from '../../../public/logo_green.png'; // Asegúrate de que la ruta sea correcta
import logoRed from '../../../public/logo_red.png'; // Asegúrate de que la ruta sea correcta

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

export default function ConfirmResetPasswordForm() {
  const [errorMessage, dispatch] = useFormState(
    handleConfirmResetPassword,
    undefined
  );
  const [showError, setShowError] = useState(true);

  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [password, setPassword] = useState<string>('');

  const handlePasswordFocus = (e: FocusEvent<HTMLInputElement>) => {
    setShowPasswordRequirements(true);
  };

  const handlePasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    setShowPasswordRequirements(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
    background: 'radial-gradient(circle at 50% 50%, #cc8cc3, #ca1eb3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 0 30px rgba(0,0,0,0.4)',
    width: isDesktop ? '400px' : '345px',
    height: isDesktop ? '400px' : '345px'
  };

  const imageStyle: CSSProperties = {
    marginBottom: isDesktop ? '30px' : '15px',
    marginTop: isDesktop ? '50px' : '25px'
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
      {errorMessage && showError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[60%] sm:w-3/5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg text-sm z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ExclamationCircleIcon className="inline h-5 w-5 mr-2" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowError(false)}
              className="text-red-700 hover:text-red-900 border-none bg-transparent"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      <form action={dispatch} className="space-y-3">
        <motion.div
          style={containerStyle}
          variants={levitateAnimation}
          animate={isAnimating ? "animate" : ""}
        >
          <Image src="/logo_login.png" alt="Logo" width={isDesktop ? 100 : 90} height={isDesktop ? 100 : 90} priority style={imageStyle} />
          <div className="w-full flex flex-col items-center mt-[-12px]">
            <div className="relative w-full flex justify-center">
                <input
                  className="peer block w-[52%] h-[1rem] rounded-full border border-gray-200 py-[9px] pl-14 outline-2 placeholder:text-gray-500 mb-[-7px]"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  style={{ fontSize: isDesktop ? '1rem' : '0.75rem' }}
                />
                <AtSymbolIcon className="pointer-events-none absolute left-[5.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="mt-4 relative w-full flex justify-center">
              <input
                className="peer block w-[52%] h-[1rem] rounded-full border border-gray-200 py-[9px] pl-14 outline-2 placeholder:text-gray-500 mb-[-7px]"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
                style={{ fontSize: isDesktop ? '1rem' : '0.75rem' }}
              />
              <KeyIcon className="pointer-events-none absolute left-[5.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"  />
              {showPasswordRequirements && (
                <div className="absolute top-[2.5rem] left-1/2 transform -translate-x-1/2 w-3/5 p-3 bg-white border border-gray-300 rounded-lg shadow-lg text-sm z-40">
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
            <div className="mt-4 relative w-full flex justify-center">
                <input
                  className="peer block w-[52%] h-[1rem] rounded-full border border-gray-200 py-[9px] pl-14 outline-2 placeholder:text-gray-500"
                  id="code"
                  type="text"
                  name="code"
                  placeholder="Código de confirmación"
                  required
                  minLength={6}
                  style={{ fontSize: isDesktop ? '1rem' : '0.75rem' }}
                />
                <KeyIcon className="pointer-events-none absolute left-[5.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"  />
            </div>
          </div>
          <ResetPasswordButton isDesktop={isDesktop} />
        </motion.div>
      </form>
      <motion.div 
        style={{ width: isDesktop ? '300px' : '150px', height: isDesktop ? '50px' : '25px', borderRadius: '50%', marginTop: '65px', background: 'rgba(0, 0, 0, 0.2)', filter: 'blur(10px)' }}
        variants={shadowAnimation}
        animate={isAnimating ? "animate" : ""}
      />          
    </motion.div>
  );
}

function ResetPasswordButton({ isDesktop }: { isDesktop: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-[65%] h-8 mt-4 rounded-full" aria-disabled={pending} style={{ fontSize: isDesktop ? '1rem' : '0.75rem' }}>
      Resetear contraseña <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
