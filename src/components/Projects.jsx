import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CoverflowGallery from "./CoverflowGallery";
import ArgusArchitectureModal from "./ArgusArchitectureModal";
import { TwitterIcon } from "./BrandIcons";
import { useState } from "react";

import img1 from "../assets/roblox-ui/01-hud-omnitrix.webp";
import img2 from "../assets/roblox-ui/02-healthbar-omnitrix.webp";
import img3 from "../assets/roblox-ui/03-boss-hud.webp";
import img4 from "../assets/roblox-ui/04-leaderboard.webp";
import img5 from "../assets/roblox-ui/05-score-result.webp";

const robloxItems = [
  {
    src: img1,
    alt: "HUD de jogo com tema Omnitrix, barras de vida e energia",
    name: "HUD Principal — Omnitrix",
    tags: ["Figma", "Photoshop"],
    description:
      "Barras de vida e energia com inventário lateral. Foco em legibilidade rápida durante o combate, sem poluir o centro da tela.",
  },
  {
    src: img2,
    alt: "Barra de vida e energia com tema Omnitrix",
    name: "Sistema de Vida & Energia",
    tags: ["Figma", "Photoshop"],
    description:
      "Versão em destaque das barras de status, com hierarquia visual clara entre vida e energia através de cor e formato.",
  },
  {
    src: img3,
    alt: "HUD de boss fight com contagem de wave",
    name: "HUD de Boss Fight",
    tags: ["Figma", "UI/UX Design"],
    description:
      "Interface de combate contra chefe com contagem de wave e inimigos restantes, pensada para manter o jogador informado sem tirar o foco da ação.",
  },
  {
    src: img4,
    alt: "Tela de leaderboard Top Global e Multiplayer",
    name: "Sistema de Ranking",
    tags: ["Figma", "UI/UX Design"],
    description:
      "Leaderboards globais e multiplayer com arquitetura de informação pensada para comparação rápida entre jogadores e amigos.",
  },
  {
    src: img5,
    alt: "Tela de resultado de pontuação",
    name: "Tela de Resultado",
    tags: ["Figma", "Canva"],
    description:
      "Tela de fim de partida com pontuação, recompensas e novo recorde, otimizada para poucos cliques até voltar a jogar.",
  },
];

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="projetos" className="relative py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="// projetos" title="O que eu venho construindo" />

        <Reveal>
          <div className="glass-card rounded-2xl p-8 sm:p-10 flex flex-col mb-24">
            <span className="font-mono text-xs text-[var(--color-cyan)] mb-3">
              projeto pessoal · em evolução
            </span>
            <h3 className="font-display font-semibold text-2xl mb-4">Argus</h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Assistente pessoal de IA que roda inteiramente no meu computador,
              sem depender de nuvem. Construído com Docker, Ollama e o modelo
              Gemma, ele entende comandos em linguagem natural e executa ações
              reais no sistema, como abrir programas e consultar o uso de
              hardware. Um projeto em constante evolução, onde estou aprendendo
              na prática sobre IA local, automação e arquitetura de sistemas.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {["Docker", "Ollama", "Python", "MCP", "n8n"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs rounded-md border px-2.5 py-1"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {t}
                </span>
              ))}
              <button
                onClick={() => setModalOpen(true)}
                className="ml-auto font-mono text-sm rounded-lg px-4 py-2 transition-colors"
                style={{
                  color: "var(--color-cyan)",
                  border: "1px solid rgba(73,242,255,0.35)",
                }}
              >
                Ver Arquitetura →
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="text-center">
          <span className="font-mono text-xs text-[var(--color-magenta)] mb-3 block">
            freelance · UI/UX
          </span>
          <h3 className="font-display font-semibold text-2xl mb-4">
            Interfaces para Jogos (Roblox)
          </h3>
          <p className="text-[var(--color-text-muted)] leading-relaxed mx-auto max-w-2xl">
            Desenvolvo interfaces para jogos, com foco em sistemas de loja,
            inventário e slots. Cada projeto é pensado para ser funcional e
            agradável de usar, equilibrando estética com a lógica do jogo por
            trás.
          </p>
        </Reveal>
      </div>

      {/* Full-bleed coverflow — breaks out of the max-w container */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 mt-14">
        <CoverflowGallery items={robloxItems} />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <a
          href="https://x.com/tytxDev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 font-mono text-sm text-[var(--color-cyan)] hover:text-[var(--color-magenta)] transition-colors"
        >
          <TwitterIcon width={16} height={16} />
          @tytxDev
        </a>
      </div>

      <ArgusArchitectureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
