import { getCartItems } from "@/app/actions/cart.actions";
import PlaceOrderCard from "@/components/place-order-card";

const PlaceOrder = async () => {
  const data = await getCartItems();
  const cart = data?.data;

  if (!cart || !cart.items) {
    return <div>No items found or failed to load.</div>;
  }

  return (
    <div className="container mx-auto">
      <PlaceOrderCard cart={cart} />
    </div>
  );
};

export default PlaceOrder;
