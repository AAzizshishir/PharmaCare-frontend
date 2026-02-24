import MedicineCard from "@/components/medicineCard";
// import { medicineService } from "@/services/medicine.service";
import { MedicineData } from "@/types";
import { cookies } from "next/headers";
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const MyMedicines = async () => {
  // const data = await medicineService.getMedicineBySeller();

  const cookieStore = await cookies();
  const medicines = await fetch(`${PUBLIC_API_URL}/api/seller/medicines`, {
    next: { revalidate: 60 },
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  const data = await medicines.json();

  return (
    <div className="grid grid-cols-3 gap-4 container mx-auto">
      {data.data.map((data: MedicineData) => (
        <MedicineCard key={data.id} medicine={data} />
      ))}
    </div>
  );
};

export default MyMedicines;
