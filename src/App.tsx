import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

function App() {
	const { t } = useTranslation();

	return (
		<div className="flex min-h-svh flex-col items-center justify-center">
			<Button
				onClick={() => {
					i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt");
				}}
			>
				{i18n.language === "pt" ? "EN" : "PT"}
			</Button>
			<p className="font-sans text-red-base">{t("hero.title")}</p>
			<p className="font-handwriting">{t("hero.description")}</p>
			<p className="font-headline">Poppins</p>
		</div>
	);
}

export default App;
