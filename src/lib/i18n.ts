import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/translations.json";
import pt from "../locales/pt/translations.json";

const STORAGE_KEY = "portfolio-language";
const supported = ["pt", "en"] as const;
type Language = (typeof supported)[number];

const isSupported = (value: string | null | undefined): value is Language =>
	!!value && (supported as readonly string[]).includes(value);

/** Preferência salva > primeiro idioma suportado do navegador > inglês (público internacional) > português. */
function detectLanguage(): Language {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (isSupported(saved)) return saved;
	} catch {
		// Storage may be unavailable in restricted browsing contexts.
	}
	if (typeof navigator === "undefined") return "pt";
	const preferences = navigator.languages?.length ? navigator.languages : [navigator.language];
	for (const preference of preferences) {
		const base = preference?.slice(0, 2).toLowerCase();
		if (isSupported(base)) return base;
	}
	return preferences.some(Boolean) ? "en" : "pt";
}

function setMeta(selector: string, content: string) {
	document.querySelector(selector)?.setAttribute("content", content);
}

/** Mantém título, descrição e idioma do documento coerentes com o idioma ativo. */
function syncDocument(language: string) {
	const isPt = language.startsWith("pt");
	document.documentElement.lang = isPt ? "pt-BR" : "en";
	const title = i18n.t("meta.title");
	const description = i18n.t("meta.description");
	document.title = title;
	setMeta('meta[name="description"]', description);
	setMeta('meta[property="og:title"]', title);
	setMeta('meta[property="og:description"]', description);
	setMeta('meta[property="og:locale"]', isPt ? "pt_BR" : "en_US");
	setMeta('meta[property="og:locale:alternate"]', isPt ? "en_US" : "pt_BR");
	setMeta('meta[name="twitter:title"]', title);
	setMeta('meta[name="twitter:description"]', description);
}

i18n.on("languageChanged", (language) => {
	syncDocument(language);
	try {
		localStorage.setItem(STORAGE_KEY, language);
	} catch {
		// The language still works for the current session.
	}
});

i18n.use(initReactI18next).init({
	resources: {
		pt: { translation: pt },
		en: { translation: en },
	},
	lng: detectLanguage(),
	fallbackLng: "en",
	load: "languageOnly",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
