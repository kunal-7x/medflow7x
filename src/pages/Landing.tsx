import { useState, useEffect } from "react";
import { LandingHero } from "@/components/landing/LandingHero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { LiveStats } from "@/components/landing/LiveStats";
import { ProductDemo } from "@/components/landing/ProductDemo";
import { SecurityCompliance } from "@/components/landing/SecurityCompliance";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { SignupModal } from "@/components/landing/SignupModal";

const Landing = () => {
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    document.title = "MedFlow — Streamline Patient Care & Hospital Operations";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LandingHero onRequestDemo={() => setSignupOpen(true)} />
      <TrustedBy />
      <LiveStats />
      <FeatureGrid />
      <ProductDemo />
      <SecurityCompliance />
      <PricingPlans onGetStarted={() => setSignupOpen(true)} />
      <LandingFAQ />
      <LandingFooter onRequestDemo={() => setSignupOpen(true)} />
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </div>
  );
};

export default Landing;
