"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	Mail,
	Phone,
	MapPin,
	Facebook,
	Instagram,
	Twitter,
	Youtube,
	Palette,
	ArrowRight,
	Heart,
	ChevronDown,
	ChevronUp,
	CheckCircle,
	AlertCircle,
	ExternalLink,
	Shield,
	Award,
	Clock,
	Truck,
	RotateCcw,
	Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
	id?: string;
	className?: string;
}

interface NewsletterFormData {
	email: string;
	preferences?: string[];
}

interface FooterSection {
	title: string;
	links: {
		label: string;
		href: string;
		external?: boolean;
		description?: string;
	}[];
}

export const Footer: React.FC<FooterProps> = ({
	id = "footer",
	className = "",
}) => {
	const [newsletterEmail, setNewsletterEmail] = useState("");
	const [newsletterStatus, setNewsletterStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [newsletterMessage, setNewsletterMessage] = useState("");
	const [expandedSections, setExpandedSections] = useState<string[]>([]);
	const [emailError, setEmailError] = useState("");

	const currentYear = new Date().getFullYear();
	const establishedYear = 2018;
	const yearsInBusiness = currentYear - establishedYear;

	const footerSections: FooterSection[] = [
		{
			title: "Products & Services",
			links: [
				{
					label: "Interior Paints",
					href: "/products/interior-paints",
					description: "Premium paints for every room",
				},
				{
					label: "Exterior Paints",
					href: "/products/exterior-paints",
					description: "Weather-resistant solutions",
				},
				{
					label: "Color Matching",
					href: "/color-matching",
					description: "Perfect color matches",
				},
				{
					label: "Professional Services",
					href: "/consultation",
					description: "Expert color consultation",
				},
				{
					label: "Paint Calculator",
					href: "/calculator",
					description: "Calculate paint needs",
				},
				{
					label: "Color Visualizer",
					href: "/visualizer",
					description: "See colors in your space",
				},
				{
					label: "Custom Colors",
					href: "/custom-colors",
					description: "Bespoke color creation",
				},
				{
					label: "Trade Program",
					href: "/trade-program",
					description: "Professional contractor benefits",
				},
			],
		},
		{
			title: "Customer Support",
			links: [
				{
					label: "FAQ / Help Center",
					href: "/faq",
					description: "Quick answers to common questions",
				},
				{
					label: "Contact Us",
					href: "/contact",
					description: "Get in touch with our team",
				},
				{
					label: "Shipping Information",
					href: "/support/shipping",
					description: "Delivery details and options",
				},
				{
					label: "Return Policy",
					href: "/support/returns",
					description: "Easy returns and exchanges",
				},
				{
					label: "Color Guarantee",
					href: "/guarantee",
					description: "100% color satisfaction promise",
				},
				{
					label: "Technical Support",
					href: "/support/technical",
					description: "Application and product help",
				},
				{
					label: "Live Chat",
					href: "/chat",
					description: "Instant support assistance",
				},
				{
					label: "Store Locator",
					href: "/stores",
					description: "Find stores near you",
				},
			],
		},
		{
			title: "Company & Legal",
			links: [
				{
					label: "About Us",
					href: "/about",
					description: "Our story and mission",
				},
				{
					label: "Our Story",
					href: "/story",
					description: "How we started",
				},
				{
					label: "Sustainability",
					href: "/sustainability",
					description: "Environmental commitment",
				},
				{
					label: "Careers",
					href: "/careers",
					description: "Join our team",
				},
				{
					label: "Press Room",
					href: "/press",
					description: "News and media resources",
				},
				{
					label: "Terms of Service",
					href: "/terms",
					description: "Legal terms and conditions",
				},
				{
					label: "Privacy Policy",
					href: "/privacy",
					description: "How we protect your data",
				},
				{
					label: "Accessibility Statement",
					href: "/accessibility",
					description: "Our commitment to accessibility",
				},
			],
		},
	];

	const socialLinks = [
		{
			icon: Facebook,
			href: "https://facebook.com/clarepaint",
			label: "Follow us on Facebook",
			color: "hover:text-blue-400",
		},
		{
			icon: Instagram,
			href: "https://instagram.com/clarepaint",
			label: "Follow us on Instagram",
			color: "hover:text-pink-400",
		},
		{
			icon: Twitter,
			href: "https://twitter.com/clarepaint",
			label: "Follow us on Twitter",
			color: "hover:text-blue-300",
		},
		{
			icon: Youtube,
			href: "https://youtube.com/clarepaint",
			label: "Subscribe to our YouTube channel",
			color: "hover:text-red-400",
		},
	];

	const contactInfo = [
		{
			icon: Phone,
			label: "Customer Service",
			value: "1-800-CLARE-01",
			href: "tel:18002527301",
			description: "Mon-Fri 8AM-8PM EST",
		},
		{
			icon: Mail,
			label: "Email Support",
			value: "support@clarepaint.com",
			href: "mailto:support@clarepaint.com",
			description: "Response within 24 hours",
		},
		{
			icon: MapPin,
			label: "Headquarters",
			value: "New York, NY",
			href: "/contact#location",
			description: "Visit our flagship store",
		},
	];

	const trustSignals = [
		{
			icon: Shield,
			title: "SSL Secured",
			description: "Your data is protected",
		},
		{
			icon: RotateCcw,
			title: "30-Day Returns",
			description: "Hassle-free returns",
		},
		{
			icon: Truck,
			title: "Free Shipping",
			description: "On orders over $100",
		},
		{
			icon: Award,
			title: "Quality Guarantee",
			description: "100% satisfaction promise",
		},
		{
			icon: Star,
			title: "Expert Rated",
			description: "Trusted by professionals",
		},
		{
			icon: CheckCircle,
			title: "Eco-Friendly",
			description: "Zero-VOC options available",
		},
	];

	const businessHours = [
		{ day: "Monday - Friday", hours: "8:00 AM - 8:00 PM EST" },
		{ day: "Saturday", hours: "9:00 AM - 6:00 PM EST" },
		{ day: "Sunday", hours: "10:00 AM - 5:00 PM EST" },
	];

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleNewsletterSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setEmailError("");

		if (!newsletterEmail.trim()) {
			setEmailError("Email address is required");
			return;
		}

		if (!validateEmail(newsletterEmail)) {
			setEmailError("Please enter a valid email address");
			return;
		}

		setNewsletterStatus("loading");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Simulate success (90% success rate)
			if (Math.random() > 0.1) {
				setNewsletterStatus("success");
				setNewsletterMessage(
					"Welcome to the Clare Paint family! Check your email for a special welcome offer."
				);
				setNewsletterEmail("");

				// Reset success state after 5 seconds
				setTimeout(() => {
					setNewsletterStatus("idle");
					setNewsletterMessage("");
				}, 5000);
			} else {
				throw new Error("Subscription failed. Please try again.");
			}
		} catch (error) {
			setNewsletterStatus("error");
			setNewsletterMessage(
				error instanceof Error
					? error.message
					: "Failed to subscribe. Please try again."
			);

			// Reset error state after 5 seconds
			setTimeout(() => {
				setNewsletterStatus("idle");
				setNewsletterMessage("");
			}, 5000);
		}
	};

	const toggleSection = (sectionTitle: string) => {
		setExpandedSections((prev) =>
			prev.includes(sectionTitle)
				? prev.filter((title) => title !== sectionTitle)
				: [...prev, sectionTitle]
		);
	};

	const isSectionExpanded = (sectionTitle: string) =>
		expandedSections.includes(sectionTitle);

	return (
		<footer
			id={id}
			className={cn(
				"bg-ds-neutral-darkSlate text-ds-neutral-lightGray",
				className
			)}
			role="contentinfo"
			aria-label="Site footer"
			style={{ fontFamily: "Inter, system-ui, sans-serif" }}
		>
			{/* Newsletter Signup Section */}
			<div className="border-b border-ds-neutral-mediumGray/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center max-w-2xl mx-auto">
						<div className="flex items-center justify-center space-x-3 mb-4">
							<Mail className="w-8 h-8 text-ds-accent-warmBeige" />
							<h2
								className="text-2xl font-medium text-ds-neutral-white"
								style={{ fontSize: "18px", fontWeight: 500 }}
							>
								Stay Inspired with Color Trends
							</h2>
						</div>

						<p
							className="text-ds-neutral-lightGray mb-8 leading-relaxed"
							style={{ fontSize: "16px" }}
						>
							Get the latest color trends, exclusive offers, and expert painting
							tips delivered to your inbox. Join over 50,000 paint enthusiasts
							who trust Clare Paint for inspiration.
						</p>

						{newsletterStatus === "success" ? (
							<div className="flex items-center justify-center space-x-3 p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-300">
								<CheckCircle className="w-6 h-6" />
								<span style={{ fontSize: "16px" }}>{newsletterMessage}</span>
							</div>
						) : (
							<form onSubmit={handleNewsletterSubmit} className="space-y-4">
								<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
									<div className="flex-1">
										<label htmlFor="newsletter-email" className="sr-only">
											Email address for newsletter
										</label>
										<input
											id="newsletter-email"
											type="email"
											value={newsletterEmail}
											onChange={(e) => {
												setNewsletterEmail(e.target.value);
												setEmailError("");
											}}
											placeholder="Enter your email address"
											className="w-full px-4 py-3 bg-ds-neutral-white text-ds-primary-charcoal rounded-lg border border-ds-neutral-mediumGray focus:ring-2 focus:ring-ds-accent-warmBeige focus:border-transparent transition-all duration-200"
											style={{ fontSize: "16px" }}
											required
											disabled={newsletterStatus === "loading"}
											aria-describedby={
												emailError ? "email-error" : "email-description"
											}
										/>
									</div>

									<button
										type="submit"
										disabled={newsletterStatus === "loading"}
										className={cn(
											"px-6 py-3 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 min-w-[140px]",
											"hover:bg-ds-accent-warmBeige/90 hover:scale-105 active:scale-95",
											"disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
											"focus:ring-2 focus:ring-ds-accent-warmBeige/50 focus:outline-none"
										)}
										style={{ fontSize: "16px", fontWeight: 500 }}
										aria-label="Subscribe to newsletter"
									>
										{newsletterStatus === "loading" ? (
											<div className="w-5 h-5 border-2 border-ds-neutral-white/30 border-t-ds-neutral-white rounded-full animate-spin" />
										) : (
											<>
												<span>Subscribe</span>
												<ArrowRight className="w-4 h-4" />
											</>
										)}
									</button>
								</div>

								{emailError && (
									<p
										id="email-error"
										className="text-red-400 text-sm text-center"
										role="alert"
										style={{ fontSize: "14px" }}
									>
										{emailError}
									</p>
								)}

								{newsletterStatus === "error" && (
									<div className="flex items-center justify-center space-x-2 text-red-400 text-sm">
										<AlertCircle className="w-4 h-4" />
										<span style={{ fontSize: "14px" }}>
											{newsletterMessage}
										</span>
									</div>
								)}

								<p
									id="email-description"
									className="text-xs text-ds-neutral-lightGray/70 text-center"
									style={{ fontSize: "12px" }}
								>
									By subscribing, you agree to our{" "}
									<Link
										href="/privacy"
										className="text-ds-accent-warmBeige hover:underline focus:underline focus:outline-none"
									>
										Privacy Policy
									</Link>
									. Unsubscribe at any time.
								</p>
							</form>
						)}
					</div>
				</div>
			</div>

			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Column 1 - Company Info */}
					<div className="lg:col-span-1">
						<Link
							href="/"
							className="flex items-center space-x-3 group mb-6"
							aria-label="Clare Paint - Home"
						>
							<div className="w-12 h-12 bg-ds-accent-warmBeige rounded-lg flex items-center justify-center group-hover:bg-ds-accent-warmBeige/90 transition-colors duration-200">
								<Palette className="w-6 h-6 text-ds-neutral-white" />
							</div>
							<div>
								<span
									className="text-2xl font-bold text-ds-neutral-white group-hover:text-ds-accent-warmBeige transition-colors duration-200"
									style={{ fontSize: "24px", fontWeight: 700 }}
								>
									Clare Paint
								</span>
								<p
									className="text-sm text-ds-neutral-lightGray/80 -mt-1"
									style={{ fontSize: "12px" }}
								>
									Est. {establishedYear} • {yearsInBusiness} Years of Excellence
								</p>
							</div>
						</Link>

						<p
							className="text-ds-neutral-lightGray/90 mb-6 leading-relaxed"
							style={{ fontSize: "16px", lineHeight: "1.6" }}
						>
							Transform your space with our premium paint collection.
							Sophisticated colors, superior quality, and expert curation for
							the modern home.
						</p>

						{/* Contact Information */}
						<div className="space-y-4 mb-8">
							{contactInfo.map((contact, index) => (
								<a
									key={index}
									href={contact.href}
									className="flex items-start space-x-3 text-ds-neutral-lightGray hover:text-ds-accent-warmBeige transition-colors duration-200 group"
									aria-label={contact.label}
								>
									<contact.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 mt-0.5" />
									<div>
										<span
											className="font-medium block"
											style={{ fontSize: "16px", fontWeight: 500 }}
										>
											{contact.label}
										</span>
										<p
											className="text-ds-neutral-lightGray group-hover:text-ds-accent-warmBeige transition-colors duration-200"
											style={{ fontSize: "16px" }}
										>
											{contact.value}
										</p>
										<p
											className="text-xs text-ds-neutral-lightGray/70"
											style={{ fontSize: "12px" }}
										>
											{contact.description}
										</p>
									</div>
								</a>
							))}
						</div>

						{/* Business Hours */}
						<div className="mb-8">
							<h3
								className="font-medium text-ds-neutral-white mb-3 flex items-center space-x-2"
								style={{ fontSize: "18px", fontWeight: 500 }}
							>
								<Clock className="w-5 h-5 text-ds-accent-warmBeige" />
								<span>Business Hours</span>
							</h3>
							<div className="space-y-1">
								{businessHours.map((schedule, index) => (
									<div
										key={index}
										className="flex justify-between text-sm"
										style={{ fontSize: "14px" }}
									>
										<span className="text-ds-neutral-lightGray/80">
											{schedule.day}
										</span>
										<span className="text-ds-neutral-lightGray">
											{schedule.hours}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Social Media Links */}
						<div>
							<h3
								className="font-medium text-ds-neutral-white mb-4"
								style={{ fontSize: "18px", fontWeight: 500 }}
							>
								Follow Our Journey
							</h3>
							<div className="flex space-x-4">
								{socialLinks.map((social, index) => (
									<a
										key={index}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											"w-12 h-12 bg-ds-neutral-lightGray/10 rounded-lg flex items-center justify-center text-ds-neutral-lightGray transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50",
											social.color
										)}
										aria-label={social.label}
									>
										<social.icon className="w-6 h-6" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Columns 2-4 - Navigation Sections */}
					{footerSections.map((section, sectionIndex) => (
						<div key={sectionIndex} className="lg:col-span-1">
							{/* Mobile Collapsible Header */}
							<button
								onClick={() => toggleSection(section.title)}
								className="lg:hidden flex items-center justify-between w-full text-left mb-4 p-2 -m-2 rounded-lg hover:bg-ds-neutral-lightGray/5 transition-colors duration-200"
								aria-expanded={isSectionExpanded(section.title)}
								aria-controls={`footer-section-${sectionIndex}`}
							>
								<h3
									className="font-medium text-ds-neutral-white"
									style={{ fontSize: "18px", fontWeight: 500 }}
								>
									{section.title}
								</h3>
								{isSectionExpanded(section.title) ? (
									<ChevronUp className="w-5 h-5 text-ds-neutral-lightGray" />
								) : (
									<ChevronDown className="w-5 h-5 text-ds-neutral-lightGray" />
								)}
							</button>

							{/* Desktop Header */}
							<h3
								className="hidden lg:block font-medium text-ds-neutral-white mb-6"
								style={{ fontSize: "18px", fontWeight: 500 }}
							>
								{section.title}
							</h3>

							{/* Navigation Links */}
							<nav
								id={`footer-section-${sectionIndex}`}
								className={cn(
									"lg:block",
									isSectionExpanded(section.title) ? "block" : "hidden"
								)}
								aria-label={`${section.title} navigation`}
							>
								<ul className="space-y-4">
									{section.links.map((link, linkIndex) => (
										<li key={linkIndex}>
											<Link
												href={link.href}
												target={link.external ? "_blank" : undefined}
												rel={link.external ? "noopener noreferrer" : undefined}
												className="group flex items-start space-x-2 text-ds-neutral-lightGray hover:text-ds-accent-warmBeige transition-colors duration-200 focus:text-ds-accent-warmBeige focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50 rounded p-1 -m-1"
												aria-label={
													link.description
														? `${link.label} - ${link.description}`
														: link.label
												}
											>
												<div className="flex-1">
													<span className="block" style={{ fontSize: "16px" }}>
														{link.label}
													</span>
													{link.description && (
														<span
															className="text-xs text-ds-neutral-lightGray/60 block mt-1"
															style={{ fontSize: "12px" }}
														>
															{link.description}
														</span>
													)}
												</div>
												{link.external && (
													<ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-1" />
												)}
												<ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
					))}
				</div>

				{/* Trust Signals Section */}
				<div className="mt-16 pt-8 border-t border-ds-neutral-mediumGray/20">
					<h3
						className="text-center font-medium text-ds-neutral-white mb-8"
						style={{ fontSize: "18px", fontWeight: 500 }}
					>
						Why Choose Clare Paint
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
						{trustSignals.map((signal, index) => (
							<div
								key={index}
								className="text-center group hover:bg-ds-neutral-lightGray/5 p-4 rounded-lg transition-colors duration-200"
							>
								<div className="inline-flex items-center justify-center w-12 h-12 bg-ds-accent-warmBeige/10 rounded-full mb-3 group-hover:bg-ds-accent-warmBeige/20 transition-colors duration-200">
									<signal.icon className="w-6 h-6 text-ds-accent-warmBeige" />
								</div>
								<h4
									className="font-medium text-ds-neutral-white mb-1"
									style={{ fontSize: "14px", fontWeight: 500 }}
								>
									{signal.title}
								</h4>
								<p
									className="text-xs text-ds-neutral-lightGray/70"
									style={{ fontSize: "12px" }}
								>
									{signal.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Security & Certifications */}
				<div className="mt-12 pt-8 border-t border-ds-neutral-mediumGray/20">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
						<div>
							<h4
								className="font-medium text-ds-neutral-white mb-3"
								style={{ fontSize: "16px", fontWeight: 500 }}
							>
								Trusted & Secure
							</h4>
							<div className="flex flex-wrap gap-4">
								<div className="bg-ds-neutral-lightGray/10 px-4 py-2 rounded text-xs text-ds-neutral-lightGray/80 border border-ds-neutral-lightGray/20">
									<Shield className="w-4 h-4 inline mr-2" />
									SSL Secured
								</div>
								<div className="bg-ds-neutral-lightGray/10 px-4 py-2 rounded text-xs text-ds-neutral-lightGray/80 border border-ds-neutral-lightGray/20">
									<Award className="w-4 h-4 inline mr-2" />
									EPA Certified
								</div>
								<div className="bg-ds-neutral-lightGray/10 px-4 py-2 rounded text-xs text-ds-neutral-lightGray/80 border border-ds-neutral-lightGray/20">
									<CheckCircle className="w-4 h-4 inline mr-2" />
									GREENGUARD Gold
								</div>
								<div className="bg-ds-neutral-lightGray/10 px-4 py-2 rounded text-xs text-ds-neutral-lightGray/80 border border-ds-neutral-lightGray/20">
									<Star className="w-4 h-4 inline mr-2" />
									BBB A+ Rating
								</div>
							</div>
						</div>

						<div className="text-center md:text-right">
							<h4
								className="font-medium text-ds-neutral-white mb-3"
								style={{ fontSize: "16px", fontWeight: 500 }}
							>
								Customer Satisfaction
							</h4>
							<div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className="w-5 h-5 text-yellow-400 fill-current"
									/>
								))}
							</div>
							<p
								className="text-sm text-ds-neutral-lightGray/80"
								style={{ fontSize: "14px" }}
							>
								4.9/5 from 12,000+ reviews
							</p>
							<p
								className="text-xs text-ds-neutral-lightGray/60"
								style={{ fontSize: "12px" }}
							>
								98% customer satisfaction rate
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-ds-neutral-mediumGray/20 bg-ds-primary-charcoal/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-ds-neutral-lightGray/70">
							<p style={{ fontSize: "14px" }}>
								&copy; {currentYear} Clare Paint. All rights reserved.
							</p>
							<div className="flex items-center space-x-1">
								<span>Made with</span>
								<Heart className="w-4 h-4 text-red-400 fill-current" />
								<span>for paint enthusiasts</span>
							</div>
							<div className="flex items-center space-x-1">
								<span>Serving customers since {establishedYear}</span>
							</div>
						</div>

						<nav aria-label="Legal navigation">
							<ul className="flex flex-wrap items-center gap-6 text-sm">
								<li>
									<Link
										href="/privacy"
										className="text-ds-neutral-lightGray/70 hover:text-ds-accent-warmBeige transition-colors duration-200 focus:text-ds-accent-warmBeige focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50 rounded p-1 -m-1"
										style={{ fontSize: "14px" }}
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="text-ds-neutral-lightGray/70 hover:text-ds-accent-warmBeige transition-colors duration-200 focus:text-ds-accent-warmBeige focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50 rounded p-1 -m-1"
										style={{ fontSize: "14px" }}
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="/accessibility"
										className="text-ds-neutral-lightGray/70 hover:text-ds-accent-warmBeige transition-colors duration-200 focus:text-ds-accent-warmBeige focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50 rounded p-1 -m-1"
										style={{ fontSize: "14px" }}
									>
										Accessibility
									</Link>
								</li>
								<li>
									<Link
										href="/cookies"
										className="text-ds-neutral-lightGray/70 hover:text-ds-accent-warmBeige transition-colors duration-200 focus:text-ds-accent-warmBeige focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50 rounded p-1 -m-1"
										style={{ fontSize: "14px" }}
									>
										Cookie Policy
									</Link>
								</li>
								<li>
									<Link
										href="/sitemap"
										className="text-ds-neutral-lightGray/70 hover:text-ds-accent-warmBeige transition-colors duration-200 focus:text-ds-accent-warmBeige focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50 rounded p-1 -m-1"
										style={{ fontSize: "14px" }}
									>
										Sitemap
									</Link>
								</li>
							</ul>
						</nav>
					</div>

					{/* Additional Legal & Compliance */}
					<div className="mt-6 pt-4 border-t border-ds-neutral-mediumGray/10">
						<div className="text-center">
							<p
								className="text-xs text-ds-neutral-lightGray/60 mb-2"
								style={{ fontSize: "12px" }}
							>
								Clare Paint is committed to environmental responsibility and
								sustainable practices.
							</p>
							<p
								className="text-xs text-ds-neutral-lightGray/60"
								style={{ fontSize: "12px" }}
							>
								All products meet or exceed EPA standards. Zero-VOC formulations
								available.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Structured Data for SEO */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Organization",
						name: "Clare Paint",
						url: "https://clare-paint.com",
						logo: "https://clare-paint.com/logo.png",
						description:
							"Premium paint crafted for the modern home. Sophisticated colors and superior quality.",
						foundingDate: establishedYear.toString(),
						address: {
							"@type": "PostalAddress",
							addressLocality: "New York",
							addressRegion: "NY",
							addressCountry: "US",
						},
						contactPoint: [
							{
								"@type": "ContactPoint",
								telephone: "1-800-CLARE-01",
								contactType: "customer service",
								availableLanguage: "English",
								hoursAvailable: {
									"@type": "OpeningHoursSpecification",
									dayOfWeek: [
										"Monday",
										"Tuesday",
										"Wednesday",
										"Thursday",
										"Friday",
									],
									opens: "08:00",
									closes: "20:00",
								},
							},
						],
						sameAs: [
							"https://instagram.com/clarepaint",
							"https://facebook.com/clarepaint",
							"https://twitter.com/clarepaint",
							"https://youtube.com/clarepaint",
						],
						aggregateRating: {
							"@type": "AggregateRating",
							ratingValue: "4.9",
							reviewCount: "12000",
							bestRating: "5",
							worstRating: "1",
						},
					}),
				}}
			/>
		</footer>
	);
};
