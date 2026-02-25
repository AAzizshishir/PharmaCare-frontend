"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { SellerOrderTypes } from "@/types";
import { toast } from "sonner";
import { orderService } from "@/services/order.service";
import { useRouter } from "next/navigation";

const SellerOrderCard = ({ orderItem }: { orderItem: SellerOrderTypes }) => {
  const router = useRouter();
  const {
    id,
    orderItems,
    customer,
    createdAt,
    shippingAddress,
    paymentMethod,
    status,
    totalAmount,
  } = orderItem;

  const handleUpdateStatus = async (id: string, status: string) => {
    const toastId = toast.loading("Updating status");
    try {
      const res = await orderService.updateOrderStatus(id, status);
      console.log(res);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Status Update Successfully", { id: toastId });
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
              <TableCell>${item.priceAtPurchase}</TableCell>
              <TableCell>
                ${Number(item.priceAtPurchase) * item.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm space-y-1">
          <p>
            <strong>Customer Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Customer Email:</strong> {customer.email}
          </p>
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
        {status === "PENDING" && (
          <Button
            onClick={() => handleUpdateStatus(id, "CONFIRMED")}
            className="bg-green-500 hover:bg-green-600 cursor-pointer"
          >
            Approve Order
          </Button>
        )}

        {status === "CONFIRMED" && (
          <Button
            onClick={() => handleUpdateStatus(id, "SHIPPED")}
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            Mark as Shipped
          </Button>
        )}

        {status === "SHIPPED" && (
          <Button disabled className="bg-purple-400 cursor-not-allowed">
            Awaiting Delivery
          </Button>
        )}

        {status === "DELIVERED" && (
          <Button
            onClick={() => handleUpdateStatus(id, "DELIVERED")}
            disabled
            className="bg-gray-400 cursor-not-allowed"
          >
            Delivered
          </Button>
        )}

        {status === "CANCELLED" && (
          <Button disabled variant="destructive" className="cursor-not-allowed">
            Cancelled
          </Button>
        )}
      </div>
    </div>
  );
};

export default SellerOrderCard;
