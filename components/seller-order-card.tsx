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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { OrderTypes } from "@/types";
import { updateOrderStatus } from "@/app/actions/order.actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SellerOrderCard = ({ orderItem }: { orderItem: OrderTypes }) => {
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

  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (id: string, status: string) => {
    const toastId = toast.loading("Updating status");
    try {
      setLoading(true);
      const res = await updateOrderStatus(id, status);

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Status Update Successfully", { id: toastId });
      router.refresh();
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
      setLoading(false);
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
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Approve Order"
            )}
          </Button>
        )}

        {status === "CONFIRMED" && (
          <Button
            onClick={() => handleUpdateStatus(id, "SHIPPED")}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Mark as Shipped"
            )}
          </Button>
        )}

        {status === "SHIPPED" && (
          <Button
            onClick={() => handleUpdateStatus(id, "DELIVERED")}
            className="bg-cyan-700 hover:bg-cyan-900 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Delivered"
            )}
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
