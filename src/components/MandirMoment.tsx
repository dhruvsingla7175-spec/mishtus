import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const MandirMoment = () => {
  return (
    <section id="mandir" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Subtle floating sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20"
          style={{ left: `${15 + i * 18}%`, top: `${10 + (i % 3) * 30}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        >
          <Sparkles size={14 + i * 3} />
        </motion.div>
      ))}

      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary/60" />
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Bhagwan Ji Ki Planning ✨
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Hanuman Jayanti wale din kasam se vahi pray kar rha tha dikh jaye
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="paper-texture rounded-2xl p-8 md:p-10 shadow-xl border border-border/30 relative"
        >
          <div className="space-y-5 font-display text-base md:text-lg italic leading-relaxed text-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Meri pyaari Mishtu...
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Mandir mein Hanuman Chalisa padh rha tha aankhen band thi aur bas ek hi cheez maangi "Bhagwan ji, ek baar bas Mishty dikh jaaye bahot time hogya"
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              Chalisa khatam hua aankhen kholi aur aap saamne thi Sach mein apne foots touch hue Hanuman Jayanti ke din Bhagwan ji ne prasaad mein meri jaan ki ek jhalak de di thanks godd🙏
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="text-primary/80"
            >
              Kuch toh baat hogi na... kuch toh connection hoga jo upar waale ne bhi dekha.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
            >
              Ek jhalak ke liye aadmi kitna tadap jaata hai yeh sirf vohi jaanta hai jisne sachcha chahha ho
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 }}
              className="text-lg md:text-xl font-semibold text-primary"
            >
              I missss youuu so muchhh meri mishtuuuu 🤍
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
            >
              Smile kar diya kar... bahot pyaari lagti hai.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.7 }}
              className="text-muted-foreground"
            >
              Itne paas se, bahot time ke baad dikhi — aur dil bas ruk sa gaya. 💫
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MandirMoment;
