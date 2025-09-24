import React from 'react';
import EnhancedHero from "@/components/ui/enhanced-hero";
import FeaturesSection from "@/components/ui/features-section";
import UseCases from "@/components/ui/use-cases";
import HowItWorks from "@/components/ui/how-it-works";
import DemoSection from "@/components/ui/demo-section";
import Testimonials from "@/components/ui/testimonials";
import Pricing from "@/components/ui/pricing";
import SecurityPrivacy from "@/components/ui/security-privacy";
import AboutUs from "@/components/ui/about-us";
import FAQ from "@/components/ui/faq";
import Contact from "@/components/ui/contact";
import Footer from "@/components/ui/footer";
import AnimatedNavbar from '@/components/ui/AnimatedNavbar';

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <AnimatedNavbar/>
      <EnhancedHero />
      <FeaturesSection />
      <UseCases />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <SecurityPrivacy />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
