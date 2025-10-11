// components/common/ToastContainer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { toast, Toast } from "../../lib/toast";

/**
 * Toast item component
 */
const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({
	toast,
	onClose,
}) => {
	const [isExiting, setIsExiting] = useState(false);

	const icons = {
		success: CheckCircle,
		error: XCircle,
		warning: AlertCircle,
		info: Info,
	};

	const styles = {
		success: "bg-green-50 border-green-200 text-green-800",
		error: "bg-red-50 border-red-200 text-red-800",
		warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
		info: "bg-blue-50 border-blue-200 text-blue-800",
	};

	const iconStyles = {
		success: "text-green-600",
		error: "text-red-600",
		warning: "text-yellow-600",
		info: "text-blue-600",
	};

	const Icon = icons[toast.type];

	const handleClose = () => {
		setIsExiting(true);
		setTimeout(onClose, 300); // Wait for exit animation
	};

	return (
		<div
			className={cn(
				"flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-md transition-all duration-300",
				styles[toast.type],
				isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
			)}
			role="alert"
			aria-live="polite"
		>
			<Icon className={cn("w-5 h-5 flex-shrink-0", iconStyles[toast.type])} />
			<p className="flex-1 text-sm font-medium">{toast.message}</p>
			<button
				onClick={handleClose}
				className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
				aria-label="Close notification"
			>
				<X className="w-4 h-4" />
			</button>
		</div>
	);
};

/**
 * Toast container component - Place this in your root layout
 */
export const ToastContainer: React.FC = () => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	useEffect(() => {
		const unsubscribe = toast.subscribe(setToasts);
		return () => {
			unsubscribe();
		};
	}, []);

	if (toasts.length === 0) return null;

	return (
		<div
			className="fixed top-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none"
			aria-live="polite"
			aria-atomic="false"
		>
			{toasts.map((toastItem) => (
				<div key={toastItem.id} className="pointer-events-auto">
					<ToastItem
						toast={toastItem}
						onClose={() => toast.removeToast(toastItem.id)}
					/>
				</div>
			))}
		</div>
	);
};

/**
 * Hook to use toast notifications
 */
export function useToast() {
	return {
		success: (message: string, duration?: number) =>
			toast.success(message, duration),
		error: (message: string, duration?: number) =>
			toast.error(message, duration),
		warning: (message: string, duration?: number) =>
			toast.warning(message, duration),
		info: (message: string, duration?: number) => toast.info(message, duration),
		dismiss: (id: string) => toast.removeToast(id),
		dismissAll: () => toast.clearAll(),
	};
}
