import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import NeuralCanvas from "./NeuralCanvas";

const inputs = [{ label: "User Prompt / API Hook", sub: "Entrada" }];
const outputs = [
  { label: "Ollama (Gemma)", sub: "LLM local" },
  { label: "MCP", sub: "Ferramentas & Integrações" },
];

const roadmapNodes = [
  {
    label: "SQLite",
    sub: "Fatos Estruturados",
    detail: "Preferências, rotina, projetos, histórico",
  },
  {
    label: "ChromaDB",
    sub: "Memória Semântica",
    detail: "Busca por relevância via embeddings locais do Ollama",
  },
];

function ActiveBadge() {
  return (
    <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: "var(--color-emerald)" }}>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]" />
      ATIVO
    </span>
  );
}

function BuildingBadge() {
  return (
    <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: "var(--color-magenta)" }}>
      <motion.span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "#FBBF24" }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      EM DESENVOLVIMENTO
    </span>
  );
}

function Node({ label, sub, accent = "cyan", className = "" }) {
  const borderColor =
    accent === "cyan" ? "rgba(73,242,255,0.35)" : "rgba(184,41,255,0.4)";
  return (
    <div
      className={`glass-card rounded-xl px-4 py-3 text-center ${className}`}
      style={{ borderColor }}
    >
      <p className="text-xs font-medium">{label}</p>
      <p className="font-mono text-[10px] text-[var(--color-text-muted)] mt-1">
        {sub}
      </p>
    </div>
  );
}

export default function ArgusArchitectureModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-3xl my-8 rounded-2xl overflow-hidden glass-card"
            style={{ boxShadow: "0 0 60px rgba(111,0,255,0.25)", backgroundColor: "#0D1022" }}
          >
            {/* Core architecture — concentric module layout */}
            <div className="relative min-h-[22rem] sm:min-h-[24rem]">
              <NeuralCanvas />

              <div className="relative z-10 flex flex-col items-center px-6 pt-8 pb-6">
                <p className="font-mono text-xs text-[var(--color-cyan)] mb-6 neon-text-glow">
                  arquitetura · argus
                </p>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                  {/* Left: inputs */}
                  <div className="flex sm:flex-col gap-3 justify-center">
                    {inputs.map((n) => (
                      <Node key={n.label} {...n} />
                    ))}
                  </div>

                  {/* Center: orchestrator, elevated */}
                  <div className="flex justify-center">
                    <div
                      className="rounded-2xl px-6 py-5 text-center glass-card"
                      style={{
                        borderColor: "rgba(184,41,255,0.55)",
                        boxShadow:
                          "0 0 30px rgba(184,41,255,0.35), 0 0 50px rgba(73,242,255,0.15)",
                        transform: "scale(1.08)",
                      }}
                    >
                      <p className="text-sm font-semibold">
                        n8n Workflow Engine
                      </p>
                      <p className="font-mono text-[10px] text-[var(--color-text-muted)] mt-1">
                        Orquestrador via Docker
                      </p>
                    </div>
                  </div>

                  {/* Right: outputs */}
                  <div className="flex sm:flex-col gap-3 justify-center">
                    {outputs.map((n) => (
                      <Node key={n.label} {...n} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap — long-term memory layer */}
            <div
              className="relative z-10 px-6 py-6 border-t"
              style={{ borderColor: "var(--color-border)", backgroundColor: "rgba(184,41,255,0.03)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <p className="font-mono text-xs tracking-wide" style={{ color: "var(--color-magenta)" }}>
                  roadmap
                </p>
                <BuildingBadge />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Camada de Memória de Longo Prazo
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {roadmapNodes.map((n) => (
                  <div
                    key={n.label}
                    className="rounded-xl px-4 py-4"
                    style={{
                      border: "1px dashed rgba(184,41,255,0.45)",
                      background: "rgba(184,41,255,0.05)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{n.label}</p>
                      <BuildingBadge />
                    </div>
                    <p className="font-mono text-[10px] text-[var(--color-cyan)] mb-1">
                      {n.sub}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {n.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="px-6 py-5 border-t flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[var(--color-text-muted)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span>
                Deploy: <span className="text-[var(--color-text)]">Docker Stack</span>
              </span>
              <span>
                Model: <span className="text-[var(--color-text)]">Gemma 2B/7B</span>
              </span>
              <span className="flex items-center gap-1.5">
                Status: <ActiveBadge />
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 z-20 rounded-full p-2 bg-black/40 hover:bg-black/60 transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
