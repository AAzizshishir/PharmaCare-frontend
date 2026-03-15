import Link from "next/link";
import { MedicineData } from "./../types/medicine.type";
import { Button } from "./ui/button";
import Image from "next/image";

const MedicineCard = ({ medicine }: { medicine: MedicineData }) => {
  return (
    <div className="flex items-center border rounded-[2px] py-2 shadow-md">
      {/* Left side: Image */}
      <div className="w-50 h-20 relative">
        <Image
          src={medicine?.imageUrl}
          alt={medicine.name}
          className="w-full h-auto rounded object-contain"
          fill
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
      </div>
    </div>
  );
};

export default MedicineCard;
