"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { MedicineData } from "@/types";
import { medicineService } from "@/services/medicine.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SellerMedicineCard = ({ medicine }: { medicine: MedicineData }) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Medicine");
    try {
      const { data, error } = await medicineService.deleteMedicine(id);
      console.log(data);
      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }

      toast.success("Medicine Deleted Successfull", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };
  return (
    <div>
      <div className="max-w-sm rounded-lg border shadow-md p-4 bg-white">
        <h2 className="text-lg font-bold text-gray-800">{medicine.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-green-600 font-semibold">
            ${medicine.price}
          </span>
          <span className="text-gray-500 text-sm">Stock: {medicine.stock}</span>
        </div>
        <div className="flex justify-between">
          <Button className="bg-blue-400 hover:bg-blue-600 cursor-pointer">
            <Link href={`/medicine/${medicine.id}`}>See Details</Link>
          </Button>
          <Button className="bg-blue-400 hover:bg-blue-600 cursor-pointer">
            <Link href={`/edit-medicine/${medicine.id}`}>Edit</Link>
          </Button>
          <Button
            onClick={() => handleDelete(medicine.id)}
            className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerMedicineCard;
