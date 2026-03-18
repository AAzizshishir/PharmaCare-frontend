import { getMedicine } from "@/app/actions/medicine.actions";
import MedicineCard from "@/components/layout-card/medicineCard";
import { MedicineData } from "@/types";

const AdminMedicinePage = async () => {
  const result = await getMedicine();
  const medicines = result.data.data;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 container mx-auto">
        {medicines.map((data: MedicineData) => (
          <MedicineCard key={data.id} medicine={data} />
        ))}
      </div>
    </div>
  );
};

export default AdminMedicinePage;
