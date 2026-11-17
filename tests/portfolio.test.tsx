// @vitest-environment jsdom
import { beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setBrowserLanguage = (language: string) => {
	vi.spyOn(navigator, "language", "get").mockReturnValue(language);
	vi.spyOn(navigator, "languages", "get").mockReturnValue([language]);
};

beforeEach(() => {
	cleanup();
	vi.restoreAllMocks();
	vi.resetModules();
	localStorage.clear();
	document.documentElement.lang = "pt-BR";
	setBrowserLanguage("pt-BR");
});

test("restaura o idioma salvo e atualiza o idioma do documento", async () => {
	localStorage.setItem("portfolio-language", "en");
	const { default: i18n } = await import("../src/lib/i18n");
	expect(i18n.resolvedLanguage).toBe("en");
	expect(document.documentElement.lang).toBe("en");
	await i18n.changeLanguage("pt");
	expect(document.documentElement.lang).toBe("pt-BR");
	expect(localStorage.getItem("portfolio-language")).toBe("pt");
});

test("usa o idioma do navegador quando não há preferência salva", async () => {
	setBrowserLanguage("en-US");
	const { default: i18n } = await import("../src/lib/i18n");
	expect(i18n.resolvedLanguage).toBe("en");
	expect(document.title).toMatch(/Front-end & Full-stack Developer/);
});

test("percorre a lista de idiomas do navegador até achar um suportado", async () => {
	vi.spyOn(navigator, "languages", "get").mockReturnValue(["fr-CA", "en-US"]);
	const { default: i18n } = await import("../src/lib/i18n");
	expect(i18n.resolvedLanguage).toBe("en");
});

test("usa inglês quando nenhum idioma do navegador é suportado", async () => {
	setBrowserLanguage("de-DE");
	const { default: i18n } = await import("../src/lib/i18n");
	expect(i18n.resolvedLanguage).toBe("en");
});

test("sincroniza descrição e locale das metas com o idioma", async () => {
	document.head.innerHTML =
		'<meta name="description" content="" /><meta property="og:locale" content="" /><meta property="og:locale:alternate" content="" />';
	const { default: i18n } = await import("../src/lib/i18n");
	expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toMatch(/Portfólio/);
	await i18n.changeLanguage("en");
	expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toMatch(/Portfolio of/);
	expect(document.querySelector('meta[property="og:locale"]')?.getAttribute("content")).toBe("en_US");
	expect(document.querySelector('meta[property="og:locale:alternate"]')?.getAttribute("content")).toBe("pt_BR");
	document.head.innerHTML = "";
});

test("funciona quando o armazenamento está bloqueado", async () => {
	vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
		throw new Error("blocked");
	});
	vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
		throw new Error("blocked");
	});
	const { default: i18n } = await import("../src/lib/i18n");
	expect(i18n.resolvedLanguage).toBe("pt");
	await i18n.changeLanguage("en");
	expect(document.documentElement.lang).toBe("en");
});

test("oferece link para pular ao conteúdo como primeiro foco", async () => {
	await import("../src/lib/i18n");
	const { default: App } = await import("../src/App");
	render(<App />);
	await userEvent.tab();
	const skip = screen.getByRole("link", { name: /pular para o conteúdo/i });
	expect(document.activeElement).toBe(skip);
	expect(skip.getAttribute("href")).toBe("#main");
	expect(within(screen.getByRole("main")).getByRole("heading", { name: /construir algo/i })).toBeTruthy();
	const footer = screen.getByRole("contentinfo");
	expect(screen.getByRole("main").contains(footer)).toBe(false);
});

test("menu móvel fecha com Escape e devolve o foco ao botão", async () => {
	await import("../src/lib/i18n");
	const { default: Navbar } = await import("../src/components/Navbar");
	render(<Navbar />);
	const toggle = screen.getByRole("button", { name: /abrir menu/i });
	expect(toggle.getAttribute("aria-controls")).toBe("mobile-menu");
	await userEvent.click(toggle);
	expect(toggle.getAttribute("aria-expanded")).toBe("true");
	await userEvent.keyboard("{Escape}");
	expect(toggle.getAttribute("aria-expanded")).toBe("false");
	expect(document.activeElement).toBe(toggle);
});

test("Escape com o foco fora da navegação fecha o menu sem roubar o foco", async () => {
	await import("../src/lib/i18n");
	const { default: Navbar } = await import("../src/components/Navbar");
	render(
		<>
			<Navbar />
			<button type="button">fora</button>
		</>,
	);
	const toggle = screen.getByRole("button", { name: /abrir menu/i });
	await userEvent.click(toggle);
	const outside = screen.getByRole("button", { name: "fora" });
	outside.focus();
	await userEvent.keyboard("{Escape}");
	expect(toggle.getAttribute("aria-expanded")).toBe("false");
	expect(document.activeElement).toBe(outside);
});

test("menu fecha ao clicar fora da navegação", async () => {
	await import("../src/lib/i18n");
	const { default: Navbar } = await import("../src/components/Navbar");
	render(
		<>
			<Navbar />
			<p>conteúdo</p>
		</>,
	);
	const toggle = screen.getByRole("button", { name: /abrir menu/i });
	await userEvent.click(toggle);
	await userEvent.click(screen.getByText("conteúdo"));
	expect(toggle.getAttribute("aria-expanded")).toBe("false");
});

test("seletor de idioma mostra o idioma de destino", async () => {
	const { default: i18n } = await import("../src/lib/i18n");
	const { default: Navbar } = await import("../src/components/Navbar");
	render(<Navbar />);
	await userEvent.click(screen.getByRole("button", { name: "Switch to English" }));
	expect(i18n.resolvedLanguage).toBe("en");
	expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeTruthy();
	expect(screen.getByRole("button", { name: "Mudar para Português" }).textContent).toContain("Português");
});

test("mostra todos os projetos ao mesmo tempo com link para o repositório", async () => {
	await import("../src/lib/i18n");
	const { default: Projects } = await import("../src/components/Projects");
	render(<Projects />);
	expect(screen.getAllByRole("article")).toHaveLength(4);
	const prancheta = screen.getByRole("article", { name: "Prancheta Tática" });
	expect(within(prancheta).getByRole("link", { name: /repositório/i }).getAttribute("href")).toBe(
		"https://github.com/RodrigoGedam/prancheta-tatica",
	);
});

test("copia o e-mail e anuncia a confirmação", async () => {
	await import("../src/lib/i18n");
	const { default: Contact } = await import("../src/components/Contact");
	const user = userEvent.setup();
	const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
	render(<Contact />);
	await user.click(screen.getByRole("button", { name: /copiar e-mail/i }));
	expect(writeText).toHaveBeenCalledWith("rodrigo.gedam@gmail.com");
	expect(screen.getByRole("status").textContent).toMatch(/copiado/i);
});

test("mostra orientação manual quando a cópia falha", async () => {
	await import("../src/lib/i18n");
	const { default: Contact } = await import("../src/components/Contact");
	const user = userEvent.setup();
	vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
	render(<Contact />);
	await user.click(screen.getByRole("button", { name: /copiar e-mail/i }));
	expect(screen.getByRole("status").textContent).toMatch(/não foi possível copiar/i);
	expect(screen.getByRole("link", { name: "rodrigo.gedam@gmail.com" })).toBeTruthy();
});
