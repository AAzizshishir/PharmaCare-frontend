import MedicineCard from "@/components/medicineCard";
import { medicineService } from "@/services/medicine.service";
import { MedicineData } from "@/types";

const AdminMedicinePage = async () => {
  const medicines = await medicineService.getMedicine();
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 container mx-auto">
        {medicines.data.map((data: MedicineData) => (
          <MedicineCard key={data.id} medicine={data} />
        ))}
      </div>
    </div>
  );
};

export default AdminMedicinePage;
