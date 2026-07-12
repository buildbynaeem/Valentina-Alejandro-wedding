import { useState, useRef } from "react";
import { useLang } from "@/lib/lang-context";
import { FadeUp } from "./fade-up";
import { motion } from "framer-motion";
import { Cake, Cookie, Check, Loader2, AlertCircle } from "lucide-react";
import { sendRsvp } from "@/lib/send-rsvp";

export function Rsvp() {
  const { t, lang } = useLang();
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [taste, setTaste] = useState<"sweet" | "salty" | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dietRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!attending) return;

    setStatus("loading");

    try {
      await sendRsvp({
        data: {
          guestName: nameRef.current?.value ?? "",
          email: emailRef.current?.value ?? "",
          attendance: attending,
          dietary: dietRef.current?.value ?? "",
          resopon: taste,
          language: lang,
        },
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="py-32 md:py-44 px-6">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <div className="text-center">
            <div className="text-[11px] tracked text-gold">{t.rsvp.kicker}</div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl italic">{t.rsvp.title}</h2>
            <div className="gold-divider mx-auto mt-8" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-14 md:mt-20 bg-card rounded-sm border border-gold/25 p-8 md:p-14 shadow-[0_30px_80px_-40px_rgba(26,26,26,0.25)]"
          >
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="mx-auto h-14 w-14 rounded-full border border-gold flex items-center justify-center text-gold">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-6 font-serif italic text-2xl">{t.rsvp.thanks}</p>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <Field label={t.rsvp.name}>
                    <input ref={nameRef} required type="text" className={inputCls} />
                  </Field>
                  <Field label={t.rsvp.email}>
                    <input ref={emailRef} required type="email" className={inputCls} />
                  </Field>
                </div>

                <div>
                  <Label>{t.rsvp.attending}</Label>
                  <div className="mt-4 grid grid-cols-2 gap-3 max-w-md">
                    {(["yes", "no"] as const).map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setAttending(v)}
                        className={`py-3 text-[11px] tracked border transition-all ${
                          attending === v
                            ? "border-gold bg-gold/10 text-ink"
                            : "border-ink/15 text-ink/60 hover:border-gold/50"
                        }`}
                      >
                        {v === "yes" ? t.rsvp.yes : t.rsvp.no}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label={t.rsvp.diet}>
                  <input ref={dietRef} type="text" placeholder={t.rsvp.dietPlaceholder} className={inputCls} />
                </Field>

                <div>
                  <Label>{t.rsvp.resopon}</Label>
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <TasteCard
                      active={taste === "sweet"}
                      onClick={() => setTaste("sweet")}
                      icon={<Cake className="h-8 w-8" strokeWidth={1.25} />}
                      label={t.rsvp.sweet}
                    />
                    <TasteCard
                      active={taste === "salty"}
                      onClick={() => setTaste("salty")}
                      icon={<Cookie className="h-8 w-8" strokeWidth={1.25} />}
                      label={t.rsvp.salty}
                    />
                  </div>
                </div>

                {/* Error state */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <div className="pt-4 flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading" || !attending}
                    className="group inline-flex items-center gap-3 bg-ink text-cream px-10 py-4 text-[11px] tracked hover:bg-gold hover:text-ink transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {t.rsvp.submit}
                  </button>
                  <p className="text-[10px] tracked text-ink/50">{t.rsvp.deadline}</p>
                </div>
              </div>
            )}
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

const inputCls =
  "w-full bg-transparent border-b border-ink/20 focus:border-gold outline-none py-3 text-sm placeholder:text-ink/30 transition-colors";

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracked text-ink/60">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function TasteCard({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden group py-10 flex flex-col items-center gap-4 border transition-all ${
        active ? "border-gold bg-gold/5" : "border-ink/15 hover:border-gold/50"
      }`}
    >
      <span className={`transition-colors ${active ? "text-gold" : "text-ink/70"}`}>{icon}</span>
      <span className="font-serif italic text-xl">{label}</span>
      {active && (
        <>
          <motion.span
            layoutId="taste-top"
            className="absolute top-0 left-0 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <motion.span
            layoutId="taste-bottom"
            className="absolute bottom-0 right-0 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </>
      )}
    </button>
  );
}
