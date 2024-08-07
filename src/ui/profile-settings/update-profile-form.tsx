"use client";
import React from "react";
import { ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleUpdateUserAttribute } from "@/lib/cognitoActions";
import { useUser } from "@/app/context/UserContext"; // Importa el hook del contexto
import styles from './userProfile.module.css'; // Importar estilos CSS

export default function UpdateProfileForm() {
  const { user } = useUser(); // Obtén el usuario del contexto

  const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");

  return (
    <form action={dispatch} className={styles.formContainer}>
      <div className={`${styles.formBox} ${styles.glasmorphism}`}>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm text-white font-medium">
            Nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                type="text"
                name="name"
                minLength={4}
                placeholder="Introduce tu nombre"
                required
                defaultValue={user?.name}
                className={`${styles.formInput} peer`}
              />
              <UserIcon className={`${styles.formIcon} pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500`} />
            </div>
            <div>
              <input
                id="current_name"
                type="hidden"
                name="current_name"
                defaultValue={user?.name}
              />
            </div>
          </div>
        </div>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                Ha habido un error actualizando tu nombre.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">
              Tu nombre ha sido actualizado correctamente.
            </p>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <UpdateButton />
        </div>
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();

  return <Button aria-disabled={pending}>Actualizar nombre</Button>;
}
