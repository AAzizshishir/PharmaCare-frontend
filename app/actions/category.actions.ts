"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

type CategoryType = {
  name: string;
  description: string;
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/api/categories`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (data.success) {
      return data;
    }
    return { error: { message: data.message || "Failed to fetch categories" } };
  } catch (error) {
    console.error(error);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const addCategoryByAdmin = async (value: CategoryType) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(value),
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (data.error) {
      return { message: data.message || "Failed" };
    }
    return data;
  } catch (error) {
    console.error(error);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};
