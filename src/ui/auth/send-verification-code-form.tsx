"use client";

import {
  ArrowRightIcon,
  ExclamationCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { handleSendEmailVerificationCode } from "@/lib/cognitoActions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../button";
import { useState, useEffect } from "react";

export default function SendVerificationCode() {
  const [response, dispatch] = useFormState(handleSendEmailVerificationCode, {
    message: "",
    errorMessage: "",
  });
  const [showError, setShowError] = useState<boolean>(!!response.errorMessage);
  const { pending } = useFormStatus();

  useEffect(() => {
    setShowError(!!response.errorMessage);
  }, [response.errorMessage]);

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      {/* Mensaje de error */}
      {showError && response.errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg text-sm z-50 flex items-center justify-between">
          <div className="flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="ml-2">{response.errorMessage}</p>
          </div>
          <button
            className="ml-2 text-red-500 hover:text-red-700 border-none bg-transparent"
            onClick={handleCloseError}
            aria-label="Cerrar mensaje de error"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Mensaje de éxito */}
      {response.message && !response.errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg text-sm z-50 flex items-center justify-between">
          <div className="flex items-center">
            <p className="ml-2">{response.message}</p>
          </div>
        </div>
      )}

      <Button
        className="w-[71%] h-8 mt-3 rounded-full"
        aria-disabled={pending}
        formAction={dispatch}
      >
        Reenviar código de verificación{" "}
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </>
  );
}
