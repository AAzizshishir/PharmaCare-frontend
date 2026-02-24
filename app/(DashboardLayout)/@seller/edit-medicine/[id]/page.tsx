import EditMedicineCard from "@/components/editMedicineCard";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";

const EditMedicine = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const categories = await categoryService.getCategories();
  const medicine = await medicineService.getMedicineById(id);
  return (
    <div>
      <EditMedicineCard id={id} categories={categories} medicine={medicine} />
    </div>
  );
};

export default EditMedicine;
