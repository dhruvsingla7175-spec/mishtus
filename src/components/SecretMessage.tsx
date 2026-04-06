import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock } from "lucide-react";

const SecretMessage = () => {
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPress = () => {
    setPressing(true);
    setProgress(0);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(intervalRef.current!);
        setRevealed(true);
        setPressing(false);
      }
    }, 30);
  };

  const endPress = () => {
    setPressing(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="mx-auto max-w-xl px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Ek Secret Hai 🤫
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Neeche wala button dabake rakhna 3 second tak (not my boobies)
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="relative">
                <motion.button
                  onMouseDown={startPress}
                  onMouseUp={endPress}
                  onMouseLeave={endPress}
                  onTouchStart={startPress}
                  onTouchEnd={endPress}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30 select-none"
                >
                  <Lock className="h-8 w-8 text-primary" />
                  {pressing && (
                    <svg className="absolute inset-0 h-24 w-24 -rotate-90" viewBox="0 0 96 96">
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        strokeDasharray={`${(progress / 100) * 276.46} 276.46`}
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-muted-foreground font-display italic">
                Hold to unlock 🤍
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="mt-10"
            >
              <div className="paper-texture rounded-2xl p-8 shadow-lg border border-border/30 relative overflow-hidden">
                {/* Confetti hearts */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                      x: Math.cos((i * Math.PI * 2) / 12) * 150,
                      y: Math.sin((i * Math.PI * 2) / 12) * 150,
                    }}
                    transition={{ duration: 1.5, delay: i * 0.05 }}
                    style={{ left: "50%", top: "50%" }}
                  >
                    <Heart size={10} fill="currentColor" />
                  </motion.div>
                ))}

                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mb-4"
                >
                  <Heart className="mx-auto h-10 w-10 text-primary" fill="currentColor" />
                </motion.div>

                <p className="font-display text-xl italic leading-relaxed text-foreground">
                  "Aap meri duniya ho Mishtu
                </p>
                <p className="mt-3 font-display text-xl italic leading-relaxed text-foreground">
                  Chahe baat ho ya na ho, chahe mile ya na mile mera dil hamesha aaphe ke naam rahega
                </p>
                <p className="mt-3 font-display text-xl italic leading-relaxed text-foreground">
                  Yeh koi promise nahi hai yeh reality hai"
                </p>
                <p className="mt-6 text-right font-display text-sm text-primary">
                  — Your baby boy cute sa bacha hamesha 🤍
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SecretMessage;
