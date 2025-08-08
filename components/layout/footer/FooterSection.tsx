"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight, ExternalLink } from "lucide-react";
import { FooterSection as FooterSectionType } from "@/types/footer";
import { cn } from "@/lib/utils";
import { useFooterAnalytics } from "@/hooks/useFooterAnalytics";

interface FooterSectionProps {
	section: FooterSectionType;
	isExpanded: boolean;
	onToggle: () => void;
	sectionIndex: number;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
	section,
	isExpanded,
	onToggle,
	sectionIndex,
}) => {
	const { trackFooterInteraction } = useFooterAnalytics();

	const handleLinkClick = (link: FooterSectionType["links"][0]) => {
		trackFooterInteraction(section.title, link.label, {
			link_href: link.href,
			link_external: link.external || false,
		});
	};

	return (
		<div className="lg:col-span-1">
			{/* Mobile Collapsible Header */}
			<button
				onClick={onToggle}
				className="lg:hidden flex items-center justify-between w-full text-left mb-4 p-3 -m-3 rounded-lg hover:bg-ds-neutral-lightGray/5 transition-colors duration-200 focus:bg-ds-neutral-lightGray/5 focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50"
				aria-expanded={isExpanded}
				aria-controls={`footer-section-${sectionIndex}`}
				style={{ fontSize: "18px", fontWeight: 500 }}
			>
				<h3 className="font-medium text-ds-neutral-white">{section.title}</h3>
				{isExpanded ? (
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
					"lg:block transition-all duration-300 ease-in-out",
					isExpanded
						? "block max-h-96 opacity-100"
						: "hidden lg:block max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
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
								onClick={() => handleLinkClick(link)}
								className="group flex items-start justify-between text-ds-neutral-lightGray hover:text-ds-accent-warmBeige transition-colors duration-200 focus:text-ds-accent-warmBeige focus:outline-none focus:ring-2 focus:ring-ds-accent-warmBeige/50 rounded p-2 -m-2"
								aria-label={
									link.description
										? `${link.label} - ${link.description}`
										: link.label
								}
							>
								<div className="flex-1 min-w-0">
									<span className="block" style={{ fontSize: "16px" }}>
										{link.label}
									</span>
									{link.description && (
										<span
											className="text-xs text-ds-neutral-lightGray/60 block mt-1 leading-relaxed"
											style={{ fontSize: "12px" }}
										>
											{link.description}
										</span>
									)}
								</div>
								<div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
									{link.external && (
										<ExternalLink className="w-3 h-3 flex-shrink-0" />
									)}
									<ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
								</div>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};
