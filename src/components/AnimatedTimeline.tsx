import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const events = [
  { date: "06 Apr 2009", title: "MISHTU JAAN Birthday 🎂", text: "Duniya mein sabse khoobsurat insaan aaya", emoji: "🎂" },
  { date: "25 Mar 2024", title: "First Meet — Holi 🎨", text: "Pehli baar dekha tha — rang lagaye the aur dil bhi rang gaya", emoji: "🎨" },
  { date: "26 May 2024", title: "First Time Chat 💬", text: "Pehla message bheja — aur duniya badal gayi", emoji: "💬" },
  { date: "08 Jun 2024", title: "First Meet at UV Home", text: "Pehli baar akele mile — nervousness aur khushi dono thi", emoji: "🏠" },
  { date: "23 Jun 2024", title: "My Birthday 🎂", text: "Mera din tha par tu thi toh aur special ho gaya", emoji: "🎉" },
  { date: "28 Jun 2024", title: "1st Meet Outside — Sneaker", text: "Pehli baar bahar mile — woh feeling alag thi", emoji: "👟" },
  { date: "08 Jul 2024", title: "Meet at Papa Rich ❤️", text: "Tu pehli baar mujhpe trust ki — woh moment kabhi nahi bhulunga", emoji: "🤝" },
  { date: "11 Jul 2024", title: "First Call 📞", text: "Pehli call — ghanton baat ki, time ka pata hi nahi chala", emoji: "📞" },
  { date: "13 Jul 2024", title: "First Active Rides Together 🚗", text: "Saath mein ride pe gaye — hawa aur tera saath", emoji: "🚗" },
  { date: "16 Jul 2024", title: "Meet at Cake & Bake 🍰", text: "Meethi jagah, meethi baatein, meethi tu", emoji: "🍰" },
  { date: "19 Jul 2024", title: "Meet at Cafe Molis ☕", text: "Coffee aur teri company — perfect combo", emoji: "☕" },
  { date: "30 Jul 2024", title: "First Time Periods Talk 🤍", text: "Tu mujhpe itna trust karti thi — woh bahut special tha", emoji: "🤍" },
  { date: "02 Aug 2024", title: "First Ladai 🧛‍♀️", text: "Pehli ladai — par usse aur close aaye", emoji: "😤" },
  { date: "12 Aug 2024", title: "Meet at Cafe", text: "Phir se cafe, phir se tu — kabhi bore nahi hota", emoji: "☕" },
  { date: "21 Sep 2024", title: "Love Bit — Jiya Ke Saath", text: "Woh outing yaad hai — masti, dosti aur tu", emoji: "🎉" },
  { date: "11 Oct 2024", title: "Cafe Molis — First Hickey 💋", text: "Woh din... kuch baatein sirf dil jaanta hai", emoji: "💋" },
  { date: "27 Oct 2024", title: "Ice Cream with Kittu 🍦", text: "Hamour ke piche wali gali... uncle ne pakad liya kiss karte hue 😂", emoji: "😂" },
  { date: "30 Oct 2024", title: "Platter — Jiya & Gagan Party", text: "Party mein bhi bas tujhe dekhta raha", emoji: "🎊" },
  { date: "31 Oct 2024", title: "Diwali at Kittu's Home 🪔", text: "Saath mein Diwali celebrate ki — roshni tu thi", emoji: "🪔" },
  { date: "14 Nov 2024", title: "Sabse Special Day ⭐", text: "1:30 hr romance, 2 hr saath — meri life ka sabse special din. Phir Jaksir sir ke tuition pe gayi thi tu", emoji: "⭐" },
  { date: "19 Nov 2024", title: "First Mandir Together 😇", text: "Saath mein bhagwan ke saamne gaye — kuch maanga hoga tune?", emoji: "🙏" },
  { date: "24 Nov 2024", title: "Longest Call — 132 min! 🥳", text: "2 ghante+ baat ki — aur phir bhi mann nahi bhara", emoji: "🥳" },
  { date: "28 Nov 2024", title: "Video Bani Gopal Ke Saamne 📱", text: "Mumma ko pata lag gaya tha — par woh moment iconic tha", emoji: "📱" },
  { date: "27 Mar 2025", title: "Dominos with Taushani 🍕", text: "Sirf 10 mins mile — par SO CUTE MOMENTS the na", emoji: "🍕" },
  { date: "09 May 2025", title: "Cafe with Kittu ☕", text: "Phir se mile — har baar special lagta hai", emoji: "☕" },
  { date: "13 May 2025", title: "Result Ka Din 💔", text: "Ache se wish tak nahi kar paya... aur usse pehle hi sab kharab ho gaya", emoji: "💔" },
];

const AnimatedTimeline = () => {
  return (
    <section className="py-20 bg-gradient-romantic">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Hamari Kahani 💫
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Har chapter yaad hai mujhe — sab kuch
          </p>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20" />

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: "spring", damping: 20 }}
                className={`relative mb-8 flex items-start md:items-center ${isLeft ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Center dot */}
                <motion.div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10"
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                    <Heart className="h-3 w-3 text-primary" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-4 md:text-right" : "md:pl-4 md:text-left"}`}>
                  <div className="glass-card rounded-xl p-4 md:p-5">
                    <span className="text-2xl">{event.emoji}</span>
                    <div className="mt-1 text-xs text-muted-foreground font-body">
                      {event.date}
                    </div>
                    <h3 className="mt-1 font-display text-sm font-semibold text-primary">
                      {event.title}
                    </h3>
                    <p className="mt-1 font-display text-xs italic text-foreground leading-relaxed">
                      {event.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnimatedTimeline;
