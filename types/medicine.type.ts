import { CategoryTypes } from "./category.type";

export interface MedicineData {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  sellerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicineDataWithCategory {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  sellerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryTypes;
}
