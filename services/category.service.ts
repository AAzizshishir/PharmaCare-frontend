const API_URL = process.env.API_URL;

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
};
