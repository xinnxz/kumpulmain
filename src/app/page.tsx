import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/features/hero-section";
import { FeaturedVenuesSection } from "@/components/features/venue-card";
import { VenueOwnerSection } from "@/components/features/venue-owner-section";
import { SparringSection } from "@/components/features/sparring-section";
import { CompetitionSection } from "@/components/features/competition-section";
import { WhyChooseSection } from "@/components/features/why-choose-section";
import { CTASection } from "@/components/features/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedVenuesSection />
      <VenueOwnerSection />
      <SparringSection />
      <CompetitionSection />
      <WhyChooseSection />
      <CTASection />
      <Footer />
    </main>
  );
}
