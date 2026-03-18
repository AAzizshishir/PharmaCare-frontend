import { getOrdersForUser } from "@/app/actions/order.actions";
import MyOrdersCard from "@/components/my-orders";
import { OrderCardProps } from "@/types";

const MyOrderPage = async () => {
  const result = await getOrdersForUser();
  const ordersData = result?.data;
  return (
    <div className="container mx-auto">
      {ordersData && ordersData.length > 0 ? (
        <div>
          {ordersData.map((orderItem: OrderCardProps) => (
            <MyOrdersCard key={orderItem.id} orderItem={orderItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">Your have no orders.</p>
      )}
    </div>
  );
};

export default MyOrderPage;
