import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ServicesGallery from "@/components/ServicesGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      <Header />
      <HeroSection />
      <AnimatedSection delay={0}>
        <StatsSection />
      </AnimatedSection>
      <AnimatedSection delay={100} direction="up">
        <ServicesGallery />
      </AnimatedSection>
      <AnimatedSection delay={0} direction="left">
        <TestimonialsSection />
      </AnimatedSection>
      <AnimatedSection delay={100} direction="right">
        <MapSection />
      </AnimatedSection>
      <AnimatedSection delay={0} direction="up">
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection delay={100} direction="up">
        <ContactSection />
      </AnimatedSection>
      <Footer />
    </div>
  );
};

export default Index;