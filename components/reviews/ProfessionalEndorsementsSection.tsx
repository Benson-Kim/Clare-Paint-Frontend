"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchProfessionalEndorsements } from "@/lib/api";
import { ProfessionalEndorsement } from "@/types/reviews";
import { Quote, Award, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const ProfessionalEndorsementsSection: React.FC = () => {
	const {
		data: endorsements,
		isLoading,
		isError,
		error,
	} = useQuery<ProfessionalEndorsement[], Error>({
		queryKey: ["professionalEndorsements"],
		queryFn: mockFetchProfessionalEndorsements,
	});

	if (isLoading) {
		return (
			<section className="py-20 bg-ds-primary-cream">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
						Professional Endorsements
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
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
						Professional Endorsements
					</h2>
					<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg">
						<p className="mb-4">
							Failed to load endorsements: {error?.message}
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

	if (!endorsements || endorsements.length === 0) {
		return (
			<section className="py-20 bg-ds-primary-cream">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-8">
						Professional Endorsements
					</h2>
					<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
						<Award className="w-16 h-16 text-ds-neutral-mediumGray mx-auto mb-4" />
						<p className="text-lg font-semibold text-ds-primary-charcoal mb-4">
							No professional endorsements yet.
						</p>
						<p className="text-ds-neutral-mediumGray">
							Check back soon for expert opinions!
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-ds-primary-cream">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
					Professional Endorsements
				</h2>
				<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto mb-20">
					Our products are trusted and recommended by leading professionals in
					the industry.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{endorsements.map((endorsement) => (
						<div
							key={endorsement.id}
							className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8 text-center flex flex-col items-center"
						>
							<Image
								src={endorsement.photoUrl}
								alt={endorsement.professionalName}
								className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-ds-primary-sage"
								loading="lazy"
							/>
							<h3 className="font-bold text-ds-primary-charcoal text-lg">
								{endorsement.professionalName}
							</h3>
							<p className="text-sm text-ds-neutral-mediumGray mb-2">
								{endorsement.title}, {endorsement.company}
							</p>
							<p className="text-ds-neutral-darkSlate italic mb-4 flex-1">
								<Quote className="w-5 h-5 inline-block mr-2 text-ds-primary-sage" />
								{endorsement.quote}
							</p>
							<span className="text-xs text-ds-neutral-mediumGray mt-auto">
								{endorsement.date}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
