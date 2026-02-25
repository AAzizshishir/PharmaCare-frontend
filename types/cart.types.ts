import { CategoryTypes } from "./category.type";

export type MedicineTypes = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: CategoryTypes;
};

export type CartItem = {
  id: string;
  cartId: string;
  medicineId: string;
  quantity: number;
  subtotal: number;
  medicine: MedicineTypes;
};

export type CartTypes = {
  id: string;
  userId: string;
  items: CartItem[];
};
