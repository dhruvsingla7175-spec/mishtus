import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Wish = { id: string; name: string; wish: string; created_at: string };

const WishJar = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      const { data } = await supabase.from("wishes").select("*").order("created_at", { ascending: false });
      if (data) setWishes(data);
    };
    fetchWishes();
  }, []);

  const handleSubmit = async () => {
    if (!wish.trim()) return;
    setSending(true);
    const { data } = await supabase
      .from("wishes")
      .insert({ name: name.trim() || "Anonymous", wish: wish.trim() })
      .select()
      .single();
    if (data) setWishes((prev) => [data, ...prev]);
    setWish("");
    setName("");
    setSending(false);
    setShowForm(false);
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-romantic">
      <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" /> Wish Jar ✨
          </h2>
          <p className="mt-3 text-muted-foreground font-body">Apni wish likho aur jar mein daalo 💫</p>
        </motion.div>

        {/* Jar visualization */}
        <div className="mt-10 relative mx-auto max-w-lg min-h-[300px] rounded-3xl border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-6 overflow-hidden">
          {/* Floating wish stars */}
          <div className="flex flex-wrap gap-3 justify-center">
            <AnimatePresence>
              {wishes.map((w, i) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  className="group relative"
                >
                  <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-2 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors">
                    <Star className="h-3.5 w-3.5 text-primary fill-primary/50" />
                    <span className="text-xs font-body text-foreground max-w-[120px] truncate">{w.wish}</span>
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <div className="glass-card rounded-lg px-3 py-2 text-xs max-w-[200px] whitespace-normal">
                      <p className="font-display text-foreground font-semibold">{w.name}</p>
                      <p className="text-muted-foreground mt-1">{w.wish}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {wishes.length === 0 && (
            <p className="text-muted-foreground/50 italic font-display mt-10">Jar abhi khaali hai... pehli wish daalo! 🌟</p>
          )}
        </div>

        {/* Add wish button/form */}
        <div className="mt-8">
          {!showForm ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            >
              <Star className="h-4 w-4" /> Wish Daalo ✨
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-sm glass-card rounded-2xl p-5 space-y-3"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tumhara naam 💕"
                className="w-full rounded-lg bg-background/50 border border-border px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Apni wish likho yahan... ✨"
                rows={3}
                className="w-full rounded-lg bg-background/50 border border-border px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-body text-muted-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={sending || !wish.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-body text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" /> {sending ? "Sending..." : "Send"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishJar;
