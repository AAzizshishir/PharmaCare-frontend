export type OrderItem = {
  id: string;
  medicineId: string;
  quantity: number;
  priceAtPurchase: string;
  medicines: {
    name: string;
    price: string;
  };
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
};
