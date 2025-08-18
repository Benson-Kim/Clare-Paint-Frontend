"use client";

import React from "react";
import { ProductColor } from "@/types/product";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
	colors: ProductColor[];
	selectedColor: ProductColor;
	onColorSelect: (color: ProductColor) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
	colors,
	selectedColor,
	onColorSelect,
}) => {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal">
					Color: {selectedColor.name}
				</h3>
				<div
					className="w-8 h-8 rounded-full border-2 border-gray-200"
					style={{ backgroundColor: selectedColor.hex }}
					aria-label={`Selected color: ${selectedColor.name}`}
				/>
			</div>

			<div className="grid grid-cols-3 gap-3">
				{colors.map((color) => (
					<button
						key={color.id}
						onClick={() => color.inStock && onColorSelect(color)}
						disabled={!color.inStock}
						className={cn(
							"relative p-3 rounded-lg border-2 transition-all duration-200 group",
							color.id === selectedColor.id
								? "border-ds-primary-sage bg-ds-primary-sage/5"
								: "border-gray-200 hover:border-gray-300",
							!color.inStock && "opacity-50 cursor-not-allowed"
						)}
						aria-label={`Select ${color.name} color${
							!color.inStock ? " (out of stock)" : ""
						}`}
					>
						<div className="flex flex-col items-center space-y-2">
							<div
								className={cn(
									"w-12 h-12 rounded-full border-2 transition-all duration-200",
									color.id === selectedColor.id
										? "border-ds-primary-sage ring-2 ring-ds-primary-sage/20"
										: "border-gray-200 group-hover:border-gray-300"
								)}
								style={{ backgroundColor: color.hex }}
							/>
							<div className="text-center">
								<p className="text-sm font-medium text-ds-primary-charcoal">
									{color.name}
								</p>
								{!color.inStock && (
									<p className="text-xs text-red-600 font-medium">
										Out of Stock
									</p>
								)}
							</div>
						</div>

						{color.id === selectedColor.id && (
							<div className="absolute inset-0 rounded-lg ring-2 ring-ds-primary-sage/20" />
						)}
					</button>
				))}
			</div>

			{/* Color Information */}
			<div className="bg-gray-50 p-4 rounded-lg">
				<h4 className="text-sm font-semibold text-ds-primary-charcoal mb-2">
					Color Details
				</h4>
				<div className="space-y-1 text-sm text-gray-600">
					<p>
						<span className="font-medium">Hex:</span> {selectedColor.hex}
					</p>
					<p>
						<span className="font-medium">RGB:</span> {selectedColor.rgb.r},{" "}
						{selectedColor.rgb.g}, {selectedColor.rgb.b}
					</p>
					<p
						className={cn(
							"font-medium",
							selectedColor.inStock ? "text-green-600" : "text-red-600"
						)}
					>
						{selectedColor.inStock ? "In Stock" : "Out of Stock"}
					</p>
				</div>
			</div>
		</div>
	);
};
