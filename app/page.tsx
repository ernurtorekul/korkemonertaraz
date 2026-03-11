import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FAQSection from "@/components/home/FAQSection";
import NewsPreview from "@/components/home/NewsPreview";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export const revalidate = 60; // Revalidate every 60 seconds

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FAQSection />
      <NewsPreview />
      <UpcomingEvents />
    </div>
  );
}
