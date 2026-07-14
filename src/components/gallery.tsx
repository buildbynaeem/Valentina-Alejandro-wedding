import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const IMAGES = [
  { src: "/Moments/1.webp", alt: "Moment 1", title: "Valentina & Alejandro" },
  { src: "/Moments/2.webp", alt: "Moment 2", title: "Together" },
  { src: "/Moments/3.webp", alt: "Moment 3", title: "Seville" },
  { src: "/Moments/4.webp", alt: "Moment 4", title: "Our Dream Trip" },
  { src: "/Moments/5.webp", alt: "Moment 5", title: "Trusting the process" },
  { src: "/Moments/6.webp", alt: "Moment 6", title: "Same Direction" },
];

export function Gallery() {
  const { t } = useLang();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section id="gallery" className="py-32 md:py-44 bg-cream overflow-hidden">
      {/* Header */}
      <div className="px-6 mx-auto max-w-7xl mb-14">
        <FadeUp>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="text-[11px] tracked text-gold">{t.gallery.kicker}</div>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl italic">{t.gallery.title}</h2>
            </div>
            <span className="gold-divider" />
          </div>
        </FadeUp>
      </div>

      {/* Carousel */}
      <FadeUp>
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ loop: true, slidesToScroll: 1 }}
        >
          <CarouselContent className="flex h-[480px] md:h-[560px] w-full">
            {IMAGES.map((img, index) => (
              <CarouselItem
                key={index}
                className="relative flex h-[82%] w-full basis-[80%] items-center justify-center sm:basis-[55%] md:basis-[35%] lg:basis-[28%] xl:basis-[24%]"
              >
                <motion.div
                  initial={false}
                  animate={{
                    clipPath:
                      current !== index
                        ? "inset(12% 0 12% 0 round 1.5rem)"
                        : "inset(0% 0% 0% 0% round 1.5rem)",
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full overflow-hidden rounded-3xl"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full scale-105 object-cover"
                  />
                </motion.div>

                {/* Title below active slide */}
                <AnimatePresence mode="wait">
                  {current === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-0 left-0 flex h-[14%] w-full translate-y-full items-center justify-center text-center font-serif italic text-ink/40 tracking-wide text-sm"
                    >
                      {img.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation arrows */}
          <div className="mt-10 flex w-full items-center justify-center gap-4">
            <button
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="rounded-full border border-gold/40 bg-cream p-2.5 text-ink/60 hover:bg-gold/10 hover:text-ink transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    current === index
                      ? "w-6 h-2 bg-gold"
                      : "w-2 h-2 bg-gold/30"
                  )}
                />
              ))}
            </div>

            <button
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="rounded-full border border-gold/40 bg-cream p-2.5 text-ink/60 hover:bg-gold/10 hover:text-ink transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Carousel>
      </FadeUp>
    </section>
  );
}
