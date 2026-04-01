import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const petals = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 12 + Math.random() * 16,
}));

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-romantic">
      {/* Floating petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-primary/30"
          style={{ left: `${petal.left}%` }}
          animate={{
            y: ["-10vh", "110vh"],
            rotate: [0, 720],
            x: [0, Math.sin(petal.id) * 50],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <Heart size={petal.size} fill="currentColor" />
        </motion.div>
      ))}

      {/* Sparkle particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute h-1 w-1 rounded-full bg-soft-amber/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="mb-6 inline-block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="mx-auto h-12 w-12 text-primary" fill="currentColor" />
          </motion.div>

          <h1 className="text-5xl font-display font-bold leading-tight text-foreground md:text-7xl lg:text-8xl">
            Mishtu Meri Jaan{" "}
            <span className="text-gradient-rose">🤍</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-6 font-display text-xl italic text-muted-foreground md:text-2xl"
          >
            Yeh jagah sirf tere liye bani hai
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary/50"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
