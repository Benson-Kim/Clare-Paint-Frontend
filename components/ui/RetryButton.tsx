// components/common/RetryButton.tsx - New Component
import React from "react";
import { RefreshCcw } from "lucide-react";
import { useRetry } from "@/lib/retry";

interface RetryButtonProps {
	onRetry: () => Promise<void>;
	label?: string;
	maxAttempts?: number;
}

export const RetryButton: React.FC<RetryButtonProps> = ({
	onRetry,
	label = "Retry",
	maxAttempts = 3,
}) => {
	const { execute, isRetrying, retryCount, error } = useRetry(onRetry, {
		maxAttempts,
	});

	return (
		<div className="text-center">
			{error && <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>}
			<button
				onClick={execute}
				disabled={isRetrying}
				className="inline-flex items-center space-x-2 px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
			>
				<RefreshCcw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
				<span>
					{isRetrying ? `Retrying (${retryCount}/${maxAttempts})...` : label}
				</span>
			</button>
			{error && (
				<p className="text-sm text-red-600 mt-2 mb-6">{error.message}</p>
			)}
		</div>
	);
};
