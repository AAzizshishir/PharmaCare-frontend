import Banner from "@/components/layout/Banner";
import Footer from "@/components/layout/footer";
import TopBrands from "@/components/layout/top-brands";
import TopRatedMedicine from "@/components/layout/top-rated-medicine";
import WhyChooseUs from "@/components/layout/why-choose-us";
import { getTopRatedMedicine } from "../actions/medicine.actions";

export default async function Home() {
  const result = await getTopRatedMedicine();
  const topRatedMedicines = result.data || [];

  return (
    <div>
      <Banner />
      <TopRatedMedicine topRatedMedicines={topRatedMedicines} />
      <WhyChooseUs />
      <TopBrands />
      <Footer />
    </div>
  );
}
