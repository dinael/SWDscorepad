import "@testing-library/jest-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import es from "../locales/es.json";
import la from "../locales/la.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    la: { translation: la },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});
