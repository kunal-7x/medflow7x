import { motion } from "framer-motion";
import { ArrowRight, Play, Activity, Shield, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingHeroProps {
  onRequestDemo: () => void;
}

export const LandingHero = ({ onRequestDemo }: LandingHeroProps) => {
  const scrollToDemo = () => {
    document.getElementById("product-demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(45 93% 58% / 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 80%, hsl(200 60% 55% / 0.08), transparent),
              radial-gradient(ellipse 50% 30% at 10% 60%, hsl(260 40% 50% / 0.06), transparent)`
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }}
        />
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(45 93% 58% / 0.06), transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(200 60% 55% / 0.05), transparent 70%)" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-border/30"
        style={{ background: "hsl(228 14% 6% / 0.8)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">MedFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#product-demo" className="hover:text-foreground transition-colors">Product</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
            <Button size="sm" onClick={onRequestDemo} className="rounded-xl">
              Request Demo
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm mb-8"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>HIPAA Compliant · SOC 2 Certified · 99.99% Uptime</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6">
            <span className="block">Streamline</span>
            <span className="block text-gradient-gold">Patient Care</span>
            <span className="block text-muted-foreground/80 text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
              & Hospital Operations
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The unified platform that connects clinical workflows, real-time patient monitoring,
            and administrative operations — trusted by 2,400+ hospitals worldwide.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="xl" onClick={onRequestDemo} className="group min-w-[200px]">
              Request Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" onClick={scrollToDemo} className="min-w-[200px] gap-2">
              <Play className="w-4 h-4" />
              View Product Tour
            </Button>
          </div>
        </motion.div>

        {/* Floating metric cards */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { icon: Users, label: "Hospitals", value: "2,400+" },
            { icon: Zap, label: "Avg Response", value: "<200ms" },
            { icon: Shield, label: "Uptime", value: "99.99%" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass-card rounded-2xl p-4 text-center"
            >
              <item.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
              <div className="text-xl font-bold">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
