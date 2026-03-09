"use client";

import { OrderCardProps } from "@/types";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cancelOrder } from "@/app/actions/order.actions";

const MyOrdersCard = ({ orderItem }: { orderItem: OrderCardProps }) => {
  const router = useRouter();
  const {
    id,
    shippingAddress,
    paymentMethod,
    status,
    totalAmount,
    createdAt,
    orderItems,
  } = orderItem;

  const cancellOrder = async (id: string, status: string) => {
    const toastId = toast.loading("Cancelling Order");
    try {
      const res = await cancelOrder(id, status);

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Order Cancelled Successfully", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };
  return (
    <div className="border rounded-md shadow-md p-4">
      <h2 className="font-semibold mb-2">Order #{id}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Placed on {new Date(createdAt).toLocaleString()}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medicine</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.medicines.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>৳{item.priceAtPurchase}</TableCell>
              <TableCell>
                ৳{Number(item.priceAtPurchase) * item.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <p>
            <strong>Shipping:</strong> {shippingAddress}
          </p>
          <p>
            <strong>Payment:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Total:</strong> ${totalAmount}
          </p>
        </div>
        {(status === "PENDING" || status === "CONFIRMED") && (
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => cancellOrder(id, "CANCELLED")}
          >
            Cancel Order
          </Button>
        )}
        {status === "DELIVERED" && (
          <div className="flex flex-col space-y-2">
            {orderItems.map((item) => (
              <Button
                key={item.medicineId}
                asChild
                className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
              >
                <Link
                  href={`/add-review?orderId=${id}&medicineId=${item.medicineId}`}
                >
                  Add Review for {item.medicines.name}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersCard;
