"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQSearchProps {
	onSearch: (query: string) => void;
	initialQuery?: string;
}

export const FAQSearch: React.FC<FAQSearchProps> = ({
	onSearch,
	initialQuery = "",
}) => {
	const [query, setQuery] = useState(initialQuery);

	// Debounce the search input
	useEffect(() => {
		const handler = setTimeout(() => {
			onSearch(query);
		}, 300); // 300ms debounce time

		return () => {
			clearTimeout(handler);
		};
	}, [query, onSearch]);

	return (
		<div className="relative max-w-2xl mx-auto mb-8">
			<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ds-neutral-mediumGray" />
			<input
				type="text"
				placeholder="Search FAQs..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full pl-10 pr-8 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent transition-all duration-200"
				aria-label="Search frequently asked questions"
			/>
		</div>
	);
};
