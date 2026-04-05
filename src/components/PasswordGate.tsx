import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart } from "lucide-react";

interface PasswordGateProps {
  onUnlock: () => void;
}

const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "DM@2024") {
      setUnlocking(true);
      setTimeout(() => {
        localStorage.setItem("mishtu-unlocked", "true");
        onUnlock();
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-romantic"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating hearts background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20"
          initial={{ y: "100vh", x: `${Math.random() * 100}vw`, rotate: 0 }}
          animate={{ y: "-10vh", rotate: 360 }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <Heart size={16 + Math.random() * 24} fill="currentColor" />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!unlocking ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-8 px-6"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-10 w-10 text-primary" />
              </div>
            </motion.div>

            <div className="text-center">
              <h1 className="text-3xl font-display font-semibold text-foreground md:text-4xl">
                Yeh jagah kisi khaas ke liye hai
              </h1>
              <p className="mt-2 text-muted-foreground">🤍</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password daalo..."
                className="w-64 rounded-full border border-border bg-card/80 px-6 py-3 text-center font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 backdrop-blur-sm"
                autoFocus
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-primary px-8 py-3 font-display text-sm font-medium text-primary-foreground shadow-lg"
              >
                Unlock 🤍
              </motion.button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-primary font-display italic"
                >
                  Sirf uske liye hai yeh 🤍
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="unlock"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: 3 }}
            >
              <Heart className="h-24 w-24 text-primary" fill="currentColor" />
            </motion.div>
            {/* Heart burst particles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 16) * 120,
                  y: Math.sin((i * Math.PI * 2) / 16) * 120,
                }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                <Heart size={12} fill="currentColor" />
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-display text-xl text-foreground"
            >
              Welcome, Mishtu 🤍
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PasswordGate;
