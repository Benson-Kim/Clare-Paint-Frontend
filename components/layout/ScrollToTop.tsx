"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
	show: boolean;
	onClick: () => void;
	className?: string;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
	show,
	onClick,
	className = "",
}) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"fixed bottom-6 right-6 w-12 h-12 bg-ds-primary-sage text-ds-neutral-white rounded-full shadow-lg hover:bg-ds-primary-sage/90 hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center",
				show
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none",
				className
			)}
			aria-label="Scroll to top"
			title="Scroll to top"
		>
			<ArrowUp className="w-5 h-5" />
		</button>
	);
};
