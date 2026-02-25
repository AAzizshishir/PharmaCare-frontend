import PlaceOrderCard from "@/components/place-order-card";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const PlaceOrder = async () => {
  const cookieStore = await cookies();
  const res = await fetch(`${PUBLIC_API_URL}/api/cart`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    next: { revalidate: 60 },
  });
  const data = await res.json();
  const cart = data?.data;
  console.log(cart);

  return (
    <div className="container mx-auto">
      <PlaceOrderCard cart={cart} />
    </div>
  );
};

export default PlaceOrder;
