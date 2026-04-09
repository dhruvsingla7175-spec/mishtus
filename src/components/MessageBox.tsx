import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircleHeart, Smile, ImagePlus, X } from "lucide-react";
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Sirf photo upload karo 📸");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo 5MB se chhoti honi chahiye 🙈");
      return;
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedImage) {
      toast.error("Please write a message ya photo add karo 💌");
      return;
    }
    setSending(true);

    let imageUrl: string | null = null;

    // Upload image if selected
    if (selectedImage) {
      const ext = selectedImage.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("message-attachments")
        .upload(fileName, selectedImage);

      if (uploadError) {
        toast.error("Photo upload nahi hui 😢 Try again!");
        setSending(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("message-attachments")
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("visitor_messages").insert({
      name: name.trim() || "Anonymous",
      message: message.trim() || "(photo attached)",
      image_url: imageUrl,
    });

    setSending(false);
    if (error) {
      toast.error("Message nahi gaya 😢 Try again!");
    } else {
      toast.success("Message sent! 💕");
      setName("");
      setMessage("");
      removeImage();
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
            Sirf mujhe show hoga — kabhi bhi koi bhi message dena ho toh you can easily contact me ✨
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Aur mein iss website ke through regular updates deta rhunga 🤍
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
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            {/* Action buttons */}
            <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ImagePlus className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setShowEmojis((v) => !v)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

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

          {/* Image preview */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative inline-block"
              >
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="h-20 w-20 object-cover rounded-xl border border-border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md"
                >
                  <X className="h-3 w-3" />
                </button>
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
