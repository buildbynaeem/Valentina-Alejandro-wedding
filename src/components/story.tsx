import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function Story() {
  const { t } = useLang();
  const timelineRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLSpanElement>(null);
  const lastDotRef = useRef<HTMLSpanElement>(null);
  const [lineTop, setLineTop] = useState(0);
  const [lineBottom, setLineBottom] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Driven imperatively so we can use measured dot positions
  const flowerTop = useMotionValue(0);

  useEffect(() => {
    const getOffsetTop = (el: HTMLElement, ancestor: HTMLElement): number => {
      let top = 0;
      let current: HTMLElement | null = el;
      while (current && current !== ancestor) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const measure = () => {
      if (!timelineRef.current || !firstDotRef.current || !lastDotRef.current) return;
      const containerH = timelineRef.current.offsetHeight;
      const firstTop = getOffsetTop(firstDotRef.current, timelineRef.current) + firstDotRef.current.offsetHeight / 2;
      const lastTop = getOffsetTop(lastDotRef.current, timelineRef.current) + lastDotRef.current.offsetHeight / 2;
      setLineTop(firstTop);
      setLineBottom(containerH - lastTop);
      // Reposition flower using current scroll progress so language switches
      // mid-scroll don't snap the flower back to the first dot.
      const v = scrollYProgress.get();
      flowerTop.set(firstTop + (lastTop - firstTop) * v);
      setIsReady(true);
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [t, scrollYProgress, flowerTop]);

  useEffect(() => {
    const getOffsetTop = (el: HTMLElement, ancestor: HTMLElement): number => {
      let top = 0;
      let current: HTMLElement | null = el;
      while (current && current !== ancestor) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (!timelineRef.current || !firstDotRef.current || !lastDotRef.current) return;
      const containerH = timelineRef.current.offsetHeight;
      const firstCenter = getOffsetTop(firstDotRef.current, timelineRef.current) + firstDotRef.current.offsetHeight / 2;
      const lastCenter = getOffsetTop(lastDotRef.current, timelineRef.current) + lastDotRef.current.offsetHeight / 2;
      flowerTop.set(firstCenter + (lastCenter - firstCenter) * v);
    });

    return unsubscribe;
  }, [scrollYProgress, flowerTop, t]);

  return (
    <section id="story" className="relative py-32 md:py-44 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <div className="text-[11px] tracked text-gold">{t.story.kicker}</div>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl italic leading-tight">
            {t.story.title}
          </h2>
          <p className="mt-8 text-ink/70 leading-relaxed max-w-2xl mx-auto">{t.story.body}</p>
        </FadeUp>
      </div>

      <FadeUp>
        <div className="mx-auto max-w-2xl mt-16 md:mt-20">
          <img
            src="/story.webp"
            alt="Our story"
            className="w-full rounded-2xl object-cover shadow-[0_8px_60px_rgba(0,0,0,0.12)]"
          />
        </div>
      </FadeUp>

      <div ref={timelineRef} className="relative mx-auto max-w-4xl mt-24 md:mt-32">
        {/* Gold line — starts at first dot, ends at last dot */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-gold"
          style={{ top: lineTop, bottom: lineBottom }}
        />

        {/* Flower — driven by measured dot positions */}
        <motion.div
          style={{ top: flowerTop }}
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
        >
          <img src="/flower.png" alt="flower" className="w-14 h-14 object-contain drop-shadow-md" />
        </motion.div>

        <div>
          {t.story.chapters.map((c, i) => {
            const left = i % 2 === 0;
            const isFirst = i === 0;
            const isLast = i === t.story.chapters.length - 1;

            return (
              <FadeUp key={c.year}>
                <div className="grid grid-cols-9 items-center gap-4 py-10 md:py-14">
                  {/* Left text */}
                  <div className="col-span-4 flex items-center justify-end">
                    {left && (
                      <div className="text-right">
                        <div className="text-[11px] tracked text-gold">{c.year}</div>
                        <h3 className="mt-2 font-serif text-2xl md:text-3xl italic">{c.title}</h3>
                        <p className="mt-3 text-sm text-ink/65 leading-relaxed">{c.text}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot — with ref on first and last */}
                  <div className="col-span-1 flex justify-center relative z-10">
                    <span
                      ref={isFirst ? firstDotRef : isLast ? lastDotRef : undefined}
                      className="h-3 w-3 rounded-full bg-gold"
                    />
                  </div>

                  {/* Right text */}
                  <div className="col-span-4 flex items-center justify-start">
                    {!left && (
                      <div className="text-left">
                        <div className="text-[11px] tracked text-gold">{c.year}</div>
                        <h3 className="mt-2 font-serif text-2xl md:text-3xl italic">{c.title}</h3>
                        <p className="mt-3 text-sm text-ink/65 leading-relaxed">{c.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
