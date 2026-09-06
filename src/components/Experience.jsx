import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experiencia" className="relative py-28 px-6 max-w-3xl mx-auto">
      <SectionHeading eyebrow="// experiência" title="Por onde já passei" />
      <Reveal delay={0.1}>
        <div className="glass-card rounded-2xl p-8 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-xl">
              IT Asset Management Analyst
            </h3>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              Mar 2025 – Set 2025
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--color-cyan)] mb-6 font-mono">
            <span>Grupo GPS</span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
              <MapPin size={13} /> Rio de Janeiro
            </span>
          </div>
          <ul className="space-y-3 text-[var(--color-text-muted)] leading-relaxed">
            {[
              "Controle e gerenciamento de inventário de dispositivos móveis corporativos, do recebimento à entrega.",
              "Diagnóstico, testes e manutenção básica em smartphones, garantindo o funcionamento correto antes da entrega.",
              "Administração de registros em banco de dados, mantendo a integridade e a rastreabilidade dos ativos.",
              "Suporte a processos de logística e controle de movimentação de equipamentos.",
              "Colaboração na padronização de processos operacionais de gestão de TI, aumentando eficiência e conformidade.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "var(--color-cyan)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
