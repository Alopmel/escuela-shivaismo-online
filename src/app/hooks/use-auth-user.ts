// src/app/hooks/use-auth-user.ts
'use client'
import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

interface UserAttributes {
  userId: string;
  username: string; // Asegúrate de que este campo existe y es el adecuado para userId
  isAdmin: boolean;
  // Añade otros atributos del usuario aquí según sea necesario
  [key: string]: any;
}

export default function useAuthUser() {
  const [user, setUser] = useState<UserAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          setLoading(false);
          return;
        }
        const user = {
          ...(await getCurrentUser()),
          ...(await fetchUserAttributes()),
          isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"] as string[] | undefined;
        user.isAdmin = Boolean(groups && groups.includes("Admins"));
        setUser(user as UserAttributes);
        setUserId(user.username); // Asegúrate de que `username` es el campo adecuado para `userId`
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  return { user, userId, loading };
}
