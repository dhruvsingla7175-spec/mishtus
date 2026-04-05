import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const reasons = [
  "Teri hansi sunke sab theek lagta hai",
  "Tu bina try kiye sabse khoobsurat lagti hai",
  "Tera gussa bhi cute hai",
  "Tujhse baat karke din achha ho jaata hai",
  "Tu samajhti hai bina bole",
  "Teri aankhein bahut kuch keh deti hain",
  "Tu sabse alag hai — genuinely",
  "Tera caring nature",
  "Jab tu hasti hai toh dimples",
  "Tera woh confused face",
  "Tu strong hai — usse bhi zyada jitna tu sochti hai",
  "Tujhse milke better insaan bana",
  "Tera sense of humor",
  "Tu jab serious hoti hai — woh look",
  "Kyunki tu Mishtu hai — aur wahi kaafi hai 🤍",
];

const ReasonsILoveYou = () => {
  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Why You're Special 💕
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            List toh endless hai — par yeh kuch reasons hain
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", damping: 15 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card rounded-full px-5 py-3 flex items-center gap-2 cursor-default"
            >
              <Heart className="h-3 w-3 text-primary shrink-0" fill="currentColor" />
              <span className="font-display text-sm italic text-foreground">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsILoveYou;
