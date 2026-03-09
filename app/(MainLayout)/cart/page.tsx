import { getCartItems } from "@/app/actions/cart.actions";
import CartCard from "@/components/cart-card";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import Link from "next/link";

const Cart = async () => {
  const result = await getCartItems();
  const cartItems = result?.data;

  if (!cartItems || !cartItems.items) {
    return (
      <div className="text-center text-gray-600 mt-6">
        Your cart is empty. Add some medicines to continue.
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      {cartItems.items && cartItems?.items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.items.map((item: CartItem) => (
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
