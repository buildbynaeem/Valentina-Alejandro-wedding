import { Countdown } from "./countdown";
import { useLang } from "@/lib/lang-context";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-cream px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-[11px] tracked text-cream/80"
        >
          {t.hero.kicker}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif italic font-normal text-[15vw] md:text-[9rem] leading-[0.95] tracking-tight"
        >
          Miriam <span className="not-italic text-gold">&</span> Michael
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 flex items-center gap-4 text-cream/85"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-xs md:text-sm tracked">{t.hero.date}</span>
          <span className="h-px w-10 bg-gold" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-10 md:bottom-14 z-10 flex justify-center px-6"
      >
        <Countdown />
      </motion.div>
    </section>
  );
}
