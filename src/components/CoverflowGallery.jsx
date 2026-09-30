import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export default function CoverflowGallery({ items }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const go = (dir) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  return (
    <div
      className="w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      {/*
        Dragging lives on this container, not on the individual cards. The
        previous version toggled `drag` on/off per-card based on which one
        was centered — since cards persist across renders (same `key`), a
        fast double-click could shift which element had `drag` mid-gesture
        while its `animate` spring was still mid-flight, leaving x/rotateY
        stuck on a torn combination of both (the crooked/skewed card). A
        single always-draggable container never has that conflict, and taps
        on a card still register as clicks since Framer only treats a
        gesture as a drag once it crosses a small movement threshold.
      */}
      <motion.div
        className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, i) => {
          let offset = i - index;
          // wrap-around so it always takes the shortest path
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;

          const isCenter = offset === 0;
          const abs = Math.abs(offset);
          if (abs > 2) return null; // only render nearby cards

          return (
            <motion.div
              key={item.src}
              className="absolute rounded-xl overflow-hidden border"
              style={{
                width: "min(62vw, 460px)",
                aspectRatio: "16 / 9",
                borderColor: isCenter
                  ? "var(--color-cyan)"
                  : "var(--color-border)",
                boxShadow: isCenter
                  ? "0 0 28px rgba(73,242,255,0.35), 0 0 50px rgba(184,41,255,0.15)"
                  : "none",
                cursor: isCenter ? "zoom-in" : "pointer",
              }}
              animate={{
                x: `calc(${offset} * min(62vw, 460px))`,
                scale: isCenter ? 1.1 : 0.82,
                rotateY: isCenter ? 0 : offset < 0 ? 25 : -25,
                opacity: isCenter ? 1 : 0.45,
                zIndex: 10 - abs,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              onTap={() => (isCenter ? setLightboxOpen(true) : setIndex(i))}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              {isCenter && (
                <span
                  className="absolute bottom-2 right-2 rounded-full p-1.5 pointer-events-none"
                  style={{ background: "rgba(10,10,12,0.6)" }}
                >
                  <Maximize2 size={14} color="#F5F7FA" />
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-center gap-4 mt-4 px-6">
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="rounded-full p-2 glass-card hover:border-[var(--color-cyan)] transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para item ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 18 : 6,
                backgroundColor:
                  i === index
                    ? "var(--color-cyan)"
                    : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Próximo"
          className="rounded-full p-2 glass-card hover:border-[var(--color-cyan)] transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center px-6"
        >
          <h4 className="font-display font-semibold text-lg">
            {items[index].name}
          </h4>
          <div className="flex flex-wrap justify-center gap-2 mt-2 mb-3">
            {items[index].tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs rounded-md px-2 py-1"
                style={{
                  color: "var(--color-cyan)",
                  border: "1px solid rgba(73,242,255,0.3)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
            {items[index].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={items[index].name}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setLightboxOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-4xl"
            >
              <img
                src={items[index].src}
                alt={items[index].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                style={{ border: "1px solid var(--color-border)" }}
              />

              <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">
                {items[index].name}
              </p>

              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Fechar"
                className="absolute -top-4 -right-4 rounded-full p-2 glass-card hover:border-[var(--color-cyan)] transition-colors"
              >
                <X size={18} />
              </button>

              {items.length > 1 && (
                <>
                  <button
                    onClick={() => go(-1)}
                    aria-label="Imagem anterior"
                    className="absolute top-1/2 -left-4 sm:-left-14 -translate-y-1/2 rounded-full p-2 glass-card hover:border-[var(--color-cyan)] transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Próxima imagem"
                    className="absolute top-1/2 -right-4 sm:-right-14 -translate-y-1/2 rounded-full p-2 glass-card hover:border-[var(--color-cyan)] transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
