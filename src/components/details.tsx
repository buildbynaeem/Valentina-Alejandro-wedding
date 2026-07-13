import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";
import { MapPin, Clock, Shirt, ArrowUpRight } from "lucide-react";

const MAP_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Iglesia+de+San+Juan+de+la+Cruz+Valencia";
const STATIC_MAP = "/location.png";

export function Details() {
  const { t } = useLang();
  return (
    <section id="details" className="py-32 md:py-44 px-6 bg-ink text-cream">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeUp>
          <div className="text-center">
            <div className="text-[11px] tracked text-gold">{t.details.kicker}</div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl italic">{t.details.title}</h2>
            <div className="gold-divider mx-auto mt-8" />
          </div>
        </FadeUp>

        {/* ── Venue 1: Church ── */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16 items-stretch">
          <FadeUp>
            <div className="h-full flex flex-col justify-center">
              <h3 className="font-serif text-3xl md:text-4xl italic leading-tight">
                {t.details.venueName}
              </h3>
              <p className="mt-6 text-cream/70 leading-relaxed max-w-md">{t.details.address}</p>

              <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] tracked">{t.details.timeLabel}</span>
                  </div>
                  <div className="mt-2 font-serif text-xl">{t.details.timeValue}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <Shirt className="h-4 w-4" />
                    <span className="text-[10px] tracked">{t.details.dresscodeLabel}</span>
                  </div>
                  <div className="mt-2 font-serif text-xl">{t.details.dresscodeValue}</div>
                </div>
              </div>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-3 self-start border border-gold/60 hover:bg-gold hover:text-ink transition-colors duration-500 px-6 py-3 text-[11px] tracked"
              >
                {t.details.buttonText}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="group block relative overflow-hidden rounded-sm border border-gold/25 h-[420px] md:h-full"
            >
              <img
                src={STATIC_MAP}
                alt="Ceremony location"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 opacity-60 transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 text-gold">
                  <MapPin className="h-5 w-5" />
                  <span className="text-[10px] tracked">{t.details.cardLocation}</span>
                </div>
                <div className="mt-3 font-serif italic text-2xl">Ciutat Vella</div>
              </div>
            </a>
          </FadeUp>
        </div>

        {/* Divider */}
        <div className="my-20 md:my-28 h-px bg-gold/20" />

        {/* ── Venue 2: Placeholder (update details in i18n.ts) ── */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-stretch">
          <FadeUp>
            <div className="h-full flex flex-col justify-center">
              <h3 className="font-serif text-3xl md:text-4xl italic leading-tight">
                {t.details.venue2Name}
              </h3>
              <p className="mt-6 text-cream/70 leading-relaxed max-w-md">{t.details.address2}</p>

              <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] tracked">{t.details.timeLabel}</span>
                  </div>
                  <div className="mt-2 font-serif text-xl">{t.details.timeValue2}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <Shirt className="h-4 w-4" />
                    <span className="text-[10px] tracked">{t.details.dresscodeLabel}</span>
                  </div>
                  <div className="mt-2 font-serif text-xl">{t.details.dresscodeValue}</div>
                </div>
              </div>

              <a
                href={t.details.mapUrl2}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-3 self-start border border-gold/60 hover:bg-gold hover:text-ink transition-colors duration-500 px-6 py-3 text-[11px] tracked"
              >
                {t.details.buttonText2}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <a
              href={t.details.mapUrl2}
              target="_blank"
              rel="noreferrer"
              className="group block relative overflow-hidden rounded-sm border border-gold/25 h-[420px] md:h-full"
            >
              <img
                src="/location2.png"
                alt="Second venue location"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 opacity-60 transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 text-gold">
                  <MapPin className="h-5 w-5" />
                  <span className="text-[10px] tracked">{t.details.cardLocation2}</span>
                </div>
                <div className="mt-3 font-serif italic text-2xl">{t.details.cardLabel2}</div>
              </div>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
