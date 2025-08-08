"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Palette, Award, Shield } from "lucide-react";
import Image from "next/image";

export const HeroSection: React.FC = () => {
	return (
		<section className="relative min-h-screen bg-ds-primary-sage text-ds-neutral-white overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-gradient-to-br from-transparent via-ds-neutral-white/5 to-ds-neutral-white/10" />
			</div>

			<div className="relative max-w-[1200px] mx-auto px-8 py-20 min-h-screen flex items-center">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center w-full">
					{/* Text Content - 60% */}
					<div className="lg:col-span-3 space-y-8">
						<div className="space-y-6">
							<div className="flex items-center space-x-3">
								<Palette className="w-8 h-8 text-ds-accent-warmBeige" />
								<span className="text-ds-accent-warmBeige font-semibold text-lg tracking-wide">
									PREMIUM PAINT COLLECTION
								</span>
							</div>

							<h1
								className="font-bold leading-tight text-ds-neutral-white"
								style={{ fontSize: "48px", fontFamily: "Inter, sans-serif" }}
							>
								Where Artistry Meets Innovation
							</h1>

							<p
								className="text-ds-neutral-white/90 leading-relaxed max-w-2xl"
								style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
							>
								Transform your space with our premium paint collection.
								Sophisticated colors, superior quality, and expert curation for
								the modern home. Every shade tells a story, every finish creates
								an experience.
							</p>
						</div>

						{/* CTAs */}
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href="/products"
								className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg hover:bg-ds-accent-warmBeige/90 transition-all duration-300 font-semibold text-lg group hover:scale-105 active:scale-95"
								style={{ fontFamily: "Inter, sans-serif" }}
							>
								<span>Shop Paint Colors</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
							</Link>

							<Link
								href="/consultation"
								className="inline-flex items-center justify-center space-x-3 px-8 py-4 border-2 border-ds-neutral-white text-ds-neutral-white rounded-lg hover:bg-ds-neutral-white hover:text-ds-primary-sage transition-all duration-300 font-semibold text-lg group"
								style={{ fontFamily: "Inter, sans-serif" }}
							>
								<span>Get Color Consultation</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
							</Link>
						</div>

						{/* Trust Signals */}
						<div className="flex items-center space-x-8 pt-8">
							<div className="flex items-center space-x-2">
								<Award className="w-5 h-5 text-ds-accent-warmBeige" />
								<span className="text-sm text-ds-neutral-white/80">
									Award Winning
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<Shield className="w-5 h-5 text-ds-accent-warmBeige" />
								<span className="text-sm text-ds-neutral-white/80">
									Zero-VOC Formula
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<span className="text-sm text-ds-neutral-white/80">
									50,000+ Happy Customers
								</span>
							</div>
						</div>
					</div>

					{/* Hero Image - 40% */}
					<div className="lg:col-span-2">
						<div className="relative">
							<div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
								<Image
									src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
									alt="Beautiful painted room showcasing our premium paint quality"
									fill
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
							</div>

							{/* Floating Elements */}
							<div className="absolute -top-4 -right-4 w-24 h-24 bg-ds-accent-warmBeige rounded-full flex items-center justify-center shadow-xl">
								<span className="text-ds-neutral-white font-bold text-sm">
									4.9★
								</span>
							</div>

							<div className="absolute -bottom-4 -left-4 bg-ds-neutral-white text-ds-primary-charcoal px-6 py-4 rounded-xl shadow-xl">
								<p className="text-sm font-semibold">Premium Quality</p>
								<p className="text-xs text-ds-neutral-mediumGray">
									Zero-VOC Formula
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-ds-neutral-white/50 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-ds-neutral-white/50 rounded-full mt-2 animate-pulse" />
				</div>
			</div>
		</section>
	);
};
