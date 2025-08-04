"use client";

import React from "react";
import { Star, MessageSquare, Users, Award, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReviewsStore } from "@/store/reviews-store";

export const HeroSection: React.FC = () => {
	const { openReviewModal } = useReviewsStore();

	return (
		<div className="relative bg-gradient-to-r from-ds-primary-sage to-ds-primary-charcoal text-ds-neutral-white overflow-hidden">
			<div className="absolute inset-0 bg-black/30" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
						Hear From Our Happy Customers
					</h1>
					<p className="text-xl text-ds-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
						Discover authentic experiences and see real-life transformations.
						Your satisfaction is our greatest achievement.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Star className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Authentic Reviews</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Read honest feedback from verified buyers.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<MessageSquare className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Share Your Story</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Submit your own review and photos.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Users className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">
							Professional Endorsements
						</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							See what industry experts say about our products.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Award className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">
							Detailed Case Studies
						</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Explore in-depth success stories.
						</p>
					</div>
				</div>

				<div className="text-center mt-20">
					<button
						onClick={openReviewModal}
						className="inline-flex items-center space-x-4 px-8 py-4 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-accent-warmBeige/90 transition-colors duration-200"
						aria-label="Write a review"
					>
						<span>Write a Review</span>
						<ArrowRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};
