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

const MyOrdersCard = ({ orderItem }: { orderItem: OrderCardProps }) => {
  console.log(orderItem);
  const {
    id,
    shippingAddress,
    paymentMethod,
    status,
    totalAmount,
    createdAt,
    orderItems,
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
              <TableCell>{item.priceAtPurchase}</TableCell>
              <TableCell>
                ${Number(item.priceAtPurchase) * item.quantity}
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
        <Button variant="destructive">Cancel Order</Button>
      </div>
    </div>
  );
};

export default MyOrdersCard;
