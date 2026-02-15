const API_URL = process.env.API_URL;

export const medicineService = {
  getMedicine: async function () {
    try {
      const res = await fetch(`${API_URL}/api/medicines`, {
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

  getMedicineById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/medicine/${id}`);
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
