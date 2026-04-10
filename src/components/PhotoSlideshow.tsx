import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { galleryItems } from "@/components/memory-gallery-items";

const imageItems = galleryItems.filter((g) => g.type === "image" && g.caption);
const romanticCaptions = [
  "Tu meri zindagi hai 💕",
  "Har lamha tere saath ho 🤍",
  "Bas tera hi hoon 💫",
  "Tujhe dekh ke dil khush ho jaata hai ✨",
  "Meri jaan 🌸",
];

const PhotoSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [playing]);

  const prev = () => setCurrent((c) => (c - 1 + imageItems.length) % imageItems.length);
  const next = () => setCurrent((c) => (c + 1) % imageItems.length);
  const item = imageItems[current];

  return (
    <section className="py-16 md:py-20 bg-gradient-romantic overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Hamari Yaadein 💕
          </h2>
          <p className="mt-3 text-muted-foreground font-body">Har photo mein ek kahani hai 🤍</p>
        </motion.div>

        <div className="mt-10 relative mx-auto max-w-lg">
          {/* Main image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-border/30">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={item.src}
                alt={item.caption}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-6"
              >
                <div className="flex items-center gap-2 justify-center">
                  <Heart className="h-4 w-4 text-primary fill-primary" />
                  <p className="font-display text-sm italic text-primary-foreground">
                    {item.caption || romanticCaptions[current % romanticCaptions.length]}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} className="rounded-full bg-card/80 p-2 border border-border/50 hover:bg-card transition-colors shadow-sm">
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button onClick={() => setPlaying(!playing)} className="rounded-full bg-primary/10 p-3 border border-primary/30 hover:bg-primary/20 transition-colors">
              {playing ? <Pause className="h-5 w-5 text-primary" /> : <Play className="h-5 w-5 text-primary" />}
            </button>
            <button onClick={next} className="rounded-full bg-card/80 p-2 border border-border/50 hover:bg-card transition-colors shadow-sm">
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex justify-center gap-1.5 flex-wrap max-w-xs mx-auto">
            {imageItems.slice(0, 20).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-primary" : "w-1.5 bg-primary/20 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSlideshow;
