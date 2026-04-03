import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const petals = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 8 + Math.random() * 8,
  size: 10 + Math.random() * 20,
}));

const subtitle = "Yeh jagah sirf tere liye bani hai";

const quotes = [
  "Meri zindagi hai tu 🤍",
  "Tum sa nahi hai koi...",
  "Hoon mein bas tera ✨",
  "Aisi dillagi hai tu 💫",
];

const HeroSection = () => {
  const [typed, setTyped] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < subtitle.length) {
        setTyped(subtitle.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-romantic">
      {/* Radial glow behind title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.05) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-primary/20"
          style={{ left: `${petal.left}%` }}
          animate={{
            y: ["-10vh", "110vh"],
            rotate: [0, 720],
            x: [0, Math.sin(petal.id) * 60],
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
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-soft-amber/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <div className="relative z-10 px-6 text-center">
        {/* Glowing heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", damping: 10 }}
        >
          <motion.div
            className="mb-8 inline-block relative"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <Heart className="relative mx-auto h-16 w-16 md:h-20 md:w-20 text-primary drop-shadow-lg" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-display font-bold leading-tight text-foreground md:text-7xl lg:text-8xl">
            Mishtu Meri Jaan{" "}
            <span className="text-gradient-rose">🤍</span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 min-h-[2em]"
        >
          <span className="font-display text-xl italic text-muted-foreground md:text-2xl">
            {typed}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="text-primary font-light"
          >
            |
          </motion.span>
        </motion.div>

        {/* Rotating quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 min-h-[2.5em] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="font-display text-base md:text-lg text-primary/70 italic"
            >
              {quotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Sparkle icon + scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-14"
        >
          <Sparkles className="mx-auto h-5 w-5 text-primary/40 mb-2" />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary/50 text-2xl"
          >
            ↓
          </motion.div>
          <p className="mt-2 text-xs text-muted-foreground/60 font-body">Scroll down, Mishtu</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
