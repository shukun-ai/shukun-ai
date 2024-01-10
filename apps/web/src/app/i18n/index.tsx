import i18n from 'i18next';
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
import resources from './locales';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lowerCaseLng: true,
    debug: true,
    fallbackLng: "zh_cn",
    interpolation: {
      escapeValue: false
    },
    detection: {
      convertDetectedLanguage: (lng) => lng.replace('-', '_')
    },
  });

export default i18n;
