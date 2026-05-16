import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";

function App() {
	const { t } = useTranslation();

	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<div className="flex min-h-svh flex-col items-center justify-center">
					<p className="font-sans text-red-base">{t("hero.title")}</p>
					<p className="font-handwriting">{t("hero.description")}</p>
					<p className="font-headline">Poppins</p>
				</div>
			</main>
			<footer>Footer</footer>
		</>
	);
}

export default App;
