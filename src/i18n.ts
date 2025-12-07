import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { generalStorage } from "./lib/storage";
import { Languages, localeFiles } from "./locales";

const resources = Object.fromEntries(
  Object.values(Languages).map((lang) => [lang, { translation: localeFiles[lang] }]),
);

async function getInitialLanguage() {
  const stored = generalStorage.get("language");

  if (stored && Object.values(Languages).includes(stored)) {
    return stored;
  }

  const deviceLang = Localization.getLocales()[0]?.languageCode || "en";
  return Object.values(Languages).includes(deviceLang as Languages)
    ? (deviceLang as Languages)
    : Languages.EN;
}

export async function initI18n() {
  const initialLang = await getInitialLanguage();

  await i18n.use(initReactI18next).init({
    lng: initialLang,
    fallbackLng: Languages.EN,
    resources,
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export default i18n;
