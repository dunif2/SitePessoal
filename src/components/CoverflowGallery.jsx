import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CoverflowGallery({ items }) {
  const [index, setIndex] = useState(0);

  const go = (dir) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

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
      <div
        className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
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
              className="absolute rounded-xl overflow-hidden border cursor-grab active:cursor-grabbing"
              style={{
                width: "min(62vw, 460px)",
                aspectRatio: "16 / 9",
                borderColor: isCenter
                  ? "var(--color-cyan)"
                  : "var(--color-border)",
                boxShadow: isCenter
                  ? "0 0 28px rgba(73,242,255,0.35), 0 0 50px rgba(184,41,255,0.15)"
                  : "none",
              }}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              animate={{
                x: `calc(${offset} * min(62vw, 460px))`,
                scale: isCenter ? 1.1 : 0.82,
                rotateY: isCenter ? 0 : offset < 0 ? 25 : -25,
                opacity: isCenter ? 1 : 0.45,
                zIndex: 10 - abs,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              onClick={() => !isCenter && setIndex(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

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
    </div>
  );
}
