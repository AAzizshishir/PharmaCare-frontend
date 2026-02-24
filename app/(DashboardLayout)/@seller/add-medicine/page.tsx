import AddMedicine from "@/components/addMedicine";
import { categoryService } from "@/services/category.service";

const AddMedicinePage = async () => {
  const categories = await categoryService.getCategories();
  return (
    <div>
      <AddMedicine categories={categories} />
    </div>
  );
};

export default AddMedicinePage;
