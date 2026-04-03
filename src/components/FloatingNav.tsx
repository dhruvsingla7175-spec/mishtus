import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Top" },
  { id: "miss", label: "Miss You" },
  { id: "stars", label: "Stars" },
  { id: "gallery", label: "Gallery" },
  { id: "reasons", label: "Reasons" },
  { id: "spotify", label: "Music" },
  { id: "daily", label: "Message" },
  { id: "dreams", label: "Dreams" },
  { id: "letter", label: "Letter" },
  { id: "reading", label: "Final" },
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
            className={`h-2 w-2 rounded-full transition-all ${
              active === s.id
                ? "bg-primary scale-125 shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                : "bg-primary/30 hover:bg-primary/60"
            }`}
          />
        </button>
      ))}
    </motion.nav>
  );
};

export default FloatingNav;
