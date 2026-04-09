import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircleHeart, Smile } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_MESSAGE = 500;

const EMOJI_LIST = [
  "❤️", "😍", "🥰", "💕", "💖", "💗", "💘", "💝",
  "😘", "🤗", "😊", "🥺", "✨", "🌹", "🦋", "🌸",
  "💌", "🫶", "😭", "🙈", "💯", "🔥", "⭐", "🌙",
  "🎉", "😂", "🤍", "💜", "💙", "💚", "🧡", "🤎",
];

const MessageBox = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const addEmoji = (emoji: string) => {
    if (message.length + emoji.length <= MAX_MESSAGE) {
      setMessage((prev) => prev + emoji);
      textareaRef.current?.focus();
    }
  };

  const charPercent = (message.length / MAX_MESSAGE) * 100;

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

          {/* Textarea with emoji + char count */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              placeholder="Apna message likho... 💕"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={MAX_MESSAGE}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            {/* Emoji toggle */}
            <button
              type="button"
              onClick={() => setShowEmojis((v) => !v)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>

            {/* Character count bar */}
            <div className="flex items-center justify-between mt-1.5 px-1">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden mr-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      charPercent > 90
                        ? "hsl(var(--destructive))"
                        : charPercent > 70
                        ? "hsl(var(--accent))"
                        : "hsl(var(--primary))",
                  }}
                  animate={{ width: `${charPercent}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <span
                className={`text-xs font-medium tabular-nums ${
                  charPercent > 90 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {message.length}/{MAX_MESSAGE}
              </span>
            </div>
          </div>

          {/* Emoji picker */}
          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-8 gap-1 p-2 rounded-xl border border-border bg-background">
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="text-lg h-9 w-full rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
