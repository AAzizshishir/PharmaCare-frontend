"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { addToCart } from "@/app/actions/cart.actions";
import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types";

interface MedicineData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  category: {
    name: string;
    description: string;
  };
}

const MedicineDetailsCard = ({
  medicineDetails,
}: {
  medicineDetails: MedicineData;
}) => {
  const { id, name, description, price, stock, category } = medicineDetails;
  const [quantity, setQuantity] = useState(1);

  const { data } = useSession();
  const session = data as AppSession | null;
  const role = session?.user.role;

  const handleAddToCart = async (id: string, quantity: number) => {
    const toastId = toast.loading("Adding Medicine To Cart");
    try {
      const res = await addToCart(id, quantity);
      if (!res.success) {
        toast.error(res.message, { id: toastId });
        return;
      }
      toast.success("Medicine Added Successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };

  return (
    <div className="container mx-auto border border-blue-500 rounded p-2">
      <h1 className="text-2xl font-bold my-3">Name : {name}</h1>
      <p>Description : {description}</p>
      <p>Price : ${price}</p>
      <p>Stock : {stock}</p>
      <p>Category : {category.name}</p>
      {role === "CUSTOMER" && (
        <div className="flex items-center gap-2 my-2">
          <Label>Quantity:</Label>
          <Input
            type="number"
            min={1}
            max={stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-blue-300 rounded px-2 py-1 w-20"
          />
        </div>
      )}

      {role === "CUSTOMER" && (
        <Button
          onClick={() => handleAddToCart(id, quantity)}
          className="bg-blue-500 my-2 hover:bg-blue-600 cursor-pointer"
        >
          Add To Cart
        </Button>
      )}
    </div>
  );
};

export default MedicineDetailsCard;
