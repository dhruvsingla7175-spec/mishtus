import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Play } from "lucide-react";
import childhood1 from "@/assets/childhood-1.png";
import childhood2 from "@/assets/childhood-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.png";
import gallery9 from "@/assets/gallery-9.png";
import gallery10 from "@/assets/gallery-10.png";
import gallery11 from "@/assets/gallery-11.png";
import gallery12 from "@/assets/gallery-12.png";
import gallery13 from "@/assets/gallery-13.png";
import gallery14 from "@/assets/gallery-14.png";
import gallery15 from "@/assets/gallery-15.png";
import gallery16 from "@/assets/gallery-16.png";
import gallery17 from "@/assets/gallery-17.png";
import gallery18 from "@/assets/gallery-18.png";
import gallery19 from "@/assets/gallery-19.png";
import gallery20 from "@/assets/gallery-20.png";
import gallery21 from "@/assets/gallery-21.png";

type GalleryItem = {
  id: number;
  src: string;
  caption: string;
  height: number;
  type: "image" | "video";
};

const galleryItems: GalleryItem[] = [
  { id: 0, src: childhood1, caption: "Proof hota hai hamaare ladke ladko se kaam thodi hai", height: 340, type: "image" },
  { id: 1, src: childhood2, caption: "Mishtuuu bachuu", height: 340, type: "image" },
  { id: 2, src: gallery3, caption: "Kitni pyaari lag rahi hai 🤍", height: 320, type: "image" },
  { id: 3, src: gallery4, caption: "Holi wali masti 🎨", height: 280, type: "image" },
  { id: 4, src: gallery5, caption: "Friends ke saath 💕", height: 360, type: "image" },
  { id: 5, src: gallery6, caption: "Saari yaadein ek saath 🥺", height: 380, type: "image" },
  { id: 6, src: gallery7, caption: "Cuties 🤍", height: 300, type: "image" },
  { id: 7, src: gallery8, caption: "Garden mein masti 🌿", height: 280, type: "image" },
  { id: 8, src: gallery9, caption: "Princess vibes ✨", height: 340, type: "image" },
  { id: 9, src: gallery10, caption: "Swag wali photo 😎", height: 260, type: "image" },
  { id: 10, src: gallery11, caption: "Birthday celebration 🎂", height: 340, type: "image" },
  { id: 11, src: gallery12, caption: "Pyaari si selfie 💕", height: 320, type: "image" },
  { id: 12, src: gallery13, caption: "Dono cuties 🤍", height: 280, type: "image" },
  { id: 13, src: gallery14, caption: "Friends forever 💫", height: 300, type: "image" },
  { id: 14, src: gallery15, caption: "Mickey ke saath 🐭", height: 340, type: "image" },
  { id: 15, src: gallery16, caption: "Golden moments ✨", height: 320, type: "image" },
  { id: 16, src: gallery17, caption: "Holi ki masti phir se 🎨", height: 340, type: "image" },
  { id: 17, src: gallery18, caption: "Mirror selfie queen 📸", height: 360, type: "image" },
  { id: 18, src: gallery19, caption: "Shopping wali vibes 🛍️", height: 340, type: "image" },
  { id: 19, src: gallery20, caption: "Mickey mouse ki fan 🐭", height: 360, type: "image" },
  { id: 20, src: gallery21, caption: "Aur ek mirror selfie 📸", height: 340, type: "image" },
  { id: 21, src: "/videos/gallery-video.mp4", caption: "Hamare special moments 🎬", height: 320, type: "video" },
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
              transition={{ delay: item.id * 0.05 }}
              className="group relative mb-4 cursor-pointer overflow-hidden rounded-xl"
              style={{ height: item.height }}
              onClick={() => setLightbox(item.id)}
            >
              {item.type === "video" ? (
                <div className="relative h-full w-full">
                  <video src={item.src} className="h-full w-full object-cover" muted preload="metadata" />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                    <Play className="h-12 w-12 text-primary-foreground drop-shadow-lg" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <img src={item.src} alt={item.caption} className="h-full w-full object-cover" />
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
              {galleryItems[lightbox].type === "video" ? (
                <video
                  src={galleryItems[lightbox].src}
                  controls
                  autoPlay
                  className="max-h-[60vh] w-full rounded-xl"
                />
              ) : (
                <img
                  src={galleryItems[lightbox].src}
                  alt={galleryItems[lightbox].caption}
                  className="max-h-[60vh] w-full rounded-xl object-contain"
                />
              )}
              <p className="font-display text-lg italic text-foreground">
                {galleryItems[lightbox].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGallery;
