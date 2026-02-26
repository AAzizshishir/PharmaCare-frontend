import Banner from "@/components/layout/Banner";
import Footer from "@/components/layout/footer";
import WhyChooseUs from "@/components/layout/why-choose-us";

export default async function Home() {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
