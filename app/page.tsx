import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FAQSection from "@/components/home/FAQSection";
import NewsPreview from "@/components/home/NewsPreview";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FAQSection />
      <NewsPreview />
    </div>
  );
}
