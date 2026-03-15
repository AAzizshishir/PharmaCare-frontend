import { getCategories } from "@/app/actions/category.actions";
import AddCategoryCard from "@/components/addCategoryCard";
import { CategoryTypes } from "@/types";

const ManageCategoryPage = async () => {
  const categories = await getCategories();
  const category = categories.data;
  return (
    <div>
      <AddCategoryCard />
      <div>
        <h1 className="text-center font-bold text-2xl">Categories</h1>
        {category.map((c: CategoryTypes) => (
          <div key={c.id} className="border border-blue-400 my-2 p-2 rounded">
            <h2 className="text-xl font-semibold mb-2">Name: {c.name}</h2>
            <p className="text-sm font-light">Description: {c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategoryPage;
