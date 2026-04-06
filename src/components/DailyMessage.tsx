import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "Aaj bhi tera khayal aaya, Mishtu. Jaise roz aata hai. 🤍",
  "Kuch log bhulaye nahi jaate — tu unmein sabse upar hai.",
  "Aaj kuch zyada yaad aa rahi hai teri. Pata nahi kyun. Par achha lag raha hai.",
  "Ek din tu yeh padhegi aur muskurayegi — bas wahi chahta hu.",
  "Dur hoke bhi itna paas feel karta hu tujhe. Strange hai na?",
  "Teri smile ke baare mein soch raha tha aaj. Din ban gaya.",
  "Kaash aaj tujhse baat ho paati. Par yeh message bhi kaafi hai.",
  "Tu jaanti hai na ki tu special hai? Agar nahi jaanti — toh ab jaan le.",
  "Aaj mausam achha hai. Tujhe bahut yaad aa rahi hai.",
  "Bas itna kehna tha — tu hamesha dil mein rahegi. Hamesha.",
];

const DailyMessage = () => {
  const [message, setMessage] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    setMessage(messages[dayOfYear % messages.length]);
  }, []);

  useEffect(() => {
    if (!message) return;
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayedText(message.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Aaj Ka Message 💌
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Daily ek new message aayega sirf meri mishtuuu ke liye
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="paper-texture rounded-2xl p-8 md:p-12 shadow-lg border border-border/50"
        >
          <div className="mb-4 text-sm text-muted-foreground font-body">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <p className="font-display text-xl md:text-2xl italic leading-relaxed text-foreground min-h-[80px]">
            "{displayedText}"
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-primary"
            >
              |
            </motion.span>
          </p>
          <div className="mt-8 text-right text-sm text-primary font-display">
            — Your bachuu 🤍
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyMessage;
