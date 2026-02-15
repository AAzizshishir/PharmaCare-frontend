import { medicineService } from "@/services/medicine.service";

const MedicinePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const medicine = await medicineService.getMedicineById(id);
  console.log(medicine.data);
  const medicineDetails = medicine.data;
  return (
    <div className="container mx-auto border border-green-500">
      <h1 className="text-2xl font-bold my-3">{medicineDetails.name}</h1>
      <p>{medicineDetails.description}</p>
    </div>
  );
};

export default MedicinePage;
