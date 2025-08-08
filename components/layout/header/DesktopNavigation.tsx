"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationDropdown } from "./NavigationDropdown";
import { normalizePath } from "@/utils/footerUtils";

interface DesktopNavigationProps {
	activeDropdown: string | null;
	onDropdownToggle: (dropdownName: string) => void;
	className?: string;
	currentPath: string;
}

interface NavItem {
	label: string;
	href?: string;
	hasDropdown?: boolean;
	dropdownId?: string;
	items?: {
		label: string;
		href: string;
		description?: string;
		featured?: boolean;
		icon?: React.ReactNode;
	}[];
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
	activeDropdown,
	onDropdownToggle,
	className,
	currentPath,
}) => {
	const navigationItems: NavItem[] = [
		{
			label: "Products",
			hasDropdown: true,
			dropdownId: "products",
			items: [
				{
					label: "Interior Paints",
					href: "/products/interior-paints",
					description: "Premium paints for every room",
					featured: true,
				},
				{
					label: "Exterior Paints",
					href: "/products/exterior-paints",
					description: "Weather-resistant outdoor solutions",
					featured: true,
				},
				{
					label: "Primers & Sealers",
					href: "/products/category/primers",
					description: "Essential base coats for perfect adhesion",
				},
				{
					label: "Specialty Finishes",
					href: "/products/category/specialty-coatings",
					description: "Unique textures and decorative effects",
				},
				{
					label: "Painting Tools",
					href: "/products/category/tools",
					description: "Professional-grade brushes and equipment",
				},
				{
					label: "Color Samples",
					href: "/colors/samples",
					description: "Test colors before you commit",
				},
			],
		},
		{
			label: "Colors",
			hasDropdown: true,
			dropdownId: "colors",
			items: [
				{
					label: "Color Visualizer",
					href: "/color-visualizer",
					description: "See colors in your space with AR",
					featured: true,
				},
				{
					label: "Color Collections",
					href: "/colors",
					description: "Curated palettes by our experts",
				},
				{
					label: "Trending Colors",
					href: "/colors/trending",
					description: "What's popular in 2024",
				},
				{
					label: "Color Matching",
					href: "/color-matching",
					description: "Match any color perfectly",
				},
				{
					label: "Room Inspiration",
					href: "/inspiration/rooms",
					description: "Color ideas organized by space",
				},
			],
		},
		{
			label: "Inspiration",
			hasDropdown: true,
			dropdownId: "inspiration",
			items: [
				{
					label: "Project Gallery",
					href: "/gallery",
					description: "Customer transformations and success stories",
					featured: true,
				},
				{
					label: "Room Ideas",
					href: "/inspiration/rooms",
					description: "Color schemes for every space",
				},
				{
					label: "Style Guides",
					href: "/inspiration/styles",
					description: "Design styles and color palettes",
				},
				{
					label: "Color Trends",
					href: "/colors/trending",
					description: "Latest color movements and forecasts",
				},
				{
					label: "Before & After",
					href: "/inspiration/transformations",
					description: "Amazing makeover stories",
				},
			],
		},
		{
			label: "How-To",
			hasDropdown: true,
			dropdownId: "how-to",
			items: [
				{
					label: "Painting Guides",
					href: "/guides/painting",
					description: "Step-by-step painting tutorials",
				},
				{
					label: "Surface Preparation",
					href: "/guides/prep",
					description: "Prep work for professional results",
				},
				{
					label: "Color Selection",
					href: "/guides/color-selection",
					description: "Expert tips for choosing colors",
				},
				{
					label: "Troubleshooting",
					href: "/guides/troubleshooting",
					description: "Fix common painting problems",
				},
				{
					label: "Video Tutorials",
					href: "/guides/videos",
					description: "Watch and learn techniques",
				},
			],
		},
		{
			label: "Trade Program",
			hasDropdown: true,
			dropdownId: "trade",
			items: [
				{
					label: "Professional Accounts",
					href: "/trade-program",
					description: "Exclusive benefits for contractors",
					featured: true,
				},
				{
					label: "Bulk Orders",
					href: "/trade-program#bulk",
					description: "Volume pricing and ordering",
				},
				{
					label: "Project Tools",
					href: "/trade-program#tools",
					description: "Professional project management",
				},
				{
					label: "Training Resources",
					href: "/trade-program#training",
					description: "Educational materials and workshops",
				},
			],
		},
		{
			label: "About",
			hasDropdown: true,
			dropdownId: "about",
			items: [
				{
					label: "Our Story",
					href: "/about",
					description: "The Clare Paint journey",
				},
				{
					label: "Quality Promise",
					href: "/about/quality",
					description: "Our commitment to excellence",
				},
				{
					label: "Sustainability",
					href: "/about/sustainability",
					description: "Environmental responsibility",
				},
				{
					label: "Careers",
					href: "/about/careers",
					description: "Join our team",
				},
			],
		},
		{
			label: "Support",
			hasDropdown: true,
			dropdownId: "support",
			items: [
				{
					label: "FAQ",
					href: "/faq",
					description: "Quick answers to common questions",
				},
				{
					label: "Contact Us",
					href: "/contact",
					description: "Get in touch with our team",
				},
				{
					label: "Color Consultation",
					href: "/consultation",
					description: "Expert color advice",
					featured: true,
				},
				{
					label: "Shipping Info",
					href: "/shipping",
					description: "Delivery details and options",
				},
				{
					label: "Returns",
					href: "/returns",
					description: "Easy return policy",
				},
			],
		},
	];

	const isActiveLink = (href: string) => {
		const nHref = normalizePath(href);
		const nPath = normalizePath(currentPath);
		if (nHref === "/") return nPath === "/";
		return nPath.startsWith(nHref);
	};

	return (
		<nav
			className={cn("flex items-center space-x-10", className)}
			role="navigation"
			aria-label="Main navigation"
		>
			{navigationItems.map((item) => (
				<div key={item.label} className="relative">
					{item.hasDropdown ? (
						<button
							onClick={() => onDropdownToggle(item.dropdownId!)}
							className={cn(
								"flex items-center space-x-1 px-3 py-2 text-ds-neutral-darkSlate hover:text-ds-primary-sage transition-all duration-200 font-medium group relative",
								activeDropdown === item.dropdownId && "text-ds-primary-sage"
							)}
							aria-expanded={activeDropdown === item.dropdownId}
							aria-haspopup="true"
							aria-label={`${item.label} menu`}
						>
							<span className="relative">
								{item.label}
								<span
									className={cn(
										"absolute -bottom-1 left-0 h-0.5 bg-ds-primary-sage transition-all duration-200",
										activeDropdown === item.dropdownId ||
											(item.items &&
												item.items.some((subItem) =>
													isActiveLink(subItem.href)
												))
											? "w-full"
											: "w-0 group-hover:w-full"
									)}
								/>
							</span>
							<ChevronDown
								className={cn(
									"w-4 h-4 transition-transform duration-200",
									activeDropdown === item.dropdownId && "rotate-180"
								)}
							/>
						</button>
					) : (
						<Link
							href={item.href!}
							className={cn(
								"flex items-center px-3 py-2 text-ds-neutral-darkSlate hover:text-ds-primary-sage transition-all duration-200 font-medium group relative",
								isActiveLink(item.href!) && "text-ds-primary-sage"
							)}
						>
							<span className="relative">
								{item.label}
								<span
									className={cn(
										"absolute -bottom-1 left-0 h-0.5 bg-ds-primary-sage transition-all duration-200",
										isActiveLink(item.href!)
											? "w-full"
											: "w-0 group-hover:w-full"
									)}
								/>
							</span>
						</Link>
					)}

					{/* Dropdown Menu */}
					{item.hasDropdown && activeDropdown === item.dropdownId && (
						<NavigationDropdown
							items={item.items!}
							onClose={() => onDropdownToggle(item.dropdownId!)}
							title={item.label}
						/>
					)}
				</div>
			))}
		</nav>
	);
};
