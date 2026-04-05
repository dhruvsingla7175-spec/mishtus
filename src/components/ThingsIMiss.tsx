import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const things = [
  { emoji: "😊", text: "Aapki woh smile jo sab theek kar deti hai but bahot time se mere samne nahi kare... kardiya karo bacha khushhh ho jayega " },
  { emoji: "📱", text: "Raat ko teri lambi voice notes sunna" },
  { emoji: "😂", text: "Tera mujhpe hass ke gussa karna" },
  { emoji: "🌙", text: "Good night bolne ka woh routine" },
  { emoji: "👀", text: "Teri aankhon mein mujhe dekhna" },
  { emoji: "🤗", text: "Woh feeling jab tu paas hoti thi" },
  { emoji: "💬", text: "Random subah ke cute messages" },
  { emoji: "🎵", text: "Saath mein gaane sunna" },
  { emoji: "😤", text: "Tera cute sa naraz hona" },
  { emoji: "☕", text: "Chai pe teri baatein" },
  { emoji: "🦋", text: "Tujhe dekh ke pet mein butterflies" },
  { emoji: "🤍", text: "Bas... tu. Poori ki poori." },
];

const ThingsIMiss = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % things.length);
  const prev = () => setCurrent((c) => (c - 1 + things.length) % things.length);

  return (
    <section className="py-20 bg-gradient-romantic">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Things I Miss About You
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Yeh list khatam nahi hoti 🤍
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="relative w-full overflow-hidden" style={{ minHeight: 200 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <span className="text-5xl">{things[current].emoji}</span>
                <p className="mt-6 font-display text-xl italic text-foreground md:text-2xl">
                  {things[current].text}
                </p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {things.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === current ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex flex-row"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ThingsIMiss;
