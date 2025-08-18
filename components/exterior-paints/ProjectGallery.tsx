"use client";

import React, { useState } from "react";
import {
	X,
	Image as IconImage,
	ChevronLeft,
	ChevronRight,
	Download,
	Share2,
} from "lucide-react";
import { BeforeAfterImage } from "@/types/product";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectGalleryProps {
	images: BeforeAfterImage[];
	onClose: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
	images,
	onClose,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const currentImage = images[currentIndex];

	if (!currentImage) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="gallery-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
					<div className="flex items-center space-x-2">
						<IconImage className="w-6 h-6 text-ds-primary-sage" />
						<h2
							id="gallery-title"
							className="text-2xl font-bold text-ds-primary-charcoal"
						>
							Project Gallery
						</h2>
					</div>
					<div className="flex items-center space-x-2">
						<button
							className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal transition-colors duration-200"
							aria-label="Download image"
						>
							<Download className="w-5 h-5" />
						</button>
						<button
							className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal transition-colors duration-200"
							aria-label="Share image"
						>
							<Share2 className="w-5 h-5" />
						</button>
						<button
							onClick={onClose}
							className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
							aria-label="Close gallery"
						>
							<X className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Image Content */}
				<div className="flex-1 flex flex-col md:flex-row items-center justify-center p-8 relative">
					<div className="flex-1 flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
						{/* Before Image */}
						<div className="relative w-full md:w-1/2 aspect-video overflow-hidden rounded-lg shadow-md">
							<Image
								src={currentImage.before}
								alt={`Before: ${currentImage.description || "Project image"}`}
								fill
								className="object-cover"
								loading="lazy"
							/>
							<span className="absolute top-4 left-4 bg-ds-primary-charcoal text-ds-neutral-white text-xs font-bold px-2 py-2 rounded-full">
								BEFORE
							</span>
						</div>
						{/* After Image */}
						<div className="relative w-full md:w-1/2 aspect-video overflow-hidden rounded-lg shadow-md">
							<Image
								src={currentImage.after}
								alt={`After: ${currentImage.description || "Project image"}`}
								fill
								className="object-cover"
								loading="lazy"
							/>
							<span className="absolute top-4 left-4 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold px-2 py-2 rounded-full">
								AFTER
							</span>
						</div>
					</div>

					{/* Navigation Arrows */}
					{images.length > 1 && (
						<>
							<button
								onClick={prevImage}
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-ds-neutral-white/80 hover:bg-ds-neutral-white p-2 rounded-full shadow-lg transition-colors duration-200 hidden md:block"
								aria-label="Previous image"
							>
								<ChevronLeft className="w-6 h-6 text-ds-primary-charcoal" />
							</button>
							<button
								onClick={nextImage}
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-ds-neutral-white/80 hover:bg-ds-neutral-white p-2 rounded-full shadow-lg transition-colors duration-200 hidden md:block"
								aria-label="Next image"
							>
								<ChevronRight className="w-6 h-6 text-ds-primary-charcoal" />
							</button>
						</>
					)}
				</div>

				{/* Image Description and Thumbnails */}
				<div className="p-8 border-t border-ds-neutral-lightGray">
					{currentImage.description && (
						<p className="text-ds-neutral-darkSlate text-center mb-4">
							{currentImage.description}
						</p>
					)}
					<div className="flex justify-center space-x-2">
						{images.map((img, index) => (
							<button
								key={img.id}
								onClick={() => setCurrentIndex(index)}
								className={cn(
									"w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
									index === currentIndex
										? "border-ds-primary-sage ring-2 ring-ds-primary-sage/20"
										: "border-ds-neutral-lightGray hover:border-ds-neutral-mediumGray"
								)}
								aria-label={`View project image ${index + 1}`}
							>
								<Image
									src={img.after}
									alt={`Thumbnail for ${img.description || "project image"}`}
									fill
									className="object-cover"
									loading="lazy"
								/>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
