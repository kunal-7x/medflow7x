import { motion } from "framer-motion";
import { Play, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductDemo = () => (
  <section id="product-demo" className="py-24 relative">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Product Tour</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          See MedFlow <span className="text-gradient-gold">In Action</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Experience the platform that's transforming hospital operations for thousands of healthcare teams.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group"
      >
        {/* Mock browser frame */}
        <div className="glass-card rounded-2xl overflow-hidden border border-border/40">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/40" />
              <div className="w-3 h-3 rounded-full bg-warning/40" />
              <div className="w-3 h-3 rounded-full bg-[hsl(160,50%,42%)]/40" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-lg bg-secondary/50 text-xs text-muted-foreground flex items-center gap-1.5">
                <Monitor className="w-3 h-3" />
                app.medflow.io/dashboard
              </div>
            </div>
          </div>
          {/* Content area - simulated dashboard */}
          <div className="aspect-video bg-background relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, hsl(45 93% 58% / 0.08), transparent 50%),
                  radial-gradient(circle at 70% 60%, hsl(200 60% 55% / 0.06), transparent 50%)`
              }}
            />
            {/* Simulated dashboard grid */}
            <div className="absolute inset-6 grid grid-cols-4 grid-rows-3 gap-3 opacity-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border/40 bg-card/30" />
              ))}
            </div>
            {/* Play button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/login'}
              className="relative z-10 w-20 h-20 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-all"
              style={{ boxShadow: "0 0 40px hsl(45 93% 58% / 0.15)" }}
            >
              <Play className="w-8 h-8 text-primary ml-1" />
            </motion.button>
          </div>
        </div>

        {/* Conversion strip */}
        <div className="mt-8 glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">
              "MedFlow reduced our patient discharge time by <span className="text-primary font-bold">42%</span> and
              eliminated paper-based errors entirely."
            </p>
            <p className="text-xs text-muted-foreground mt-1">— Dr. Sarah Chen, CMO at Pacific Health Network</p>
          </div>
          <Button onClick={() => window.location.href = '/login'} className="shrink-0">
            Try It Free
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);
