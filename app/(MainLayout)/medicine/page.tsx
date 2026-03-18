import { getMedicine } from "@/app/actions/medicine.actions";
import { MedicineData } from "@/types";
import MedicineFilters from "./medicineFilters";
import { getCategories } from "@/app/actions/category.actions";
import Pagination from "./pagination";
import MedicineCard from "@/components/layout-card/medicineCard";

const MedicinePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;

  const result = await getMedicine(params);
  const medicines = result.data.data;
  const categories = await getCategories();
  const categoriesData = categories?.data;
  const currentPage = result.data.meta.page;
  const totalPages = result.data.meta.totalPages;

  return (
    <div>
      <MedicineFilters medicines={medicines} categoriesData={categoriesData} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-6">
        {medicines.map((data: MedicineData) => (
          <MedicineCard key={data.id} medicine={data} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default MedicinePage;
