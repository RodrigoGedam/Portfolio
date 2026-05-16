import { Button } from "./ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

interface ProjectCardProps {
	title: string;
}

export default function ProjectCard({ title }: ProjectCardProps) {
	return (
		<Card className="relative mx-auto w-full pt-0">
			<div className="absolute inset-0 z-30 aspect-video bg-black/35" />
			<img
				src="https://avatar.vercel.sh/shadcn1"
				alt="Event cover"
				className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
			/>
			<CardHeader className="text-center">
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					A practical talk on component APIs, accessibility, and
					shipping faster.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button className="w-full">View Event</Button>
			</CardFooter>
		</Card>
	);
}
