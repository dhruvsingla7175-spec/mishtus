import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "glow" | "wave" | "dots";
  className?: string;
}

const SectionDivider = ({ variant = "glow", className = "" }: SectionDividerProps) => {
  if (variant === "dots") {
    return (
      <div className={`flex items-center justify-center gap-2 py-6 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/30"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative w-full overflow-hidden leading-[0] ${className}`} style={{ marginTop: -1, marginBottom: -1 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="relative block w-full h-[30px] md:h-[50px]">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            className="fill-background"
            style={{ opacity: 0.5 }}
          />
        </svg>
      </div>
    );
  }

  // glow variant (default)
  return (
    <div className={`py-4 ${className}`}>
      <motion.div
        className="divider-glow mx-auto max-w-md"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

export default SectionDivider;
