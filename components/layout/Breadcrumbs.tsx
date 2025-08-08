"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
	className?: string;
	style?: React.CSSProperties;
}

interface BreadcrumbItem {
	label: string;
	href: string;
	icon?: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	className = "",
	style = {},
}) => {
	const pathname = usePathname();

	const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
		const segments = path.split("/").filter(Boolean);
		const breadcrumbs: BreadcrumbItem[] = [
			{ label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
		];

		let currentPath = "";

		segments.forEach((segment, index) => {
			currentPath += `/${segment}`;

			// Convert segment to readable label
			let label = segment
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			// Special cases for better labels
			const labelMap: Record<string, string> = {
				"interior-paints": "Interior Paints",
				"exterior-paints": "Exterior Paints",
				"trade-program": "Trade Program",
				"color-matching": "Color Matching",
				"how-to": "How-To Guides",
				faq: "FAQ",
				account: "My Account",
				"order-history": "Order History",
				"saved-colors": "Saved Colors",
				"project-gallery": "Project Gallery",
				"payment-methods": "Payment Methods",
				"color-recommendations": "Color Recommendations",
				"paint-usage": "Paint Usage",
			};

			if (labelMap[segment]) {
				label = labelMap[segment];
			}

			// Don't add dynamic segments like product IDs
			if (!segment.match(/^[a-f0-9-]{36}$/) && !segment.match(/^\d+$/)) {
				breadcrumbs.push({
					label,
					href: currentPath,
				});
			}
		});

		return breadcrumbs;
	};

	const breadcrumbs = generateBreadcrumbs(pathname);

	// Don't show breadcrumbs on homepage or if only one item
	if (pathname === "/" || breadcrumbs.length <= 1) {
		return null;
	}

	return (
		<nav
			className={cn(
				"bg-ds-neutral-lightGray/10 border-b border-ds-neutral-lightGray",
				className
			)}
			style={style}
			aria-label="Breadcrumb navigation"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
				<ol className="flex items-center space-x-2 text-sm">
					{breadcrumbs.map((breadcrumb, index) => {
						const isLast = index === breadcrumbs.length - 1;

						return (
							<li key={breadcrumb.href} className="flex items-center">
								{index > 0 && (
									<ChevronRight
										className="w-4 h-4 text-ds-neutral-mediumGray mx-2"
										aria-hidden="true"
									/>
								)}

								{isLast ? (
									<span
										className="text-ds-primary-charcoal font-medium flex items-center space-x-1"
										aria-current="page"
									>
										{breadcrumb.icon}
										<span>{breadcrumb.label}</span>
									</span>
								) : (
									<Link
										href={breadcrumb.href}
										className="text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 flex items-center space-x-1"
									>
										{breadcrumb.icon}
										<span>{breadcrumb.label}</span>
									</Link>
								)}
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
};
