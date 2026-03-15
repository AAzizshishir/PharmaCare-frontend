import logo1 from "@/public/brands/logo1.jpg";
import logo2 from "@/public/brands/logo2.jpg";
import logo3 from "@/public/brands/logo3.jpg";
import logo4 from "@/public/brands/logo4.jpg";
import logo5 from "@/public/brands/logo5.jpg";
import logo6 from "@/public/brands/logo6.jpg";
import Image from "next/image";

const TopBrands = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

  return (
    <section className="max-w-7xl mx-6 mb-4">
      <h1 className="text-xl font-bold text-blue-600 text-left mb-3 uppercase">
        Top Brands
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Brand logo ${index + 1}`}
            width={300}
            className="object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default TopBrands;
