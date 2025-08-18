"use client";

import React from "react";
import { X, Download, Share2 } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ColorComparisonProps {
	products: Product[];
	onClose: () => void;
	onRemoveProduct: (productId: string) => void;
}

export const ColorComparison: React.FC<ColorComparisonProps> = ({
	products,
	onClose,
	onRemoveProduct,
}) => {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
		>
			<div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div>
						<h2 className="text-2xl font-bold text-ds-primary-charcoal">
							Color Comparison
						</h2>
						<p className="text-gray-600 mt-1">
							Compare up to 3 products side by side
						</p>
					</div>
					<div className="flex items-center space-x-3">
						<button className="p-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200">
							<Download className="w-5 h-5" />
						</button>
						<button className="p-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200">
							<Share2 className="w-5 h-5" />
						</button>
						<button
							onClick={onClose}
							className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Comparison Grid */}
				<div className="p-6">
					<div
						className={cn(
							"grid gap-6",
							products.length === 1 && "grid-cols-1 max-w-md mx-auto",
							products.length === 2 && "grid-cols-1 md:grid-cols-2",
							products.length === 3 && "grid-cols-1 md:grid-cols-3"
						)}
					>
						{products.map((product) => (
							<div
								key={product.id}
								className="border border-gray-200 rounded-lg overflow-hidden"
							>
								{/* Product Header */}
								<div className="relative">
									<Image
										src={product.colors[0].image}
										alt={product.name}
										height={192}
										width={334}
										className="object-cover"
										// className="w-full h-48 object-cover"
									/>
									<button
										onClick={() => onRemoveProduct(product.id)}
										className="absolute top-2 right-2 p-1 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
									>
										<X className="w-4 h-4 text-gray-600" />
									</button>
								</div>

								{/* Product Info */}
								<div className="p-4">
									<div className="mb-3">
										<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
											{product.brand}
										</span>
									</div>
									<h3 className="font-semibold text-ds-primary-charcoal mb-2">
										{product.name}
									</h3>
									<p className="text-2xl font-bold text-ds-primary-charcoal mb-4">
										${product.basePrice.toFixed(2)}
									</p>

									{/* Color Swatches */}
									<div className="mb-4">
										<h4 className="text-sm font-medium text-gray-700 mb-2">
											Available Colors
										</h4>
										<div className="grid grid-cols-4 gap-2">
											{product.colors.slice(0, 8).map((color) => (
												<div key={color.id} className="text-center">
													<div
														className="w-full h-8 rounded border border-gray-200 mb-1"
														style={{ backgroundColor: color.hex }}
														title={color.name}
													/>
													<span className="text-xs text-gray-600 truncate block">
														{color.name}
													</span>
												</div>
											))}
										</div>
										{product.colors.length > 8 && (
											<p className="text-xs text-gray-500 mt-2">
												+{product.colors.length - 8} more colors
											</p>
										)}
									</div>

									{/* Finishes */}
									<div className="mb-4">
										<h4 className="text-sm font-medium text-gray-700 mb-2">
											Available Finishes
										</h4>
										<div className="space-y-1">
											{product.finishes.map((finish) => (
												<div
													key={finish.id}
													className="flex justify-between items-center text-sm"
												>
													<span className="text-gray-600">{finish.name}</span>
													<span className="text-ds-primary-charcoal font-medium">
														{finish.price > 0 ? `+$${finish.price}` : "Base"}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Key Features */}
									<div className="mb-4">
										<h4 className="text-sm font-medium text-gray-700 mb-2">
											Key Features
										</h4>
										<ul className="space-y-1">
											{product.features.slice(0, 3).map((feature, index) => (
												<li
													key={index}
													className="text-xs text-gray-600 flex items-start"
												>
													<span className="w-1 h-1 bg-ds-primary-sage rounded-full mt-2 mr-2 flex-shrink-0" />
													{feature}
												</li>
											))}
										</ul>
									</div>

									{/* Specs */}
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600">Coverage:</span>
											<span className="text-ds-primary-charcoal">
												{product.coverage}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Dry Time:</span>
											<span className="text-ds-primary-charcoal">
												{product.dryTime}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Rating:</span>
											<span className="text-ds-primary-charcoal">
												{product.rating}/5 ({product.reviewCount})
											</span>
										</div>
									</div>

									{/* Action Button */}
									<button className="w-full mt-4 py-2 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200">
										View Details
									</button>
								</div>
							</div>
						))}

						{/* Add More Placeholder */}
						{products.length < 3 && (
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
									<X className="w-8 h-8 text-gray-400 rotate-45" />
								</div>
								<h3 className="font-medium text-gray-700 mb-2">
									Add Another Product
								</h3>
								<p className="text-sm text-gray-500 mb-4">
									Compare up to 3 products to find the perfect match
								</p>
								<button
									onClick={onClose}
									className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-sm font-medium"
								>
									Browse Products
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className="border-t border-gray-200 p-6 bg-gray-50">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="text-sm text-gray-600">
							Need help deciding? Our color experts are here to help.
						</div>
						<div className="flex space-x-3">
							<button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
								Get Consultation
							</button>
							<button className="px-4 py-2 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200">
								Order Samples
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
