# Personal Website — Ricardo Pereira Marccelli Filho

Portfólio pessoal em React + Vite: hero com efeito de terminal e fundo 3D
(Beams, via Three.js), projetos (incluindo o assistente local **Argus** e
interfaces de UI para Roblox), experiência e contato. Tema dark com acentos
neon (cyan/indigo/magenta), fundo animado em canvas do "Sobre" pra baixo e
microanimações via Framer Motion.

## Stack

- [React 19](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [Framer Motion](https://www.framer.com/motion/) para as animações
- [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs)/[drei](https://github.com/pmndrs/drei) para o fundo 3D do Hero (carregado sob demanda, só no Hero)
- [Lucide](https://lucide.dev) para ícones
- [Oxlint](https://oxc.rs) para lint

## Rodando localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # roda o oxlint
```

## Scripts de manutenção

- `node scripts/optimize-roblox-images.mjs` — reconverte os screenshots de
  `src/assets/roblox-ui/*.png` para `.webp` redimensionado. Rode de novo
  sempre que adicionar uma screenshot nova ali.
- `node scripts/generate-icons-and-og.mjs` — regenera os favicons PNG
  (`public/favicon-*.png`, `public/apple-touch-icon.png`) a partir de
  `public/favicon.svg`, e a imagem de Open Graph (`public/og-image.png`)
  usada quando o link do site é compartilhado.

## Estrutura

```
src/
  components/   # uma seção/peça de UI por arquivo
  assets/       # imagens (fotos, screenshots de projetos)
  index.css     # tema Tailwind (cores, fontes) + utilitários globais
public/         # favicons, og-image, CV em PDF — servidos como estão
```

## Pendências antes de publicar

- Trocar a URL placeholder (`https://ricardomarccelli.com/`) em
  `index.html` pela URL real assim que o site tiver domínio/deploy.
