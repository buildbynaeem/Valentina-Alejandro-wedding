import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import type { Lang } from "@/lib/i18n";

const links = [
  { href: "#story", key: "story" },
  { href: "#gallery", key: "gallery" },
  { href: "#details", key: "details" },
  { href: "#rsvp", key: "rsvp" },
] as const;

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-cream/70 border-b border-gold/25"
          : "bg-transparent"
      }`}
      style={{ WebkitBackdropFilter: scrolled ? "blur(20px)" : undefined }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="font-serif text-lg md:text-xl tracking-tight">
          M <span className="text-gold">&</span> M
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-[11px] tracked text-ink/70 hover:text-ink transition-colors"
            >
              {t.nav[l.key as keyof typeof t.nav]}
            </a>
          ))}
        </nav>

        <div
          className="flex items-center gap-1 text-[11px] tracked border border-gold/40 rounded-full px-1.5 py-1 bg-cream/60 backdrop-blur"
          role="group"
          aria-label="Language"
        >
          {(["ES", "DE", "EN"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full transition-colors ${
                lang === l ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
