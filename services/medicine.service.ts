const API_URL = process.env.API_URL;

export const medicineService = {
  getMedicine: async function () {
    try {
      const res = await fetch(`${API_URL}/api/medicines`);

      const data = await res.json();

      if (data.success) {
        return data;
      }
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
