import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, MessageCircle, Trash2, RefreshCw, Reply, Send, X } from "lucide-react";
import { toast } from "sonner";

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

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("admin-auth", "true");
    }
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
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "visitor_messages" },
          (payload) => {
            setMessages((prev) => [payload.new as Message, ...prev]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [authenticated]);

  const deleteMessage = async (id: string) => {
    await supabase.from("visitor_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
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

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl text-center space-y-4"
        >
          <Lock className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-xl font-display font-semibold text-foreground">Admin Panel</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-semibold text-foreground">Messages</h1>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
              {messages.length}
            </span>
          </div>
          <button
            onClick={fetchMessages}
            disabled={loading}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <RefreshCw className={`h-5 w-5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <AnimatePresence>
          {messages.length === 0 && !loading && (
            <p className="text-center text-muted-foreground py-12">Koi message nahi aaya abhi tak 💭</p>
          )}
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="mb-3 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md font-mono">#{messages.length - index}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{msg.message}</p>
                  {msg.image_url && (
                    <a href={msg.image_url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={msg.image_url}
                        alt="Attachment"
                        className="mt-2 h-32 w-32 object-cover rounded-xl border border-border hover:opacity-80 transition-opacity"
                      />
                    </a>
                  )}
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {new Date(msg.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setReplyingTo(replyingTo === msg.id ? null : msg.id);
                      setReplyText(msg.reply || "");
                    }}
                    className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Reply className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Existing reply */}
              {msg.reply && replyingTo !== msg.id && (
                <div className="mt-3 ml-3 pl-3 border-l-2 border-primary/30">
                  <p className="text-sm text-foreground/80 mt-0.5">{msg.reply}</p>
                </div>
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
                        className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                      <button
                        onClick={() => handleReply(msg.id)}
                        disabled={sendingReply || !replyText.trim()}
                        className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => { setReplyingTo(null); setReplyText(""); }}
                        className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="mt-8 border-t border-border pt-8">
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
