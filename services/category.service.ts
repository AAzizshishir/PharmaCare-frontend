const API_URL = process.env.API_URL;
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

type categoryType = {
  name: string;
  description: string;
};

export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        next: { revalidate: 60 },
      });

      const data = await res.json();
      if (data.success) {
        return data;
      }
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  addCategory: async function (value: categoryType) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
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
};
