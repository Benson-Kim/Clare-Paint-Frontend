"use client";

import React, { useState, useRef, lazy, Suspense } from "react";
import {
	Building2,
	Users,
	TrendingUp,
	Clock,
	CheckCircle,
	Star,
	Calculator,
	FileText,
	Truck,
	Award,
	ArrowRight,
	User,
	Loader2,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Lazy load components for better performance
const LazyTradeRegistrationForm = lazy(() =>
	import("@/components/trade/TradeRegistrationForm").then((module) => ({
		default: module.TradeRegistrationForm,
	}))
);
const LazyDiscountTierDisplay = lazy(() =>
	import("@/components/trade/DiscountTierDisplay").then((module) => ({
		default: module.DiscountTierDisplay,
	}))
);
const LazyProjectManagementTools = lazy(() =>
	import("@/components/trade/ProjectManagementTools").then((module) => ({
		default: module.ProjectManagementTools,
	}))
);
const LazyBulkOrderingInterface = lazy(() =>
	import("@/components/trade/BulkOrderingInterface").then((module) => ({
		default: module.BulkOrderingInterface,
	}))
);
const LazyTradeProductRecommendations = lazy(() =>
	import("@/components/trade/TradeProductRecommendations").then((module) => ({
		default: module.TradeProductRecommendations,
	}))
);
const LazyTradeSupportContact = lazy(() =>
	import("@/components/trade/TradeSupportContact").then((module) => ({
		default: module.TradeSupportContact,
	}))
);

export default function TradeProgramPage() {
	const [activeSection, setActiveSection] = useState<
		"overview" | "register" | "benefits" | "tools"
	>("overview");
	const [isRegistered, setIsRegistered] = useState(false);
	const [loadingSection, setLoadingSection] = useState<string | null>(null);

	// Refs for scrolling to sections
	const overviewRef = useRef<HTMLDivElement>(null);
	const registerRef = useRef<HTMLDivElement>(null);
	const benefitsRef = useRef<HTMLDivElement>(null);
	const toolsRef = useRef<HTMLDivElement>(null);

	const benefits = [
		{
			icon: <TrendingUp className="w-8 h-8" />,
			title: "Volume Discounts",
			description: "Save up to 25% on bulk orders with tiered pricing",
			details: [
				"5-10% on orders $5,000+",
				"15% on orders $25,000+",
				"25% on orders $200,000+",
			],
		},
		{
			icon: <Clock className="w-8 h-8" />,
			title: "Priority Service",
			description: "Expedited processing and dedicated support",
			details: [
				"24-hour order processing",
				"Dedicated account manager",
				"Priority customer service",
			],
		},
		{
			icon: <Truck className="w-8 h-8" />,
			title: "Free Delivery",
			description: "Complimentary delivery on qualifying orders",
			details: [
				"Free delivery on $1,000+ orders",
				"Scheduled delivery windows",
				"Job site delivery available",
			],
		},
		{
			icon: <FileText className="w-8 h-8" />,
			title: "Invoice Management",
			description: "Streamlined billing and payment terms",
			details: [
				"Net 30 payment terms",
				"Digital invoicing",
				"Purchase order integration",
			],
		},
		{
			icon: <Calculator className="w-8 h-8" />,
			title: "Project Tools",
			description: "Professional estimation and planning tools",
			details: [
				"Advanced paint calculator",
				"Project timeline planning",
				"Material tracking",
			],
		},
		{
			icon: <Award className="w-8 h-8" />,
			title: "Exclusive Products",
			description: "Access to contractor-only formulations",
			details: [
				"Professional-grade paints",
				"Bulk packaging options",
				"Custom color matching",
			],
		},
	];

	const testimonials = [
		{
			name: "Mike Rodriguez",
			company: "Rodriguez Painting Contractors",
			rating: 5,
			comment:
				"The trade program has transformed our business. The volume discounts and dedicated support make every project more profitable.",
			projects: "150+ completed",
			savings: "$15,000 annually",
		},
		{
			name: "Sarah Chen",
			company: "Elite Interior Solutions",
			rating: 5,
			comment:
				"Project management tools and bulk ordering save us hours every week. The quality is consistently excellent.",
			projects: "200+ completed",
			savings: "$22,000 annually",
		},
		{
			name: "David Thompson",
			company: "Thompson Construction",
			rating: 5,
			comment:
				"Net 30 terms and job site delivery have improved our cash flow significantly. Highly recommend to any contractor.",
			projects: "300+ completed",
			savings: "$35,000 annually",
		},
	];

	const stats = [
		{
			label: "Active Contractors",
			value: "2,500+",
			icon: <Users className="w-6 h-6" />,
		},
		{
			label: "Projects Completed",
			value: "50,000+",
			icon: <Building2 className="w-6 h-6" />,
		},
		{
			label: "Average Savings",
			value: "18%",
			icon: <TrendingUp className="w-6 h-6" />,
		},
		{
			label: "Customer Satisfaction",
			value: "98%",
			icon: <Star className="w-6 h-6" />,
		},
	];

	const scrollToSection = (section: string) => {
		setLoadingSection(section);

		// Small delay to show loading state
		setTimeout(() => {
			let targetRef;
			switch (section) {
				case "overview":
					targetRef = overviewRef;
					break;
				case "register":
					targetRef = registerRef;
					break;
				case "benefits":
					targetRef = benefitsRef;
					break;
				case "tools":
					targetRef = toolsRef;
					break;
				default:
					targetRef = overviewRef;
			}

			if (targetRef?.current) {
				targetRef.current.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}

			setActiveSection(
				section as "overview" | "register" | "benefits" | "tools"
			);
			setLoadingSection(null);
		}, 300);
	};

	const handleApplyClick = () => {
		scrollToSection("register");
	};

	const handleLearnMoreClick = () => {
		scrollToSection("benefits");
	};

	const handleStartSavingClick = () => {
		scrollToSection("register");
	};

	// <PageLayout>
	return (
		<div className="min-h-screen bg-ds-neutral-white">
			{/* Hero Section */}
			<div className="relative bg-gradient-to-r from-ds-primary-charcoal to-ds-neutral-darkSlate text-ds-neutral-white overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
						<div>
							<div className="flex items-center space-x-4 mb-4">
								<Building2 className="w-8 h-8 text-ds-primary-sage" />
								<span className="text-ds-primary-sage font-semibold">
									Professional Trade Program
								</span>
							</div>
							<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
								Elevate Your Business with Professional Benefits
							</h1>
							<p className="text-xl text-ds-neutral-white/90 mb-8 leading-relaxed">
								Join thousands of contractors who trust our premium paints and
								exclusive trade benefits. Save money, streamline operations, and
								deliver exceptional results.
							</p>

							<div className="flex flex-col sm:flex-row gap-4">
								<button
									onClick={handleApplyClick}
									disabled={loadingSection === "register"}
									className="px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
									aria-label="Apply for trade program"
								>
									{loadingSection === "register" ? (
										<Loader2 className="w-5 h-5 animate-spin" />
									) : (
										<>
											<span>Apply Now</span>
											<ArrowRight className="w-5 h-5" />
										</>
									)}
								</button>
								<button
									onClick={handleLearnMoreClick}
									disabled={loadingSection === "benefits"}
									className="px-8 py-4 border-2 border-ds-neutral-white text-ds-neutral-white rounded-lg hover:bg-ds-neutral-white hover:text-ds-primary-charcoal transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
									aria-label="Learn about trade benefits"
								>
									{loadingSection === "benefits" ? (
										<Loader2 className="w-5 h-5 animate-spin" />
									) : (
										<span>Learn More</span>
									)}
								</button>
							</div>
						</div>

						<div className="relative">
							<div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl">
								<Image
									src="https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800"
									alt="Professional contractor painting"
									fill
									className="object-cover"
									loading="lazy"
								/>
							</div>

							<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
						</div>
					</div>
				</div>
			</div>

			{/* Stats Section */}
			<div className="bg-ds-primary-cream/30 border-b border-ds-accent-warmBeige/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div key={index} className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-primary-sage/10 rounded-full mb-4">
									<div className="text-ds-primary-sage">{stat.icon}</div>
								</div>
								<div className="text-3xl font-bold text-ds-primary-charcoal mb-2">
									{stat.value}
								</div>
								<div className="text-ds-neutral-mediumGray font-medium">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="bg-ds-neutral-white border-b border-ds-neutral-lightGray">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
					<nav className="flex space-x-8 overflow-x-auto" role="tablist">
						{[
							{
								id: "overview",
								label: "Program Overview",
								icon: <Building2 className="w-4 h-4" />,
							},
							{
								id: "benefits",
								label: "Benefits & Pricing",
								icon: <TrendingUp className="w-4 h-4" />,
							},
							{
								id: "register",
								label: "Apply Now",
								icon: <User className="w-4 h-4" />,
							},
							{
								id: "tools",
								label: "Trade Tools",
								icon: <Calculator className="w-4 h-4" />,
							},
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => scrollToSection(tab.id)}
								disabled={loadingSection === tab.id}
								className={cn(
									"flex items-center space-x-2 px-8 py-4 border-b-2 font-medium transition-all duration-200 whitespace-nowrap disabled:opacity-50",
									activeSection === tab.id
										? "border-ds-primary-sage text-ds-primary-sage"
										: "border-transparent text-ds-neutral-mediumGray hover:text-ds-primary-charcoal hover:border-ds-neutral-lightGray"
								)}
								role="tab"
								aria-selected={activeSection === tab.id}
								aria-controls={`${tab.id}-panel`}
							>
								{loadingSection === tab.id ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									tab.icon
								)}
								<span>{tab.label}</span>
							</button>
						))}
					</nav>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				{/* Overview Section */}
				<div
					ref={overviewRef}
					id="overview-panel"
					role="tabpanel"
					aria-labelledby="overview-tab"
					className={cn("space-y-20", activeSection !== "overview" && "hidden")}
				>
					{/* Benefits Grid */}
					<div>
						<div className="text-center mb-8">
							<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
								Why Choose Our Trade Program?
							</h2>
							<p className="text-lg text-ds-neutral-mediumGray max-w-3xl mx-auto">
								Designed specifically for painting contractors, our program
								offers comprehensive benefits that help you grow your business
								and increase profitability.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{benefits.map((benefit, index) => (
								<div
									key={index}
									className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 hover:shadow-lg transition-all duration-200 group"
								>
									<div className="text-ds-primary-sage mb-4 group-hover:scale-110 transition-transform duration-200">
										{benefit.icon}
									</div>
									<h3 className="text-xl font-bold text-ds-primary-charcoal mb-4">
										{benefit.title}
									</h3>
									<p className="text-ds-neutral-mediumGray mb-4">
										{benefit.description}
									</p>
									<ul className="space-y-2">
										{benefit.details.map((detail, detailIndex) => (
											<li
												key={detailIndex}
												className="flex items-start space-x-2 text-sm text-ds-neutral-darkSlate"
											>
												<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-0.5 flex-shrink-0" />
												<span>{detail}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Testimonials */}
					<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
						<div className="text-center mb-8">
							<h2 className="text-3xl font-bold text-ds-primary-charcoal mb-4">
								What Our Trade Partners Say
							</h2>
							<p className="text-ds-neutral-mediumGray">
								Real feedback from contractors who&apos;ve transformed their
								businesses
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{testimonials.map((testimonial, index) => (
								<div
									key={index}
									className="bg-ds-neutral-white p-8 rounded-lg shadow-sm"
								>
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-ds-primary-sage rounded-full flex items-center justify-center">
											<User className="w-6 h-6 text-ds-neutral-white" />
										</div>
										<div>
											<h4 className="font-semibold text-ds-primary-charcoal">
												{testimonial.name}
											</h4>
											<p className="text-sm text-ds-neutral-mediumGray">
												{testimonial.company}
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-2 mb-4">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star
												key={i}
												className="w-4 h-4 text-yellow-400 fill-current"
											/>
										))}
									</div>

									<p className="text-ds-neutral-darkSlate mb-4 italic">
										{testimonial.comment}
									</p>

									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<span className="text-ds-neutral-mediumGray">
												Projects:
											</span>
											<span className="font-semibold text-ds-primary-charcoal ml-2">
												{testimonial.projects}
											</span>
										</div>
										<div>
											<span className="text-ds-neutral-mediumGray">
												Savings:
											</span>
											<span className="font-semibold text-ds-primary-sage ml-2">
												{testimonial.savings}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* CTA Section */}
					<div className="text-center bg-ds-primary-sage/5 border border-ds-primary-sage/20 rounded-lg p-8">
						<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-4">
							Ready to Join Our Trade Program?
						</h2>
						<p className="text-ds-neutral-mediumGray mb-8">
							Start saving on your next project with our exclusive contractor
							benefits.
						</p>
						<button
							onClick={handleApplyClick}
							disabled={loadingSection === "register"}
							className="px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
							aria-label="Start trade program application"
						>
							{loadingSection === "register" ? (
								<Loader2 className="w-5 h-5 animate-spin" />
							) : (
								<>
									<span>Apply for Trade Account</span>
									<ArrowRight className="w-5 h-5" />
								</>
							)}
						</button>
					</div>
				</div>

				{/* Benefits Section */}
				<div
					ref={benefitsRef}
					id="benefits-panel"
					role="tabpanel"
					aria-labelledby="benefits-tab"
					className={cn(activeSection !== "benefits" && "hidden")}
				>
					<Suspense
						fallback={
							<div className="flex items-center justify-center py-20">
								<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage" />
							</div>
						}
					>
						<LazyDiscountTierDisplay />
						<div className="text-center mt-12">
							<button
								onClick={handleStartSavingClick}
								disabled={loadingSection === "register"}
								className="px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
								aria-label="Start saving today by applying"
							>
								{loadingSection === "register" ? (
									<Loader2 className="w-5 h-5 animate-spin" />
								) : (
									<>
										<span>Start Saving Today</span>
										<ArrowRight className="w-5 h-5" />
									</>
								)}
							</button>
						</div>
					</Suspense>
				</div>

				{/* Registration Section */}
				<div
					ref={registerRef}
					id="register-panel"
					role="tabpanel"
					aria-labelledby="register-tab"
					className={cn(activeSection !== "register" && "hidden")}
				>
					<Suspense
						fallback={
							<div className="flex items-center justify-center py-20">
								<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage" />
							</div>
						}
					>
						<LazyTradeRegistrationForm
							onRegistrationComplete={() => setIsRegistered(true)}
						/>
					</Suspense>
				</div>

				{/* Tools Section */}
				<div
					ref={toolsRef}
					id="tools-panel"
					role="tabpanel"
					aria-labelledby="tools-tab"
					className={cn("space-y-20", activeSection !== "tools" && "hidden")}
				>
					<Suspense
						fallback={
							<div className="flex items-center justify-center py-20">
								<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage" />
							</div>
						}
					>
						<LazyProjectManagementTools />
						<LazyBulkOrderingInterface />
						<LazyTradeProductRecommendations />
					</Suspense>
				</div>
			</div>

			{/* Support Contact */}
			<Suspense
				fallback={
					<div className="flex items-center justify-center py-20">
						<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage" />
					</div>
				}
			>
				<LazyTradeSupportContact />
			</Suspense>
		</div>
	);
	{
		/* </PageLayout> */
	}
}
