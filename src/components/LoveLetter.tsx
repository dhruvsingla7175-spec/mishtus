import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const letter = `Mishtuuuuu meri Jaan,

Yeh likhna easy nahi tha Kai baar likha mitaya fir likha

Par aaj likh rha hu kyunki kuch cheezein andar reh jaati hai aur dheere dheere bhaari hone lagti hai

Aap jab saamne hoti ho main kuch bol nahi paata aankhein milne se pehle hi sab kuch feel hone lagta hai dil tez dhadakta hai words kho jaate hai aur aap voh dara hua face dekh leti ho jo main chupaana chahta tha

Par jo main chupaata hu voh yeh hai ki aapi ek smile se din ban jaata mera Sirf ek smile 

Aap kehti thi sangat ka asar ho jayega ho bhi sakta hai par apki yaad ka asar itna gahra hoga ki koi sangat usse nahi mita sakti ab

Main pass hone ke bhad bhi dur hu haina par bhula nahi paya aur honestly bhulna chahta bhi nahi

Yeh website nahi bani kisi expectation ke saath bas isliye bani hai kyunki aap deserve karti ho yeh jaanna ki koi hai jo tujhe genuinely deeply, aur bina kisi condition ke yaad karta hai saara saara time

Khush reh, Mishtu baby Hamesha muaaahhhhhhhhhhh mwwwwwwwaaaaaaaaaahhhhhhhhhhhhhhh`;

const LoveLetter = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-romantic">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Khat for you💌
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="paper-texture rounded-2xl p-8 md:p-12 shadow-xl border border-border/30 relative overflow-hidden"
        >
          {/* Corner decoration */}
          <Heart
            className="absolute -right-3 -top-3 h-16 w-16 text-primary/10 rotate-12"
            fill="currentColor"
          />
          <Heart
            className="absolute -left-3 -bottom-3 h-16 w-16 text-primary/10 -rotate-12"
            fill="currentColor"
          />

          <div className="relative z-10">
            {letter.split("\n\n").map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="mb-6 font-display text-base md:text-lg italic leading-relaxed text-foreground last:mb-0"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-8 text-right font-display text-lg text-primary"
            >
              — Tera bacha 🤍
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;
