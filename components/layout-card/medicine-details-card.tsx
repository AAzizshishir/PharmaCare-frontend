"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { addToCart } from "@/app/actions/cart.actions";
import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types";
import Image from "next/image";

interface MedicineData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  brandName: string;
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
  const { id, name, brandName, imageUrl, description, price, stock, category } =
    medicineDetails;
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
    <div className="container mx-auto border border-blue-500 rounded p-4">
      {/* Top section: image + details */}
      <div className="flex gap-6">
        {/* Left side: Image */}
        <div className="w-1/3 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={name}
            width={100}
            height={100}
            className="object-cover rounded"
          />
        </div>

        {/* Right side: Info */}
        <div className="w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{name}</h1>
            <p className="font-semibold text-xl mb-1">Price: ৳{price}</p>
            <p className="text-gray-700 mb-1">Brand: {brandName}</p>
            <p className="text-gray-700 mb-1">Stock: {stock}</p>
            <p className="text-gray-700 mb-1">Category: {category.name}</p>
          </div>

          {role === "CUSTOMER" && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
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
              <Button
                onClick={() => handleAddToCart(id, quantity)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Add To Cart
              </Button>
            </div>
          )}
          {!session && (
            <p className="text-lg text-red-600 font-medium">
              Please login for order
            </p>
          )}
        </div>
      </div>

      {/* Bottom section: Description */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default MedicineDetailsCard;
