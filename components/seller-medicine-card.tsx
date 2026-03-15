"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { MedicineData } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteMedicineBySeller } from "@/app/actions/medicine.actions";
import Image from "next/image";

const SellerMedicineCard = ({ medicine }: { medicine: MedicineData }) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Medicine");
    try {
      const data = await deleteMedicineBySeller(id);

      if (data.error) {
        toast.error(data.error.message, { id: toastId });
        return;
      }

      toast.success("Medicine Deleted Successfull", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };
  return (
    <div className="flex items-center border rounded-[2px] p-4 shadow-md">
      {/* Left side: Image */}
      <div className="w-1/3">
        <Image
          src={medicine?.imageUrl}
          alt={medicine.name}
          className="w-full h-auto rounded"
          width={100}
          height={100}
        />
      </div>

      {/* Right side: Name, Price, Button */}
      <div className="w-2/3 pl-6">
        <Link
          href={`/medicine/${medicine.id}`}
          className="hover:text-blue-500 font-medium text-slate-500"
        >
          {medicine.name}
        </Link>
        <p className="text-blue-600 text-base font-semibold mt-2">
          {`Price: ৳${medicine.price}`}
        </p>
        <div className="flex justify-between mt-2">
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
    // <div>
    //   <div className="max-w-sm rounded-lg border shadow-md p-4 bg-white">
    //     <h2 className="text-lg font-bold text-gray-800">{medicine.name}</h2>
    //     <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>

    //     <div className="flex justify-between items-center mb-2">
    //       <span className="text-green-600 font-semibold">
    //         ${medicine.price}
    //       </span>
    //       <span className="text-gray-500 text-sm">Stock: {medicine.stock}</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <Button className="bg-blue-400 hover:bg-blue-600 cursor-pointer">
    //         <Link href={`/medicine/${medicine.id}`}>See Details</Link>
    //       </Button>
    //       <Button className="bg-blue-400 hover:bg-blue-600 cursor-pointer">
    //         <Link href={`/edit-medicine/${medicine.id}`}>Edit</Link>
    //       </Button>
    //       <Button
    //         onClick={() => handleDelete(medicine.id)}
    //         className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
    //       >
    //         Delete
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SellerMedicineCard;
