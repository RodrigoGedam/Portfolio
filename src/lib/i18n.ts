import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/translations.json";
import pt from "../locales/pt/translations.json";

i18n.use(initReactI18next).init({
	resources: {
		pt: {
			translation: pt,
		},
		en: {
			translation: en,
		},
	},
	lng: "pt",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
