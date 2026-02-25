import CartCard from "@/components/cart-card";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";

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
  const items = data?.data?.items;
  return (
    <div className="container mx-auto">
      {items && items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item: CartItem) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
          <Button className="bg-blue-400 hover:bg-blue-600 cursor-pointer mt-1">
            <Link href={`/place-order`}>Place Order</Link>
          </Button>
        </>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          Your cart is empty. Add some medicines to continue.
        </p>
      )}
    </div>
  );
};

export default Cart;
