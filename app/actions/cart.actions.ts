"use server";

import { cookies } from "next/headers";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCartItems = async () => {
  try {
    const cookieStore = await cookies();
    const cart = await fetch(`${PUBLIC_API_URL}/api/cart`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      next: { revalidate: 60 },
    });
    const data = await cart.json();
    if (data.success) {
      return data;
    } else {
      return {
        error: { message: data.message || "Failed to delete medicine" },
      };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const addToCart = async (id: string, quantity: number) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${PUBLIC_API_URL}/api/cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ quantity }),
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      return {
        error: { message: data.message || "Failed to delete medicine" },
      };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${PUBLIC_API_URL}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      next: { revalidate: 60 },
    });

    const data = await res.json();

    if (data.success) {
      return data;
    } else {
      return {
        error: { message: data.message || "Failed to delete medicine" },
      };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};
