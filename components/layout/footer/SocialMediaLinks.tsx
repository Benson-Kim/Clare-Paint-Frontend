"use client";

import React from "react";
import {
	Facebook,
	Instagram,
	Twitter,
	Youtube,
	Linkedin,
	MessageCircle,
} from "lucide-react";
import { SocialLink } from "@/types/footer";
import { cn } from "@/lib/utils";
import { useFooterAnalytics } from "@/hooks/useFooterAnalytics";

interface SocialMediaLinksProps {
	variant?: "default" | "compact" | "icons-only";
	className?: string;
	showLabels?: boolean;
	size?: "sm" | "md" | "lg";
}

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
	variant = "default",
	className = "",
	showLabels = false,
	size = "md",
}) => {
	const { trackSocialMediaClick } = useFooterAnalytics();

	const socialLinks: SocialLink[] = [
		{
			icon: Facebook,
			href: "https://facebook.com/clarepaint",
			label:
				"Follow us on Facebook for daily inspiration and community projects",
			color: "hover:text-blue-400 hover:bg-blue-400/10",
			platform: "facebook",
		},
		{
			icon: Instagram,
			href: "https://instagram.com/clarepaint",
			label: "See stunning paint transformations and color trends on Instagram",
			color: "hover:text-pink-400 hover:bg-pink-400/10",
			platform: "instagram",
		},
		{
			icon: Twitter,
			href: "https://twitter.com/clarepaint",
			label: "Get quick tips and updates on Twitter",
			color: "hover:text-blue-300 hover:bg-blue-300/10",
			platform: "twitter",
		},
		{
			icon: Youtube,
			href: "https://youtube.com/clarepaint",
			label: "Watch painting tutorials and color guides on YouTube",
			color: "hover:text-red-400 hover:bg-red-400/10",
			platform: "youtube",
		},
		{
			icon: Linkedin,
			href: "https://linkedin.com/company/clarepaint",
			label: "Connect with us professionally on LinkedIn",
			color: "hover:text-blue-500 hover:bg-blue-500/10",
			platform: "linkedin",
		},
	];

	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-12 h-12",
		lg: "w-16 h-16",
	};

	const iconSizes = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-8 h-8",
	};

	const handleSocialClick = (social: SocialLink) => {
		trackSocialMediaClick(social.platform);
	};

	if (variant === "compact") {
		return (
			<div className={cn("flex items-center space-x-3", className)}>
				{socialLinks.slice(0, 4).map((social, index) => (
					<a
						key={index}
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => handleSocialClick(social)}
						className={cn(
							"w-8 h-8 bg-ds-neutral-lightGray/10 rounded-full flex items-center justify-center text-ds-neutral-lightGray transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50",
							social.color
						)}
						aria-label={social.label}
					>
						<social.icon className="w-4 h-4" />
					</a>
				))}
			</div>
		);
	}

	if (variant === "icons-only") {
		return (
			<div className={cn("flex space-x-4", className)}>
				{socialLinks.map((social, index) => (
					<a
						key={index}
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => handleSocialClick(social)}
						className={cn(
							sizeClasses[size],
							"bg-ds-neutral-lightGray/10 rounded-lg flex items-center justify-center text-ds-neutral-lightGray transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50",
							social.color
						)}
						aria-label={social.label}
					>
						<social.icon className={iconSizes[size]} />
					</a>
				))}
			</div>
		);
	}

	return (
		<div className={cn("space-y-6", className)}>
			<div>
				<h3
					className="font-medium text-ds-neutral-white mb-4 flex items-center space-x-2"
					style={{ fontSize: "18px", fontWeight: 500 }}
				>
					<MessageCircle className="w-5 h-5 text-ds-accent-warmBeige" />
					<span>Follow Our Journey</span>
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
					{socialLinks.map((social, index) => (
						<a
							key={index}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => handleSocialClick(social)}
							className={cn(
								"group flex items-center space-x-3 p-3 bg-ds-neutral-lightGray/5 rounded-lg transition-all duration-200 hover:bg-ds-neutral-lightGray/10 focus:bg-ds-neutral-lightGray/10 focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50",
								social.color
							)}
							aria-label={social.label}
						>
							<div className="flex-shrink-0">
								<social.icon className="w-5 h-5" />
							</div>
							{showLabels && (
								<div className="flex-1 min-w-0">
									<span
										className="block font-medium text-ds-neutral-white group-hover:text-current transition-colors duration-200"
										style={{ fontSize: "14px", fontWeight: 500 }}
									>
										{social.platform.charAt(0).toUpperCase() +
											social.platform.slice(1)}
									</span>
									<span
										className="text-xs text-ds-neutral-lightGray/70 block truncate"
										style={{ fontSize: "12px" }}
									>
										@clarepaint
									</span>
								</div>
							)}
						</a>
					))}
				</div>
			</div>

			{/* Social Proof */}
			<div className="bg-ds-neutral-lightGray/5 rounded-lg p-4 border border-ds-neutral-lightGray/10">
				<div className="text-center">
					<h4
						className="font-medium text-ds-neutral-white mb-2"
						style={{ fontSize: "16px", fontWeight: 500 }}
					>
						Join Our Community
					</h4>
					<div className="flex items-center justify-center space-x-6 text-sm text-ds-neutral-lightGray/80">
						<div className="text-center">
							<div
								className="font-bold text-ds-accent-warmBeige"
								style={{ fontSize: "18px", fontWeight: 700 }}
							>
								50K+
							</div>
							<div style={{ fontSize: "12px" }}>Followers</div>
						</div>
						<div className="text-center">
							<div
								className="font-bold text-ds-accent-warmBeige"
								style={{ fontSize: "18px", fontWeight: 700 }}
							>
								1M+
							</div>
							<div style={{ fontSize: "12px" }}>Monthly Views</div>
						</div>
						<div className="text-center">
							<div
								className="font-bold text-ds-accent-warmBeige"
								style={{ fontSize: "18px", fontWeight: 700 }}
							>
								25K+
							</div>
							<div style={{ fontSize: "12px" }}>Projects Shared</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
