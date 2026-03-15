"use server";

import { cookies } from "next/headers";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.API_URL;

export const getAllUsersForAdmin = async () => {
  try {
    const cookieStore = await cookies();
    const usersRes = await fetch(`${PUBLIC_API_URL}/api/admin/users`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const data = await usersRes.json();
    if (data.success) {
      return data;
    } else {
      return { error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const getSession = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/auth/get-session`, {
      headers: { Cookie: cookieStore.toString() },
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
};

export const updateUserStatus = async (id: string, status: string) => {
  try {
    const cookieStore = await cookies();

    const result = await fetch(`${PUBLIC_API_URL}/api/admin/user/${id}`, {
      next: { revalidate: 60 },
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });

    const data = await result.json();
    if (data.success) {
      return data;
    } else {
      return { error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};
