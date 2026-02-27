"use server";

import { cookies } from "next/headers";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.API_URL;

export const UsersService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      console.log(cookieStore.toString());

      const res = await fetch(`${API_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateUserStatus: async function (id: string, status: string) {
    try {
      const result = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/admin/user/${id}`,
        {
          next: { revalidate: 60 },
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
          credentials: "include",
        },
      );
      const data = await result.json();
      if (data.success) {
        return data;
      } else {
        return { error: { message: data.message || "Failed" } };
      }
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
