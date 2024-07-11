"use client";

import { useState, useEffect } from "react";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmResetPassword } from "@/lib/cognitoActions";
import { motion } from 'framer-motion';
import Image from 'next/image';

  // Animation for change the page
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

  // Animation for the levitating effect
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

  // Animation for the shadow effect
  const shadowAnimation = {
    animate: {
      scale: [1, 1.1, 1], // The shadow gets bigger and smaller
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

  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

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

  const containerStyle = {
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

  const imageStyle = {
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
              minLength={6}
              autoComplete="off"
              style={{ fontSize: isDesktop ? '1rem' : '0.75rem' }}
            />
                <KeyIcon className="pointer-events-none absolute left-[5.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"  />
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
          <div className="flex h-8 items-end space-x-1">
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
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
