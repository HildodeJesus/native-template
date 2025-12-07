import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {pt} from "./locales/pt";


i18n.use(initReactI18next).init({
    lng: Localization.getLocales()[0].languageCode || "en",
    fallbackLng: "en",
    resources: {
        pt: { translation: pt },
    },
});

export default i18n;
