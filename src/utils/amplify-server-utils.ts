// src/utils/amplify-server-utils.ts
import { authConfig } from "@/app/amplify-cognito-config";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth/server";

const ALLOWED_EMAILS = ['lempola@gmail.com', 'jjquesada.87@gmail.com'];

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return;
        }
        const [userAttributes, currentUser] = await Promise.all([
          fetchUserAttributes(contextSpec),
          getCurrentUser(contextSpec),
        ]);
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        const isAdmin = Array.isArray(groups) && groups.includes("Admins");
        const isAllowedEmail = userAttributes.email && ALLOWED_EMAILS.includes(userAttributes.email);

        const user = {
          ...currentUser,
          ...userAttributes,
          isAdmin: isAdmin,
          isAllowedUser: isAdmin || isAllowedEmail,
        };

        return user;
      } catch (error) {
        //console.log("Error en authenticatedUser:", error);
      }
    },
  });
}