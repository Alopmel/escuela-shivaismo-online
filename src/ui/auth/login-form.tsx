"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn } from "@/lib/cognitoActions";
import Link from "next/link";
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

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined);
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
            <Image src="/logo_login.png" alt="Logo" width={100} height={100} priority style={{ marginBottom: '30px', marginTop: '50px' }} />

            <div className="w-full flex flex-col items-center">
              <div className="relative w-full flex justify-center">
                <input
                  className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"                  
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Introduce tu email"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div className="mt-4 relative w-full flex justify-center">
                <input
                  className="peer block w-3/5 h-[1.2rem] rounded-full border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"                  
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Introduce tu contraseña"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-[4.2rem] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <LoginButton />
            <div className="flex justify-center">
              <Link
                href="/auth/reset-password/submit"
                className="mt-2 cursor-pointer text-white"
              >
                Olvidaste la contraseña?
              </Link>
            </div>
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
        style={{ width: '300px', height: '50px', borderRadius: '50%', marginTop: '65px', background: 'rgba(0, 0, 0, 0.2)', filter: 'blur(10px)' }} // Added blur filter for diffused effect
        variants={shadowAnimation}
        animate={isAnimating ? "animate" : ""}
      />          
    </motion.div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-[71%] h-8 mt-4 rounded-full" aria-disabled={pending}>      
      Acceder 
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
