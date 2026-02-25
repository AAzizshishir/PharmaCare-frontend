const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.API_URL;

export const cartService = {
  addToCart: async function (id: string, quantity: number) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/cart/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
        next: { revalidate: 60 },
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        return { message: data.message || "Failed" };
      } else {
        return data;
      }
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteCartItem: async function (id: string) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
  },
};
