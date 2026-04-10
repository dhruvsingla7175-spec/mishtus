import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronUp } from "lucide-react";

const sections = [
  { id: "hero", label: "Top", emoji: "🤍" },
  { id: "stars", label: "Stars", emoji: "⭐" },
  { id: "gallery", label: "Gallery", emoji: "📸" },
  { id: "reasons", label: "Reasons", emoji: "💕" },
  { id: "daily", label: "Message", emoji: "💌" },
  { id: "dreams", label: "Dreams", emoji: "🌙" },
  { id: "letter", label: "Letter", emoji: "✉️" },
  { id: "reading", label: "Final", emoji: "🤍" },
  { id: "slideshow", label: "Slideshow", emoji: "📸" },
  { id: "quiz", label: "Quiz", emoji: "💋" },
  { id: "wishjar", label: "Wishes", emoji: "✨" },
];

const FloatingNav = () => {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);

      const scrollY = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop: right side dots */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2"
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group relative flex items-center"
            aria-label={s.label}
          >
            <span className="absolute right-5 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-display text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md border border-border/50">
              {s.label}
            </span>
            <div
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                active === s.id
                  ? "bg-primary scale-150 shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                  : "bg-primary/30 hover:bg-primary/60 hover:scale-125"
              }`}
            />
          </button>
        ))}
      </motion.nav>

      {/* Mobile: back to top button */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-4 z-40 md:hidden flex items-center justify-center h-11 w-11 rounded-full shadow-lg border border-border/50"
            style={{
              background: "hsl(var(--card) / 0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px hsl(var(--primary) / 0.15)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="h-5 w-5 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
