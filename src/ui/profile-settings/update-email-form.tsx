"use client";
import React from "react";
import { AtSymbolIcon, ExclamationCircleIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmUserAttribute, handleUpdateUserAttribute } from "@/lib/cognitoActions";
import useAuthUser from "@/app/hooks/use-auth-user";
import styles from './userProfile.module.css'; // Importar estilos CSS

export default function UpdateEmailForm() {
  const user = useAuthUser();
  const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");
  const [confirmStatus, dispatchConfirm] = useFormState(handleConfirmUserAttribute, undefined);

  return (
    <form action={dispatch} className={styles.formContainer}>
      <div className={`${styles.formBox} ${styles.glasmorphism}`}>
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
                defaultValue={user?.email}
                className={`${styles.formInput} peer`}
              />
              <AtSymbolIcon className={`${styles.formIcon} pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500`} />
            </div>
            <div>
              <input
                id="current_email"
                type="hidden"
                name="current_email"
                defaultValue={user?.email}
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
            <p className="text-sm text-green-500">
              El email ha sido actualizado correctamente.
            </p>
          )}
        </div>
        {status?.includes("code") && (
          <>
            <div className="mb-1">
              <label htmlFor="code" className="mb-2 block text-sm font-medium">
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
                  <p className="text-sm text-red-500">
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

  return <Button aria-disabled={pending}>Actualizar Email</Button>;
}

function VerifyButton({ dispatch }: { dispatch: (payload: FormData) => void }) {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} formAction={dispatch}>
      Verificar Email
    </Button>
  );
}
