import { getMedicine } from "@/app/actions/medicine.actions";
import MedicineCard from "@/components/medicineCard";
import { MedicineData } from "@/types";

const MedicinePage = async () => {
  const medicines = await getMedicine();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto">
      {medicines.data.map((data: MedicineData) => (
        <MedicineCard key={data.id} medicine={data} />
      ))}
    </div>
  );
};

export default MedicinePage;
