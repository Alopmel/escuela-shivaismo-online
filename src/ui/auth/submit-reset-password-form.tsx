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

      <form action={dispatch} className="space-y-3">
        <motion.div
          style={containerStyle}
          variants={levitateAnimation}
          animate={isAnimating ? "animate" : ""}
        >
          <Image src="/logo_login.png" alt="Logo" width={isDesktop ? 100 : 50} height={isDesktop ? 100 : 50} priority style={imageStyle} />
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <h2 className="mb-4 text-white" style={{ fontSize: '1.5rem' }}> Recupera tu contraseña</h2>
            </div> 
            <div className="relative w-full flex justify-center">
              <input
                className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-14 outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Introduce tu email"
                required
                style={{ fontSize: isDesktop ? '1rem' : '0.75rem' }}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>  
          </div>
          <SendConfirmationCodeButton isDesktop={isDesktop} />
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

function SendConfirmationCodeButton({ isDesktop }: { isDesktop: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-[75%] h-8 mt-4 rounded-full" aria-disabled={pending} style={{ fontSize: isDesktop ? '1rem' : '1rem' }}>
      Enviar código <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
