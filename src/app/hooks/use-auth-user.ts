// /src/app/hook/use-auth-user.ts
'use client'
import { useEffect, useState } from "react";
import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

interface UserAttributes {
  userId: string;
  username: string;
  name?: string;
  email: string;
  isAdmin: boolean;
  [key: string]: any;
}

export default function useAuthUser() {
  const [user, setUser] = useState<UserAttributes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log('Fetching user data...');
        const session = await fetchAuthSession();
        if (!session.tokens) {
          setLoading(false);
          return;
        }

        const [userAttributes, currentUser] = await Promise.all([
          fetchUserAttributes(),
          getCurrentUser(),
        ]);

        const userData: UserAttributes = {
          ...currentUser,
          ...userAttributes,
          email: userAttributes.email ?? "",
          isAdmin: (session.tokens.accessToken.payload["cognito:groups"] as string[] | undefined)?.includes("Admins") ?? false,
        };

        console.log('User data fetched:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        console.log('Loading complete.');
        setLoading(false);
      }
    };

    getUser();
  }, []);

  console.log('Returning from useAuthUser:', { user, loading });

  return { 
    user: user ? {
      userId: user.userId,
      username: user.username,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    } : null, 
    userId: user?.username ?? null,
    name: user?.name ?? null,
    email: user?.email ?? null,
    loading
  };
}
