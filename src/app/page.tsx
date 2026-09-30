import { BrandsSection } from "@/components/home/BrandsSection";
import { HomeHero } from "@/components/home/HomeHero";
import { ProductUniverse } from "@/components/home/ProductUniverse";
import { ProximitySection } from "@/components/home/ProximitySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesSection />
      <ProductUniverse />
      <ProximitySection />
      <BrandsSection />
      <CTASection />
    </>
  );
}
