import { HomeHero } from "@/components/home/HomeHero";
import { PilulierSpotlight } from "@/components/home/PilulierSpotlight";
import { ProductUniverse } from "@/components/home/ProductUniverse";
import { ProximitySection } from "@/components/home/ProximitySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { VisitSection } from "@/components/home/VisitSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesSection />
      <PilulierSpotlight />
      <ProductUniverse />
      <ProximitySection />
      <VisitSection />
      <CTASection />
    </>
  );
}
