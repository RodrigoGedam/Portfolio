import { Languages, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbHexagonLetterR } from "react-icons/tb";

import { Button } from "./ui/button";

const links = ["about", "projects", "skills", "contact"] as const;
const linkClass =
	"cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white-base/80 transition hover:bg-white/10 hover:text-white";

export default function Navbar() {
	const { t, i18n } = useTranslation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const close = () => setIsMenuOpen(false);

	const isPt = i18n.resolvedLanguage === "pt";
	const nextLanguage = isPt ? "en" : "pt";

	useEffect(() => {
		if (!isMenuOpen) return;
		const nav = navRef.current;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			setIsMenuOpen(false);
			// Só devolve o foco ao botão se ele estava dentro da navegação.
			if (nav?.contains(document.activeElement)) menuButtonRef.current?.focus();
		};
		const onPointerDown = (event: PointerEvent) => {
			if (nav && !nav.contains(event.target as Node)) setIsMenuOpen(false);
		};
		const onFocusOut = (event: FocusEvent) => {
			if (event.relatedTarget && !nav?.contains(event.relatedTarget as Node)) setIsMenuOpen(false);
		};
		const desktop = window.matchMedia?.("(min-width: 64rem)");
		const onBreakpoint = (event: MediaQueryListEvent) => {
			if (event.matches) setIsMenuOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("pointerdown", onPointerDown);
		nav?.addEventListener("focusout", onFocusOut);
		desktop?.addEventListener("change", onBreakpoint);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("pointerdown", onPointerDown);
			nav?.removeEventListener("focusout", onFocusOut);
			desktop?.removeEventListener("change", onBreakpoint);
		};
	}, [isMenuOpen]);

	/** Fecha o menu e leva o foco ao título da seção escolhida, para o próximo Tab seguir dali. */
	const goTo = (target: string) => {
		close();
		requestAnimationFrame(() => document.getElementById(`${target}-title`)?.focus({ preventScroll: true }));
	};

	return (
		<nav
			ref={navRef}
			aria-label={t("nav.label")}
			className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black-base/90 backdrop-blur"
		>
			<div className="mx-auto grid min-h-16 max-w-6xl grid-cols-[1fr_auto] items-center px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
				<a
					aria-label={t("nav.home")}
					className="cursor-pointer justify-self-start text-3xl text-white-base transition hover:text-red-base"
					href="#hero"
					onClick={close}
				>
					<TbHexagonLetterR aria-hidden="true" />
				</a>
				<div className="hidden lg:flex lg:items-center lg:justify-center">
					{links.map((target) => (
						<a key={target} href={`#${target}`} onClick={() => goTo(target)} className={linkClass}>
							{t(`nav.${target}`)}
						</a>
					))}
				</div>
				<div className="flex items-center gap-1 justify-self-end">
					<Button
						variant="ghost"
						size="sm"
						className="gap-1.5 text-white-base hover:bg-white/10 hover:text-white"
						lang={isPt ? "en" : "pt-BR"}
						aria-label={isPt ? "Switch to English" : "Mudar para Português"}
						onClick={() => i18n.changeLanguage(nextLanguage)}
					>
						<Languages size={16} aria-hidden="true" />
						{isPt ? "English" : "Português"}
					</Button>
					<Button
						ref={menuButtonRef}
						variant="ghost"
						size="icon"
						className="text-white-base hover:bg-white/10 hover:text-white lg:hidden"
						aria-label={isMenuOpen ? t("nav.close") : t("nav.open")}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						onClick={() => setIsMenuOpen((open) => !open)}
					>
						{isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
					</Button>
				</div>
				<div
					id="mobile-menu"
					className={`${isMenuOpen ? "flex" : "hidden"} absolute inset-x-5 top-[4.5rem] flex-col gap-1 rounded-2xl border border-white/10 bg-black-base p-3 shadow-2xl lg:hidden`}
				>
					{links.map((target) => (
						<a key={target} href={`#${target}`} onClick={() => goTo(target)} className={linkClass}>
							{t(`nav.${target}`)}
						</a>
					))}
				</div>
			</div>
		</nav>
	);
}
