import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/translations.json";
import pt from "../locales/pt/translations.json";

let language = "pt";
try {
	language = localStorage.getItem("portfolio-language") ?? "pt";
} catch {
	// Storage may be unavailable in restricted browsing contexts.
}

i18n.on("languageChanged", (language) => {
	document.documentElement.lang = language.startsWith("pt") ? "pt-BR" : "en";
	try {
		localStorage.setItem("portfolio-language", language);
	} catch {
		// The language still works for the current session.
	}
});

i18n.use(initReactI18next).init({
	resources: {
		pt: {
			translation: pt,
		},
		en: {
			translation: en,
		},
	},
	lng: language,
	fallbackLng: "en",
	load: "languageOnly",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
