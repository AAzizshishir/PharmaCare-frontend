import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { OrderTypes } from "@/types";

const AdminOrdersCard = ({ orderItem }: { orderItem: OrderTypes }) => {
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
      </div>
    </div>
  );
};

export default AdminOrdersCard;
