import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  // baseURL: typeof window !== "undefined" ? window.location.origin : "",
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://pharma-care-1.onrender.com",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, useSession, signOut } = authClient;
