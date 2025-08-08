"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	X,
	ChevronRight,
	ChevronDown,
	Search,
	User,
	Heart,
	ShoppingCart,
	Home,
	Palette,
	Lightbulb,
	HelpCircle,
	Building2,
	Info,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { normalizePath } from "@/utils/footerUtils";

interface MobileNavigationProps {
	isOpen: boolean;
	onClose: () => void;
	onSearch: (query: string) => void;
	currentPath: string;
}

interface MobileNavItem {
	label: string;
	href?: string;
	icon: React.ReactNode;
	items?: {
		label: string;
		href: string;
		description?: string;
		featured?: boolean;
	}[];
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
	isOpen,
	onClose,
	onSearch,
	currentPath,
}) => {
	const { getTotalItems } = useCartStore();
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const mobileNavItems: MobileNavItem[] = [
		{
			label: "Products",
			icon: <Home className="w-5 h-5" />,
			items: [
				{
					label: "Interior Paints",
					href: "/interior-paints",
					description: "Premium paints for every room",
					featured: true,
				},
				{
					label: "Exterior Paints",
					href: "/exterior-paints",
					description: "Weather-resistant outdoor solutions",
					featured: true,
				},
				{
					label: "Primers & Sealers",
					href: "/products?category=primer",
					description: "Essential base coats",
				},
				{
					label: "Specialty Finishes",
					href: "/products?category=specialty",
					description: "Unique textures and effects",
				},
				{
					label: "Painting Tools",
					href: "/products?category=tools",
					description: "Professional-grade equipment",
				},
				{
					label: "Color Samples",
					href: "/samples",
					description: "Test before you commit",
				},
			],
		},
		{
			label: "Colors",
			icon: <Palette className="w-5 h-5" />,
			items: [
				{
					label: "Color Visualizer",
					href: "/color-visualizer",
					description: "See colors in your space",
					featured: true,
				},
				{
					label: "Color Collections",
					href: "/colors",
					description: "Curated color palettes",
				},
				{
					label: "Trending Colors",
					href: "/colors/trending",
					description: "What's popular now",
				},
				{
					label: "Color Matching",
					href: "/color-matching",
					description: "Match any color perfectly",
				},
			],
		},
		{
			label: "Inspiration",
			icon: <Lightbulb className="w-5 h-5" />,
			items: [
				{
					label: "Project Gallery",
					href: "/gallery",
					description: "Customer transformations",
					featured: true,
				},
				{
					label: "Room Ideas",
					href: "/inspiration/rooms",
					description: "Color ideas by space",
				},
				{
					label: "Style Guides",
					href: "/inspiration/styles",
					description: "Design style inspiration",
				},
				{
					label: "Color Trends",
					href: "/inspiration/trends",
					description: "Latest color movements",
				},
			],
		},
		{
			label: "How-To",
			icon: <HelpCircle className="w-5 h-5" />,
			items: [
				{
					label: "Painting Guides",
					href: "/guides/painting",
					description: "Step-by-step tutorials",
				},
				{
					label: "Surface Preparation",
					href: "/guides/prep",
					description: "Prep for perfect results",
				},
				{
					label: "Color Selection",
					href: "/guides/color-selection",
					description: "Choose the right colors",
				},
				{
					label: "Troubleshooting",
					href: "/guides/troubleshooting",
					description: "Fix common issues",
				},
			],
		},
		{
			label: "Trade Program",
			icon: <Building2 className="w-5 h-5" />,
			href: "/trade-program",
		},
		{
			label: "About",
			icon: <Info className="w-5 h-5" />,
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
					href: "/careers",
					description: "Join our team",
				},
			],
		},
		{
			label: "Support",
			icon: <HelpCircle className="w-5 h-5" />,
			items: [
				{
					label: "FAQ",
					href: "/faq",
					description: "Quick answers",
				},
				{
					label: "Contact Us",
					href: "/contact",
					description: "Get in touch",
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
					description: "Delivery details",
				},
				{
					label: "Returns",
					href: "/returns",
					description: "Return policy",
				},
			],
		},
	];

	const handleSectionToggle = (label: string) => {
		setExpandedSection(expandedSection === label ? null : label);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			onSearch(searchQuery);
			onClose();
		}
	};

	const isActiveLink = (href: string) => {
		const nHref = normalizePath(href);
		const nPath = normalizePath(currentPath);
		if (nHref === "/") return nPath === "/";
		return nPath.startsWith(nHref);
	};

	if (!isOpen) return null;

	return (
		<div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 transition-opacity duration-300"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Mobile Menu Panel */}
			<div className="absolute right-0 top-0 h-full w-full max-w-sm bg-ds-neutral-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-ds-neutral-lightGray bg-ds-primary-cream/20">
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 bg-ds-primary-sage rounded-lg flex items-center justify-center">
							<span className="text-ds-neutral-white font-bold">C</span>
						</div>
						<span className="text-lg font-bold text-ds-primary-charcoal">
							Menu
						</span>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal transition-colors duration-200 rounded-lg hover:bg-ds-neutral-lightGray/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
						aria-label="Close mobile menu"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Search */}
				<div className="p-6 border-b border-ds-neutral-lightGray">
					<form onSubmit={handleSearchSubmit} className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ds-neutral-mediumGray" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products, colors..."
							className="w-full pl-10 pr-4 py-3 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-label="Search products"
						/>
					</form>
				</div>

				{/* Quick Actions */}
				<div className="p-6 border-b border-ds-neutral-lightGray">
					<div className="grid grid-cols-3 gap-4">
						<Link
							href="/account"
							onClick={onClose}
							className="flex flex-col items-center p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 min-h-[44px] justify-center"
						>
							<User className="w-6 h-6 text-ds-primary-sage mb-2" />
							<span className="text-xs font-medium text-ds-neutral-darkSlate">
								Account
							</span>
						</Link>
						<Link
							href="/wishlist"
							onClick={onClose}
							className="flex flex-col items-center p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 relative min-h-[44px] justify-center"
						>
							<Heart className="w-6 h-6 text-ds-primary-sage mb-2" />
							<span className="text-xs font-medium text-ds-neutral-darkSlate">
								Wishlist
							</span>
							<span className="absolute -top-1 -right-1 bg-red-500 text-ds-neutral-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
								3
							</span>
						</Link>
						<Link
							href="/cart"
							onClick={onClose}
							className="flex flex-col items-center p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 relative min-h-[44px] justify-center"
						>
							<ShoppingCart className="w-6 h-6 text-ds-primary-sage mb-2" />
							<span className="text-xs font-medium text-ds-neutral-darkSlate">
								Cart
							</span>
							{getTotalItems() > 0 && (
								<span className="absolute -top-1 -right-1 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
									{getTotalItems()}
								</span>
							)}
						</Link>
					</div>
				</div>

				{/* Navigation Items */}
				<div className="flex-1 overflow-y-auto">
					<nav className="p-6 space-y-2" aria-label="Mobile navigation">
						{mobileNavItems.map((item) => (
							<div key={item.label}>
								{item.items ? (
									<div>
										<button
											onClick={() => handleSectionToggle(item.label)}
											className={cn(
												"flex items-center justify-between w-full p-3 text-left font-medium text-ds-primary-charcoal hover:bg-ds-primary-sage/5 rounded-lg transition-colors duration-200 min-h-[44px]",
												item.items.some((subItem) =>
													isActiveLink(subItem.href)
												) && "text-ds-primary-sage bg-ds-primary-sage/5"
											)}
											aria-expanded={expandedSection === item.label}
											aria-controls={`mobile-${item.label.toLowerCase()}-menu`}
										>
											<div className="flex items-center space-x-3">
												<div className="text-ds-primary-sage">{item.icon}</div>
												<span>{item.label}</span>
											</div>
											<ChevronDown
												className={cn(
													"w-5 h-5 transition-transform duration-200",
													expandedSection === item.label && "rotate-180"
												)}
											/>
										</button>

										{expandedSection === item.label && (
											<div
												id={`mobile-${item.label.toLowerCase()}-menu`}
												className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200"
											>
												{item.items.map((subItem, index) => (
													<Link
														key={index}
														href={subItem.href}
														onClick={onClose}
														className={cn(
															"flex items-center justify-between p-3 text-ds-neutral-darkSlate hover:text-ds-primary-sage hover:bg-ds-primary-sage/5 rounded-lg transition-colors duration-200 group min-h-[44px]",
															isActiveLink(subItem.href) &&
																"text-ds-primary-sage bg-ds-primary-sage/5",
															subItem.featured &&
																"bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20"
														)}
													>
														<div>
															<div className="flex items-center space-x-2">
																<span className="font-medium">
																	{subItem.label}
																</span>
																{subItem.featured && (
																	<span className="text-xs bg-ds-primary-sage text-ds-neutral-white px-2 py-1 rounded-full">
																		Featured
																	</span>
																)}
															</div>
															{subItem.description && (
																<p className="text-sm text-ds-neutral-mediumGray mt-1">
																	{subItem.description}
																</p>
															)}
														</div>
														<ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
													</Link>
												))}
											</div>
										)}
									</div>
								) : (
									<Link
										href={item.href!}
										onClick={onClose}
										className={cn(
											"flex items-center justify-between p-3 font-medium text-ds-primary-charcoal hover:text-ds-primary-sage hover:bg-ds-primary-sage/5 rounded-lg transition-colors duration-200 group min-h-[44px]",
											isActiveLink(item.href!) &&
												"text-ds-primary-sage bg-ds-primary-sage/5"
										)}
									>
										<div className="flex items-center space-x-3">
											<div className="text-ds-primary-sage">{item.icon}</div>
											<span>{item.label}</span>
										</div>
										<ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
									</Link>
								)}
							</div>
						))}
					</nav>
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-ds-neutral-lightGray bg-ds-primary-cream/20">
					<div className="space-y-3">
						<Link
							href="/consultation"
							onClick={onClose}
							className="w-full py-3 bg-ds-primary-sage text-ds-neutral-white text-center rounded-lg font-medium hover:bg-ds-primary-sage/90 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
						>
							Free Color Consultation
						</Link>
						<Link
							href="/contact"
							onClick={onClose}
							className="w-full py-3 border border-ds-primary-sage text-ds-primary-sage text-center rounded-lg font-medium hover:bg-ds-primary-sage/5 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
						>
							Contact Support
						</Link>
					</div>

					{/* Contact Info */}
					<div className="mt-4 text-center text-sm text-ds-neutral-mediumGray">
						<p>Need help? Call 1-800-CLARE-01</p>
						<p className="text-xs mt-1">Mon-Fri 8AM-8PM EST</p>
					</div>
				</div>
			</div>
		</div>
	);
};
