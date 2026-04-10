import { motion } from "framer-motion";

const quotes = [
  "Do you know… Main tenu kinna pyaar karda",
  "Do you know… Main tere utte kinna marda",
  "Do you know… Tere layi main ta baki kudiya chad ta",
  "Do you know… Tera layi kudiya naal lad da",
];

const floatingItems = quotes.flatMap((q, qi) =>
  Array.from({ length: 2 }, (_, copy) => ({
    id: qi * 2 + copy,
    text: q,
    top: 15 + qi * 18 + copy * 8,
    duration: 18 + Math.random() * 10,
    delay: copy * 12 + qi * 3,
    direction: (qi + copy) % 2 === 0 ? 1 : -1,
    size: copy === 0 ? "text-sm" : "text-xs",
  }))
);

const FloatingQuotes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {floatingItems.map((item) => (
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
