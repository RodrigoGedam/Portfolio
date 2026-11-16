// @vitest-environment jsdom
import { beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.resetModules();
  localStorage.clear();
  document.documentElement.lang = "pt-BR";
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

test("funciona quando o armazenamento está bloqueado", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
  const { default: i18n } = await import("../src/lib/i18n");
  expect(i18n.resolvedLanguage).toBe("pt");
  await i18n.changeLanguage("en");
  expect(document.documentElement.lang).toBe("en");
});

test("oferece links de navegação acessíveis pelo teclado", async () => {
  await import("../src/lib/i18n");
  const { default: Navbar } = await import("../src/components/Navbar");
  render(<Navbar />);
  const home = screen.getByRole("link", { name: /início/i });
  expect(home.getAttribute("href")).toBe("#hero");
  await userEvent.tab();
  expect(document.activeElement).toBe(home);
});

test("navega circularmente entre projetos", async () => {
  await import("../src/lib/i18n");
  const { default: Projects } = await import("../src/components/Projects");
  render(<Projects />);
  const previous = screen.getByRole("button", { name: /anterior/i });
  const next = screen.getByRole("button", { name: /próximo/i });
  await userEvent.click(previous);
  expect(screen.getByRole("link", { name: /repositório/i }).getAttribute("href")).toContain("Widget-Server");
  await userEvent.click(next);
  expect(screen.getByRole("link", { name: /repositório/i }).getAttribute("href")).toContain("ftr-financy");
});

test("apresenta a Prancheta Tática com link para o repositório", async () => {
  await import("../src/lib/i18n");
  const { default: Projects } = await import("../src/components/Projects");
  render(<Projects />);
  await userEvent.click(screen.getByRole("button", { name: "Prancheta Tática" }));
  expect(screen.getByRole("heading", { name: "Prancheta Tática" })).toBeTruthy();
  expect(screen.getByRole("link", { name: /repositório/i }).getAttribute("href"))
    .toBe("https://github.com/RodrigoGedam/prancheta-tatica");
});
