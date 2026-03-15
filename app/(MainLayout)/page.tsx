import Banner from "@/components/layout/Banner";
import Footer from "@/components/layout/footer";
import TopBrands from "@/components/layout/top-brands";
import WhyChooseUs from "@/components/layout/why-choose-us";

export default async function Home() {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <TopBrands />
      <Footer />
    </div>
  );
}
