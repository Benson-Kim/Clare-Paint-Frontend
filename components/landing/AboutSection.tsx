"use client";

import React from "react";
import { Palette, Award, Users, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AboutSection: React.FC = () => {
	const stats = [
		{ icon: Users, label: "Happy Customers", value: "50,000+" },
		{ icon: Palette, label: "Color Options", value: "2,000+" },
		{ icon: Award, label: "Industry Awards", value: "15+" },
		{ icon: Sparkles, label: "Years of Excellence", value: "25+" },
	];

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-[1200px] mx-auto px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Content */}
					<div className="space-y-8">
						<div className="space-y-6">
							<div className="flex items-center space-x-3">
								<div className="w-12 h-12 bg-ds-primary-sage/10 rounded-full flex items-center justify-center">
									<Palette className="w-6 h-6 text-ds-primary-sage" />
								</div>
								<span className="text-ds-primary-sage font-semibold text-lg tracking-wide">
									OUR STORY
								</span>
							</div>

							<h2
								className="font-semibold text-ds-primary-charcoal leading-tight"
								style={{ fontSize: "36px", fontFamily: "Inter, sans-serif" }}
							>
								Crafting Colors That Transform Spaces
							</h2>

							<div
								className="space-y-4 text-ds-neutral-mediumGray"
								style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
							>
								<p className="leading-relaxed">
									For over two decades, we&apos;ve been passionate about
									creating paints that don&apos;t just cover walls—they
									transform spaces and inspire lives. Our journey began with a
									simple belief: every home deserves colors that reflect its
									unique personality.
								</p>
								<p className="leading-relaxed">
									Today, we&apos;re proud to offer a curated collection of
									premium paints, each formulated with the finest ingredients
									and tested by professionals. From our zero-VOC formulas to our
									innovative color-matching technology, we&apos;re committed to
									excellence in every drop.
								</p>
							</div>
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-2 gap-6">
							{stats.map((stat, index) => (
								<div
									key={index}
									className="text-center p-6 bg-ds-primary-cream/30 rounded-lg"
								>
									<div className="w-12 h-12 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-3">
										<stat.icon className="w-6 h-6 text-ds-primary-sage" />
									</div>
									<div className="text-2xl font-bold text-ds-primary-charcoal mb-1">
										{stat.value}
									</div>
									<div className="text-sm text-ds-neutral-mediumGray">
										{stat.label}
									</div>
								</div>
							))}
						</div>

						{/* CTA */}
						<div className="pt-4">
							<Link
								href="/about"
								className="inline-flex items-center space-x-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-300 font-semibold"
							>
								<span>Learn More About Our Story</span>
								<ArrowRight className="w-5 h-5" />
							</Link>
						</div>
					</div>

					{/* Image */}
					<div className="relative">
						<div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
							<Image
								src="https://images.pexels.com/photos/6782367/pexels-photo-6782367.jpeg?auto=compress&cs=tinysrgb&w=800"
								alt="Paint manufacturing process showing our commitment to quality"
								fill
								className="object-cover"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
						</div>

						{/* Floating Quality Badge */}
						<div className="absolute top-6 right-6 bg-ds-neutral-white text-ds-primary-charcoal px-4 py-3 rounded-xl shadow-lg">
							<div className="flex items-center space-x-2">
								<Award className="w-5 h-5 text-ds-accent-warmBeige" />
								<div>
									<p className="text-sm font-bold">Premium Quality</p>
									<p className="text-xs text-ds-neutral-mediumGray">
										Since 1999
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
