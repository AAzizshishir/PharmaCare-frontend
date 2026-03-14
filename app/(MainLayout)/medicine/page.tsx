import { getMedicine } from "@/app/actions/medicine.actions";
import MedicineCard from "@/components/medicineCard";
import { MedicineData } from "@/types";
import MedicineFilters from "./medicineFilters";
import { getCategories } from "@/app/actions/category.actions";

const MedicinePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  console.log("Search Term:", params.searchTerm);
  console.log("Brand:", params.brandName);
  console.log("Category:", params.category);

  const result = await getMedicine(params);
  const medicines = result.data.data;

  const categories = await getCategories();
  const categoriesData = categories?.data;

  return (
    <div>
      <MedicineFilters medicines={medicines} categoriesData={categoriesData} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto">
        {medicines.map((data: MedicineData) => (
          <MedicineCard key={data.id} medicine={data} />
        ))}
      </div>
    </div>
  );
};

export default MedicinePage;
