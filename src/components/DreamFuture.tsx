import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const dreams = [
  { text: "Teri favourite coffee, meri baatein — aur koi time limit nahi", emoji: "☕" },
  { text: "Mountains ho ya beaches — bas tu saath ho", emoji: "✈️" },
  { text: "Chhota sa ghar — par tera aur mera. Fairy lights wala.", emoji: "🏡" },
  { text: "Terrace pe lait ke stars dekhenge — teri ungliyon mein ungliyaan", emoji: "🌟" },
  { text: "Windows down, music on, tera haath mera haath mein", emoji: "🛣️" },
  { text: "Buddhe hoke bhi tujhe Mishtu bulaunga — promise", emoji: "👴🏻👵🏻" },
  { text: "Subah uthke tera chehra dekhna — bas yahi routine chahiye", emoji: "🌅" },
  { text: "Tere sar pe haath rakhke sona — world ki sabse peaceful feeling", emoji: "😴" },
];

const DreamFuture = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Soft floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 180 + i * 60,
              height: 180 + i * 60,
              background: `radial-gradient(circle, hsl(var(--primary) / 0.06), transparent)`,
              left: `${10 + i * 25}%`,
              top: `${20 + Math.sin(i) * 30}%`,
            }}
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Ek Din... 🌙
          </h2>
          <p className="mt-3 text-sm text-muted-foreground italic font-display">
            Bas mera dil karta hai tere saath rahu, tere paas rahu — pyaar se, hamesha 🤍
          </p>
        </motion.div>

        {/* Flowing vertical layout */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

          <div className="space-y-6">
            {dreams.map((dream, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", damping: 22 }}
                  className={`flex items-center gap-4 ${isLeft ? "justify-end pr-[52%]" : "justify-start pl-[52%]"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.04, y: -3 }}
                    className="glass-card rounded-2xl px-5 py-4 max-w-xs cursor-default"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0 mt-0.5">{dream.emoji}</span>
                      <p className="font-display text-sm italic text-foreground/90 leading-relaxed">
                        {dream.text}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Center heart */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="h-5 w-5 text-primary/40" fill="currentColor" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-14 text-center font-display text-sm italic text-primary"
        >
          Bahut cute cute moments banayenge — tu bas haan bol 🤍
        </motion.p>
      </div>
    </section>
  );
};

export default DreamFuture;
