import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

const TARGET = new Date("2027-05-15T17:00:00+02:00").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms / 3_600_000) % 24);
  const minutes = Math.floor((ms / 60_000) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const { t } = useLang();
  const [time, setTime] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: time.days, l: t.countdown.days },
    { v: time.hours, l: t.countdown.hours },
    { v: time.minutes, l: t.countdown.minutes },
    { v: time.seconds, l: t.countdown.seconds },
  ];

  return (
    <div className="flex items-stretch justify-center gap-4 md:gap-10 text-cream">
      {items.map((it, i) => (
        <div key={it.l} className="flex items-center">
          <div className="text-center min-w-[68px] md:min-w-[92px]">
            <div className="font-serif text-4xl md:text-6xl tabular-nums leading-none">
              {String(it.v).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] md:text-[11px] tracked text-cream/70">{it.l}</div>
          </div>
          {i < items.length - 1 && (
            <div className="h-10 md:h-14 w-px bg-gold/50 ml-4 md:ml-10 self-center" />
          )}
        </div>
      ))}
    </div>
  );
}
