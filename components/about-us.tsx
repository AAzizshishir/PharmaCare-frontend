import Image from "next/image";
import aboutImage from "@/public/about.svg";

const AboutUsCard = () => {
  return (
    <div className="container mx-auto border border-blue-500 rounded-lg p-6 shadow-md bg-white">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Left side: Image */}
        <div className="w-1/3 relative">
          <Image
            src={aboutImage}
            alt="About PharmaCare"
            className="w-full h-auto rounded-lg object-cover"
            // fill
          />
        </div>

        {/* Right side: Text */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-3">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold">PharmaCare</span>, we are
            committed to delivering trusted healthcare solutions with a focus on
            quality, accessibility, and innovation. Our platform provides a wide
            range of medicines and supplements, ensuring that customers can find
            reliable products at fair prices. With a dedication to professional
            branding and user-friendly design, we aim to make healthcare simple,
            transparent, and accessible for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
