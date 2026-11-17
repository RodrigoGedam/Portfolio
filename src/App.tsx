import { useTranslation } from "react-i18next";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
	const { t } = useTranslation();
	return (
		<>
			<a
				href="#main"
				className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-lg bg-red-strong px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0"
			>
				{t("nav.skip")}
			</a>
			<header>
				<Navbar />
			</header>
			<main id="main" tabIndex={-1} className="outline-none">
				<Hero />
				<About />
				<Projects />
				<Skills />
				<Contact />
			</main>
			<Footer />
		</>
	);
}

export default App;
