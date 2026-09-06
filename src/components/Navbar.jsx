import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#projetos", label: "Projetos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto max-w-5xl px-6 flex items-center justify-between rounded-xl transition-all duration-300 ${
          scrolled ? "glass-card py-3" : "py-1"
        }`}
      >
        <a href="#hero" className="font-display font-semibold text-lg">
          RPMF<span className="text-[var(--color-emerald)]">.</span>
        </a>

        <div className="hidden sm:flex gap-8 font-mono text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-emerald)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden glass-card mx-4 mt-2 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4 font-mono text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-emerald)] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
