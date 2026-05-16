import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<Hero />
				<About />
				<Skills />
				<Projects />
			</main>
			<footer>
				<Contact />
			</footer>
		</>
	);
}

export default App;
