import { getCategories } from "@/app/actions/category.actions";
import AddMedicine from "@/components/addMedicine";

const AddMedicinePage = async () => {
  const categories = await getCategories();
  return (
    <div>
      <AddMedicine categories={categories} />
    </div>
  );
};

export default AddMedicinePage;
