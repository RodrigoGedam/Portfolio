import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { profile } from "@/lib/profile";
import { SectionHeading } from "./ui/section-heading";

const cardClass = "flex min-h-44 flex-col rounded-2xl border border-black-base/10 bg-white-base p-5";
const linkClass = "mt-1 block text-sm break-all text-brown-base underline-offset-4 hover:text-red-strong hover:underline";

type CopyState = "idle" | "copied" | "failed";

export default function Contact() {
	const { t } = useTranslation();
	const [copyState, setCopyState] = useState<CopyState>("idle");
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopyState("copied");
		} catch {
			setCopyState("failed");
		}
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setCopyState("idle"), 3000);
	};

	return (
		<section id="contact" aria-labelledby="contact-title" className="bg-surface-blush px-5 py-20 sm:px-8">
			<div className="mx-auto max-w-6xl">
				<SectionHeading
					id="contact-title"
					eyebrow={t("contact.eyebrow")}
					title={t("contact.title")}
					description={t("contact.description")}
				/>
				<div className="mt-9 grid gap-4 md:grid-cols-3">
					<div className={cardClass}>
						<Mail className="h-5 w-5 text-red-strong" aria-hidden="true" />
						<p className="mt-5 text-sm font-semibold text-black-base">{t("contact.emailLabel")}</p>
						<div className="mt-1 flex items-center justify-between gap-2">
							<a href={`mailto:${profile.email}`} className={linkClass.replace("mt-1 ", "")}>
								{profile.email}
							</a>
							<button
								type="button"
								onClick={copyEmail}
								aria-label={t("contact.copy")}
								title={t("contact.copy")}
								className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-brown-base transition hover:bg-red-strong/10 hover:text-red-strong"
							>
								{copyState === "copied" ? (
									<Check size={16} className="text-red-strong" aria-hidden="true" />
								) : (
									<Copy size={16} aria-hidden="true" />
								)}
							</button>
						</div>
						<p role="status" className="mt-2 min-h-5 text-xs text-brown-base">
							{copyState === "copied" && t("contact.copied")}
							{copyState === "failed" && t("contact.copyFailed")}
						</p>
					</div>
					<div className={cardClass}>
						<FaLinkedin className="h-5 w-5 text-red-strong" aria-hidden="true" />
						<p className="mt-5 text-sm font-semibold text-black-base">{t("contact.linkedinLabel")}</p>
						<a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
							{t("contact.linkedin")}
							<span className="sr-only"> {t("common.newTab")}</span>
						</a>
					</div>
					<div className={cardClass}>
						<FaGithub className="h-5 w-5 text-red-strong" aria-hidden="true" />
						<p className="mt-5 text-sm font-semibold text-black-base">{t("contact.githubLabel")}</p>
						<a href={profile.github} target="_blank" rel="noreferrer" className={linkClass}>
							{t("contact.github")}
							<span className="sr-only"> {t("common.newTab")}</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
