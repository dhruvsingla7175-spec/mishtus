import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const quotes = [
  "Do you know… Main tenu kinna pyaar karda",
  "Do you know… Main tere utte kinna marda",
  "Do you know… Tere layi main ta baki kudiya chad ta",
  "Do you know… Tera layi kudiya naal lad da",
];

const FloatingQuotes = () => {
  const isMobile = useIsMobile();

  // On mobile, show only 2 quotes with 1 copy each; desktop keeps all
  const items = (isMobile ? quotes.slice(0, 2) : quotes).flatMap((q, qi) =>
    Array.from({ length: isMobile ? 1 : 2 }, (_, copy) => ({
      id: qi * 2 + copy,
      text: q,
      top: 15 + qi * 18 + copy * 8,
      duration: 18 + Math.random() * 10,
      delay: copy * 12 + qi * 3,
      direction: (qi + copy) % 2 === 0 ? 1 : -1,
      size: copy === 0 ? "text-sm" : "text-xs",
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute whitespace-nowrap font-display italic ${item.size}`}
          style={{
            top: `${item.top}%`,
            left: item.direction === 1 ? "-40%" : "140%",
            color: "hsl(var(--primary) / 0.12)",
          }}
          animate={{
            x: item.direction === 1 ? ["0vw", "180vw"] : ["0vw", "-180vw"],
            opacity: [0, 0.15, 0.15, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
        >
          {item.text} 💕
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingQuotes;
