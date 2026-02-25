const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

type OrderItemPayload = { medicineId: string; quantity: number };
type OrderType = {
  shippingAddress: string;
  items: OrderItemPayload[];
};

export const orderService = {
  postOrder: async function (orderData: OrderType) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        credentials: "include",
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
  },
};
