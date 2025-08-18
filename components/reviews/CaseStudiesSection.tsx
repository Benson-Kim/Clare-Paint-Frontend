"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchCaseStudies } from "@/lib/api";
import { CaseStudy } from "@/types/reviews";
import {
	Briefcase,
	Lightbulb,
	ArrowRight,
	Loader2,
	AlertCircle,
	Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const CaseStudiesSection: React.FC = () => {
	const {
		data: caseStudies,
		isLoading,
		isError,
		error,
	} = useQuery<CaseStudy[], Error>({
		queryKey: ["caseStudies"],
		queryFn: mockFetchCaseStudies,
	});

	if (isLoading) {
		return (
			<section className="py-20 bg-ds-neutral-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
						Detailed Case Studies
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
						{[...Array(2)].map((_, i) => (
							<div
								key={i}
								className="bg-ds-neutral-lightGray/20 rounded-lg h-80"
							/>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section className="py-20 bg-ds-neutral-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-8">
						Detailed Case Studies
					</h2>
					<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg">
						<p className="mb-4">
							Failed to load case studies: {error?.message}
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

	if (!caseStudies || caseStudies.length === 0) {
		return (
			<section className="py-20 bg-ds-neutral-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-8">
						Detailed Case Studies
					</h2>
					<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
						<Briefcase className="w-16 h-16 text-ds-neutral-mediumGray mx-auto mb-4" />
						<p className="text-lg font-semibold text-ds-primary-charcoal mb-4">
							No case studies available yet.
						</p>
						<p className="text-ds-neutral-mediumGray">
							Check back soon for inspiring project insights!
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
					Detailed Case Studies
				</h2>
				<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto mb-20">
					Explore in-depth stories of how our products and expertise solved
					real-world challenges for our clients.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{caseStudies.map((study) => (
						<div
							key={study.id}
							className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden flex flex-col"
						>
							<div className="relative h-64 overflow-hidden">
								<Image
									src={study.imageUrl}
									alt={study.title}
									fill
									className="object-cover"
									loading="lazy"
								/>
							</div>
							<div className="p-8 flex-1 flex flex-col">
								<h3 className="font-bold text-ds-primary-charcoal text-xl mb-2 line-clamp-2">
									{study.title}
								</h3>
								<p className="text-sm text-ds-neutral-mediumGray mb-4">
									Client: {study.clientName} | Industry: {study.industry}
								</p>
								<div className="space-y-2 text-sm text-ds-neutral-darkSlate flex-1">
									<p className="flex items-start space-x-2">
										<Lightbulb className="w-4 h-4 text-ds-primary-sage flex-shrink-0 mt-2" />
										<span>
											<span className="font-semibold">Problem:</span>{" "}
											{study.problem}
										</span>
									</p>
									<p className="flex items-start space-x-2">
										<Briefcase className="w-4 h-4 text-ds-primary-sage flex-shrink-0 mt-2" />
										<span>
											<span className="font-semibold">Solution:</span>{" "}
											{study.solution}
										</span>
									</p>
									<p className="flex items-start space-x-2">
										<Award className="w-4 h-4 text-ds-primary-sage flex-shrink-0 mt-2" />
										<span>
											<span className="font-semibold">Results:</span>{" "}
											{study.results}
										</span>
									</p>
								</div>
								{study.fullStoryLink && (
									<a
										href={study.fullStoryLink}
										className="inline-flex items-center space-x-2 px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-semibold mt-4"
										aria-label={`Read full story of ${study.title}`}
									>
										<span>Read Full Story</span>
										<ArrowRight className="w-5 h-5" />
									</a>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
