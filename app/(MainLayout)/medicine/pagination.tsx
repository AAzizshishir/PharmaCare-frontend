"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="sticky bottom-0 w-full flex flex-wrap gap-2 justify-center bg-white py-2 shadow">
      <Button
        className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          onClick={() => goToPage(i + 1)}
          className={`cursor-pointer ${
            currentPage === i + 1
              ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
              : "bg-white text-black hover:bg-blue-600 hover:text-white"
          }`}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
