"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
	currentStep: number;
	totalSteps: number;
	className?: string;
	style?: React.CSSProperties;
	steps?: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
	currentStep,
	totalSteps,
	className = "",
	style = {},
	steps = [],
}) => {
	const defaultSteps = ["Shipping", "Payment", "Review", "Confirmation"];
	const stepLabels =
		steps.length > 0 ? steps : defaultSteps.slice(0, totalSteps);

	return (
		<div
			className={cn(
				"bg-ds-neutral-white border-b border-ds-neutral-lightGray py-4",
				className
			)}
			style={style}
			role="progressbar"
			aria-valuenow={currentStep}
			aria-valuemin={1}
			aria-valuemax={totalSteps}
			aria-label={`Step ${currentStep} of ${totalSteps}: ${
				stepLabels[currentStep - 1]
			}`}
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{stepLabels.map((step, index) => {
						const stepNumber = index + 1;
						const isCompleted = stepNumber < currentStep;
						const isCurrent = stepNumber === currentStep;
						const isUpcoming = stepNumber > currentStep;

						return (
							<div key={stepNumber} className="flex items-center">
								{/* Step Circle */}
								<div className="flex flex-col items-center">
									<div
										className={cn(
											"w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
											isCompleted && "bg-ds-primary-sage text-ds-neutral-white",
											isCurrent &&
												"bg-ds-primary-sage text-ds-neutral-white ring-4 ring-ds-primary-sage/20",
											isUpcoming &&
												"bg-ds-neutral-lightGray text-ds-neutral-mediumGray"
										)}
									>
										{isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
									</div>

									{/* Step Label */}
									<span
										className={cn(
											"mt-2 text-xs font-medium transition-colors duration-300",
											(isCompleted || isCurrent) && "text-ds-primary-charcoal",
											isUpcoming && "text-ds-neutral-mediumGray"
										)}
									>
										{step}
									</span>
								</div>

								{/* Connector Line */}
								{index < stepLabels.length - 1 && (
									<div
										className={cn(
											"flex-1 h-0.5 mx-4 transition-colors duration-300",
											stepNumber < currentStep && "bg-ds-primary-sage",
											stepNumber >= currentStep && "bg-ds-neutral-lightGray"
										)}
										aria-hidden="true"
									/>
								)}
							</div>
						);
					})}
				</div>

				{/* Progress Bar */}
				<div className="mt-4">
					<div className="w-full bg-ds-neutral-lightGray rounded-full h-2">
						<div
							className="bg-ds-primary-sage h-2 rounded-full transition-all duration-500 ease-out"
							style={{
								width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
