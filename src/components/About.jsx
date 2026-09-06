import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="sobre" className="relative py-28 px-6 max-w-3xl mx-auto">
      <SectionHeading eyebrow="// sobre" title="Quem sou eu" />
      <Reveal delay={0.1}>
        <p className="glass-card rounded-2xl p-8 sm:p-10 text-lg leading-relaxed text-[var(--color-text-muted)]">
          Sou estudante de Ciência da Computação e o que mais me move é
          vontade de aprender. Não gosto de ficar só no que é cobrado na
          faculdade, prefiro ir atrás do que me deixa curioso e testar na
          prática até entender como aquilo funciona de verdade. Foi assim que
          comecei a construir o{" "}
          <span className="text-[var(--color-text)] font-medium">Argus</span>
          , um assistente de IA que roda localmente no meu próprio PC. E é
          assim que tento encarar cada matéria nova, cada projeto, cada
          tecnologia que eu ainda não sei mexer. Ainda tenho bastante caminho
          pela frente, mas força de vontade pra chegar lá eu não falto.
        </p>
      </Reveal>
    </section>
  );
}
