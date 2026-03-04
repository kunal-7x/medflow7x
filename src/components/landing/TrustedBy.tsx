import { motion } from "framer-motion";

const logos = [
  "Mayo Clinic", "Johns Hopkins", "Cleveland Clinic", "Mass General",
  "Stanford Health", "Mount Sinai", "NYU Langone", "Cedars-Sinai",
];

export const TrustedBy = () => (
  <section className="py-16 border-y border-border/30">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Trusted by leading healthcare institutions
      </p>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
        {logos.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-sm font-medium text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-default"
          >
            {name}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);
