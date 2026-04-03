import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const LAST_TALK_DATE = new Date("2025-05-13T00:00:00");

const CountdownTimer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = now - LAST_TALK_DATE.getTime();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { value: days, label: "Din" },
    { value: hours, label: "Ghante" },
    { value: minutes, label: "Minute" },
    { value: seconds, label: "Second" },
  ];

  return (
    <section id="countdown" className="py-20 bg-background">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Clock className="mx-auto mb-4 h-8 w-8 text-primary/60" />
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Aakhri baar baat hue...
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            13 May 2025 se — aur har second count ho raha hai 🤍
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex justify-center gap-3 md:gap-6"
        >
          {blocks.map((block, i) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="glass-card rounded-2xl px-4 py-5 md:px-8 md:py-6 min-w-[70px] md:min-w-[100px]">
                <motion.span
                  key={block.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-display text-3xl font-bold text-primary md:text-5xl block"
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
              </div>
              <span className="mt-2 text-xs text-muted-foreground font-body">{block.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-10 space-y-1 font-display text-sm italic text-muted-foreground"
        >
          <p>Tumse hi kiya shuru</p>
          <p>Tum par hi sab khatam</p>
          <p>Tum sa nahi hai koi</p>
          <p>Hoon mein bas tera</p>
          <p className="mt-3">Aisi dillagi hai tu</p>
          <p>Socha jo wahi hai tu</p>
          <p>Meri zindagi hai tu 🤍</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownTimer;
