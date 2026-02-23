import AddMedicine from "@/components/addMedicine";
import { categoryService } from "@/services/category.service";
import { CategoryTypes } from "@/types";

const AddMedicinePage = async () => {
  const categories = await categoryService.getCategories();
  return (
    <div>
      <AddMedicine categories={categories} />
    </div>
  );
};

export default AddMedicinePage;
