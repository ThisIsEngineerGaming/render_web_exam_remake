import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.js";
import sq from "./locales/sq.js";

const LANGUAGE_STORAGE_KEY = "language";

const savedLanguage =
  typeof window !== "undefined"
    ? window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sq: { translation: sq },
  },
  lng: savedLanguage === "sq" ? "sq" : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export function setLanguage(language) {
  const nextLanguage = language === "sq" ? "sq" : "en";
  i18n.changeLanguage(nextLanguage);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }
}

export function toggleLanguage() {
  setLanguage(i18n.language === "sq" ? "en" : "sq");
}

export default i18n;
