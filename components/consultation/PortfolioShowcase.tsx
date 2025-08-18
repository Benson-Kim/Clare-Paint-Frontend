"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchPortfolioProjects } from "@/lib/api";
import { PortfolioProject } from "@/types/consultation";
import {
	Image,
	Search,
	X,
	ChevronLeft,
	ChevronRight,
	Palette,
	Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const PortfolioShowcase: React.FC = () => {
	const {
		data: projects,
		isLoading,
		isError,
		error,
	} = useQuery<PortfolioProject[], Error>({
		queryKey: ["portfolioProjects"],
		queryFn: mockFetchPortfolioProjects,
	});

	const [selectedProject, setSelectedProject] =
		useState<PortfolioProject | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const openProjectModal = (project: PortfolioProject) => {
		setSelectedProject(project);
		setCurrentImageIndex(0);
	};

	const closeProjectModal = () => {
		setSelectedProject(null);
	};

	const nextImage = () => {
		if (selectedProject) {
			setCurrentImageIndex(
				(prev) => (prev + 1) % selectedProject.imageUrls.length
			);
		}
	};

	const prevImage = () => {
		if (selectedProject) {
			setCurrentImageIndex(
				(prev) =>
					(prev - 1 + selectedProject.imageUrls.length) %
					selectedProject.imageUrls.length
			);
		}
	};

	if (isLoading) {
		return (
			<section className="py-20 bg-ds-primary-cream">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
						Our Work in Action
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="bg-ds-neutral-lightGray/20 rounded-lg h-64"
							/>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section className="py-20 bg-ds-primary-cream">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-8">
						Our Work in Action
					</h2>
					<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg">
						<p className="mb-4">
							Failed to load portfolio projects: {error?.message}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
						>
							Try Again
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-ds-primary-cream">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
						Our Work in Action
					</h2>
					<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto mb-20">
						See how our color consultations have transformed spaces, from cozy
						homes to dynamic commercial environments.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{projects?.map((project) => (
						<div
							key={project.id}
							className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
							onClick={() => openProjectModal(project)}
							aria-label={`View project: ${project.name}`}
						>
							<div className="relative h-48 overflow-hidden">
								<Image
									src={project.imageUrls[0]}
									alt={project.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<Search className="w-8 h-8 text-ds-neutral-white" />
								</div>
							</div>
							<div className="p-8">
								<h3 className="text-xl font-bold text-ds-primary-charcoal mb-2">
									{project.name}
								</h3>
								<p className="text-ds-neutral-mediumGray text-sm mb-4 line-clamp-2">
									{project.description}
								</p>
								<div className="flex items-center space-x-2 text-xs text-ds-neutral-mediumGray">
									<Tag className="w-4 h-4" />
									<span className="capitalize">{project.type}</span>
									<Palette className="w-4 h-4 ml-auto" />
									<div className="flex space-x-2">
										{project.colorPalette.map((color, idx) => (
											<div
												key={idx}
												className="w-4 h-4 rounded-full border border-ds-neutral-lightGray"
												style={{ backgroundColor: color }}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Project Modal */}
			{selectedProject && (
				<div
					className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
					aria-labelledby="project-modal-title"
				>
					<div className="bg-ds-neutral-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
						{/* Header */}
						<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
							<h2
								id="project-modal-title"
								className="text-xl font-bold text-ds-primary-charcoal"
							>
								{selectedProject.name}
							</h2>
							<button
								onClick={closeProjectModal}
								className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
								aria-label="Close project details"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Image Gallery */}
						<div className="relative flex-1 overflow-hidden">
							<Image
								src={selectedProject.imageUrls[currentImageIndex]}
								alt={`${selectedProject.name} - Image ${currentImageIndex + 1}`}
								className="object-cover"
								fill
								loading="lazy"
							/>

							{selectedProject.imageUrls.length > 1 && (
								<>
									<button
										onClick={prevImage}
										className="absolute left-4 top-1/2 -translate-y-1/2 bg-ds-neutral-white/80 hover:bg-ds-neutral-white p-2 rounded-full shadow-lg transition-colors duration-200"
										aria-label="Previous image"
									>
										<ChevronLeft className="w-6 h-6 text-ds-primary-charcoal" />
									</button>
									<button
										onClick={nextImage}
										className="absolute right-4 top-1/2 -translate-y-1/2 bg-ds-neutral-white/80 hover:bg-ds-neutral-white p-2 rounded-full shadow-lg transition-colors duration-200"
										aria-label="Next image"
									>
										<ChevronRight className="w-6 h-6 text-ds-primary-charcoal" />
									</button>
								</>
							)}
							<div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
								{selectedProject.imageUrls.map((_, idx) => (
									<button
										key={idx}
										onClick={() => setCurrentImageIndex(idx)}
										className={cn(
											"w-2 h-2 rounded-full bg-ds-neutral-white/50",
											idx === currentImageIndex && "bg-ds-neutral-white"
										)}
										aria-label={`Go to image ${idx + 1}`}
									/>
								))}
							</div>
						</div>

						{/* Project Details */}
						<div className="p-8 border-t border-ds-neutral-lightGray">
							<p className="text-ds-neutral-darkSlate mb-4">
								{selectedProject.description}
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<div>
									<p className="font-medium text-ds-primary-charcoal">
										Client:
									</p>
									<p className="text-ds-neutral-mediumGray">
										{selectedProject.client}
									</p>
								</div>
								<div>
									<p className="font-medium text-ds-primary-charcoal">
										Project Type:
									</p>
									<p className="text-ds-neutral-mediumGray capitalize">
										{selectedProject.type}
									</p>
								</div>
								<div className="md:col-span-2">
									<p className="font-medium text-ds-primary-charcoal mb-2">
										Color Palette:
									</p>
									<div className="flex flex-wrap gap-2">
										{selectedProject.colorPalette.map((color, idx) => (
											<div key={idx} className="flex items-center space-x-2">
												<div
													className="w-6 h-6 rounded-full border border-ds-neutral-lightGray"
													style={{ backgroundColor: color }}
												/>
												<span className="text-xs text-ds-neutral-mediumGray">
													{color}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};
