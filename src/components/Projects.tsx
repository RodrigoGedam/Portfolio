import { Card, CardContent } from "./ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

export default function Projects() {
	return (
		<section
			id="projects"
			className="rounded-tl-[80px] w-full bg-linear-to-tl from-black-base to-gray-900 text-white md:rounded-tl-[180px]"
		>
			<div className="container mx-auto w-full p-4 py-12">
				<div className="relative p-4 text-center">
					<h2 className="relative z-40 mb-2 text-white">
						<span className="mr-2 font-headline text-3xl font-semibold">
							Projetos &
						</span>
						<span className="font-handwriting text-4xl">
							Portfólio
						</span>
					</h2>
					<p className="relative text-sm text-gray-400">
						Alguns dos projetos pessoais e que já realizei ao longo
						da minha trajetória como programador.
					</p>
					<div className="absolute left-1/2 top-3 z-0 h-10 w-10 rounded-lg bg-red-100/10" />
				</div>
				<div className="mt-6w-full flex items-center justify-center w-full">
					<Carousel
						opts={{
							align: "start",
							loop: true,
						}}
						className="w-full max-w-48 sm:max-w-xl"
					>
						<CarouselContent>
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem key={index}>
									<div className="p-1">
										<Card>
											<CardContent className="flex aspect-square items-center justify-center p-6">
												<span className="text-4xl font-semibold">
													{index + 1}
												</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious
							variant="none"
							className="hover:bg-gray-600 border border-white"
						/>
						<CarouselNext
							variant="none"
							className="hover:bg-gray-600 border border-white"
						/>
					</Carousel>
				</div>
			</div>
		</section>
	);
}
