import AdminOrdersCard from "@/components/admin-orders-card";
import { orderService } from "@/services/order.service";
import { OrderTypes } from "@/types";

const OrderPage = async () => {
  const orders = await orderService.getOrdersForAdmin();
  const ordersData = orders.data;
  console.log(orders.data);
  return (
    <div className="container mx-auto">
      {ordersData && ordersData.length > 0 ? (
        <div>
          {ordersData.map((orderItem: OrderTypes) => (
            <AdminOrdersCard key={orderItem.id} orderItem={orderItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">No Orders Available.</p>
      )}
    </div>
  );
};

export default OrderPage;
