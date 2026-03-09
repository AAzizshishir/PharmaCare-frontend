import { getMedicine } from "@/app/actions/medicine.actions";
import MedicineCard from "@/components/medicineCard";
import { MedicineData } from "@/types";

const AdminMedicinePage = async () => {
  const medicines = await getMedicine();
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
