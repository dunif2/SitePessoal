import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./BrandIcons";

const links = [
  {
    label: "Email",
    value: "rpmarccelli@gmail.com",
    href: "mailto:rpmarccelli@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "ricardo-p-m-filho",
    href: "https://www.linkedin.com/in/ricardo-p-m-filho",
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "dunif2",
    href: "https://github.com/dunif2",
    icon: GithubIcon,
  },
];

export default function Contact() {
  return (
    <section id="contato" className="relative py-28 px-6 max-w-3xl mx-auto">
      <SectionHeading eyebrow="// contato" title="Vamos conversar" />
      <Reveal delay={0.1}>
        <div className="grid sm:grid-cols-3 gap-4">
          {links.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-[var(--color-emerald)] transition-colors group"
            >
              <span className="rounded-full p-3 bg-[var(--color-bg-elevated)] group-hover:text-[var(--color-emerald)] transition-colors">
                <Icon width={20} height={20} />
              </span>
              <div>
                <p className="font-mono text-xs text-[var(--color-text-muted)]">
                  {label}
                </p>
                <p className="text-sm mt-1 break-all">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
