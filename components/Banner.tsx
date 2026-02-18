import bannerImage from "../public/banner.jpg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center text-center relative"
      style={{ backgroundImage: `url(${bannerImage.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto text-white space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold">
          PharmaCare provides you save delivery
        </h2>
        <p className="text-lg md:text-xl">
          Get medicine at your home within 30 minutes
        </p>
        <Link href="/medicine">
          <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            See all medicine
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
