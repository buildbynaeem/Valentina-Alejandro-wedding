import { useState } from "react";
import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";
import { Copy, Check } from "lucide-react";

const IBANS = [
  { name: "Miriam", iban: "LT62 3250 0044 7852 1836" },
  { name: "Michael", iban: "DE79 2013 0600 2014 2846 41" },
];

function IbanRow({
  name,
  iban,
  copyLabel,
  copiedLabel,
}: {
  name: string;
  iban: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group w-full flex items-center justify-between gap-4 border border-gold/30 hover:border-gold/70 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 px-6 py-5 text-left"
    >
      <div>
        <div className="text-[10px] tracked text-gold mb-1">{name}</div>
        <div className="font-mono text-cream/90 text-sm md:text-base tracking-widest">
          {iban}
        </div>
      </div>
      <div className="flex items-center gap-2 text-[10px] tracked text-gold/70 group-hover:text-gold transition-colors shrink-0">
        {copied ? (
          <>
            <Check className="h-4 w-4 text-gold" />
            <span>{copiedLabel}</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>{copyLabel}</span>
          </>
        )}
      </div>
    </button>
  );
}

export function Closing() {
  const { t } = useLang();
  const { kicker, title, body, ibanTitle, ibanSubtitle, copyLabel, copiedLabel } = t.closing;

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

        {/* IBAN block */}
        <FadeUp delay={0.2}>
          <div className="mt-16 md:mt-20">
            {/* Section divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-ink/15" />
              <span className="text-[10px] tracked text-gold">{ibanTitle}</span>
              <div className="h-px flex-1 bg-ink/15" />
            </div>

            <p className="text-center text-sm text-ink/50 mb-8 tracked">
              {ibanSubtitle}
            </p>

            <div className="space-y-3 bg-ink rounded-sm p-6 md:p-8">
              {IBANS.map((item) => (
                <IbanRow
                  key={item.name}
                  name={item.name}
                  iban={item.iban}
                  copyLabel={copyLabel}
                  copiedLabel={copiedLabel}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
