"use client";

import { cartService } from "@/services/cart.service";
import { CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

const CartCard = ({ item }: { item: CartItem }) => {
  const { medicine, quantity, subtotal } = item;
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting CartItem");
    try {
      const res = await cartService.deleteCartItem(id);

      if (res) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Cart Deleted Successfull", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };

  return (
    <div className="border border-blue-300 rounded p-2">
      <div className="flex justify-between items-center mb-3">
        {/* Left side: Medicine details */}
        <div>
          <h2 className="text-lg font-bold">{medicine.name}</h2>
          <p className="text-sm text-gray-600">{medicine.description}</p>
          <p className="text-sm text-gray-600">Price: ${medicine.price}</p>
          <p className="text-sm text-gray-600">Quantity: {quantity}</p>
        </div>

        {/* Right side: Subtotal */}
        <div>
          <p className="text-md font-semibold">Subtotal: ${subtotal}</p>
        </div>
      </div>
      <div>
        <Button
          onClick={() => handleDelete(item.id)}
          className="bg-blue-400 hover:bg-blue-600 cursor-pointer mt-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
