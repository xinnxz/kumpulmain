import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/features/hero-section";
import { FeaturesSection } from "@/components/features/features-section";
import { FeaturedVenuesSection } from "@/components/features/venue-card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedVenuesSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
