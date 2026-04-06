import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { galleryItems } from "@/components/memory-gallery-items";

const MemoryGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="bg-gradient-romantic py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Bachhhu ke pyaari pyaari memories 🤍
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {"\n\n\n"}
          </p>
        </motion.div>

        <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.id * 0.03 }}
              className="group relative mb-3 md:mb-4 cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
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
                <img src={item.src} alt={item.caption} className="h-full w-full object-cover" loading="lazy" />
              )}

              <div className="absolute inset-0 flex items-end bg-foreground/0 p-4 transition-all group-hover:bg-foreground/40 group-hover:backdrop-blur-sm">
                <p className="font-display text-sm italic text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
