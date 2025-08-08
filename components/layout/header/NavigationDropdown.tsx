"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationDropdownProps {
	items: {
		label: string;
		href: string;
		description?: string;
		featured?: boolean;
		icon?: React.ReactNode;
	}[];
	onClose: () => void;
	title: string;
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
	items,
	onClose,
	title,
}) => {
	const featuredItems = items.filter((item) => item.featured);
	const regularItems = items.filter((item) => !item.featured);

	return (
		<div className="absolute top-full left-0 mt-2 w-96 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-xl z-50 overflow-hidden">
			{/* Header */}
			<div className="p-4 bg-ds-primary-cream/20 border-b border-ds-neutral-lightGray">
				<h3 className="font-semibold text-ds-primary-charcoal flex items-center space-x-2">
					<Sparkles className="w-4 h-4 text-ds-primary-sage" />
					<span>{title}</span>
				</h3>
			</div>

			<div className="p-2 max-h-96 overflow-y-auto">
				{/* Featured Items */}
				{featuredItems.length > 0 && (
					<div className="mb-4">
						<div className="px-3 py-2">
							<span className="text-xs font-medium text-ds-primary-sage uppercase tracking-wide">
								Featured
							</span>
						</div>
						{featuredItems.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								onClick={onClose}
								className="flex items-start justify-between p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 mb-2"
							>
								<div className="flex-1">
									<div className="flex items-center space-x-2">
										{item.icon}
										<span className="font-medium text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
											{item.label}
										</span>
										<Star className="w-4 h-4 text-ds-accent-warmBrown fill-current" />
									</div>
									{item.description && (
										<p className="text-sm text-ds-neutral-mediumGray mt-1 leading-relaxed">
											{item.description}
										</p>
									)}
								</div>
								<ArrowRight className="w-4 h-4 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200 opacity-0 group-hover:opacity-100 ml-2" />
							</Link>
						))}
					</div>
				)}

				{/* Regular Items */}
				{regularItems.length > 0 && (
					<div>
						{featuredItems.length > 0 && (
							<div className="px-3 py-2 border-t border-ds-neutral-lightGray">
								<span className="text-xs font-medium text-ds-neutral-mediumGray uppercase tracking-wide">
									All {title}
								</span>
							</div>
						)}
						{regularItems.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								onClick={onClose}
								className="flex items-start justify-between p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group"
							>
								<div className="flex-1">
									<div className="flex items-center space-x-2">
										{item.icon}
										<span className="font-medium text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
											{item.label}
										</span>
									</div>
									{item.description && (
										<p className="text-sm text-ds-neutral-mediumGray mt-1 leading-relaxed">
											{item.description}
										</p>
									)}
								</div>
								<ArrowRight className="w-4 h-4 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200 opacity-0 group-hover:opacity-100 ml-2" />
							</Link>
						))}
					</div>
				)}
			</div>

			{/* Footer CTA */}
			<div className="p-4 bg-ds-primary-cream/20 border-t border-ds-neutral-lightGray">
				<Link
					href="/consultation"
					onClick={onClose}
					className="flex items-center justify-center space-x-2 w-full py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium text-sm"
				>
					<span>Free Color Consultation</span>
					<ArrowRight className="w-4 h-4" />
				</Link>
			</div>
		</div>
	);
};
