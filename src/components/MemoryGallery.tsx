import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "@/components/memory-gallery-items";

const MemoryGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox(lightbox < galleryItems.length - 1 ? lightbox + 1 : 0);
  }, [lightbox]);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox(lightbox > 0 ? lightbox - 1 : galleryItems.length - 1);
  }, [lightbox]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") setLightbox(null);
    },
    [goNext, goPrev]
  );

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
          <p className="mt-3 text-sm text-muted-foreground">&nbsp;</p>
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

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            ref={(el) => el?.focus()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            {/* Nav: Previous */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 md:left-6 z-10 p-2 md:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Nav: Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 md:right-6 z-10 p-2 md:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex flex-col items-center gap-4 max-w-[90vw] md:max-w-[80vw] lg:max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryItems[lightbox].type === "video" ? (
                <video
                  src={galleryItems[lightbox].src}
                  controls
                  autoPlay
                  className="max-h-[75vh] w-auto rounded-2xl shadow-2xl"
                />
              ) : (
                <img
                  src={galleryItems[lightbox].src}
                  alt={galleryItems[lightbox].caption}
                  className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
                />
              )}
              {galleryItems[lightbox].caption && (
                <p className="font-display text-base md:text-lg italic text-foreground/80 text-center px-4">
                  {galleryItems[lightbox].caption}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {lightbox + 1} / {galleryItems.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGallery;
