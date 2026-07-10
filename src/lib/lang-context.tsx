import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Dict, type Lang } from "./i18n";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "ES",
  setLang: () => {},
  t: translations.ES,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ES");
  return <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
