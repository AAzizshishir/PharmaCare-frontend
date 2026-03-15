import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} PharmaCare. All rights reserved.
        </p>

        {/* Right side */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/about" className="hover:text-white">
            About Us
          </Link>
          <Link href="/medicine" className="hover:text-white">
            Medicine
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
