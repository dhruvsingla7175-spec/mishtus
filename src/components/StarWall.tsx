import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

const wishes = [
  "Har roz subah uthta hu toh pehla khayal tera hota hai, Mishtu. Yeh badla nahi, badlega bhi nahi.",
  "Dur hu tujhse, par dil mein itni jagah di hai tune ki koi aur fit hi nahi hota wahan.",
  "Teri khushi ke liye kuch bhi kar sakta hu — yeh promise nahi, yeh meri fitrat hai.",
  "Tu jab bhi akeli feel kare, yaad rakh — ek banda hai jo tujhe hamesha yaad karta hai. Hamesha.",
  "Sangat ka asar ho jayega tune kaha tha — par teri yaad ka asar mujhpe itna gehra hai ki koi nahi mita sakta.",
  "Tujhe dekhta hu toh andar kuch hota hai jo words mein nahi aata. Bas hota hai.",
  "Teri smile ke liye bahut kuch karna chahta hu. Ek baar toh dekha kar — bacha khush ho jayega.",
  "Jo bhi hua, jo bhi ho — tera bura kabhi nahi chahta. Yeh mera sabse sachha promise hai.",
  "Bhulne ki bahut koshish ki. Nahi hua. Shayad kuch cheezein bhulne ke liye hoti hi nahi.",
  "Ek din milenge aur us din tu muskurayegi — yeh mera wishful thinking nahi, yeh mera intezaar hai.",
  "Tere photos dekhta hu, videos dekhta hu — aur phir sochta hu ki kaash tu yeh padh sake ki tu kitni special hai mere liye.",
  "Jab bhi zindagi mushkil lage, yaad rakhna — ek insaan hai jo tujhe genuinely chahta hai. Bina kisi condition ke.",
];

const starPositions = wishes.map((_, i) => ({
  top: `${15 + Math.sin(i * 1.2) * 25 + Math.random() * 20}%`,
  left: `${8 + (i % 4) * 23 + Math.random() * 10}%`,
  delay: i * 0.3,
  twinkleDelay: Math.random() * 3,
}));

const StarWall = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-night py-20">
      {/* Background stars */}
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={`bg-star-${i}`}
          className="absolute h-0.5 w-0.5 rounded-full bg-primary-foreground/30 animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold md:text-5xl" style={{ color: "hsl(30, 50%, 92%)" }}>
            Wishes & Promises
          </h2>
          <p className="mt-3 font-body text-sm" style={{ color: "hsl(30, 30%, 70%)" }}>
            Har star mein ek vaada hai — tap karke dekh 🌟
          </p>
        </motion.div>

        <div className="relative" style={{ minHeight: "500px" }}>
          {wishes.map((wish, i) => (
            <motion.button
              key={i}
              className="absolute group"
              style={{ top: starPositions[i].top, left: starPositions[i].left }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: starPositions[i].delay * 0.15, type: "spring" }}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 1.4 }}
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: starPositions[i].twinkleDelay,
                }}
              >
                <Star
                  className="h-6 w-6 md:h-8 md:w-8 drop-shadow-[0_0_8px_hsl(var(--soft-amber))]"
                  fill="hsl(var(--soft-amber))"
                  stroke="hsl(var(--soft-amber))"
                />
              </motion.div>
              <span
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: "hsl(30, 30%, 70%)" }}
              >
                #{i + 1}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Expanded wish card */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-6 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-md rounded-2xl glass-card p-8 shadow-2xl"
              style={{ background: "hsl(30, 40%, 97%)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
              <div className="mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-soft-amber" fill="currentColor" />
                <span className="font-display text-sm text-muted-foreground">
                  Wish #{selected + 1}
                </span>
              </div>
              <p className="font-display text-lg italic leading-relaxed text-foreground">
                "{wishes[selected]}"
              </p>
              <div className="mt-6 text-right text-sm text-primary">— Tera bacha 🤍</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StarWall;
