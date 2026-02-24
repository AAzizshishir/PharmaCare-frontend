import CartCard from "@/components/cart-card";
import { CartItem } from "@/types";
import { cookies } from "next/headers";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const Cart = async () => {
  const cookieStore = await cookies();
  const cart = await fetch(`${PUBLIC_API_URL}/api/cart`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    next: { revalidate: 60 },
  });
  const data = await cart.json();
  const items = data.data.items;
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item: CartItem) => (
        <CartCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Cart;
