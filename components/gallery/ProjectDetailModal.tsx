"use client";

import React, { useState } from "react";
import {
	X,
	Heart,
	Eye,
	MessageCircle,
	User,
	Calendar,
	Tag,
	Palette,
	ChevronLeft,
	ChevronRight,
	ThumbsUp,
} from "lucide-react";
import { useGalleryStore } from "@/store/gallery-store";
import { GalleryProject } from "@/types/gallery";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockVoteProject } from "@/lib/api";
import { format } from "date-fns";
import Image from "next/image";

export const ProjectDetailModal: React.FC = () => {
	const { isProjectDetailModalOpen, selectedProject, closeProjectDetailModal } =
		useGalleryStore();
	const queryClient = useQueryClient();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showBeforeAfter, setShowBeforeAfter] = useState(true);

	const voteMutation = useMutation({
		mutationFn: mockVoteProject,
		onMutate: async (projectId) => {
			await queryClient.cancelQueries({ queryKey: ["galleryProjects"] });
			const previousProjects = queryClient.getQueryData<GalleryProject[]>([
				"galleryProjects",
			]);
			queryClient.setQueryData<GalleryProject[]>(["galleryProjects"], (old) =>
				old
					? old.map((p) =>
							p.id === projectId ? { ...p, likes: p.likes + 1 } : p
					  )
					: []
			);
			return { previousProjects };
		},
		onError: (err, projectId, context) => {
			queryClient.setQueryData(["galleryProjects"], context?.previousProjects);
			console.error("Failed to vote:", err);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["galleryProjects"] });
		},
	});

	if (!isProjectDetailModalOpen || !selectedProject) return null;

	const images = [];
	if (selectedProject.beforeImageUrl) {
		images.push({ url: selectedProject.beforeImageUrl, label: "Before" });
	}
	images.push({ url: selectedProject.afterImageUrl, label: "After" });

	const handleNextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};

	const handlePrevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const handleLike = () => {
		voteMutation.mutate(selectedProject.id);
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="project-detail-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
					<h2
						id="project-detail-title"
						className="text-xl font-bold text-ds-primary-charcoal"
					>
						{selectedProject.title}
					</h2>
					<button
						onClick={closeProjectDetailModal}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close project details"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-8 flex-1 overflow-y-auto space-y-8">
					{/* Image Gallery */}
					<div className="relative w-full aspect-video bg-ds-neutral-lightGray/20 rounded-lg overflow-hidden">
						<Image
							src={images[currentImageIndex].url}
							alt={`${images[currentImageIndex].label}: ${selectedProject.title}`}
							className="w-full h-full object-cover"
							loading="lazy"
						/>
						<div className="absolute top-4 left-4 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold px-2 py-2 rounded-full">
							{images[currentImageIndex].label}
						</div>
						{images.length > 1 && (
							<>
								<button
									onClick={handlePrevImage}
									className="absolute left-4 top-1/2 -translate-y-1/2 bg-ds-neutral-white/80 hover:bg-ds-neutral-white p-2 rounded-full shadow-lg transition-colors duration-200"
									aria-label="Previous image"
								>
									<ChevronLeft className="w-6 h-6 text-ds-primary-charcoal" />
								</button>
								<button
									onClick={handleNextImage}
									className="absolute right-4 top-1/2 -translate-y-1/2 bg-ds-neutral-white/80 hover:bg-ds-neutral-white p-2 rounded-full shadow-lg transition-colors duration-200"
									aria-label="Next image"
								>
									<ChevronRight className="w-6 h-6 text-ds-primary-charcoal" />
								</button>
							</>
						)}
						<div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
							{images.map((_, idx) => (
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
					<div className="space-y-4">
						<div className="flex items-center space-x-8 text-ds-neutral-mediumGray text-sm">
							<div className="flex items-center space-x-2">
								<User className="w-4 h-4" />
								<span>{selectedProject.userName}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Calendar className="w-4 h-4" />
								<span>
									{format(
										new Date(selectedProject.submissionDate),
										"MMM dd, yyyy"
									)}
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<Eye className="w-4 h-4" />
								<span>{selectedProject.views} views</span>
							</div>
						</div>

						<p className="text-ds-neutral-darkSlate leading-relaxed">
							{selectedProject.description}
						</p>

						<div className="flex flex-wrap gap-2">
							{selectedProject.tags.map((tag, index) => (
								<span
									key={index}
									className="bg-ds-neutral-lightGray/50 text-ds-neutral-darkSlate text-xs px-2 py-2 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>

						{selectedProject.colorPalette &&
							selectedProject.colorPalette.length > 0 && (
								<div>
									<h3 className="font-semibold text-ds-primary-charcoal mb-2 flex items-center space-x-2">
										<Palette className="w-5 h-5 text-ds-primary-sage" />
										<span>Color Palette</span>
									</h3>
									<div className="flex flex-wrap gap-2">
										{selectedProject.colorPalette.map((color, index) => (
											<div key={index} className="flex items-center space-x-2">
												<div
													className="w-8 h-8 rounded-full border border-ds-neutral-lightGray"
													style={{ backgroundColor: color }}
												/>
												<span className="text-sm text-ds-neutral-darkSlate">
													{color}
												</span>
											</div>
										))}
									</div>
								</div>
							)}

						{selectedProject.paintProductsUsed &&
							selectedProject.paintProductsUsed.length > 0 && (
								<div>
									<h3 className="font-semibold text-ds-primary-charcoal mb-2 flex items-center space-x-2">
										<Tag className="w-5 h-5 text-ds-primary-sage" />
										<span>Products Used</span>
									</h3>
									<ul className="list-disc list-inside text-sm text-ds-neutral-darkSlate">
										{selectedProject.paintProductsUsed.map((product, index) => (
											<li key={index}>
												Product ID: {product.productId}, Color ID:{" "}
												{product.colorId}
											</li>
										))}
									</ul>
								</div>
							)}
					</div>

					{/* Actions */}
					<div className="flex items-center justify-between border-t border-ds-neutral-lightGray pt-8">
						<div className="flex items-center space-x-4">
							<button
								onClick={handleLike}
								disabled={voteMutation.isPending}
								className="flex items-center space-x-2 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
								aria-label={`Like this project. Current likes: ${selectedProject.likes}`}
							>
								<ThumbsUp className="w-5 h-5" />
								<span>Like ({selectedProject.likes})</span>
							</button>
							<button
								className="flex items-center space-x-2 px-4 py-2 border border-ds-neutral-lightGray text-ds-primary-charcoal rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
								aria-label={`View comments. Current comments: ${selectedProject.commentsCount}`}
							>
								<MessageCircle className="w-5 h-5" />
								<span>Comment ({selectedProject.commentsCount})</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
