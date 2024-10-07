'use client'
import { useEffect, useState } from "react";
import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

const ALLOWED_EMAILS = ['albawebdeveloper@gmail.com', 'jjquesada.87@gmail.com'];

interface UserAttributes {
  userId: string;
  username: string;
  name?: string;
  email: string;
  isAdmin: boolean;
  isAllowedUser: boolean;
  [key: string]: any;
}

export default function useAuthUser() {
  const [user, setUser] = useState<UserAttributes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log('Iniciando fetchAuthSession...');
        const session = await fetchAuthSession();
        console.log('Session obtenida:', session);

        if (!session.tokens) {
          console.log('No se encontraron tokens en la sesión');
          setLoading(false);
          return;
        }

        console.log('Obteniendo atributos del usuario y usuario actual...');
        const [userAttributes, currentUser] = await Promise.all([
          fetchUserAttributes(),
          getCurrentUser(),
        ]);

        console.log('Atributos del usuario:', userAttributes);
        console.log('Usuario actual:', currentUser);
        const isAdmin = (session.tokens.accessToken.payload["cognito:groups"] as string[] | undefined)?.includes("Admins") ?? false;
        const isAllowedEmail = ALLOWED_EMAILS.includes(userAttributes.email ?? "");
        console.log('¿Es admin?:', isAdmin);
        console.log('¿Es email permitido?:', isAllowedEmail);

        const userData: UserAttributes = {
          ...currentUser,
          ...userAttributes,
          email: userAttributes.email ?? "",
          isAdmin: isAdmin,
          isAllowedUser: isAdmin || isAllowedEmail,
        };

        console.log('Datos de usuario completos:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        console.log('Carga completa');
        setLoading(false);
      }
    };

    getUser();
  }, []);

//  console.log('Retornando desde useAuthUser:', {
//    user: user ? {
//      userId: user.userId,
//      username: user.username,
//     name: user.name,
//     email: user.email,
//     isAdmin: user.isAdmin,
//     isAllowedUser: user.isAllowedUser
//   } : null, 
//   loading
//  });

  return { 
    user: user ? {
      userId: user.userId,
      username: user.username,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAllowedUser: user.isAllowedUser
    } : null, 
    userId: user?.username ?? null,
    name: user?.name ?? null,
    email: user?.email ?? null,
    loading
  };
}