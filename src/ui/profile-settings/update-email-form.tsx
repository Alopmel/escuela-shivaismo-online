"use client";
import React from "react";
import { AtSymbolIcon, ExclamationCircleIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmUserAttribute, handleUpdateUserAttribute } from "@/lib/cognitoActions";
import { useUser } from "@/app/context/UserContext"; // Importa el hook del contexto
import styles from './userProfile.module.css'; // Importar estilos CSS
import { roboto } from "@/app/fonts";

export default function UpdateEmailForm() {
  const { user } = useUser(); // Obtén el usuario del contexto
  const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");
  const [confirmStatus, dispatchConfirm] = useFormState(handleConfirmUserAttribute, undefined);

  return (
    <form action={dispatch} className={styles.formContainer}>
      <div className={`${styles.formBox} ${styles.glasmorphism} ${roboto.className}`}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm text-white font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                defaultValue={user?.email || ""} // Usa el valor del contexto
                className={`${styles.formInput} peer`}
              />
              <AtSymbolIcon className={`${styles.formIcon} pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500`} />
            </div>
            <div>
              <input
                id="current_email"
                type="hidden"
                name="current_email"
                defaultValue={user?.email || ""} // Usa el valor del contexto
              />
            </div>
          </div>
        </div>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                Ha habido un error actualizando el email.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-violet-500">
              El email ha sido actualizado correctamente.
            </p>
          )}
        </div>
        {status?.includes("code") && (
          <>
            <div className="mb-1">
              <label htmlFor="code" className="mb-2 block text-sm font-medium text-white">
                {status}
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="code"
                    type="text"
                    name="code"
                    placeholder="Enter code to verify email"
                    required
                    minLength={6}
                    className={`${styles.formInput} peer`}
                  />
                  <KeyIcon className={`${styles.formIcon} pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500`} />
                </div>
              </div>
            </div>
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
              {confirmStatus === "error" && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500 text-whie">
                    Ha habido un error verificando el email
                  </p>
                </>
              )}
              {confirmStatus === "success" && (
                <p className="text-sm text-green-500">
                  Email verificado correctamente
                </p>
              )}
            </div>
          </>
        )}
        <div className={styles.buttonContainer}>
          {status?.includes("code") ? (
            <VerifyButton dispatch={dispatchConfirm} />
          ) : (
            <UpdateButton />
          )}
        </div>
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();

  return <Button
          aria-disabled={pending}
          className="py-1 px-6 mt-4 mb-3 text-lg text-[#00d1d1] border-2 rounded-full border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_4px_#00d1d1,0_0_8px_#00d1d1,0_0_12px_#00d1d1] hover:bg-[#00d1d1] hover:text-white transition-colors bg-transparent"
         >
          Actualizar Email
         </Button>;
}

function VerifyButton({ dispatch }: { dispatch: (payload: FormData) => void }) {
  const { pending } = useFormStatus();

  return (
    <Button 
      aria-disabled={pending} 
      formAction={dispatch}
      className="py-1 px-6 mt-4 mb-3 text-lg text-[#00d1d1] border-2 rounded-full border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_4px_#00d1d1,0_0_8px_#00d1d1,0_0_12px_#00d1d1] hover:bg-[#00d1d1] hover:text-white transition-colors bg-transparent"
      >
      Verificar Email
    </Button>
  );
}
