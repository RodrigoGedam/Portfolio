import { cn } from "@/lib/utils";

type SectionHeadingProps = {
	id: string;
	eyebrow: string;
	title: string;
	description?: string;
	tone?: "light" | "dark";
	className?: string;
};

/** Cabeçalho padrão de seção: eyebrow + h2 + descrição, com cor de destaque acessível ao fundo. */
export function SectionHeading({ id, eyebrow, title, description, tone = "light", className }: SectionHeadingProps) {
	const isDark = tone === "dark";
	return (
		<div className={cn("max-w-2xl", className)}>
			<p className={cn("text-sm font-semibold tracking-[.2em] uppercase", isDark ? "text-red-base" : "text-red-strong")}>
				{eyebrow}
			</p>
			<h2
				id={id}
				tabIndex={-1}
				className={cn("mt-3 text-3xl font-semibold tracking-tight outline-none sm:text-4xl", isDark ? "text-white-base" : "text-black-base")}
			>
				{title}
			</h2>
			{description && (
				<p className={cn("mt-4 leading-7", isDark ? "text-white-base/70" : "text-brown-base")}>{description}</p>
			)}
		</div>
	);
}
