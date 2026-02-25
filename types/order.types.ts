import { MedicineData } from "./medicine.type";
import { UserType } from "./user.type";

export type OrderItem = {
  id: string;
  medicineId: string;
  quantity: number;
  priceAtPurchase: string;
  medicines: MedicineData;
};

export type OrderCardProps = {
  id: string;
  customerId: string;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  orderItems: OrderItem[];
  customer: UserType;
};

export type SellerOrderTypes = {
  id: string;
  createdAt: string;
  paymentMethod: string;
  status: string;
  totalAmount: string;
  shippingAddress: string;
  orderItems: OrderItem[];
  customer: UserType;
};

// {
//     id: string;
//     customerId: string;
//     shippingAddress: string;
//     paymentMethod: string;
//     status: string;
//     totalAmount: string;
//     createdAt: string;
//   };
