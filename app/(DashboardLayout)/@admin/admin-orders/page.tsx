import { getOrdersForAdmin } from "@/app/actions/order.actions";
import AdminOrdersCard from "@/components/layout-card/admin-orders-card";
import { OrderTypes } from "@/types";

const OrderPage = async () => {
  const orders = await getOrdersForAdmin();
  const ordersData = orders.data;
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
