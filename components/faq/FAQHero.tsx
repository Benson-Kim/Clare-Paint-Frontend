"use client";

import React from "react";
import { HelpCircle } from "lucide-react";

export const FAQHero: React.FC = () => {
	return (
		<div className="relative bg-gradient-to-r from-ds-primary-sage to-ds-primary-charcoal text-ds-neutral-white overflow-hidden">
			<div className="absolute inset-0 bg-black/30" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20 text-center">
				<HelpCircle className="w-24 h-24 text-ds-neutral-white mx-auto mb-4" />
				<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
					Frequently Asked Questions
				</h1>
				<p className="text-xl text-ds-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
					Find quick answers to your questions about our products, services, and
					policies.
				</p>
			</div>
		</div>
	);
};
