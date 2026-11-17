import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { profile } from "@/lib/profile";
import { SectionHeading } from "./ui/section-heading";

const socialClass = "rounded-lg bg-black-base p-2.5 text-white-base transition hover:bg-red-strong";

export default function About() {
	const { t } = useTranslation();
	return (
		<section id="about" aria-labelledby="about-title" className="bg-white-base px-5 py-20 sm:px-8">
			<div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_.75fr]">
				<div>
					<SectionHeading id="about-title" eyebrow={t("about.eyebrow")} title={t("about.title")} />
					<p className="mt-6 max-w-2xl leading-8 text-brown-base">{t("about.description")}</p>
				</div>
				<aside className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-red-strong/15 bg-red-strong/[.04] p-6 text-center">
					<p className="font-semibold text-red-strong">{t("about.availability")}</p>
					<p className="mt-4 flex items-center gap-2 text-sm text-brown-base">
						<MapPin size={17} aria-hidden="true" />
						{t("about.location")}
					</p>
					<div className="mt-6 flex gap-3">
						<a className={socialClass} href={profile.github} target="_blank" rel="noreferrer" aria-label={t("about.github")}>
							<FaGithub size={19} aria-hidden="true" />
						</a>
						<a className={socialClass} href={profile.linkedin} target="_blank" rel="noreferrer" aria-label={t("about.linkedin")}>
							<FaLinkedin size={19} aria-hidden="true" />
						</a>
					</div>
				</aside>
			</div>
		</section>
	);
}
