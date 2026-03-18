import { getMedicineBySeller } from "@/app/actions/medicine.actions";
import SellerMedicineCard from "@/components/seller-medicine-card";
import { MedicineData } from "@/types";

const MyMedicines = async () => {
  const sellerMedicine = await getMedicineBySeller();

  if (!sellerMedicine.data) {
    return <div>No medicines found or failed to load.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-6">
      {sellerMedicine.data.map((data: MedicineData) => (
        <SellerMedicineCard key={data.id} medicine={data} />
      ))}
    </div>
  );
};

export default MyMedicines;
