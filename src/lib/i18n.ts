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
	lng: localStorage.getItem("portfolio-language") ?? "pt",
	fallbackLng: "en",
	load: "languageOnly",
	interpolation: {
		escapeValue: false,
	},
});

i18n.on("languageChanged", (language) => {
	document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
	localStorage.setItem("portfolio-language", language);
});

export default i18n;
