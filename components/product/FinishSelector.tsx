"use client";

import React from "react";
import { ProductFinish } from "@/types/product";
import { cn } from "@/lib/utils";

interface FinishSelectorProps {
	finishes: ProductFinish[];
	selectedFinish: ProductFinish;
	onFinishSelect: (finish: ProductFinish) => void;
	basePrice: number;
}

export const FinishSelector: React.FC<FinishSelectorProps> = ({
	finishes,
	selectedFinish,
	onFinishSelect,
	basePrice,
}) => {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-ds-primary-charcoal">
				Finish: {selectedFinish.name}
			</h3>

			<div className="space-y-3">
				{finishes.map((finish) => {
					const totalPrice = basePrice + finish.price;
					const isPremium = finish.price > 0;

					return (
						<button
							key={finish.id}
							onClick={() => onFinishSelect(finish)}
							className={cn(
								"w-full p-4 rounded-lg border-2 text-left transition-all duration-200 group",
								finish.id === selectedFinish.id
									? "border-ds-primary-sage bg-ds-primary-sage/5"
									: "border-gray-200 hover:border-gray-300"
							)}
							aria-label={`Select ${finish.name} finish - $${totalPrice.toFixed(
								2
							)}`}
						>
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<span className="font-semibold text-ds-primary-charcoal">
										{finish.name}
									</span>
									{isPremium && (
										<span className="px-2 py-1 bg-ds-accent-warmBeige text-white text-xs font-medium rounded-full">
											Premium
										</span>
									)}
								</div>
								<div className="text-right">
									<p className="font-bold text-ds-primary-charcoal">
										${totalPrice.toFixed(2)}
									</p>
									{finish.price > 0 && (
										<p className="text-xs text-gray-500">
											+${finish.price.toFixed(2)}
										</p>
									)}
								</div>
							</div>

							<p className="text-sm text-gray-600 mb-2">{finish.description}</p>

							<div className="flex items-center space-x-4 text-xs text-gray-500">
								<span>Sheen: {finish.sheen}</span>
								<span>Coverage: {finish.coverage}</span>
							</div>

							{finish.id === selectedFinish.id && (
								<div className="absolute inset-0 rounded-lg ring-2 ring-ds-primary-sage/20 pointer-events-none" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};
