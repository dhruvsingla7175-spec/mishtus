import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Sparkles } from "lucide-react";

const wishes = [
  "Har roz subah uthta hu toh pehla khayal apka hota hai Mishtu Yeh badla nahi, badlega bhi nahi.",
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
  "Tera 17th birthday hai — aur main chahta hu ki yeh saal tere liye sabse khaas ho. Tu deserve karti hai.",
  "Tere har birthday pe main yeh sochta hu — kaash tere saamne hota aur tujhe wish kar pata apne haathon se.",
  "17 ki ho gayi tu, par mere liye tu wahi hai — meri Mishtu. Choti bhi, special bhi.",
  "Yeh 17 stars tere 17 saalon ke liye hain — har ek mein mera pyaar chhupa hai.",
  "Badi ho rahi hai tu, par meri duaayein wahi hain — teri khushi, teri hasi, teri safety. Hamesha.",
];

const StarWall = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleReveal = (i: number) => {
    setRevealed((prev) => new Set(prev).add(i));
    setSelected(i);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-night py-16 md:py-20">
      {/* Background stars */}
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={`bg-star-${i}`}
          className="absolute h-0.5 w-0.5 rounded-full bg-primary-foreground/20 animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-4xl font-bold md:text-5xl" style={{ color: "hsl(30, 50%, 92%)" }}>
            Wishes & Promises - dil se dil
          </h2>
          <p className="mt-3 font-body text-sm" style={{ color: "hsl(30, 30%, 70%)" }}>
            17 stars, 17 Years, 17 promises - tap karke dekhlo 🌟
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wishes.map((_, i) => {
            const isRevealed = revealed.has(i);
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", damping: 20 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleReveal(i)}
                className="group relative flex flex-col items-center justify-center rounded-2xl border p-6 transition-colors aspect-square"
                style={{
                  background: isRevealed
                    ? "hsl(30 40% 97% / 0.08)"
                    : "hsl(260 20% 18% / 0.5)",
                  borderColor: isRevealed
                    ? "hsl(30 60% 78% / 0.4)"
                    : "hsl(260 20% 30% / 0.4)",
                }}
              >
                <motion.div
                  animate={
                    !isRevealed
                      ? { opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }
                      : {}
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {isRevealed ? (
                    <Sparkles className="h-7 w-7 md:h-8 md:w-8" style={{ color: "hsl(30, 60%, 78%)" }} />
                  ) : (
                    <Star
                      className="h-7 w-7 md:h-8 md:w-8 drop-shadow-[0_0_10px_hsl(30,60%,78%)]"
                      fill="hsl(30, 60%, 78%)"
                      stroke="hsl(30, 60%, 78%)"
                    />
                  )}
                </motion.div>
                <span
                  className="mt-3 text-xs font-display"
                  style={{ color: isRevealed ? "hsl(30, 60%, 78%)" : "hsl(30, 30%, 60%)" }}
                >
                  {isRevealed ? "Opened ✨" : `Wish #${i + 1}`}
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center font-display text-sm italic"
          style={{ color: "hsl(30, 30%, 60%)" }}
        >
          {revealed.size}/{wishes.length} wishes revealed 🤍
        </motion.p>
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
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative max-w-md rounded-2xl p-8 shadow-2xl border"
              style={{
                background: "hsl(30, 40%, 97%)",
                borderColor: "hsl(30, 60%, 78% / 0.3)",
              }}
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
              <div className="mt-6 text-right text-sm text-primary font-display">— Tera bacha 🤍</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StarWall;
