import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, MessageCircle, Trash2, RefreshCw, Reply, Send, X, Shield, LogOut, Clock, Image } from "lucide-react";
import { toast } from "sonner";
import MessageBox from "@/components/MessageBox";

const ADMIN_PASSWORD = "mishtu2025";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
  image_url: string | null;
  reply: string | null;
}

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [filter, setFilter] = useState<"all" | "unreplied" | "replied">("all");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("admin-auth", "true");
    } else {
      toast.error("Wrong password! 🔒");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("admin-auth");
  };

  useEffect(() => {
    if (localStorage.getItem("admin-auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("visitor_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) {
      fetchMessages();
      const channel = supabase
        .channel("visitor_messages_changes")
        .on("postgres_changes", { event: "*", schema: "public", table: "visitor_messages" }, () => fetchMessages())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [authenticated]);

  const deleteMessage = async (id: string) => {
    await supabase.from("visitor_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success("Message deleted 🗑️");
  };

  const handleReply = async (id: string) => {
    if (!replyText.trim()) return;
    setSendingReply(true);
    const { error } = await supabase
      .from("visitor_messages")
      .update({ reply: replyText.trim() })
      .eq("id", id);
    setSendingReply(false);
    if (error) {
      toast.error("Reply nahi gaya 😢");
    } else {
      toast.success("Reply saved! 💕");
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, reply: replyText.trim() } : m))
      );
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unreplied") return !m.reply;
    if (filter === "replied") return !!m.reply;
    return true;
  });

  const isVideoUrl = (url: string) => /\.(mp4|webm|mov|avi|mkv)$/i.test(url);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  // ─── Login Screen ───
  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 50%, hsl(var(--background)) 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-8 shadow-2xl shadow-primary/10 text-center space-y-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mx-auto"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))" }}
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground mt-1">Enter password to continue</p>
            </div>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="w-full rounded-xl py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
              >
                <Lock className="h-4 w-4 inline mr-2" />
                Unlock
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Dashboard ───
  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card) / 0.3) 100%)" }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))" }}
            >
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Messages</h1>
              <p className="text-xs text-muted-foreground">{messages.length} total • {messages.filter(m => !m.reply).length} unreplied</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: 180 }}
              onClick={fetchMessages}
              disabled={loading}
              className="p-2.5 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-border/50 hover:bg-destructive/10 hover:border-destructive/30 transition-colors"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-5"
        >
          {(["all", "unreplied", "replied"] as const).map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border/40"
              }`}
            >
              {f === "all" ? `All (${messages.length})` : f === "unreplied" ? `Unreplied (${messages.filter(m => !m.reply).length})` : `Replied (${messages.filter(m => !!m.reply).length})`}
            </motion.button>
          ))}
        </motion.div>

        {/* Messages list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredMessages.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-4xl mb-3">💭</div>
                <p className="text-muted-foreground text-sm">
                  {filter === "all" ? "Koi message nahi aaya abhi tak" : `No ${filter} messages`}
                </p>
              </motion.div>
            )}
            {filteredMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index < 8 ? index * 0.03 : 0 }}
                className="group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-4 shadow-sm hover:shadow-md hover:border-border transition-all"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg">
                        #{messages.length - messages.indexOf(msg)}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground/60">
                        <Clock className="h-3 w-3" />
                        <span className="text-[11px]">{formatDate(msg.created_at)}</span>
                      </div>
                      {msg.reply && (
                        <span className="text-[10px] bg-accent/20 text-accent-foreground px-1.5 py-0.5 rounded-md">
                          ✓ Replied
                        </span>
                      )}
                    </div>

                    {/* Message body */}
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                      {msg.message}
                    </p>

                    {/* Attachment */}
                    {msg.image_url && (
                      <div className="mt-2.5">
                        {isVideoUrl(msg.image_url) ? (
                          <video src={msg.image_url} controls className="max-h-40 rounded-xl border border-border/50" />
                        ) : (
                          <a href={msg.image_url} target="_blank" rel="noopener noreferrer" className="inline-block">
                            <motion.img
                              whileHover={{ scale: 1.02 }}
                              src={msg.image_url}
                              alt="Attachment"
                              className="h-36 w-36 object-cover rounded-xl border border-border/50 hover:opacity-90 transition-opacity shadow-sm"
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setReplyingTo(replyingTo === msg.id ? null : msg.id);
                        setReplyText(msg.reply || "");
                      }}
                      className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteMessage(msg.id)}
                      className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Existing reply display */}
                {msg.reply && replyingTo !== msg.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 ml-1 pl-3 border-l-2 border-primary/30 rounded-r-xl bg-primary/5 py-2 pr-3"
                  >
                    <p className="text-[10px] font-semibold text-primary mb-0.5">💕 Your reply</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{msg.reply}</p>
                  </motion.div>
                )}

                {/* Reply input */}
                <AnimatePresence>
                  {replyingTo === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleReply(msg.id)}
                          placeholder="Reply likho..."
                          autoFocus
                          className="flex-1 rounded-xl border border-border/50 bg-background/80 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReply(msg.id)}
                          disabled={sendingReply || !replyText.trim()}
                          className="p-2.5 rounded-xl text-primary-foreground disabled:opacity-40 shadow-md shadow-primary/20"
                          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setReplyingTo(null); setReplyText(""); }}
                          className="p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground border border-border/40"
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Message Box */}
        <div className="mt-10 pt-8 border-t border-border/40">
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
