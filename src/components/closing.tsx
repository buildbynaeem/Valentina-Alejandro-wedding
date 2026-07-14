import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";

export function Closing() {
  const { t } = useLang();
  const { kicker, title, body } = t.closing;

  return (
    <section id="closing" className="py-32 md:py-44 px-6 bg-cream text-ink">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <FadeUp>
          <div className="text-center">
            <div className="text-[11px] tracked text-gold">{kicker}</div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl italic">{title}</h2>
            <div className="gold-divider mx-auto mt-8" />
          </div>
        </FadeUp>

        {/* Closing paragraph */}
        <FadeUp delay={0.1}>
          <p className="mt-14 text-ink/70 leading-loose text-center text-base md:text-lg max-w-2xl mx-auto">
            {body}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
