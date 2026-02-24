import { MedicineData } from "./medicine.type";

export interface CartItem {
  id: string;
  cartId: string;
  medicineId: string;
  quantity: number;
  subtotal: number;
  medicine: MedicineData;
}
