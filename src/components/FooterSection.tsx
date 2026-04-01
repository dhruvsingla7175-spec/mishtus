import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-romantic py-16 border-t border-border/30">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="mx-auto mb-6 h-8 w-8 text-primary animate-heartbeat" fill="currentColor" />

          <p className="font-display text-lg italic text-foreground leading-relaxed md:text-xl">
            "Sangat ka asar ho jayega — par meri yaad nahi jayegi kabhi 🤍"
          </p>

          <p className="mt-6 font-display text-base text-primary">
            — Hamesha tera
          </p>

          <div className="mt-12 text-xs text-muted-foreground/50">
            Made with love, for Mishtu 🤍
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
