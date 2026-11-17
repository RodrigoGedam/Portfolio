import { ArrowDown, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

import { profile } from "@/lib/profile";

export default function Hero() {
	const { t } = useTranslation();
	return (
		<section id="hero" aria-labelledby="hero-title" className="surface-dark relative overflow-hidden bg-black-base pt-16 text-white-base">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-32 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(246,81,81,.28),transparent_65%)] blur-2xl sm:-right-24"
			/>
			<div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl content-center px-5 py-20 sm:px-8">
				<div className="max-w-3xl">
					<p className="mb-5 text-sm font-semibold tracking-[0.22em] text-red-base uppercase">{t("hero.eyebrow")}</p>
					<h1 id="hero-title" tabIndex={-1} className="text-5xl outline-none font-semibold tracking-tight sm:text-6xl lg:text-7xl">
						{t("hero.titleStart")} <span className="text-red-base">{t("hero.name")}</span>.
					</h1>
					<p className="mt-7 max-w-2xl text-base leading-8 text-white-base/75 sm:text-lg">{t("hero.description")}</p>
					<div className="mt-9 flex flex-wrap gap-3">
						<a
							href="#projects"
							className="inline-flex items-center gap-2 rounded-lg bg-red-strong px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-strong/90"
						>
							{t("hero.projects")} <ArrowDown size={18} aria-hidden="true" />
						</a>
						<a
							href={profile.resume}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-white hover:bg-white/10"
						>
							<FileText size={18} aria-hidden="true" /> {t("hero.resume")}
							<span className="sr-only"> {t("common.newTab")}</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
