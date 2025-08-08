"use client";

import React from "react";
import { Loader2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
	message?: string;
	fullScreen?: boolean;
	className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
	message = "Loading...",
	fullScreen = false,
	className = "",
}) => {
	return (
		<div
			className={cn(
				"flex items-center justify-center bg-ds-neutral-white/80 backdrop-blur-sm",
				fullScreen ? "fixed inset-0 z-50" : "absolute inset-0",
				className
			)}
			role="status"
			aria-live="polite"
			aria-label={message}
		>
			<div className="text-center">
				<div className="relative mb-4">
					<Palette className="w-12 h-12 text-ds-primary-sage mx-auto" />
					<Loader2 className="w-6 h-6 text-ds-primary-sage animate-spin absolute top-3 left-1/2 transform -translate-x-1/2" />
				</div>
				<p className="text-ds-neutral-mediumGray font-medium">{message}</p>
			</div>
		</div>
	);
};
