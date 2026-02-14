import MedicineCard from "@/components/medicineCard";
import { medicineService } from "@/services/medicine.service";
import { MedicineData } from "@/types";

const MedicinePage = async () => {
  const medicines = await medicineService.getMedicine();
  console.log(medicines);
  return (
    <div className="grid grid-cols-3 gap-4 container mx-auto">
      {medicines.data.map((data: MedicineData) => (
        <MedicineCard key={data.id} medicine={data} />
      ))}
    </div>
  );
};

export default MedicinePage;
