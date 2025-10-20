"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	min?: number;
	max?: number;
	disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
	quantity,
	onQuantityChange,
	min = 1,
	max = 10,
	disabled = false,
}) => {
	const decreaseQuantity = () => {
		if (quantity > min) {
			onQuantityChange(quantity - 1);
		}
	};

	const increaseQuantity = () => {
		if (quantity < max) {
			onQuantityChange(quantity + 1);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= min && value <= max) {
			onQuantityChange(value);
		}
	};

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-ds-primary-charcoal">
				Quantity
			</label>
			<div className="flex items-center space-x-3">
				<button
					onClick={decreaseQuantity}
					disabled={disabled || quantity <= min}
					className={cn(
						"w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
						disabled || quantity <= min
							? "border-gray-200 text-gray-400 cursor-not-allowed"
							: "border-gray-300 text-ds-primary-charcoal hover:border-ds-primary-sage hover:bg-ds-primary-sage/5"
					)}
					aria-label="Decrease quantity"
				>
					<Minus className="w-4 h-4" />
				</button>

				<input
					type="number"
					min={min}
					max={max}
					value={quantity}
					onChange={handleInputChange}
					disabled={disabled}
					className={cn(
						"w-16 h-10 text-center border-2 rounded-lg font-semibold transition-all duration-200",
						disabled
							? "border-gray-200 bg-gray-50 text-gray-400"
							: "border-gray-300 text-ds-primary-charcoal focus:border-ds-primary-sage focus:outline-none focus:ring-2 focus:ring-ds-primary-sage/20"
					)}
					aria-label="Product quantity"
				/>

				<button
					onClick={increaseQuantity}
					disabled={disabled || quantity >= max}
					className={cn(
						"w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
						disabled || quantity >= max
							? "border-gray-200 text-gray-400 cursor-not-allowed"
							: "border-gray-300 text-ds-primary-charcoal hover:border-ds-primary-sage hover:bg-ds-primary-sage/5"
					)}
					aria-label="Increase quantity"
				>
					<Plus className="w-4 h-4" />
				</button>
			</div>

			{/* Coverage Calculator */}
			<div className="bg-ds-primary-cream/30 p-3 rounded-lg mt-3">
				<p className="text-sm text-ds-primary-charcoal">
					<span className="font-medium">Coverage:</span> Approximately{" "}
					{350 * quantity}-{400 * quantity} sq ft
				</p>
				<p className="text-xs text-gray-600 mt-1">
					Based on {quantity} litre{quantity !== 1 ? "s" : ""}
				</p>
			</div>
		</div>
	);
};
