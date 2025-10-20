"use client";

import React from "react";
import { Palette, Lightbulb, Sparkles, ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
	return (
		<div className="relative bg-gradient-to-r from-ds-primary-sage to-ds-primary-charcoal text-ds-neutral-white overflow-hidden">
			<div className="absolute inset-0 bg-black/30" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
						Unlock Your Perfect Palette
					</h1>
					<p className="text-xl text-ds-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
						Transform your space with confidence. Our expert color consultants
						provide personalized guidance to bring your vision to life,
						virtually or in your home.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Palette className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">
							Personalized Palettes
						</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Custom color schemes tailored to your style and space.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Lightbulb className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							Professional advice on lighting, finishes, and paint types.
						</p>
					</div>
					<div className="text-center group p-4 rounded-lg bg-ds-neutral-white/10 hover:bg-ds-neutral-white/20 transition-colors duration-200">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
							<Sparkles className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h3 className="text-lg font-semibold mb-2">Seamless Execution</h3>
						<p className="text-ds-neutral-white/80 text-sm">
							From concept to completion, we support your painting project.
						</p>
					</div>
				</div>

				<div className="text-center mt-20">
					<a
						href="#packages"
						className="inline-flex items-center space-x-4 px-8 py-4 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-accent-warmBeige/90 transition-colors duration-200"
						aria-label="Explore consultation packages"
					>
						<span>Explore Packages</span>
						<ArrowRight className="w-5 h-5" />
					</a>
				</div>
			</div>
		</div>
	);
};
