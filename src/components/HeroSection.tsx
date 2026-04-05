import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import coupleSilhouette from "@/assets/couple-silhouette.png";

const petals = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 8 + Math.random() * 8,
  size: 8 + Math.random() * 18,
}));

const subtitle = "Happy Birthday Mishty darluuuu 🎂\nbahot pyaar se likha hai thoda time nikaal ke ache se padh lena aur agar time na mille toh mujhe apne paas rakh lena";

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
      {/* Animated gradient background shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsl(var(--warm-cream)) 0%, hsl(var(--blush) / 0.4) 30%, hsl(var(--primary) / 0.08) 60%, hsl(var(--warm-cream)) 100%)",
          backgroundSize: "400% 400%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dreamy radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, hsl(var(--rose-gold) / 0.08) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Couple silhouette in background */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[1]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <img
          src={coupleSilhouette}
          alt=""
          className="w-[320px] md:w-[420px] lg:w-[500px] select-none"
          draggable={false}
          width={800}
          height={600}
        />
      </motion.div>

      {/* Floating petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-primary/15"
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

      {/* Sparkle / bokeh particles */}
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 6}px`,
            height: `${2 + Math.random() * 6}px`,
            background: i % 3 === 0
              ? "hsl(var(--soft-amber) / 0.5)"
              : i % 3 === 1
              ? "hsl(var(--primary) / 0.3)"
              : "hsl(var(--rose-gold) / 0.4)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
        />
      ))}

      {/* Shooting stars */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`shoot-${i}`}
          className="absolute h-px rounded-full"
          style={{
            width: "80px",
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
            top: `${15 + i * 20}%`,
            left: "-80px",
          }}
          animate={{
            x: ["0vw", "120vw"],
            y: [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 3 + i * 5,
            ease: "easeIn",
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
                className="w-28 h-28 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)" }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
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
          <span className="font-display text-xl italic text-muted-foreground md:text-2xl whitespace-pre-wrap">
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
              className="font-display text-base md:text-lg text-primary/70 italic opacity-65"
            >
              {quotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Scroll indicator */}
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
