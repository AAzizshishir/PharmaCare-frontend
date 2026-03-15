"use server";

import { MedicineInput } from "@/types";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface getMedicineParams {
  brandName?: string;
  categoryName?: string;
  searchTerm?: string;
}

export const getMedicine = async (params?: getMedicineParams) => {
  try {
    const url = new URL(`${API_URL}/api/medicines`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value);
        }
      });
    }
    const res = await fetch(url.toString(), {
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
    console.error(error);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const getTopRatedMedicine = async () => {
  try {
    const res = await fetch(`${API_URL}/api/medicines/top-rated`);
    const data = await res.json();

    if (data.success) {
      return data;
    } else {
      return {
        error: { message: data.message || "Failed to get top rated medicine" },
      };
    }
  } catch (error) {
    console.error(error);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const getMedicineById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/medicine/${id}`);
    const data = await res.json();

    if (data.success) {
      return data;
    } else {
      return {
        error: { message: data.message || "Failed to get medicine" },
      };
    }
  } catch (error) {
    console.error(error);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const getMedicineBySeller = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/seller/medicines`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();

    if (data.success) {
      return data;
    } else {
      return { data: null, error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const postMedicineBySeller = async ({
  value,
}: {
  value: MedicineInput;
}) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${PUBLIC_API_URL}/api/seller/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      return { error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const editMedicineBySeller = async ({
  id,
  value,
}: {
  id: string;
  value: MedicineInput;
}) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${PUBLIC_API_URL}/api/seller/medicine/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      return { error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const deleteMedicineBySeller = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${PUBLIC_API_URL}/api/seller/medicine/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
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
