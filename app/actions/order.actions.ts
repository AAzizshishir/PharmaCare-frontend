"use server";

import { cookies } from "next/headers";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

type OrderItemPayload = { medicineId: string; quantity: number };
type OrderType = {
  shippingAddress: string;
  items: OrderItemPayload[];
};

export const CreateOrder = async (orderData: OrderType) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(orderData),
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

export const getOrdersForUser = async () => {
  try {
    const cookieStore = await cookies();
    const ordersRes = await fetch(`${PUBLIC_API_URL}/api/orders`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const data = await ordersRes.json();
    if (data.success) {
      return data;
    } else {
      return { error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const getOrdersForAdmin = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/orders/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();
    if (data.success) {
      return data;
    }
    return { error: { message: data.message || "Failed" } };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/order/seller/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
      next: { revalidate: 10 },
    });

    const data = await res.json();
    if (data.success) {
      return data;
    }
    return { error: { message: data.message || "Failed" } };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const cancelOrder = async (id: string, status: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${PUBLIC_API_URL}/api/order/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (data.success) {
      return data;
    }
    return { error: { message: data.message || "Failed" } };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};
