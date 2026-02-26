export interface ReviewType {
  medicineId: string | null;
  orderId: string | null;
  rating: number;
  comment: string;
}

export interface ReviewCardProps {
  id: string;
  customer: { id: string; name: string; email: string };
  medicines: { id: string; name: string };
  rating: number;
  comment: string;
  createdAt: string;
}
