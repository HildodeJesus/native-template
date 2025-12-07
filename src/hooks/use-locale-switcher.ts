import { useCallback } from "react";
import i18n from "../i18n";
import { generalStorage } from "../lib/storage";
import { Languages } from "../locales";

export function useLocaleSwitcher() {
  const currentLanguage = i18n.language as Languages;

  const setLanguage = useCallback(async (lang: Languages) => {
    await i18n.changeLanguage(lang);
    generalStorage.set("language", lang);
  }, []);

  const toggleLanguage = useCallback(async () => {
    const langs = Object.values(Languages);
    const currentIndex = langs.indexOf(currentLanguage);
    const nextLang = langs[(currentIndex + 1) % langs.length];

    await setLanguage(nextLang);
  }, [currentLanguage, setLanguage]);

  return {
    currentLanguage,
    setLanguage,
    toggleLanguage,
  };
}
