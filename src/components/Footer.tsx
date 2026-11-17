import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { profile } from "@/lib/profile";

const iconLink = "rounded-lg p-2 text-white-base/75 transition hover:bg-white/10 hover:text-white";

export default function Footer() {
	const { t } = useTranslation();
	return (
		<footer className="bg-black-base px-5 py-8 text-white-base sm:px-8">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
				<p className="text-white-base/70">
					© {new Date().getFullYear()} {profile.name}. {t("footer.built")}
				</p>
				<div className="flex items-center gap-1">
					<a className={iconLink} href={profile.github} target="_blank" rel="noreferrer" aria-label={t("about.github")}>
						<FaGithub size={18} aria-hidden="true" />
					</a>
					<a className={iconLink} href={profile.linkedin} target="_blank" rel="noreferrer" aria-label={t("about.linkedin")}>
						<FaLinkedin size={18} aria-hidden="true" />
					</a>
					<a className={`${iconLink} inline-flex items-center gap-1.5`} href="#hero">
						{t("footer.top")} <ArrowUp size={16} aria-hidden="true" />
					</a>
				</div>
			</div>
		</footer>
	);
}
