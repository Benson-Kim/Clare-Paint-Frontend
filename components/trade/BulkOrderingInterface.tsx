"use client";

import React, { useState } from "react";
import {
	Package,
	ShoppingCart,
	Plus,
	Minus,
	X,
	Upload,
	Download,
	FileText,
	Calculator,
	Truck,
	Clock,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkOrderItem {
	id: string;
	productId: string;
	productName: string;
	brand: string;
	color: string;
	finish: string;
	size: string;
	unitPrice: number;
	quantity: number;
	discount: number;
	totalPrice: number;
	inStock: boolean;
	leadTime: string;
}

interface SavedOrderTemplate {
	id: string;
	name: string;
	description: string;
	items: BulkOrderItem[];
	totalValue: number;
	lastUsed: string;
}

export const BulkOrderingInterface: React.FC = () => {
	const [activeTab, setActiveTab] = useState<
		"quick" | "templates" | "upload" | "history"
	>("quick");
	const [orderItems, setOrderItems] = useState<BulkOrderItem[]>([]);
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	const [showQuoteRequest, setShowQuoteRequest] = useState(false);

	const mockBulkProducts = [
		{
			id: "bulk-001",
			name: "Premium Interior Latex - 5 Gallon",
			brand: "Artisan Pro",
			colors: ["White", "Antique White", "Eggshell", "Dove Gray"],
			finishes: ["Flat", "Eggshell", "Satin"],
			unitPrice: 399.99,
			bulkPrice: 359.99,
			inStock: true,
			leadTime: "2-3 days",
		},
		{
			id: "bulk-002",
			name: "Exterior Acrylic Latex - 5 Gallon",
			brand: "WeatherGuard Pro",
			colors: ["White", "Cream", "Light Gray", "Sage Green"],
			finishes: ["Satin", "Semi-Gloss"],
			unitPrice: 449.99,
			bulkPrice: 404.99,
			inStock: true,
			leadTime: "3-5 days",
		},
		{
			id: "bulk-003",
			name: "Primer Sealer - 5 Gallon",
			brand: "PrimeShield",
			colors: ["White", "Gray"],
			finishes: ["Flat"],
			unitPrice: 299.99,
			bulkPrice: 269.99,
			inStock: false,
			leadTime: "7-10 days",
		},
	];

	const savedTemplates: SavedOrderTemplate[] = [
		{
			id: "template-1",
			name: "Standard Residential Interior",
			description: "Common paint selection for 2,000 sq ft home",
			items: [],
			totalValue: 2500,
			lastUsed: "2024-01-15",
		},
		{
			id: "template-2",
			name: "Commercial Office Complex",
			description: "Neutral colors for office environments",
			items: [],
			totalValue: 8500,
			lastUsed: "2024-01-10",
		},
		{
			id: "template-3",
			name: "Exterior Refresh Package",
			description: "Complete exterior painting solution",
			items: [],
			totalValue: 5200,
			lastUsed: "2024-01-08",
		},
	];

	const addToOrder = (
		product: any,
		color: string,
		finish: string,
		quantity: number
	) => {
		const newItem: BulkOrderItem = {
			id: Date.now().toString(),
			productId: product.id,
			productName: product.name,
			brand: product.brand,
			color,
			finish,
			size: "5 Gallon",
			unitPrice: product.unitPrice,
			quantity,
			discount: 10, // Based on tier
			totalPrice: product.bulkPrice * quantity,
			inStock: product.inStock,
			leadTime: product.leadTime,
		};
		setOrderItems([...orderItems, newItem]);
	};

	const updateQuantity = (itemId: string, newQuantity: number) => {
		setOrderItems((items) =>
			items.map((item) =>
				item.id === itemId
					? {
							...item,
							quantity: newQuantity,
							totalPrice:
								item.unitPrice * newQuantity * (1 - item.discount / 100),
					  }
					: item
			)
		);
	};

	const removeItem = (itemId: string) => {
		setOrderItems((items) => items.filter((item) => item.id !== itemId));
	};

	const totalOrderValue = orderItems.reduce(
		(sum, item) => sum + item.totalPrice,
		0
	);
	const totalSavings = orderItems.reduce(
		(sum, item) =>
			sum +
			(item.unitPrice - item.unitPrice * (1 - item.discount / 100)) *
				item.quantity,
		0
	);

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Package className="w-6 h-6 text-ds-primary-sage" />
					<h2 className="text-2xl font-bold text-ds-primary-charcoal">
						Bulk Ordering
					</h2>
				</div>
				<div className="flex items-center space-x-4">
					<button
						onClick={() => setShowQuoteRequest(true)}
						className="flex items-center space-x-4 px-8 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium"
					>
						<FileText className="w-4 h-4" />
						<span>Request Quote</span>
					</button>
					<button className="flex items-center space-x-4 px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
						<ShoppingCart className="w-4 h-4" />
						<span>Place Order</span>
					</button>
				</div>
			</div>

			{/* Tab Navigation */}
			<div className="flex space-x-2 bg-ds-neutral-lightGray/20 rounded-lg p-2">
				{[
					{
						id: "quick",
						label: "Quick Order",
						icon: <ShoppingCart className="w-4 h-4" />,
					},
					{
						id: "templates",
						label: "Templates",
						icon: <FileText className="w-4 h-4" />,
					},
					{
						id: "upload",
						label: "Upload List",
						icon: <Upload className="w-4 h-4" />,
					},
					{
						id: "history",
						label: "Order History",
						icon: <Clock className="w-4 h-4" />,
					},
				].map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id as any)}
						className={cn(
							"flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
							activeTab === tab.id
								? "bg-ds-neutral-white text-ds-primary-sage shadow-sm"
								: "text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
						)}
					>
						{tab.icon}
						<span>{tab.label}</span>
					</button>
				))}
			</div>

			{/* Quick Order Tab */}
			{activeTab === "quick" && (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Product Selection */}
					<div className="lg:col-span-2 space-y-4">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal">
							Select Products
						</h3>
						<div className="space-y-4">
							{mockBulkProducts.map((product) => (
								<div
									key={product.id}
									className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4"
								>
									<div className="flex items-start justify-between mb-4">
										<div>
											<h4 className="font-semibold text-ds-primary-charcoal mb-2">
												{product.name}
											</h4>
											<p className="text-sm text-ds-neutral-mediumGray mb-4">
												{product.brand}
											</p>
											<div className="flex items-center space-x-4 text-sm">
												<span
													className={cn(
														"px-2 py-2 rounded-full text-xs font-medium",
														product.inStock
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													)}
												>
													{product.inStock ? "In Stock" : "Special Order"}
												</span>
												<span className="text-ds-neutral-mediumGray">
													Lead time: {product.leadTime}
												</span>
											</div>
										</div>
										<div className="text-right">
											<p className="text-lg font-bold text-ds-primary-charcoal">
												${product.bulkPrice.toFixed(2)}
											</p>
											<p className="text-sm text-ds-neutral-mediumGray line-through">
												${product.unitPrice.toFixed(2)}
											</p>
											<p className="text-sm text-green-600 font-medium">
												Save $
												{(product.unitPrice - product.bulkPrice).toFixed(2)}
											</p>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<label className="block text-xs font-medium text-ds-neutral-darkSlate mb-2">
												Color
											</label>
											<select className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent">
												{product.colors.map((color) => (
													<option key={color} value={color}>
														{color}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className="block text-xs font-medium text-ds-neutral-darkSlate mb-2">
												Finish
											</label>
											<select className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent">
												{product.finishes.map((finish) => (
													<option key={finish} value={finish}>
														{finish}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className="block text-xs font-medium text-ds-neutral-darkSlate mb-2">
												Quantity
											</label>
											<div className="flex items-center space-x-2">
												<input
													type="number"
													min="1"
													defaultValue="1"
													className="flex-1 px-4 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												/>
												<button
													onClick={() =>
														addToOrder(
															product,
															product.colors[0],
															product.finishes[0],
															1
														)
													}
													className="px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 text-sm font-medium"
												>
													Add
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Order Summary */}
					<div className="space-y-4">
						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4 sticky top-8">
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Order Summary
							</h3>

							{orderItems.length === 0 ? (
								<div className="text-center py-8">
									<Package className="w-12 h-12 text-ds-neutral-lightGray mx-auto mb-4" />
									<p className="text-ds-neutral-mediumGray">
										No items in order
									</p>
								</div>
							) : (
								<div className="space-y-4">
									{orderItems.map((item) => (
										<div
											key={item.id}
											className="flex items-center justify-between p-2 bg-ds-neutral-lightGray/10 rounded-lg"
										>
											<div className="flex-1">
												<h4 className="font-medium text-ds-primary-charcoal text-sm">
													{item.productName}
												</h4>
												<p className="text-xs text-ds-neutral-mediumGray">
													{item.color} / {item.finish}
												</p>
												<div className="flex items-center space-x-4 mt-2">
													<button
														onClick={() =>
															updateQuantity(
																item.id,
																Math.max(1, item.quantity - 1)
															)
														}
														className="p-2 border border-ds-neutral-lightGray rounded hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
													>
														<Minus className="w-3 h-3" />
													</button>
													<span className="text-sm font-medium text-ds-primary-charcoal min-w-[2rem] text-center">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															updateQuantity(item.id, item.quantity + 1)
														}
														className="p-2 border border-ds-neutral-lightGray rounded hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
													>
														<Plus className="w-3 h-3" />
													</button>
												</div>
											</div>
											<div className="text-right">
												<p className="font-bold text-ds-primary-charcoal text-sm">
													${item.totalPrice.toFixed(2)}
												</p>
												<button
													onClick={() => removeItem(item.id)}
													className="text-red-500 hover:text-red-700 transition-colors duration-200 mt-2"
												>
													<X className="w-3 h-3" />
												</button>
											</div>
										</div>
									))}

									<div className="border-t border-ds-neutral-lightGray pt-4 space-y-2">
										<div className="flex justify-between text-sm">
											<span className="text-ds-neutral-mediumGray">
												Subtotal:
											</span>
											<span className="font-medium text-ds-primary-charcoal">
												${(totalOrderValue + totalSavings).toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-ds-neutral-mediumGray">
												Trade Discount:
											</span>
											<span className="font-medium text-green-600">
												-${totalSavings.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between text-lg font-bold">
											<span className="text-ds-primary-charcoal">Total:</span>
											<span className="text-ds-primary-charcoal">
												${totalOrderValue.toFixed(2)}
											</span>
										</div>
									</div>

									<div className="space-y-2">
										<button className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
											Add to Cart
										</button>
										<button className="w-full py-4 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium">
											Save as Template
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Delivery Information */}
						<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4">
							<div className="flex items-center space-x-4 mb-4">
								<Truck className="w-5 h-5 text-ds-primary-sage" />
								<h4 className="font-semibold text-ds-primary-charcoal">
									Delivery Options
								</h4>
							</div>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Standard Delivery:
									</span>
									<span className="text-ds-primary-charcoal">
										3-5 business days
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Job Site Delivery:
									</span>
									<span className="text-ds-primary-charcoal">Available</span>
								</div>
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Free Delivery:
									</span>
									<span className="text-green-600">Orders $1,000+</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Templates Tab */}
			{activeTab === "templates" && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal">
							Saved Order Templates
						</h3>
						<button className="flex items-center space-x-4 px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
							<Plus className="w-4 h-4" />
							<span>Create Template</span>
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{savedTemplates.map((template) => (
							<div
								key={template.id}
								className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
							>
								<div className="flex items-start justify-between mb-4">
									<div>
										<h4 className="font-semibold text-ds-primary-charcoal mb-2">
											{template.name}
										</h4>
										<p className="text-sm text-ds-neutral-mediumGray mb-4">
											{template.description}
										</p>
									</div>
									<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200">
										<FileText className="w-4 h-4" />
									</button>
								</div>

								<div className="space-y-2 mb-4">
									<div className="flex justify-between text-sm">
										<span className="text-ds-neutral-mediumGray">Value:</span>
										<span className="font-bold text-ds-primary-charcoal">
											${template.totalValue.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-ds-neutral-mediumGray">
											Last Used:
										</span>
										<span className="text-ds-neutral-darkSlate">
											{new Date(template.lastUsed).toLocaleDateString()}
										</span>
									</div>
								</div>

								<div className="flex space-x-2">
									<button className="flex-1 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 text-sm font-medium">
										Use Template
									</button>
									<button className="flex-1 py-2 border border-ds-neutral-lightGray text-ds-neutral-darkSlate rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 text-sm font-medium">
										Edit
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Upload Tab */}
			{activeTab === "upload" && (
				<div className="space-y-8">
					<div className="text-center">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
							Upload Order List
						</h3>
						<p className="text-ds-neutral-mediumGray mb-8">
							Upload a CSV or Excel file with your product list for quick
							ordering
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="border-2 border-dashed border-ds-neutral-lightGray rounded-lg p-8 text-center hover:border-ds-primary-sage transition-colors duration-200">
							<input
								type="file"
								accept=".csv,.xlsx,.xls"
								className="hidden"
								id="bulk-upload"
							/>
							<label htmlFor="bulk-upload" className="cursor-pointer">
								<Upload className="w-12 h-12 text-ds-neutral-mediumGray mx-auto mb-4" />
								<p className="text-ds-neutral-mediumGray mb-2">
									Click to upload your order list
								</p>
								<p className="text-sm text-ds-neutral-mediumGray">
									CSV, Excel files up to 10MB
								</p>
							</label>
						</div>

						<div className="space-y-4">
							<h4 className="font-semibold text-ds-primary-charcoal">
								File Format Requirements
							</h4>
							<ul className="space-y-2 text-sm text-ds-neutral-darkSlate">
								<li className="flex items-start space-x-2">
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-2 flex-shrink-0" />
									<span>
										Include columns: Product Code, Color, Finish, Quantity
									</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-2 flex-shrink-0" />
									<span>Use our product codes for accurate matching</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-2 flex-shrink-0" />
									<span>Maximum 500 items per upload</span>
								</li>
							</ul>
							<button className="flex items-center space-x-4 px-8 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium">
								<Download className="w-4 h-4" />
								<span>Download Template</span>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Order History Tab */}
			{activeTab === "history" && (
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-ds-primary-charcoal">
						Recent Bulk Orders
					</h3>
					<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg overflow-hidden">
						<table className="w-full">
							<thead className="bg-ds-neutral-lightGray/20">
								<tr>
									<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
										Order ID
									</th>
									<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
										Date
									</th>
									<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
										Items
									</th>
									<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
										Total
									</th>
									<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
										Status
									</th>
									<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-ds-neutral-lightGray">
									<td className="p-4 text-sm text-ds-primary-charcoal font-medium">
										BO-2024-001
									</td>
									<td className="p-4 text-sm text-ds-neutral-darkSlate">
										Jan 15, 2024
									</td>
									<td className="p-4 text-sm text-ds-neutral-darkSlate">
										25 items
									</td>
									<td className="p-4 text-sm text-ds-primary-charcoal font-medium">
										$8,450.00
									</td>
									<td className="p-4">
										<span className="px-2 py-2 bg-green-100 text-green-800 rounded-full text-xs font-medium">
											Delivered
										</span>
									</td>
									<td className="p-4">
										<div className="flex items-center space-x-2">
											<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200">
												<Eye className="w-4 h-4" />
											</button>
											<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200">
												<Download className="w-4 h-4" />
											</button>
										</div>
									</td>
								</tr>
								<tr className="border-b border-ds-neutral-lightGray">
									<td className="p-4 text-sm text-ds-primary-charcoal font-medium">
										BO-2024-002
									</td>
									<td className="p-4 text-sm text-ds-neutral-darkSlate">
										Jan 22, 2024
									</td>
									<td className="p-4 text-sm text-ds-neutral-darkSlate">
										18 items
									</td>
									<td className="p-4 text-sm text-ds-primary-charcoal font-medium">
										$6,200.00
									</td>
									<td className="p-4">
										<span className="px-2 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
											Shipped
										</span>
									</td>
									<td className="p-4">
										<div className="flex items-center space-x-2">
											<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200">
												<Eye className="w-4 h-4" />
											</button>
											<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200">
												<Download className="w-4 h-4" />
											</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Quote Request Modal */}
			{showQuoteRequest && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
					<div className="bg-ds-neutral-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
							<h3 className="text-xl font-bold text-ds-primary-charcoal">
								Request Custom Quote
							</h3>
							<button
								onClick={() => setShowQuoteRequest(false)}
								className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
						<div className="p-8">
							<p className="text-ds-neutral-mediumGray mb-8">
								Need a custom quote for a large project? Our trade specialists
								will provide competitive pricing and delivery options tailored
								to your needs.
							</p>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
										Project Description
									</label>
									<textarea
										rows={4}
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										placeholder="Describe your project requirements..."
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
											Estimated Volume (gallons)
										</label>
										<input
											type="number"
											className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
											Timeline
										</label>
										<select className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent">
											<option>ASAP</option>
											<option>Within 1 week</option>
											<option>Within 1 month</option>
											<option>Flexible</option>
										</select>
									</div>
								</div>
								<button className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
									Submit Quote Request
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
