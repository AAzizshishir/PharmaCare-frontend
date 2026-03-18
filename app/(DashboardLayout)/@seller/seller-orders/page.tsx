import { getOrdersForSeller } from "@/app/actions/order.actions";
import SellerOrderCard from "@/components/layout-card/seller-order-card";
import { OrderTypes } from "@/types";

const SellerOrders = async () => {
  const orders = await getOrdersForSeller();
  const ordersData = orders.data;
  return (
    <div className="container mx-auto">
      {ordersData && ordersData.length > 0 ? (
        <div>
          {ordersData.map((orderItem: OrderTypes) => (
            <SellerOrderCard key={orderItem.id} orderItem={orderItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">Your have no orders.</p>
      )}
    </div>
  );
};

export default SellerOrders;
