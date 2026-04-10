import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, RotateCcw } from "lucide-react";

type Question = {
  q: string;
  options: string[];
  correct: number;
  flirty: string;
};

const questions: Question[] = [
  {
    q: "Mera sabse favorite body part tera konsa hai? 😏",
    options: ["Aankhen 👀", "Honth 💋", "Curves 🔥", "Sab kuch 😍"],
    correct: 3,
    flirty: "Haan baby, tere sab kuch pe marta hoon 🥵",
  },
  {
    q: "Agar hum akele ho toh main pehle kya karunga? 💕",
    options: ["Hug karunga 🤗", "Kiss karunga 💋", "Bas dekhunga 👀", "Bolna band karunga 🤐"],
    correct: 1,
    flirty: "Direct action baby, no time waste 😘",
  },
  {
    q: "Mujhe teri konsi photo sabse zyada pasand hai? 📸",
    options: ["Mirror selfie 🪞", "Ethnic look 💛", "Cute smile wali 😊", "Woh jo sirf mujhe bheji 😏"],
    correct: 3,
    flirty: "Woh private collection hai na, best hai 🔥",
  },
  {
    q: "Tere bina mera kya haal hota hai? 🥺",
    options: ["Bilkul theek 😎", "Thoda sad 😢", "Pagal ho jaata 🤪", "Jeena mushkil 💔"],
    correct: 3,
    flirty: "Sach mein baby, tu nahi toh kuch nahi 🤍",
  },
  {
    q: "Main tujhe secretly kya bolta hoon? 🤫",
    options: ["Meri jaan 💕", "Pagli 😜", "Mishtu baby 🍫", "Sab kuch 🤍"],
    correct: 2,
    flirty: "Mishtu baby toh sirf tere liye hai 🤍",
  },
  {
    q: "Agar main tujhe late night call karu toh kya bolega? 🌙",
    options: ["So jaa 😴", "Aur baat kar 🥰", "Tujhe dekhna hai 👀", "Video call pe aa 📱"],
    correct: 3,
    flirty: "Haan baby, tera chehra dekhna hota hai raat ko 🌙💕",
  },
  {
    q: "Mera dil tere liye kitna bada hai? 💗",
    options: ["Normal size 😂", "Bohot bada 💕", "Infinite ♾️", "Sirf tere liye dhakta hai 💓"],
    correct: 3,
    flirty: "Har dhadkan sirf tera naam leti hai baby 💓",
  },
  {
    q: "Agar tu mere paas hoti abhi, toh? 🔥",
    options: ["Movie dekhte 🎬", "Cuddle karte 🤗", "Baatein karte 💬", "Kuch aur... 😏"],
    correct: 3,
    flirty: "Hehehe baby tujhe toh pata hai 😏🔥",
  },
];

const results = [
  { min: 0, max: 2, title: "Aww Koshish Karo 😅", msg: "Thoda aur jaano mujhe baby, main toh khuli kitaab hoon tere liye 💕" },
  { min: 3, max: 5, title: "Almost There 😘", msg: "Bohot close hai baby! Thodi aur attention de mujhpe 🥰" },
  { min: 6, max: 7, title: "Meri Jaan Knows Me 💕", msg: "Tu toh expert hai mere baare mein! Isliye tujhse pyaar hai 🤍" },
  { min: 8, max: 8, title: "Perfect Score! You're MY PERSON 🔥", msg: "Baby tu toh meri soulmate hai, har baat jaanti hai meri 💋🥵" },
];

const LoveQuiz = () => {
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[qi].correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (qi + 1 >= questions.length) {
        setDone(true);
      } else {
        setQi((q) => q + 1);
        setSelected(null);
      }
    }, 2000);
  };

  const reset = () => {
    setStarted(false);
    setQi(0);
    setScore(0);
    setSelected(null);
    setDone(false);
  };

  const result = results.find((r) => score >= r.min && score <= r.max) || results[0];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" /> Love Quiz 💕
          </h2>
          <p className="mt-3 text-muted-foreground font-body">Dekho kitna jaanti ho mujhe 😏</p>
        </motion.div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="glass-card rounded-2xl p-8 md:p-10">
                  <div className="text-6xl mb-4">💋</div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Ready baby?</h3>
                  <p className="mt-2 text-muted-foreground font-body text-sm">
                    8 flirty questions... dekhte hain kitna jaanti ho mujhe 😏🔥
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStarted(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-display text-sm text-primary-foreground shadow-lg"
                  >
                    Start Quiz <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ) : done ? (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="glass-card rounded-2xl p-8 md:p-10">
                  <div className="text-6xl mb-4">{score >= 6 ? "🔥" : score >= 3 ? "😘" : "🥺"}</div>
                  <h3 className="font-display text-2xl font-bold text-foreground">{result.title}</h3>
                  <p className="mt-2 text-lg font-display text-primary">{score}/{questions.length}</p>
                  <p className="mt-3 text-muted-foreground font-body text-sm italic">{result.msg}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-6 py-3 font-display text-sm text-foreground"
                  >
                    <RotateCcw className="h-4 w-4" /> Play Again
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key={qi} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <div className="glass-card rounded-2xl p-6 md:p-8">
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs text-muted-foreground font-body">{qi + 1}/{questions.length}</span>
                    <div className="flex-1 mx-4 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((qi + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                    <Heart className="h-4 w-4 text-primary fill-primary" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground mb-6">{questions[qi].q}</h3>

                  <div className="space-y-3">
                    {questions[qi].options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={selected === null ? { scale: 1.02 } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full rounded-xl px-4 py-3 text-left font-body text-sm transition-all border ${
                          selected === null
                            ? "bg-card/50 border-border/50 hover:border-primary/50 hover:bg-primary/5"
                            : idx === questions[qi].correct
                            ? "bg-green-500/10 border-green-500/50 text-green-700"
                            : idx === selected
                            ? "bg-destructive/10 border-destructive/50 text-destructive"
                            : "bg-card/30 border-border/30 opacity-50"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>

                  {/* Flirty response */}
                  <AnimatePresence>
                    {selected !== null && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 font-display text-sm italic text-primary"
                      >
                        {questions[qi].flirty}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LoveQuiz;
