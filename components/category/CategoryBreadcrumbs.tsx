"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface CategoryData {
	slug: string;
	name: string;
	description: string;
	image: string;
	features: string[];
	benefits: string[];
}

interface CategoryBreadcrumbsProps {
	categoryData: CategoryData | null;
}

export const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({
	categoryData,
}) => {
	if (!categoryData) return null;

	const breadcrumbs = [
		{ label: "Home", href: "/", icon: Home },
		{ label: "Products", href: "/products" },
		{ label: categoryData.name, href: `/category/${categoryData.slug}` },
	];

	return (
		<div className="bg-gray-50 border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<nav
					className="flex items-center space-x-2 text-sm"
					aria-label="Breadcrumb"
				>
					{breadcrumbs.map((breadcrumb, index) => {
						const isLast = index === breadcrumbs.length - 1;
						const Icon = breadcrumb.icon;

						return (
							<React.Fragment key={breadcrumb.href}>
								{index > 0 && (
									<ChevronRight
										className="w-4 h-4 text-gray-400"
										aria-hidden="true"
									/>
								)}
								{isLast ? (
									<span className="text-ds-primary-charcoal font-medium flex items-center space-x-1">
										{Icon && <Icon className="w-4 h-4" />}
										<span>{breadcrumb.label}</span>
									</span>
								) : (
									<Link
										href={breadcrumb.href}
										className="text-gray-500 hover:text-ds-primary-sage transition-colors duration-200 flex items-center space-x-1"
									>
										{Icon && <Icon className="w-4 h-4" />}
										<span>{breadcrumb.label}</span>
									</Link>
								)}
							</React.Fragment>
						);
					})}
				</nav>
			</div>
		</div>
	);
};
