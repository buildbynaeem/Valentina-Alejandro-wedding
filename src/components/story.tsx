import { useLang } from "@/lib/lang-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "./fade-up";

export function Story() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

      <div ref={ref} className="relative mx-auto max-w-4xl mt-24 md:mt-32">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gold/20" />
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: "top" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gold"
        />

        <div className="space-y-20 md:space-y-28">
          {t.story.chapters.map((c, i) => {
            const left = i % 2 === 0;
            return (
              <FadeUp key={c.year}>
                <div className="grid grid-cols-9 items-center gap-4">
                  <div className={`col-span-4 ${left ? "text-right" : "col-start-6 text-left"}`}>
                    <div className="text-[11px] tracked text-gold">{c.year}</div>
                    <h3 className="mt-2 font-serif text-2xl md:text-3xl italic">{c.title}</h3>
                    <p className="mt-3 text-sm text-ink/65 leading-relaxed">{c.text}</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span className="h-3 w-3 rounded-full bg-cream border border-gold ring-4 ring-cream" />
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
