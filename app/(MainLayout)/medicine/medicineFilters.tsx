"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryTypes, MedicineData } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const MedicineFilters = ({
  medicines,
  categoriesData,
}: {
  medicines: MedicineData[];
  categoriesData: CategoryTypes[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [brandName, setBrandName] = useState(
    searchParams.get("brandName") || "",
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (brandName) params.set("brandName", brandName);
    if (category) params.set("category", category);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto my-2 flex flex-col md:flex-row gap-4">
      <Input
        type="text"
        placeholder="Search medicine..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />

      <select
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Brands</option>
        {medicines.map((medicine: MedicineData) => (
          <option key={medicine.id} value={medicine.brandName}>
            {medicine.brandName}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Categories</option>
        {categoriesData.map((category: CategoryTypes) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <Button
        onClick={applyFilters}
        className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Apply
      </Button>
    </div>
  );
};

export default MedicineFilters;
