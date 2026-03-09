import { getCategories } from "@/app/actions/category.actions";
import { getMedicineById } from "@/app/actions/medicine.actions";
import EditMedicineCard from "@/components/editMedicineCard";

const EditMedicine = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const categories = await getCategories();
  const medicine = await getMedicineById(id);
  return (
    <div>
      <EditMedicineCard id={id} categories={categories} medicine={medicine} />
    </div>
  );
};

export default EditMedicine;
