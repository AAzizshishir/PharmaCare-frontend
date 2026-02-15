import Link from "next/link";
import { MedicineData } from "./../types/medicine.type";
import { Button } from "./ui/button";

const MedicineCard = ({ medicine }: { medicine: MedicineData }) => {
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
        <Button>
          <Link href={`/medicine/${medicine.id}`}>See Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default MedicineCard;
