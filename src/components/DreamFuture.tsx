import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const DreamFuture = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Ek Din... 🌙
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="paper-texture rounded-2xl p-8 md:p-12 shadow-xl border border-border/30 relative overflow-hidden"
        >
          <Heart
            className="absolute -right-3 -top-3 h-14 w-14 text-primary/10 rotate-12"
            fill="currentColor"
          />
          <Heart
            className="absolute -left-3 -bottom-3 h-14 w-14 text-primary/10 -rotate-12"
            fill="currentColor"
          />

          <div className="relative z-10 space-y-6">
            {[
              "Bas mera dil karta hai tere saath rahu, tere paas rahu — hamesha. 🤍",
              "Apne bahut cute cute moments banayein — woh waale jinhe yaad karke dono muskurayein.",
              "Pyaar se rehna hai — chhoti chhoti baaton mein, nazron mein, khamoshiyon mein bhi.",
              "Firse pehle jaisa milna chahta hu — woh wali chemistry, woh wali baat, woh wala ehsaas.",
              "Pyaar se jaane ke baad pata lagta hai heere ki keemat — aur tu mera heera hai, Mishtu.",
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="font-display text-base md:text-lg italic leading-relaxed text-foreground"
              >
                {line}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-right font-display text-sm text-primary"
            >
              — Tera bacha 🤍
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamFuture;
