import { ReviewType } from "@/types";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const reviewService = {
  addReview: async function (body: ReviewType) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

  getMedicineReviews: async function (medicineId: string) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/review/${medicineId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
  },
};
