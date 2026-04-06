import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-romantic py-12 md:py-16 border-t border-border/30">
      <div className="mx-auto max-w-2xl px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="mx-auto mb-6 h-8 w-8 text-primary animate-heartbeat" fill="currentColor" />

          <p className="font-display text-lg italic text-foreground leading-relaxed md:text-xl">
            "Sangat ka asar ho jayega par itna ghera bhi ho jayega yeh nahi pta🤍"
          </p>

          <p className="mt-6 font-display text-base text-primary">
            — ALWAYS FOR YOU MERI JAAN MISHTU
          </p>

          <div className="mt-12 text-muted-foreground/50 text-sm">
            Made with love, for Mishtu 🤍
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
