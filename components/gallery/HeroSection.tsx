"use client";

import React from "react";
import { Paintbrush, Camera, Users, Sparkles, ArrowRight } from "lucide-react";
import { useGalleryStore } from "@/store/gallery-store";

export const HeroSection: React.FC = () => {
	const { openSubmissionModal } = useGalleryStore();

	return (
		<div className="relative bg-gradient-to-r from-ds-primary-charcoal to-ds-neutral-darkSlate text-ds-neutral-white overflow-hidden">
			<div className="absolute inset-0 bg-black/30" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
						Your Creations, Our Inspiration
					</h1>
					<p className="text-xl text-ds-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
						Welcome to our Customer Gallery! Explore stunning transformations,
						get inspired by fellow DIYers and professionals, and share your own
						paint projects with our vibrant community.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Paintbrush className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Inspiring Projects</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Browse hundreds of real-life paint transformations.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Camera className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Share Your Work</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Upload your before & after photos and project details.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Users className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Join the Community</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Like, comment, and connect with other paint enthusiasts.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Sparkles className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Win Prizes</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Participate in contests and get your project featured.
						</p>
					</div>
				</div>

				<div className="text-center mt-20">
					<button
						onClick={openSubmissionModal}
						className="inline-flex items-center space-x-4 px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200"
						aria-label="Submit your project to the gallery"
					>
						<span>Submit Your Project</span>
						<ArrowRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};
