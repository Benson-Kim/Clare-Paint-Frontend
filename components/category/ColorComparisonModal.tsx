"use client";

import React, { useState } from "react";
import { X, Download, Share2, Palette, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { formatCurrency } from "@/utils/cartUtils";

interface ColorComparisonModalProps {
	products: Product[];
	onClose: () => void;
	onRemoveProduct: (productId: string) => void;
}

export const ColorComparisonModal: React.FC<ColorComparisonModalProps> = ({
	products,
	onClose,
	onRemoveProduct,
}) => {
	const { addItem } = useCartStore();
	const [selectedColors, setSelectedColors] = useState<Record<string, string>>(
		{}
	);
	const [selectedFinishes, setSelectedFinishes] = useState<
		Record<string, string>
	>({});

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleColorSelect = (productId: string, colorId: string) => {
		setSelectedColors((prev) => ({ ...prev, [productId]: colorId }));
	};

	const handleFinishSelect = (productId: string, finishId: string) => {
		setSelectedFinishes((prev) => ({ ...prev, [productId]: finishId }));
	};

	const handleQuickAdd = (product: Product) => {
		const colorId = selectedColors[product.id] || product.colors[0].id;
		const finishId = selectedFinishes[product.id] || product.finishes[0].id;
		const finish = product.finishes.find((f) => f.id === finishId);

		addItem({
			productId: product.id,
			colorId,
			finishId,
			quantity: 1,
			price: product.basePrice + (finish?.price || 0),
		});
	};

	const downloadComparison = () => {
		// In production, this would generate a PDF or image
		console.log("Downloading comparison...");
	};

	const shareComparison = () => {
		if (navigator.share) {
			navigator.share({
				title: "Paint Color Comparison",
				text: "Check out this paint color comparison",
				url: window.location.href,
			});
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="comparison-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div className="flex items-center space-x-3">
						<Palette className="w-6 h-6 text-ds-primary-sage" />
						<div>
							<h2
								id="comparison-title"
								className="text-2xl font-bold text-ds-primary-charcoal"
							>
								Color Comparison
							</h2>
							<p className="text-gray-600">
								Compare up to 3 products side by side
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<button
							onClick={downloadComparison}
							className="p-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200"
							title="Download comparison"
						>
							<Download className="w-5 h-5" />
						</button>
						<button
							onClick={shareComparison}
							className="p-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200"
							title="Share comparison"
						>
							<Share2 className="w-5 h-5" />
						</button>
						<button
							onClick={onClose}
							className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
							aria-label="Close comparison"
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
						{products.map((product) => {
							const selectedColorId =
								selectedColors[product.id] || product.colors[0].id;
							const selectedFinishId =
								selectedFinishes[product.id] || product.finishes[0].id;
							const selectedColor = product.colors.find(
								(c) => c.id === selectedColorId
							);
							const selectedFinish = product.finishes.find(
								(f) => f.id === selectedFinishId
							);

							return (
								<div
									key={product.id}
									className="border border-gray-200 rounded-lg overflow-hidden"
								>
									{/* Product Header */}
									<div className="relative">
										<Image
											src={selectedColor?.image || product.colors[0].image}
											alt={product.name}
											width={400}
											height={300}
											className="w-full h-48 object-cover"
											loading="lazy"
										/>
										<button
											onClick={() => onRemoveProduct(product.id)}
											className="absolute top-2 right-2 p-1 bg-ds-neutral-white/90 rounded-full hover:bg-ds-neutral-white transition-colors duration-200"
											aria-label={`Remove ${product.name} from comparison`}
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
										<div className="flex items-center space-x-2 mb-4">
											<div className="flex items-center space-x-1">
												{[1, 2, 3, 4, 5].map((star) => (
													<Star
														key={star}
														className={cn(
															"w-3 h-3",
															star <= product.rating
																? "text-yellow-400 fill-current"
																: "text-gray-300"
														)}
													/>
												))}
											</div>
											<span className="text-xs text-gray-600">
												{product.rating} ({product.reviewCount})
											</span>
										</div>

										{/* Color Selection */}
										<div className="mb-4">
											<h4 className="text-sm font-medium text-gray-700 mb-2">
												Color: {selectedColor?.name}
											</h4>
											<div className="grid grid-cols-4 gap-2">
												{product.colors.slice(0, 8).map((color) => (
													<button
														key={color.id}
														onClick={() =>
															handleColorSelect(product.id, color.id)
														}
														className={cn(
															"aspect-square rounded border-2 transition-all duration-200",
															selectedColorId === color.id
																? "border-ds-primary-sage ring-2 ring-ds-primary-sage/20"
																: "border-gray-200 hover:border-gray-300"
														)}
														style={{ backgroundColor: color.hex }}
														title={color.name}
														aria-label={`Select ${color.name} for ${product.name}`}
													/>
												))}
											</div>
										</div>

										{/* Finish Selection */}
										<div className="mb-4">
											<h4 className="text-sm font-medium text-gray-700 mb-2">
												Finish: {selectedFinish?.name}
											</h4>
											<select
												value={selectedFinishId}
												onChange={(e) =>
													handleFinishSelect(product.id, e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												aria-label={`Select finish for ${product.name}`}
											>
												{product.finishes.map((finish) => (
													<option key={finish.id} value={finish.id}>
														{finish.name} (+$
														{formatCurrency(finish.price)})
													</option>
												))}
											</select>
										</div>

										{/* Price */}
										<div className="mb-4">
											<p className="text-lg font-bold text-ds-primary-charcoal">
												{formatCurrency(
													product.basePrice + (selectedFinish?.price || 0)
												)}
											</p>
											<p className="text-xs text-gray-600">Per gallon</p>
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
										<div className="space-y-2 text-sm mb-4">
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
										</div>

										{/* Action Button */}
										<button
											onClick={() => handleQuickAdd(product)}
											disabled={!product.inStock}
											className={cn(
												"w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2",
												product.inStock
													? "bg-ds-primary-sage text-ds-neutral-white hover:bg-ds-primary-sage/90"
													: "bg-gray-300 text-gray-500 cursor-not-allowed"
											)}
											aria-label={`Add ${product.name} to cart`}
										>
											<ShoppingCart className="w-4 h-4" />
											<span>Add to Cart</span>
										</button>
									</div>
								</div>
							);
						})}

						{/* Add More Placeholder */}
						{products.length < 3 && (
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
									<Palette className="w-8 h-8 text-gray-400" />
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
							<button className="px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200">
								Order Samples
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
