import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircleHeart, Smile, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EMOJI_LIST = [
  "❤️", "😍", "🥰", "💕", "💖", "😘", "🤗", "😊",
  "🥺", "✨", "🌹", "🦋", "💌", "🫶", "😭", "🙈",
];

interface ChatMessage {
  id: string;
  message: string;
  created_at: string;
  reply: string | null;
}

const ChatColumn = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("visitor_messages")
      .select("id, message, created_at, reply")
      .order("created_at", { ascending: true });
    if (data) setMessages(data);
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("chat_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "visitor_messages" },
        () => fetchMessages()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    const { error } = await supabase.from("visitor_messages").insert({
      message: newMessage.trim(),
      name: "Visitor",
    });
    setSending(false);
    if (error) {
      toast.error("Message nahi gaya 😢");
    } else {
      setNewMessage("");
      inputRef.current?.focus();
    }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section id="chat" className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-6">
          <MessageCircleHeart className="h-8 w-8 text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Chat with me 💬
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Yahan message karo, mujhe dikh jayega ✨
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg overflow-hidden flex flex-col" style={{ height: "420px" }}>
          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-8">
                Koi message nahi hai abhi... pehla message bhejo! 💌
              </p>
            )}
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1.5"
                >
                  {/* Visitor message - right aligned */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary text-primary-foreground px-3.5 py-2 text-sm">
                      <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                      <p className="text-[10px] opacity-60 mt-1 text-right">
                        {formatTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                  {/* Reply - left aligned */}
                  {msg.reply && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-muted text-foreground px-3.5 py-2 text-sm">
                        <p className="text-[10px] font-medium text-primary mb-0.5">💕 Reply</p>
                        <p className="whitespace-pre-wrap break-words">{msg.reply}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Emoji picker */}
          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-border"
              >
                <div className="grid grid-cols-8 gap-1 p-2 bg-background">
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="text-lg h-8 w-full rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input area */}
          <div className="border-t border-border p-3 flex items-center gap-2 bg-background/50">
            <button
              type="button"
              onClick={() => setShowEmojis((v) => !v)}
              className="text-muted-foreground hover:text-primary transition-colors shrink-0"
            >
              {showEmojis ? <X className="h-5 w-5" /> : <Smile className="h-5 w-5" />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Message likho... 💕"
              maxLength={500}
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={sending || !newMessage.trim()}
              className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ChatColumn;
