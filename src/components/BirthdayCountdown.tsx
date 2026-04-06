import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cake, Gift, PartyPopper } from "lucide-react";

const BIRTHDAY = new Date("2026-04-06T00:00:00");

const BirthdayCountdown = () => {
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const remaining = BIRTHDAY.getTime() - now;

      if (remaining <= 0) {
        // Check if it's still April 6
        const today = new Date();
        if (today.getDate() === 6 && today.getMonth() === 3 && today.getFullYear() === 2026) {
          setIsBirthday(true);
        }
        setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setDiff({
        days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((remaining % (1000 * 60)) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { value: diff.days, label: "Din" },
    { value: diff.hours, label: "Ghante" },
    { value: diff.minutes, label: "Minute" },
    { value: diff.seconds, label: "Second" },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-romantic relative overflow-hidden">
      {/* Floating party emojis */}
      {["🎂", "🎈", "🎁", "🎉", "🥳", "✨", "💖", "🌸"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ left: `${10 + i * 11}%` }}
          animate={{
            y: ["-5vh", "105vh"],
            rotate: [0, 360],
            x: [0, Math.sin(i * 2) * 40, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear",
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {isBirthday ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cake className="mx-auto mb-4 h-12 w-12 text-primary" />
              </motion.div>
              <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                Happy Birthday Mishtu darling! 🎂🥳
              </h2>
              <p className="mt-3 text-lg text-primary font-display italic">
                Aaj aapka din hai duniya ki sabse khoobsurat ladki ka birthday! mwwaahhh 🤍
              </p>
              <motion.div
                className="mt-6 text-6xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉🎂🥳
              </motion.div>
              <div className="mt-8 paper-texture rounded-2xl p-8 shadow-lg border border-border/30">
                <p className="font-display text-xl italic text-foreground leading-relaxed">
                  awwww 17 saal ki ho gyi aaj! Badi ho rhi hai meri Mishtu🥹
                </p>
                <p className="mt-4 font-display text-lg italic text-foreground leading-relaxed">
                  Duniya ki saari khushiyan meri mishttuu ke ho, DR ji mere dil ka kuch illaz kardo
                </p>
                <p className="mt-4 font-display text-lg italic text-primary">
                  Happy Birthday DR. MISHTY SINGLA🎂🤍
                </p>
                <p className="mt-4 text-right font-display text-sm text-primary">
                  — Your bacha 🤍
                </p>
              </div>
            </>
          ) : (
            <>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Gift className="mx-auto mb-4 h-10 w-10 text-primary" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Mishtu Ka Birthday Aa Raha Hai! 🎂
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                6 April 2026 — turning 17! 🥳🤍
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex justify-center gap-3 md:gap-5"
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
                    <div className="glass-card rounded-2xl px-4 py-4 md:px-7 md:py-5 min-w-[65px] md:min-w-[90px] border-primary/20">
                      <motion.span
                        key={block.value}
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="font-display text-2xl font-bold text-primary md:text-4xl block"
                      >
                        {String(block.value).padStart(2, "0")}
                      </motion.span>
                    </div>
                    <span className="mt-2 text-xs text-muted-foreground font-body">{block.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8 font-display text-sm italic text-muted-foreground"
              >
                "Tere birthday pe sabse pehle wish karunga — chahe baat ho ya na ho 🤍"
              </motion.p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayCountdown;
