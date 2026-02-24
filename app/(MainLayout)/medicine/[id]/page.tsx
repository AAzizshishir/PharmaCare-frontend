import MedicineDetailsCard from "@/components/medicine-details-card";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";

const MedicinePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const medicine = await medicineService.getMedicineById(id);
  const medicineDetails = medicine.data;

  return (
    <div>
      <MedicineDetailsCard medicineDetails={medicineDetails} />
    </div>
  );
};

export default MedicinePage;
