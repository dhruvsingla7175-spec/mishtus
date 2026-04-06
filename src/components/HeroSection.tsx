import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import coupleSilhouette from "@/assets/couple-silhouette.png";

const subtitle = "Happyyyy birthday to my jigar ka tukdaaaaa 🤌🥹❤️\nJanam din mubaarak ho meri jaan 🎂✨ \nDuniya ki saari khushiyaan aapki jholi mein aayein aur mein bhi 🤍 \nMeri lifeee mein aap aye mein bahot lucky feel karta hu🥹❤️\nAaj bahot special day hai that really cute na you know I wish I could celebrate your birthday right there with you but even if I can't I'll never miss a chance I'll always find a way atleast i can try to make your smile aur little bitt blushh babbuu Mein apne tareef se pura support rkhunga foreverrrrr 🥹💋Loveeeeee uuuuuu alottttttt myy sweatiest gurl 😘❤️";

const quotes = [
  "Happyyyy birthday to my jigar ka tukdaaaaa 🤌🥹❤️",
  "Meri lifeee ch tusi aye mein bahot lucky aa 🥹❤️",
  "Meinu ni lgya si ehni long chluga — par chl reha hai TOUCHWOOD!! 🤍",
  "Mein apne vlooo pura rkhunga foreverrrrr 🥹💋❤️",
  "Loveeeeee uuuuuu alottttttt myy sweatiest gurl 😘💋❤️",
  "Jo chahida thonu meinu dsdeya kro — bss tusi khush rho hmeshaa 💘",
  "Crush thi, hai, aur rahegi — forever ✨",
  "Do you know… Main tenu kinna pyaar karda 💕",
  "Do you know… Main tere utte kinna marda 🥺",
  "Do you know… Tere layi main ta baki kudiya chad ta 🤍",
  "Do you know… Tera layi kudiya naal lad da 😤❤️",
];

// Pre-generate particles to avoid re-renders
const petals = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 10,
  size: 6 + Math.random() * 20,
  opacity: 0.08 + Math.random() * 0.12,
}));

const sparkles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 2 + Math.random() * 7,
  colorIdx: i % 4,
  duration: 2 + Math.random() * 5,
  delay: Math.random() * 8,
}));

const shootingStars = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: 10 + i * 18,
  delay: 2 + i * 4,
  width: 60 + Math.random() * 60,
}));

const rings = [
  { size: 300, mdSize: 450, delay: 0, duration: 4 },
  { size: 500, mdSize: 700, delay: 1.5, duration: 5 },
  { size: 700, mdSize: 950, delay: 3, duration: 6 },
];

const sparkleColors = [
  "hsl(var(--soft-amber) / 0.5)",
  "hsl(var(--primary) / 0.35)",
  "hsl(var(--rose-gold) / 0.45)",
  "hsl(var(--blush) / 0.4)",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const HeroSection = () => {
  const [typed, setTyped] = useState("");
  

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < subtitle.length) {
        setTyped(subtitle.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 65);
    return () => clearInterval(interval);
  }, []);


  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-romantic">
      {/* Multi-layer animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsl(var(--warm-cream)) 0%, hsl(var(--blush) / 0.5) 25%, hsl(var(--primary) / 0.1) 50%, hsl(var(--rose-gold) / 0.15) 75%, hsl(var(--warm-cream)) 100%)",
          backgroundSize: "400% 400%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "50% 100%", "100% 0%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(var(--rose-gold) / 0.08) 0%, transparent 50%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsing concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {rings.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: ring.size,
              height: ring.size,
              borderColor: `hsl(var(--primary) / ${0.06 - i * 0.015})`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: ring.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ring.delay,
            }}
          />
        ))}
      </div>

      {/* Main radial glow — bigger & more dramatic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, hsl(var(--rose-gold) / 0.1) 35%, hsl(var(--blush) / 0.05) 60%, transparent 75%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Couple silhouette */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[1]"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 0.12, y: 0, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.2, ease: "easeOut" }}
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

      {/* Floating petals — more and varied */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.left}%`, color: `hsl(var(--primary) / ${petal.opacity})` }}
          animate={{
            y: ["-10vh", "110vh"],
            rotate: [0, 360 + Math.random() * 360],
            x: [0, Math.sin(petal.id) * 60, Math.cos(petal.id) * 30],
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

      {/* Sparkle / bokeh particles — more, varied colors */}
      {sparkles.map((s) => (
        <motion.div
          key={`sparkle-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: sparkleColors[s.colorIdx],
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.8, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
          }}
        />
      ))}

      {/* Shooting stars — more frequent */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shoot-${star.id}`}
          className="absolute h-px rounded-full"
          style={{
            width: `${star.width}px`,
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), hsl(var(--rose-gold) / 0.4), transparent)",
            top: `${star.top}%`,
            left: "-100px",
          }}
          animate={{
            x: ["0vw", "120vw"],
            y: [0, 80 + Math.random() * 40],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeIn",
            repeatDelay: 6,
          }}
        />
      ))}

      {/* Main content — cinematic staggered entrance */}
      <motion.div
        className="relative z-10 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glowing heart — bigger, triple glow */}
        <motion.div variants={childVariants}>
          <motion.div
            className="mb-10 inline-block relative"
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Outer glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 2, 1], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-40 h-40 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)" }}
              />
            </motion.div>
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-28 h-28 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }}
              />
            </motion.div>
            {/* Heart icon */}
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart
                className="relative mx-auto h-20 w-20 md:h-24 md:w-24 text-primary"
                fill="currentColor"
                style={{ filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.5)) drop-shadow(0 0 40px hsl(var(--primary) / 0.25))" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Title with glow */}
        <motion.div variants={childVariants}>
          <h1
            className="text-5xl font-display font-bold leading-tight text-foreground md:text-7xl lg:text-8xl"
            style={{ textShadow: "0 0 60px hsl(var(--primary) / 0.15)" }}
          >
            Mishtu Meri Jaan{" "}
            <motion.span
              className="text-gradient-rose inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🤍
            </motion.span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={childVariants} className="mt-6 min-h-[2em]">
          <span className="font-display text-xl italic text-muted-foreground md:text-2xl whitespace-pre-wrap">
            {typed}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-primary font-light text-xl md:text-2xl"
          >
            |
          </motion.span>
        </motion.div>

        {/* All "Do you know" lyrics displayed together */}
        <motion.div
          variants={childVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4"
        >
          {quotes.filter(q => q.startsWith("Do you know")).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: "easeOut" }}
              className="font-display text-lg md:text-xl text-primary/60 italic"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Scroll indicator — enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="mx-auto h-5 w-5 text-primary/40 mb-3" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary/50 text-2xl"
          >
            ↓
          </motion.div>
          <p className="mt-2 text-xs text-muted-foreground/60 font-body tracking-widest uppercase">
            Scroll down, Mishtu
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
