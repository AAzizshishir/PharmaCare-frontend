import Image from "next/image";
import Link from "next/link";

interface TopRatedMedicineProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  averageRating: number;
}

const TopRatedMedicine = ({
  topRatedMedicines,
}: {
  topRatedMedicines: TopRatedMedicineProps[];
}) => {
  console.log(topRatedMedicines);
  return (
    <section className="max-w-7xl mx-6 mb-4">
      <h1 className="text-xl font-bold text-blue-600 text-left mb-3 uppercase">
        Top Rated Medicine
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {topRatedMedicines.map((medicine) => (
          <div
            key={medicine.id}
            className="flex items-center border rounded-[2px] p-2"
          >
            {/* Left side: Image */}
            <div className="w-50 h-20 relative">
              <Image
                src={medicine?.imageUrl}
                alt={medicine.name}
                className="w-full h-auto rounded object-contain"
                fill
              />
            </div>

            {/* Right side: Name, Price, Button */}
            <div className="w-2/3 pl-6">
              <Link
                href={`/medicine/${medicine.id}`}
                className="hover:text-blue-500 font-medium text-slate-500"
              >
                {medicine.name}
              </Link>
              <p className="text-blue-600 text-base font-semibold mt-2">
                {`Price: ৳${medicine.price}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedMedicine;
