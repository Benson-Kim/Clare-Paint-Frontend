"use client";

import React from "react";
import {
	Shield,
	Award,
	CheckCircle,
	Star,
	Truck,
	RotateCcw,
	Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFooterAnalytics } from "@/hooks/useFooterAnalytics";

interface TrustSignal {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	link?: string;
	highlight?: boolean;
}

interface TrustSignalsProps {
	variant?: "default" | "compact" | "detailed";
	className?: string;
}

export const TrustSignals: React.FC<TrustSignalsProps> = ({
	variant = "default",
	className = "",
}) => {
	const { trackTrustSignalView, trackFooterInteraction } = useFooterAnalytics();

	const trustSignals: TrustSignal[] = [
		{
			icon: Shield,
			title: "SSL Secured",
			description: "Your data is protected with 256-bit encryption",
			link: "/security",
		},
		{
			icon: RotateCcw,
			title: "30-Day Returns",
			description: "Hassle-free returns and exchanges",
			link: "/returns",
			highlight: true,
		},
		{
			icon: Truck,
			title: "Free Shipping",
			description: "On orders over $100 within continental US",
			link: "/shipping",
			highlight: true,
		},
		{
			icon: Award,
			title: "Quality Guarantee",
			description: "100% satisfaction promise or money back",
			link: "/guarantee",
		},
		{
			icon: Star,
			title: "Expert Rated",
			description: "Trusted by professional contractors nationwide",
			link: "/reviews",
		},
		{
			icon: CheckCircle,
			title: "Eco-Friendly",
			description: "Zero-VOC and low-emission options available",
			link: "/sustainability",
		},
	];

	const certifications = [
		{
			name: "EPA Certified",
			description: "Environmental Protection Agency certified",
			badge: "EPA",
		},
		{
			name: "GREENGUARD Gold",
			description: "Low chemical emissions certification",
			badge: "GG",
		},
		{
			name: "BBB A+ Rating",
			description: "Better Business Bureau accredited",
			badge: "BBB",
		},
		{
			name: "ISO 9001",
			description: "Quality management system certified",
			badge: "ISO",
		},
	];

	const handleTrustSignalClick = (signal: TrustSignal) => {
		trackTrustSignalView(signal.title);
		if (signal.link) {
			trackFooterInteraction("trust_signals", signal.title, {
				trust_signal_link: signal.link,
			});
		}
	};

	const handleCertificationView = (
		certification: (typeof certifications)[0]
	) => {
		trackFooterInteraction("certifications", certification.name, {
			certification_type: certification.name,
		});
	};

	if (variant === "compact") {
		return (
			<div className={cn("flex flex-wrap justify-center gap-4", className)}>
				{trustSignals.slice(0, 4).map((signal, index) => (
					<div
						key={index}
						className="flex items-center space-x-2 bg-ds-neutral-lightGray/10 px-3 py-2 rounded text-xs text-ds-neutral-lightGray/80 border border-ds-neutral-lightGray/20"
						onClick={() => handleTrustSignalClick(signal)}
					>
						<signal.icon className="w-4 h-4" />
						<span>{signal.title}</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={cn("space-y-8", className)}>
			{/* Trust Signals Grid */}
			<div>
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
							className={cn(
								"text-center group hover:bg-ds-neutral-lightGray/5 p-4 rounded-lg transition-all duration-200 cursor-pointer",
								signal.highlight && "ring-1 ring-ds-accent-warmBeige/30"
							)}
							onClick={() => handleTrustSignalClick(signal)}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleTrustSignalClick(signal);
								}
							}}
							aria-label={`${signal.title}: ${signal.description}`}
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
								className="text-xs text-ds-neutral-lightGray/70 leading-relaxed"
								style={{ fontSize: "12px" }}
							>
								{signal.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Certifications & Security */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
				<div>
					<h4
						className="font-medium text-ds-neutral-white mb-4"
						style={{ fontSize: "16px", fontWeight: 500 }}
					>
						Certifications & Security
					</h4>
					<div className="flex flex-wrap gap-3">
						{certifications.map((cert, index) => (
							<div
								key={index}
								className="bg-ds-neutral-lightGray/10 px-4 py-2 rounded border border-ds-neutral-lightGray/20 hover:bg-ds-neutral-lightGray/15 transition-colors duration-200 cursor-pointer group"
								onClick={() => handleCertificationView(cert)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleCertificationView(cert);
									}
								}}
								aria-label={`${cert.name}: ${cert.description}`}
								title={cert.description}
							>
								<div className="flex items-center space-x-2">
									<div className="w-6 h-6 bg-ds-accent-warmBeige/20 rounded text-xs font-bold text-ds-accent-warmBeige flex items-center justify-center">
										{cert.badge}
									</div>
									<span
										className="text-xs text-ds-neutral-lightGray/80 group-hover:text-ds-neutral-lightGray transition-colors duration-200"
										style={{ fontSize: "12px" }}
									>
										{cert.name}
									</span>
								</div>
							</div>
						))}
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
						4.9/5 from 12,000+ verified reviews
					</p>
					<p
						className="text-xs text-ds-neutral-lightGray/60"
						style={{ fontSize: "12px" }}
					>
						98% customer satisfaction rate
					</p>
					<div className="mt-3 flex items-center justify-center md:justify-end space-x-2">
						<Phone className="w-4 h-4 text-ds-accent-warmBeige" />
						<span
							className="text-xs text-ds-neutral-lightGray/70"
							style={{ fontSize: "12px" }}
						>
							24/7 support available
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
