import { Braces, Database, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SectionHeading } from "./ui/section-heading";

const groups = [
	{ title: "frontend", icon: Braces, items: ["react", "typescript", "styles", "ui"] },
	{ title: "backend", icon: Database, items: ["node", "api", "database", "storage"] },
	{ title: "practices", icon: ShieldCheck, items: ["git", "tests", "docker", "quality"] },
];

export default function Skills() {
	const { t } = useTranslation();
	return (
		<section id="skills" aria-labelledby="skills-title" className="bg-white-base px-5 py-20 sm:px-8">
			<div className="mx-auto max-w-6xl">
				<SectionHeading
					id="skills-title"
					eyebrow={t("skills.eyebrow")}
					title={t("skills.title")}
					description={t("skills.description")}
				/>
				<div className="mt-10 grid gap-5 md:grid-cols-3">
					{groups.map(({ title, icon: Icon, items }) => (
						<article key={title} className="rounded-2xl border border-black-base/10 bg-surface-blush/60 p-6">
							<Icon className="text-red-strong" aria-hidden="true" />
							<h3 className="mt-4 text-lg font-semibold text-black-base">{t(`skills.${title}`)}</h3>
							<ul className="mt-5 space-y-3">
								{items.map((item) => (
									<li key={item} className="border-l-2 border-red-strong/35 pl-3 text-sm text-brown-base">
										{t(`skills.items.${item}`)}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
