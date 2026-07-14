import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative pt-24 pb-10 px-6 bg-cream border-t border-gold/25">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <div className="text-gold text-3xl font-serif">&</div>
          <p className="mt-6 font-serif italic text-3xl md:text-5xl leading-tight">
            {t.footer.close}
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 text-[11px] tracked text-ink/50">
            <span className="h-px w-12 bg-gold/50" />
            <span>Valentina & Alejandro</span>
            <span className="h-px w-12 bg-gold/50" />
          </div>
        </FadeUp>
      </div>
      <div className="mt-20 text-center text-[10px] tracked text-ink/35">
        <a
          href="https://www.instagram.com/zylo.invites"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gold transition-colors duration-300"
        >
          {t.footer.credit}
        </a>
      </div>
    </footer>
  );
}
