import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Image } from "lucide-react";
import childhood1 from "@/assets/childhood-1.png";
import childhood2 from "@/assets/childhood-2.png";

const galleryItems = [
  { id: 0, src: childhood1, caption: "Choote hote ke photos 🤍 isse proof hota hai hamaare ladke ladko se kaam hote hai", height: 340 },
  { id: 1, src: childhood2, caption: "Family wali photo — kitne cute the hum 🥺", height: 340 },
  ...Array.from({ length: 6 }, (_, i) => ({
    id: i + 2,
    src: null as string | null,
    caption: [
      "Woh din yaad hai?",
      "Kaash yeh moment ruk jaata",
      "Bas tujhe dekhta raha",
      "Yeh photo meri favourite hai",
      "Tu kitni khoobsurat hai",
      "Hamesha yaad rahega",
    ][i],
    height: [240, 300, 320, 260, 350, 290][i],
  })),
];

const MemoryGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="bg-gradient-romantic py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Hamare Lamhe 🤍
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Photos aur videos yahan add kar sakta hu — bas tu bol
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.id * 0.1 }}
              className="group relative mb-4 cursor-pointer overflow-hidden rounded-xl"
              style={{ height: item.height }}
              onClick={() => setLightbox(item.id)}
            >
              {item.src ? (
                <img src={item.src} alt={item.caption} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-blush/40 transition-colors group-hover:bg-blush/60">
                  <Heart className="h-8 w-8 text-primary/40 animate-heartbeat" fill="currentColor" />
                  <Image className="h-5 w-5 text-primary/30" />
                </div>
              )}

              {/* Hover caption overlay */}
              <div className="absolute inset-0 flex items-end bg-foreground/0 p-4 transition-all group-hover:bg-foreground/40 group-hover:backdrop-blur-sm">
                <p className="font-display text-sm italic text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-6 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="relative flex max-h-[80vh] max-w-lg flex-col items-center gap-6 rounded-2xl bg-card p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
              {galleryItems[lightbox].src ? (
                <img src={galleryItems[lightbox].src} alt={galleryItems[lightbox].caption} className="max-h-[60vh] w-full rounded-xl object-contain" />
              ) : (
                <div className="flex h-48 w-full items-center justify-center rounded-xl bg-blush/30">
                  <Heart className="h-16 w-16 text-primary/30" fill="currentColor" />
                </div>
              )}
              <p className="font-display text-lg italic text-foreground">
                {galleryItems[lightbox].caption}
              </p>
              {!galleryItems[lightbox].src && (
                <p className="text-xs text-muted-foreground">
                  Photo / video yahan aayegi 🤍
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGallery;
