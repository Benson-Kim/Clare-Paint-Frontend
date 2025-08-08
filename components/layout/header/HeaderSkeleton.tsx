"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeaderSkeletonProps {
	className?: string;
}

export const HeaderSkeleton: React.FC<HeaderSkeletonProps> = ({
	className,
}) => {
	return (
		<header
			className={cn(
				"bg-ds-neutral-white border-b border-ds-neutral-lightGray",
				className
			)}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo Skeleton */}
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-ds-neutral-lightGray rounded-lg animate-pulse" />
						<div className="hidden sm:block space-y-1">
							<div className="w-32 h-6 bg-ds-neutral-lightGray rounded animate-pulse" />
							<div className="w-24 h-3 bg-ds-neutral-lightGray rounded animate-pulse" />
						</div>
					</div>

					{/* Navigation Skeleton */}
					<div className="hidden lg:flex items-center space-x-8">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="w-16 h-4 bg-ds-neutral-lightGray rounded animate-pulse"
							/>
						))}
					</div>

					{/* Utility Navigation Skeleton */}
					<div className="flex items-center space-x-2">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="w-10 h-10 bg-ds-neutral-lightGray rounded-lg animate-pulse"
							/>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};
