import React from "react";
import { Separator } from "@/components/ui/separator";

interface PolicySectionProps {
	title: string;
	children: React.ReactNode;
}

export const PolicySection: React.FC<PolicySectionProps> = ({
	title,
	children,
}) => {
	return (
		<section className="mb-12">
			<h2 className="text-3xl font-bold text-ds-primary-charcoal mb-4">
				{title}
			</h2>
			<Separator className="mb-6 bg-ds-accent-warmBeige/50" />
			<div className="prose prose-lg max-w-none text-ds-neutral-darkSlate">
				{children}
			</div>
		</section>
	);
};
