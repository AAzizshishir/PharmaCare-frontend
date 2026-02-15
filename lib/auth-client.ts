import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.API_URL,
});

// export const { signIn, signUp, useSession } = createAuthClient();
