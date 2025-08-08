"use client";

import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
	id: string;
	name: string;
	location: string;
	rating: number;
	comment: string;
	project: string;
	image?: string;
	verified: boolean;
}

export const TestimonialsSection: React.FC = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const testimonials: Testimonial[] = [
		{
			id: "1",
			name: "Sarah Mitchell",
			location: "San Francisco, CA",
			rating: 5,
			comment:
				"The Sage Whisper color transformed our living room completely. The quality is exceptional and the coverage was perfect. Our guests constantly ask about the paint!",
			project: "Living Room Renovation",
			verified: true,
		},
		{
			id: "2",
			name: "Michael Rodriguez",
			location: "Austin, TX",
			rating: 5,
			comment:
				"As a professional contractor, I've used many paint brands. Clare Paint consistently delivers superior results. The color accuracy and durability are unmatched.",
			project: "Commercial Office Project",
			verified: true,
		},
		{
			id: "3",
			name: "Jennifer Chen",
			location: "Seattle, WA",
			rating: 5,
			comment:
				"The zero-VOC formula was perfect for our nursery. Beautiful colors, no odor, and the customer service team was incredibly helpful throughout the process.",
			project: "Nursery Design",
			verified: true,
		},
		{
			id: "4",
			name: "David Thompson",
			location: "Miami, FL",
			rating: 5,
			comment:
				"Exterior paint held up beautifully through hurricane season. The color hasn't faded at all after two years. Definitely worth the investment.",
			project: "Exterior Home Refresh",
			verified: true,
		},
		{
			id: "5",
			name: "Lisa Park",
			location: "Denver, CO",
			rating: 5,
			comment:
				"The color consultation service was amazing. They helped us choose the perfect palette for our open concept home. Every room flows beautifully together.",
			project: "Whole Home Color Design",
			verified: true,
		},
	];

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 6000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, testimonials.length]);

	const nextTestimonial = () => {
		setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		setIsAutoPlaying(false);
	};

	const prevTestimonial = () => {
		setCurrentTestimonial(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length
		);
		setIsAutoPlaying(false);
	};

	const goToTestimonial = (index: number) => {
		setCurrentTestimonial(index);
		setIsAutoPlaying(false);
	};

	const renderStars = (rating: number) => {
		return (
			<div className="flex items-center space-x-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star
						key={star}
						className={cn(
							"w-5 h-5",
							star <= rating
								? "text-yellow-400 fill-current"
								: "text-ds-neutral-lightGray"
						)}
					/>
				))}
			</div>
		);
	};

	return (
		<section className="py-20 bg-ds-primary-cream">
			<div className="max-w-[1200px] mx-auto px-8">
				<div className="text-center mb-16">
					<h2
						className="font-semibold text-ds-primary-charcoal mb-4"
						style={{ fontSize: "36px", fontFamily: "Inter, sans-serif" }}
					>
						What Our Customers Say
					</h2>
					<p
						className="text-ds-neutral-mediumGray max-w-3xl mx-auto"
						style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
					>
						Join thousands of satisfied customers who have transformed their
						spaces with our premium paints. Real stories from real people who
						chose quality.
					</p>
				</div>

				{/* Testimonial Carousel */}
				<div
					className="relative"
					onMouseEnter={() => setIsAutoPlaying(false)}
					onMouseLeave={() => setIsAutoPlaying(true)}
				>
					<div className="bg-ds-neutral-white rounded-2xl shadow-xl overflow-hidden">
						<div className="relative h-[400px]">
							{testimonials.map((testimonial, index) => (
								<div
									key={testimonial.id}
									className={cn(
										"absolute inset-0 transition-all duration-700 ease-in-out",
										index === currentTestimonial
											? "opacity-100 translate-x-0"
											: index < currentTestimonial
											? "opacity-0 -translate-x-full"
											: "opacity-0 translate-x-full"
									)}
								>
									<div className="h-full flex items-center p-12">
										<div className="w-full max-w-4xl mx-auto text-center space-y-6">
											{/* Quote */}
											<div className="relative">
												<Quote className="w-12 h-12 text-ds-primary-sage/20 mx-auto mb-6" />
												<blockquote
													className="text-ds-primary-charcoal leading-relaxed italic"
													style={{
														fontSize: "18px",
														fontFamily: "Inter, sans-serif",
													}}
												>
													{`"${testimonial.comment}"`}
												</blockquote>
											</div>

											{/* Rating */}
											<div className="flex justify-center">
												{renderStars(testimonial.rating)}
											</div>

											{/* Customer Info */}
											<div className="space-y-2">
												<div className="flex items-center justify-center space-x-3">
													<div className="w-12 h-12 bg-ds-primary-sage rounded-full flex items-center justify-center">
														<User className="w-6 h-6 text-ds-neutral-white" />
													</div>
													<div className="text-left">
														<h4 className="font-semibold text-ds-primary-charcoal">
															{testimonial.name}
														</h4>
														<p className="text-sm text-ds-neutral-mediumGray">
															{testimonial.location}
														</p>
													</div>
												</div>
												<p className="text-sm text-ds-primary-sage font-medium">
													{testimonial.project}
												</p>
												{testimonial.verified && (
													<div className="flex items-center justify-center space-x-1 text-green-600">
														<div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
															<span className="text-white text-xs">✓</span>
														</div>
														<span className="text-xs font-medium">
															Verified Purchase
														</span>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center justify-between mt-8">
						<button
							onClick={prevTestimonial}
							className="p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-full hover:border-ds-primary-sage hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-all duration-300 shadow-sm hover:shadow-md"
							aria-label="Previous testimonial"
						>
							<ChevronLeft className="w-6 h-6" />
						</button>

						{/* Slide Indicators */}
						<div className="flex space-x-2">
							{testimonials.map((_, index) => (
								<button
									key={index}
									onClick={() => goToTestimonial(index)}
									className={cn(
										"w-3 h-3 rounded-full transition-all duration-300",
										currentTestimonial === index
											? "bg-ds-primary-sage scale-125"
											: "bg-ds-neutral-lightGray hover:bg-ds-primary-sage/50"
									)}
									aria-label={`Go to testimonial ${index + 1}`}
								/>
							))}
						</div>

						<button
							onClick={nextTestimonial}
							className="p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-full hover:border-ds-primary-sage hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-all duration-300 shadow-sm hover:shadow-md"
							aria-label="Next testimonial"
						>
							<ChevronRight className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Overall Rating */}
				<div className="text-center mt-16 p-8 bg-ds-neutral-white/10 rounded-2xl border border-ds-neutral-white/20">
					<div className="flex items-center justify-center space-x-4 mb-4">
						<div className="flex items-center space-x-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className="w-6 h-6 text-yellow-400 fill-current"
								/>
							))}
						</div>
						<span className="text-2xl font-bold text-ds-neutral-white">
							4.9
						</span>
					</div>
					<p className="text-ds-neutral-white/90">
						Based on 12,000+ verified customer reviews
					</p>
					<p className="text-sm text-ds-neutral-white/70 mt-2">
						98% of customers would recommend us to friends and family
					</p>
				</div>
			</div>
		</section>
	);
};
