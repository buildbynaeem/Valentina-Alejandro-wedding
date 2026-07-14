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
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="font-serif text-lg md:text-xl tracking-tight">
          V <span className="text-gold">&</span> A
        </a>


        <div
          className="flex items-center gap-1 text-[11px] tracked border border-white/40 rounded-full px-1.5 py-1 bg-white/20 backdrop-blur-sm"
          role="group"
          aria-label="Language"
        >
          {(["ES", "EN"] as Lang[]).map((l) => (
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
