"use server";

import { cookies } from "next/headers";
import { ReviewType } from "@/types";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addReview = async (body: ReviewType) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(body),
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

export const getMedicineReviews = async (medicineId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/review/${medicineId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
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

export const getCustomerReviews = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${PUBLIC_API_URL}/api/review`, {
      method: "GET",
      headers: {
        cookie: cookieStore.toString(),
      },
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

export const getSellerReviews = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${PUBLIC_API_URL}/api/seller/review`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieStore.toString(),
      },
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

export const deleteReview = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/review/${id}`, {
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
        error: { message: data.message || "Failed to delete review" },
      };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};
