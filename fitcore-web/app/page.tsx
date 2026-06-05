import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import InstallationsSection from "@/components/InstallationsSection";
import PlansSection from "@/components/PlansSection";
import AppDemoSection from "@/components/AppDemoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <InstallationsSection />
        <PlansSection />
        <AppDemoSection />
        <TestimonialsSection />
        <StatsSection />
      </main>
      <Footer />
    </>
  );
}
