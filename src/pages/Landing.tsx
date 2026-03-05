import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { LandingHero } from "@/components/landing/LandingHero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { LiveStats } from "@/components/landing/LiveStats";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProductDemo } from "@/components/landing/ProductDemo";
import { Testimonials } from "@/components/landing/Testimonials";
import { SecurityCompliance } from "@/components/landing/SecurityCompliance";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { SignupModal } from "@/components/landing/SignupModal";

const GradientDivider = () => (
  <div className="max-w-4xl mx-auto px-6">
    <div className="h-px" style={{ background: "radial-gradient(ellipse at center, hsl(45 93% 58% / 0.15), transparent)" }} />
  </div>
);

const Landing = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = "MedFlow — Streamline Patient Care & Hospital Operations";
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ scrollBehavior: "smooth" }}>
      <LandingHero onRequestDemo={() => setSignupOpen(true)} />
      <TrustedBy />
      <GradientDivider />
      <LiveStats />
      <GradientDivider />
      <FeatureGrid />
      <GradientDivider />
      <HowItWorks />
      <GradientDivider />
      <ProductDemo />
      <GradientDivider />
      <Testimonials />
      <GradientDivider />
      <SecurityCompliance />
      <PricingPlans onGetStarted={() => setSignupOpen(true)} />
      <GradientDivider />
      <LandingFAQ />
      <LandingFooter onRequestDemo={() => setSignupOpen(true)} />
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 glass-card rounded-full w-10 h-10 flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
