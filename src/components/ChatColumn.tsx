import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircleHeart, Smile, X, ImagePlus } from "lucide-react";
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
  image_url: string | null;
}

const ChatColumn = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("visitor_messages")
      .select("id, message, created_at, reply, image_url")
      .order("created_at", { ascending: true });
    if (data) setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel("chat_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "visitor_messages" }, () => fetchMessages())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) { toast.error("Sirf photo ya video upload karo 📸🎥"); return; }
    if (file.size > 20 * 1024 * 1024) { toast.error("File 20MB se chhoti honi chahiye 🙈"); return; }
    setSelectedFile(file);
    setFileType(isImage ? "image" : "video");
    setFilePreview(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!newMessage.trim() && !selectedFile) return;
    setSending(true);
    let imageUrl: string | null = null;
    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("message-attachments").upload(fileName, selectedFile);
      if (uploadError) { toast.error("File upload nahi hui 😢"); setSending(false); return; }
      const { data: urlData } = supabase.storage.from("message-attachments").getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }
    const { error } = await supabase.from("visitor_messages").insert({
      message: newMessage.trim() || (fileType === "video" ? "🎥 Video" : "📸 Photo"),
      name: "Visitor",
      image_url: imageUrl,
    });
    setSending(false);
    if (error) { toast.error("Message nahi gaya 😢"); }
    else { setNewMessage(""); removeFile(); inputRef.current?.focus(); }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const isVideoUrl = (url: string) => /\.(mp4|webm|mov|avi|mkv)$/i.test(url);

  return (
    <section id="chat" className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-3"
          >
            <MessageCircleHeart className="h-7 w-7 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Chat with me 💬
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Yahan message karo, mujhe dikh jayega ✨
          </p>
        </div>

        {/* Chat container */}
        <div
          className="rounded-3xl border border-border/60 overflow-hidden flex flex-col shadow-2xl shadow-primary/5"
          style={{
            height: "480px",
            background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
          }}
        >
          {/* Top bar */}
          <div className="px-4 py-3 border-b border-border/40 flex items-center gap-2" style={{ background: "hsl(var(--card) / 0.8)", backdropFilter: "blur(12px)" }}>
            <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">Online</span>
            <span className="ml-auto text-xs text-muted-foreground/50">{messages.length} messages</span>
          </div>

          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="text-4xl mb-3">💌</div>
                <p className="text-muted-foreground text-sm">Pehla message bhejo!</p>
              </motion.div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: i < 5 ? i * 0.05 : 0 }}
                  className="space-y-1.5"
                >
                  {/* Visitor message */}
                  <div className="flex justify-end">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="max-w-[80%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm shadow-md"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.85))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      {msg.image_url && (
                        isVideoUrl(msg.image_url) ? (
                          <video src={msg.image_url} controls className="rounded-xl max-h-48 w-full mb-1.5" />
                        ) : (
                          <a href={msg.image_url} target="_blank" rel="noopener noreferrer">
                            <img
                              src={msg.image_url}
                              alt="Attachment"
                              className="rounded-xl max-h-48 w-full object-cover mb-1.5 hover:opacity-90 transition-opacity"
                            />
                          </a>
                        )
                      )}
                      {msg.message && msg.message !== "📸 Photo" && msg.message !== "🎥 Video" && (
                        <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.message}</p>
                      )}
                      <p className="text-[10px] opacity-50 mt-1 text-right">{formatTime(msg.created_at)}</p>
                    </motion.div>
                  </div>
                  {/* Reply */}
                  {msg.reply && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-start"
                    >
                      <div
                        className="max-w-[80%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm shadow-sm border border-border/40"
                        style={{ background: "hsl(var(--muted) / 0.7)", backdropFilter: "blur(8px)" }}
                      >
                        <p className="text-[10px] font-semibold text-primary mb-0.5">💕 Reply</p>
                        <p className="whitespace-pre-wrap break-words text-foreground/90 leading-relaxed">{msg.reply}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* File preview */}
          <AnimatePresence>
            {filePreview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="border-t border-border/40 px-4 py-2.5"
                style={{ background: "hsl(var(--card) / 0.6)", backdropFilter: "blur(12px)" }}
              >
                <div className="relative inline-block">
                  {fileType === "video" ? (
                    <video src={filePreview} className="h-16 rounded-xl border border-border/60" />
                  ) : (
                    <img src={filePreview} alt="Selected" className="h-16 w-16 object-cover rounded-xl border border-border/60" />
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeFile}
                    className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Emoji picker */}
          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-border/40"
              >
                <div className="grid grid-cols-8 gap-1.5 p-3" style={{ background: "hsl(var(--card) / 0.8)" }}>
                  {EMOJI_LIST.map((emoji) => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.85 }}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="text-lg h-9 w-full rounded-xl hover:bg-primary/10 transition-colors flex items-center justify-center"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden file input */}
          <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileSelect} className="hidden" />

          {/* Input area */}
          <div
            className="border-t border-border/40 p-3 flex items-center gap-2"
            style={{ background: "hsl(var(--card) / 0.6)", backdropFilter: "blur(12px)" }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-muted-foreground hover:text-primary transition-colors shrink-0 p-1.5 rounded-xl hover:bg-primary/10"
            >
              <ImagePlus className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setShowEmojis((v) => !v)}
              className="text-muted-foreground hover:text-primary transition-colors shrink-0 p-1.5 rounded-xl hover:bg-primary/10"
            >
              {showEmojis ? <X className="h-5 w-5" /> : <Smile className="h-5 w-5" />}
            </motion.button>
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Message likho... 💕"
              maxLength={500}
              className="flex-1 rounded-xl border border-border/50 bg-background/80 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={sending || (!newMessage.trim() && !selectedFile)}
              className="p-2.5 rounded-xl text-primary-foreground transition-all disabled:opacity-40 shrink-0 shadow-md shadow-primary/20"
              style={{
                background: sending
                  ? "hsl(var(--primary) / 0.6)"
                  : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              }}
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
