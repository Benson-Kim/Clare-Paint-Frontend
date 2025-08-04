"use client";

import React, { lazy, Suspense, useState } from "react";
import { HeroSection } from "@/components/gallery/HeroSection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SocialFeed } from "@/components/gallery/SocialFeed";
import { ContestSection } from "@/components/gallery/ContestSection";
import { FeaturedStories } from "@/components/gallery/FeaturedStories";
import { useGalleryStore } from "@/store/gallery-store";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy load modals for performance
const LazyProjectSubmissionModal = lazy(() =>
	import("@/components/gallery/ProjectSubmissionModal").then((module) => ({
		default: module.ProjectSubmissionModal,
	}))
);
const LazyProjectDetailModal = lazy(() =>
	import("@/components/gallery/ProjectDetailModal").then((module) => ({
		default: module.ProjectDetailModal,
	}))
);

export default function CustomerGalleryPage() {
	const {
		isSubmissionModalOpen,
		isProjectDetailModalOpen,
		openSubmissionModal,
	} = useGalleryStore();
	const [galleryFilter, setGalleryFilter] = useState<string | undefined>(
		undefined
	);
	const [gallerySortBy, setGallerySortBy] = useState<"newest" | "popular">(
		"newest"
	);

	return (
		<div className="min-h-screen bg-ds-neutral-white">
			<HeroSection />

			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20 space-y-20">
				{/* Gallery Controls */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					<h2 className="text-2xl font-bold text-ds-primary-charcoal">
						Community Projects
					</h2>
					<div className="flex items-center space-x-4">
						<select
							value={galleryFilter || "all"}
							onChange={(e) =>
								setGalleryFilter(
									e.target.value === "all" ? undefined : e.target.value
								)
							}
							className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-label="Filter gallery projects"
						>
							<option value="all">All Projects</option>
							<option value="residential">Residential</option>
							<option value="commercial">Commercial</option>
							<option value="before-after">Before & After</option>
						</select>
						<select
							value={gallerySortBy}
							onChange={(e) =>
								setGallerySortBy(e.target.value as "newest" | "popular")
							}
							className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-label="Sort gallery projects"
						>
							<option value="newest">Newest</option>
							<option value="popular">Most Popular</option>
						</select>
						<button
							onClick={openSubmissionModal}
							className="flex items-center space-x-2 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
							aria-label="Submit your project"
						>
							<Plus className="w-4 h-4" />
							<span>Submit</span>
						</button>
					</div>
				</div>

				<GalleryGrid filter={galleryFilter} sortBy={gallerySortBy} />
				<SocialFeed />
				<ContestSection />
				<FeaturedStories />
			</div>

			{isSubmissionModalOpen && (
				<Suspense
					fallback={
						<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
							<Loader2 className="w-12 h-12 animate-spin text-ds-neutral-white" />
						</div>
					}
				>
					<LazyProjectSubmissionModal />
				</Suspense>
			)}

			{isProjectDetailModalOpen && (
				<Suspense
					fallback={
						<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
							<Loader2 className="w-12 h-12 animate-spin text-ds-neutral-white" />
						</div>
					}
				>
					<LazyProjectDetailModal />
				</Suspense>
			)}
		</div>
	);
}
