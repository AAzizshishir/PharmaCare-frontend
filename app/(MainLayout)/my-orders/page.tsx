import MyOrdersCard from "@/components/my-orders";
import { OrderCardProps } from "@/types";
import { cookies } from "next/headers";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const MyOrderPage = async () => {
  const cookieStore = await cookies();
  const ordersRes = await fetch(`${PUBLIC_API_URL}/api/orders`, {
    next: { revalidate: 60 },
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  const orders = await ordersRes.json();
  const ordersData = orders?.data;
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
