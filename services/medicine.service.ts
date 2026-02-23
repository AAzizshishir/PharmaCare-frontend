const API_URL = process.env.API_URL;
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface MedicineDataType {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

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

  postMedicine: async function ({ value }: { value: MedicineDataType }) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/seller/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        return data;
      }
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
