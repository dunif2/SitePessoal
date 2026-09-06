export default function Footer() {
  return (
    <footer className="relative py-10 px-6 text-center">
      <p className="font-mono text-xs text-[var(--color-text-muted)]">
        Ricardo Pereira Marccelli Filho · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
