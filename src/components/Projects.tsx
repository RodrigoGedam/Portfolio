import { ChartPie, ExternalLink, ImageUp, Link2, Trophy, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";

import { SectionHeading } from "./ui/section-heading";

type Project = {
	key: string;
	repository: string;
	tech: string[];
	icon: LucideIcon;
	/** Captura de tela real em /public (opcional). Sem ela, o card usa uma capa ilustrada própria. */
	image?: string;
	/** URL pública verificada da demo (opcional). Só preencher com link que esteja no ar. */
	demo?: string;
	accent: string;
};

const projects: Project[] = [
	{
		key: "financy",
		repository: "https://github.com/RodrigoGedam/ftr-financy",
		tech: ["React", "TypeScript", "GraphQL", "Prisma"],
		icon: ChartPie,
		accent: "from-red-base/45 via-brown-base/40",
	},
	{
		key: "brevly",
		repository: "https://github.com/RodrigoGedam/ftr-brevly",
		tech: ["React", "Fastify", "PostgreSQL", "Cloudflare R2"],
		icon: Link2,
		accent: "from-brown-base/70 via-red-base/25",
	},
	{
		key: "prancheta",
		repository: "https://github.com/RodrigoGedam/prancheta-tatica",
		tech: ["React", "TypeScript", "Konva", "Supabase"],
		icon: Trophy,
		accent: "from-red-strong/55 via-black-base/30",
	},
	{
		key: "widget",
		repository: "https://github.com/RodrigoGedam/Widget-Server",
		tech: ["Fastify", "Drizzle", "PostgreSQL", "Docker"],
		icon: ImageUp,
		accent: "from-brown-base/55 via-red-strong/30",
	},
];

const actionClass =
	"inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-white-base transition hover:text-red-base";

export default function Projects() {
	const { t } = useTranslation();
	return (
		<section id="projects" aria-labelledby="projects-title" className="surface-dark bg-black-base px-5 py-20 text-white-base sm:px-8">
			<div className="mx-auto max-w-6xl">
				<SectionHeading
					id="projects-title"
					tone="dark"
					eyebrow={t("projects.eyebrow")}
					title={t("projects.title")}
					description={t("projects.description")}
				/>
				<ul className="mt-10 grid gap-6 md:grid-cols-2">
					{projects.map(({ key, repository, tech, icon: Icon, image, demo, accent }, index) => {
						const title = t(`projects.items.${key}.title`);
						const highlights = t(`projects.items.${key}.highlights`, { returnObjects: true }) as string[];
						return (
							<li key={key}>
								<article
									aria-labelledby={`project-${key}`}
									className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[.03] transition hover:border-white/25"
								>
									<div className={`relative aspect-[16/9] overflow-hidden bg-linear-to-br ${accent} to-black-base`}>
										{image ? (
											<img src={image} alt={t("projects.screenshot", { title })} loading="lazy" className="h-full w-full object-cover" />
										) : (
											<div aria-hidden="true" className="flex h-full items-center justify-center">
												<div className="absolute inset-0 bg-[linear-gradient(rgba(254,244,244,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(254,244,244,.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
												<Icon className="relative h-16 w-16 text-white-base/85" strokeWidth={1.4} />
											</div>
										)}
										<span aria-hidden="true" className="absolute bottom-4 left-5 text-4xl font-bold text-white/85">
											0{index + 1}
										</span>
									</div>
									<div className="flex flex-1 flex-col p-6">
										<p className="text-sm font-medium text-red-base">{t(`projects.items.${key}.type`)}</p>
										<h3 id={`project-${key}`} className="mt-2 text-2xl font-semibold">
											{title}
										</h3>
										<p className="mt-3 leading-7 text-white-base/75">{t(`projects.items.${key}.description`)}</p>
										<ul className="mt-4 space-y-2 text-sm text-white-base/75">
											{highlights.map((item) => (
												<li key={item} className="flex gap-2">
													<span aria-hidden="true" className="text-red-base">
														•
													</span>
													{item}
												</li>
											))}
										</ul>
										<p className="sr-only">{t("projects.tech")}</p>
										<ul className="mt-5 flex flex-wrap gap-2">
											{tech.map((item) => (
												<li key={item} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white-base/80">
													{item}
												</li>
											))}
										</ul>
										<div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
											<a href={repository} target="_blank" rel="noreferrer" className={actionClass}>
												<FaGithub size={16} aria-hidden="true" />
												{t("projects.repository")}
												<span className="sr-only">: {title} {t("common.newTab")}</span>
											</a>
											{demo && (
												<a href={demo} target="_blank" rel="noreferrer" className={actionClass}>
													<ExternalLink size={16} aria-hidden="true" />
													{t("projects.demo")}
													<span className="sr-only">: {title} {t("common.newTab")}</span>
												</a>
											)}
										</div>
									</div>
								</article>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
