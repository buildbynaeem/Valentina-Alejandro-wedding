import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80", h: "row-span-2", alt: "Bride and groom" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", h: "", alt: "Turquoise coastline" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80", h: "", alt: "Wedding hands" },
  { src: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=1200&q=80", h: "row-span-2", alt: "Architecture" },
  { src: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1200&q=80", h: "", alt: "Overwater villa" },
  { src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80", h: "", alt: "Beach couple" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80", h: "", alt: "Wedding details" },
  { src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80", h: "", alt: "Valencia street" },
];

export function Gallery() {
  const { t } = useLang();
  return (
    <section id="gallery" className="py-32 md:py-44 px-6 bg-cream">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="text-[11px] tracked text-gold">{t.gallery.kicker}</div>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl italic">{t.gallery.title}</h2>
            </div>
            <span className="gold-divider" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-3 md:gap-4">
          {IMAGES.map((img, i) => (
            <FadeUp key={i} delay={i * 0.05} className={img.h}>
              <div className="group relative h-full w-full overflow-hidden rounded-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
