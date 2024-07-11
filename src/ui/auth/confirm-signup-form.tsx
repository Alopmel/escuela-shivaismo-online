"use client";

import { lusitana } from "@/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmSignUp } from "@/lib/cognitoActions";
import SendVerificationCode from "./send-verification-code-form";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from "react";

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

export default function ConfirmSignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleConfirmSignUp, undefined);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleInputFocus = () => {
    setIsAnimating(false);
  };
   
  return (
    <motion.div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
    >
      <form action={dispatch} className="space-y-3">
        <motion.div 
          style={{ 
            borderRadius: '50%', 
            background: 'radial-gradient(circle at 50% 50%, #cc8cc3, #ca1eb3)', // Ajusta el tamaño y los colores aquí
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
            Confirma tu cuenta
          </h1>
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full flex justify-center">
                <input
                  className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"                  
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Inserta tu email"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"  />
            </div>
            <div className="mt-4 relative w-full flex justify-center">
                <input
                  className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"                  
                  id="code"
                  type="text"
                  name="code"
                  placeholder="Inserta el código"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"  />
              </div>
          </div>
          <ConfirmButton />
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
          <SendVerificationCode />
        </motion.div>
      </form>
      <motion.div 
        style={{ width: '300px', height: '50px', borderRadius: '50%', marginTop: '65px', background: 'rgba(0, 0, 0, 0.2)', filter: 'blur(10px)' }} // Added blur filter for diffused effect
        variants={shadowAnimation}
        animate={isAnimating ? "animate" : ""}
      />
    </motion.div>    
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-[71%] h-8 mt-4 rounded-full" aria-disabled={pending}>
      Confirmar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}