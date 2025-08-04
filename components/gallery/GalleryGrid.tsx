"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockFetchGalleryProjects, mockVoteProject } from "@/lib/api";
import { GalleryProject } from "@/types/gallery";
import {
	Heart,
	Eye,
	MessageCircle,
	Loader2,
	Image,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGalleryStore } from "@/store/gallery-store";

interface GalleryGridProps {
	filter?: string; // e.g., 'residential', 'commercial', 'before-after'
	sortBy?: "newest" | "popular";
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
	filter,
	sortBy = "newest",
}) => {
	const queryClient = useQueryClient();
	const { openProjectDetailModal } = useGalleryStore();

	const {
		data: projects,
		isLoading,
		isError,
		error,
	} = useQuery<GalleryProject[], Error>({
		queryKey: ["galleryProjects", filter, sortBy],
		queryFn: async () => {
			const fetchedProjects = await mockFetchGalleryProjects();
			let filtered = fetchedProjects;

			if (filter) {
				filtered = filtered.filter((project) => project.tags.includes(filter));
			}

			if (sortBy === "newest") {
				filtered.sort(
					(a, b) =>
						new Date(b.submissionDate).getTime() -
						new Date(a.submissionDate).getTime()
				);
			} else if (sortBy === "popular") {
				filtered.sort((a, b) => b.likes - a.likes);
			}
			return filtered;
		},
	});

	const voteMutation = useMutation({
		mutationFn: mockVoteProject,
		onMutate: async (projectId) => {
			// Optimistically update the cache
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
			// Rollback on error
			queryClient.setQueryData(["galleryProjects"], context?.previousProjects);
			console.error("Failed to vote:", err);
		},
		onSettled: () => {
			// Invalidate to refetch and ensure consistency
			queryClient.invalidateQueries({ queryKey: ["galleryProjects"] });
		},
	});

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="bg-ds-neutral-lightGray/20 rounded-lg h-80" />
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg">
				<p className="mb-4">Error loading gallery projects: {error?.message}</p>
				<button
					onClick={() =>
						queryClient.invalidateQueries({ queryKey: ["galleryProjects"] })
					}
					className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
				>
					Try Again
				</button>
			</div>
		);
	}

	if (!projects || projects.length === 0) {
		return (
			<div className="text-center p-8 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
				<Image className="w-16 h-16 text-ds-neutral-mediumGray mx-auto mb-4" />
				<p className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					No projects found.
				</p>
				<p className="text-ds-neutral-mediumGray">
					Be the first to submit a project!
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{projects.map((project) => (
				<div
					key={project.id}
					className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-200"
					onClick={() => openProjectDetailModal(project)}
					aria-label={`View project: ${project.title} by ${project.userName}`}
				>
					<div className="relative aspect-square overflow-hidden">
						<img
							src={project.afterImageUrl}
							alt={`After: ${project.title}`}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							loading="lazy"
						/>
						{project.beforeImageUrl && (
							<div className="absolute top-4 left-4 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold px-2 py-2 rounded-full">
								Before/After
							</div>
						)}
					</div>
					<div className="p-4">
						<h3 className="font-semibold text-ds-primary-charcoal mb-2 line-clamp-2">
							{project.title}
						</h3>
						<p className="text-sm text-ds-neutral-mediumGray mb-4">
							by {project.userName}
						</p>
						<div className="flex items-center justify-between text-sm text-ds-neutral-mediumGray">
							<div className="flex items-center space-x-2">
								<Heart className="w-4 h-4 text-red-500" />
								<span>{project.likes}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Eye className="w-4 h-4" />
								<span>{project.views}</span>
							</div>
							<div className="flex items-center space-x-2">
								<MessageCircle className="w-4 h-4" />
								<span>{project.commentsCount}</span>
							</div>
						</div>
						<div className="mt-4 flex flex-wrap gap-2">
							{project.tags.map((tag, index) => (
								<span
									key={index}
									className="bg-ds-neutral-lightGray/50 text-ds-neutral-darkSlate text-xs px-2 py-2 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
