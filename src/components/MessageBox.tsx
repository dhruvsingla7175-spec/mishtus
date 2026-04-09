import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircleHeart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MessageBox = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please write a message 💌");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("visitor_messages").insert({
      name: name.trim() || "Anonymous",
      message: message.trim(),
    });
    setSending(false);
    if (error) {
      toast.error("Message nahi gaya 😢 Try again!");
    } else {
      toast.success("Message sent! 💕");
      setName("");
      setMessage("");
    }
  };

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-6">
          <MessageCircleHeart className="h-8 w-8 text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Send me a message 💌
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Kuch bhi likh do, mujhe mil jayega ✨
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 space-y-3 shadow-lg">
          <input
            type="text"
            placeholder="Tumhara naam (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <textarea
            placeholder="Apna message likho... 💕"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default MessageBox;
