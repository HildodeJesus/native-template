import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./locales/en/translation.json";
import pt from "./locales/pt/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: Localization.locale.split("-")[0], // detecta idioma do sistema
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
