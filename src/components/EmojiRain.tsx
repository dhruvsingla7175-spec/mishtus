import { motion } from "framer-motion";

const emojis = ["🦋", "✨", "🌸", "💕", "🤍", "💫", "🌷", "💗"];

const EmojiRain = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 20 }, (_, i) => {
        const emoji = emojis[i % emojis.length];
        return (
          <motion.div
            key={i}
            className="absolute text-lg"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: "-5vh", opacity: 0 }}
            animate={{
              y: "105vh",
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, 360],
              x: [0, Math.sin(i) * 30, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear",
            }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

export default EmojiRain;
