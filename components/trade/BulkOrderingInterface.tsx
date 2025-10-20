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
	Truck,
	Clock,
	CheckCircle,
	Eye,
	Edit,
	Trash2,
	Save,
	AlertCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/cartUtils";

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
	createdAt: string;
}

interface UploadValidation {
	isValid: boolean;
	errors: string[];
	warnings: string[];
	validRows: number;
	totalRows: number;
}

export const BulkOrderingInterface: React.FC = () => {
	const { addItem } = useCartStore();
	const [activeTab, setActiveTab] = useState<
		"quick" | "templates" | "upload" | "history"
	>("quick");
	const [orderItems, setOrderItems] = useState<BulkOrderItem[]>([]);
	// const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	const [showQuoteRequest, setShowQuoteRequest] = useState(false);
	const [showTemplateForm, setShowTemplateForm] = useState(false);
	const [showEditTemplate, setShowEditTemplate] = useState<string | null>(null);
	const [uploadValidation, setUploadValidation] =
		useState<UploadValidation | null>(null);
	const [templateName, setTemplateName] = useState("");
	const [templateDescription, setTemplateDescription] = useState("");
	const [savedTemplates, setSavedTemplates] = useState<SavedOrderTemplate[]>([
		{
			id: "template-1",
			name: "Standard Residential Interior",
			description: "Common paint selection for 2,000 sq ft home",
			items: [],
			totalValue: 2500,
			lastUsed: "2024-01-15",
			createdAt: "2024-01-01",
		},
		{
			id: "template-2",
			name: "Commercial Office Complex",
			description: "Neutral colors for office environments",
			items: [],
			totalValue: 8500,
			lastUsed: "2024-01-10",
			createdAt: "2024-01-02",
		},
		{
			id: "template-3",
			name: "Exterior Refresh Package",
			description: "Complete exterior painting solution",
			items: [],
			totalValue: 5200,
			lastUsed: "2024-01-08",
			createdAt: "2024-01-03",
		},
	]);

	const mockBulkProducts = [
		{
			id: "bulk-001",
			name: "Premium Interior Latex - 5 litre",
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
			name: "Exterior Acrylic Latex - 5 litre",
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
			name: "Primer Sealer - 5 litre",
			brand: "PrimeShield",
			colors: ["White", "Gray"],
			finishes: ["Flat"],
			unitPrice: 299.99,
			bulkPrice: 269.99,
			inStock: false,
			leadTime: "7-10 days",
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
			size: "5 litre",
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

	const addToCart = () => {
		orderItems.forEach((item) => {
			addItem({
				productId: item.productId,
				colorId: "default-color", // Would map to actual color ID
				finishId: "default-finish", // Would map to actual finish ID
				quantity: item.quantity,
				price: item.totalPrice / item.quantity,
			});
		});
		setOrderItems([]);
		alert("Items added to cart successfully!");
	};

	const saveAsTemplate = () => {
		if (orderItems.length === 0) {
			alert("Please add items to save as template");
			return;
		}
		setShowTemplateForm(true);
	};

	const handleSaveTemplate = () => {
		if (!templateName.trim()) {
			alert("Please enter a template name");
			return;
		}

		const newTemplate: SavedOrderTemplate = {
			id: Date.now().toString(),
			name: templateName,
			description: templateDescription,
			items: [...orderItems],
			totalValue: totalOrderValue,
			lastUsed: new Date().toISOString().split("T")[0],
			createdAt: new Date().toISOString().split("T")[0],
		};

		setSavedTemplates([...savedTemplates, newTemplate]);
		setShowTemplateForm(false);
		setTemplateName("");
		setTemplateDescription("");
		alert("Template saved successfully!");
	};

	const useTemplate = (templateId: string) => {
		const template = savedTemplates.find((t) => t.id === templateId);
		if (template) {
			setOrderItems([...template.items]);
			// Update last used date
			setSavedTemplates((templates) =>
				templates.map((t) =>
					t.id === templateId
						? { ...t, lastUsed: new Date().toISOString().split("T")[0] }
						: t
				)
			);
		}
	};

	const editTemplate = (templateId: string) => {
		const template = savedTemplates.find((t) => t.id === templateId);
		if (template) {
			setTemplateName(template.name);
			setTemplateDescription(template.description);
			setOrderItems([...template.items]);
			setShowEditTemplate(templateId);
		}
	};

	const updateTemplate = () => {
		if (!showEditTemplate || !templateName.trim()) return;

		setSavedTemplates((templates) =>
			templates.map((t) =>
				t.id === showEditTemplate
					? {
							...t,
							name: templateName,
							description: templateDescription,
							items: [...orderItems],
							totalValue: totalOrderValue,
					  }
					: t
			)
		);
		setShowEditTemplate(null);
		setTemplateName("");
		setTemplateDescription("");
		alert("Template updated successfully!");
	};

	const deleteTemplate = (templateId: string) => {
		if (confirm("Are you sure you want to delete this template?")) {
			setSavedTemplates((templates) =>
				templates.filter((t) => t.id !== templateId)
			);
		}
	};

	const validateUploadFile = (file: File): UploadValidation => {
		const validation: UploadValidation = {
			isValid: true,
			errors: [],
			warnings: [],
			validRows: 0,
			totalRows: 0,
		};

		// Check file type
		const allowedTypes = [".csv", ".xlsx", ".xls"];
		const fileExtension = file.name
			.toLowerCase()
			.substring(file.name.lastIndexOf("."));

		if (!allowedTypes.includes(fileExtension)) {
			validation.isValid = false;
			validation.errors.push(
				`Invalid file type. Please upload ${allowedTypes.join(
					", "
				)} files only.`
			);
		}

		// Check file size (10MB limit)
		const maxSize = 10 * 1024 * 1024; // 10MB in bytes
		if (file.size > maxSize) {
			validation.isValid = false;
			validation.errors.push("File size exceeds 10MB limit.");
		}

		// Simulate content validation
		validation.totalRows = Math.floor(Math.random() * 100) + 50;
		validation.validRows = Math.floor(validation.totalRows * 0.9);

		if (validation.validRows < validation.totalRows) {
			validation.warnings.push(
				`${
					validation.totalRows - validation.validRows
				} rows have formatting issues and will be skipped.`
			);
		}

		if (validation.totalRows > 500) {
			validation.isValid = false;
			validation.errors.push(
				"File contains more than 500 items. Please split into smaller files."
			);
		}

		return validation;
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const validation = validateUploadFile(file);
			setUploadValidation(validation);
		}
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
						className="flex items-center space-x-2 px-6 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium"
					>
						<FileText className="w-4 h-4" />
						<span>Request Quote</span>
					</button>
					<button
						onClick={addToCart}
						disabled={orderItems.length === 0}
						className="flex items-center space-x-2 px-6 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 disabled:bg-ds-neutral-lightGray disabled:cursor-not-allowed transition-colors duration-200 font-medium"
					>
						<ShoppingCart className="w-4 h-4" />
						<span>Add to Cart</span>
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
						onClick={() =>
							setActiveTab(
								tab.id as "quick" | "templates" | "upload" | "history"
							)
						}
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
														"px-2 py-1 rounded-full text-xs font-medium",
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
												{formatCurrency(product.bulkPrice)}
											</p>
											<p className="text-sm text-ds-neutral-mediumGray line-through">
												{formatCurrency(product.unitPrice)}
											</p>
											<p className="text-sm text-green-600 font-medium">
												Save
												{formatCurrency(product.unitPrice - product.bulkPrice)}
											</p>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<label className="block text-xs font-medium text-ds-neutral-darkSlate mb-2">
												Color
											</label>
											<select className="w-full px-3 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent">
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
											<select className="w-full px-3 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent">
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
													className="flex-1 px-3 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
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

					{/* Order Summary and Delivery Options */}
					<div className="space-y-6">
						{/* Order Summary */}
						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6 sticky top-8">
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
											className="flex items-center justify-between p-3 bg-ds-neutral-lightGray/10 rounded-lg"
										>
											<div className="flex-1">
												<h4 className="font-medium text-ds-primary-charcoal text-sm">
													{item.productName}
												</h4>
												<p className="text-xs text-ds-neutral-mediumGray">
													{item.color} / {item.finish}
												</p>
												<div className="flex items-center space-x-2 mt-2">
													<button
														onClick={() =>
															updateQuantity(
																item.id,
																Math.max(1, item.quantity - 1)
															)
														}
														className="p-1 border border-ds-neutral-lightGray rounded hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
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
														className="p-1 border border-ds-neutral-lightGray rounded hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
													>
														<Plus className="w-3 h-3" />
													</button>
												</div>
											</div>
											<div className="text-right">
												<p className="font-bold text-ds-primary-charcoal text-sm">
													{formatCurrency(item.totalPrice)}
												</p>
												<button
													onClick={() => removeItem(item.id)}
													className="text-red-500 hover:text-red-700 transition-colors duration-200 mt-1"
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
												{formatCurrency(totalOrderValue + totalSavings)}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-ds-neutral-mediumGray">
												Trade Discount:
											</span>
											<span className="font-medium text-green-600">
												-{formatCurrency(totalSavings)}
											</span>
										</div>
										<div className="flex justify-between text-lg font-bold">
											<span className="text-ds-primary-charcoal">Total:</span>
											<span className="text-ds-primary-charcoal">
												{formatCurrency(totalOrderValue)}
											</span>
										</div>
									</div>

									<div className="space-y-2">
										<button
											onClick={addToCart}
											className="w-full py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
										>
											Add to Cart
										</button>
										<button
											onClick={saveAsTemplate}
											className="w-full py-3 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium"
										>
											Save as Template
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Delivery Information */}
						<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-6">
							<div className="flex items-center space-x-3 mb-4">
								<Truck className="w-5 h-5 text-ds-primary-sage" />
								<h4 className="font-semibold text-ds-primary-charcoal">
									Delivery Options
								</h4>
							</div>
							<div className="space-y-3 text-sm">
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
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal">
							Saved Order Templates
						</h3>
						<button
							onClick={() => setShowTemplateForm(true)}
							className="flex items-center space-x-2 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
						>
							<Plus className="w-4 h-4" />
							<span>Create Template</span>
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{savedTemplates.map((template) => (
							<div
								key={template.id}
								className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
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
									<div className="flex items-center space-x-1">
										<button
											onClick={() => editTemplate(template.id)}
											className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200"
											aria-label="Edit template"
										>
											<Edit className="w-4 h-4" />
										</button>
										<button
											onClick={() => deleteTemplate(template.id)}
											className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
											aria-label="Delete template"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
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
									<div className="flex justify-between text-sm">
										<span className="text-ds-neutral-mediumGray">Created:</span>
										<span className="text-ds-neutral-darkSlate">
											{new Date(template.createdAt).toLocaleDateString()}
										</span>
									</div>
								</div>

								<div className="flex space-x-2">
									<button
										onClick={() => useTemplate(template.id)}
										className="flex-1 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 text-sm font-medium"
									>
										Use Template
									</button>
									<button
										onClick={() => editTemplate(template.id)}
										className="flex-1 py-2 border border-ds-neutral-lightGray text-ds-neutral-darkSlate rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 text-sm font-medium"
									>
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
								onChange={handleFileUpload}
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
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-0.5 flex-shrink-0" />
									<span>
										Include columns: Product Code, Color, Finish, Quantity
									</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-0.5 flex-shrink-0" />
									<span>Use our product codes for accurate matching</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-0.5 flex-shrink-0" />
									<span>Maximum 500 items per upload</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-0.5 flex-shrink-0" />
									<span>File size limit: 10MB</span>
								</li>
							</ul>
							<button className="flex items-center space-x-2 px-6 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium">
								<Download className="w-4 h-4" />
								<span>Download Template</span>
							</button>
						</div>
					</div>

					{/* Upload Validation Results */}
					{uploadValidation && (
						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6">
							<h4 className="font-semibold text-ds-primary-charcoal mb-4">
								File Validation Results
							</h4>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-ds-neutral-mediumGray">
										Total Rows:
									</span>
									<span className="font-medium text-ds-primary-charcoal">
										{uploadValidation.totalRows}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-ds-neutral-mediumGray">
										Valid Rows:
									</span>
									<span className="font-medium text-green-600">
										{uploadValidation.validRows}
									</span>
								</div>

								{uploadValidation.errors.length > 0 && (
									<div className="bg-red-50 border border-red-200 rounded-lg p-4">
										<h5 className="font-medium text-red-800 mb-2 flex items-center space-x-2">
											<AlertCircle className="w-4 h-4" />
											<span>Errors</span>
										</h5>
										<ul className="text-sm text-red-700 space-y-1">
											{uploadValidation.errors.map((error, index) => (
												<li key={index}>• {error}</li>
											))}
										</ul>
									</div>
								)}

								{uploadValidation.warnings.length > 0 && (
									<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
										<h5 className="font-medium text-yellow-800 mb-2 flex items-center space-x-2">
											<AlertCircle className="w-4 h-4" />
											<span>Warnings</span>
										</h5>
										<ul className="text-sm text-yellow-700 space-y-1">
											{uploadValidation.warnings.map((warning, index) => (
												<li key={index}>• {warning}</li>
											))}
										</ul>
									</div>
								)}

								{uploadValidation.isValid && (
									<button className="w-full py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
										Process Upload ({uploadValidation.validRows} items)
									</button>
								)}
							</div>
						</div>
					)}
				</div>
			)}

			{/* Order History Tab */}
			{activeTab === "history" && (
				<div className="space-y-6">
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
										<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
											Delivered
										</span>
									</td>
									<td className="p-4">
										<div className="flex items-center space-x-2">
											<button
												className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200"
												aria-label="View order details"
											>
												<Eye className="w-4 h-4" />
											</button>
											<button
												onClick={() => {
													// Create a mock receipt download
													const link = document.createElement("a");
													link.href =
														"data:text/plain;charset=utf-8,Order Receipt - BO-2024-001\nTotal: $8,450.00\nDate: Jan 15, 2024";
													link.download = "receipt-BO-2024-001.txt";
													link.click();
												}}
												className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200"
												aria-label="Download receipt"
											>
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
										<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
											Shipped
										</span>
									</td>
									<td className="p-4">
										<div className="flex items-center space-x-2">
											<button
												className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200"
												aria-label="View order details"
											>
												<Eye className="w-4 h-4" />
											</button>
											<button
												onClick={() => {
													const link = document.createElement("a");
													link.href =
														"data:text/plain;charset=utf-8,Order Receipt - BO-2024-002\nTotal: $6,200.00\nDate: Jan 22, 2024";
													link.download = "receipt-BO-2024-002.txt";
													link.click();
												}}
												className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200"
												aria-label="Download receipt"
											>
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

			{/* Template Form Modal */}
			{(showTemplateForm || showEditTemplate) && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
					<div className="bg-ds-neutral-white rounded-lg max-w-md w-full">
						<div className="flex items-center justify-between p-6 border-b border-ds-neutral-lightGray">
							<h3 className="text-xl font-bold text-ds-primary-charcoal">
								{showEditTemplate ? "Edit Template" : "Save as Template"}
							</h3>
							<button
								onClick={() => {
									setShowTemplateForm(false);
									setShowEditTemplate(null);
									setTemplateName("");
									setTemplateDescription("");
								}}
								className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
									Template Name
								</label>
								<input
									type="text"
									value={templateName}
									onChange={(e) => setTemplateName(e.target.value)}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="Enter template name"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
									Description
								</label>
								<textarea
									value={templateDescription}
									onChange={(e) => setTemplateDescription(e.target.value)}
									rows={3}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="Describe this template"
								/>
							</div>
							<button
								onClick={showEditTemplate ? updateTemplate : handleSaveTemplate}
								className="w-full py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
							>
								<Save className="w-4 h-4" />
								<span>
									{showEditTemplate ? "Update Template" : "Save Template"}
								</span>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Quote Request Modal */}
			{showQuoteRequest && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
					<div className="bg-ds-neutral-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between p-6 border-b border-ds-neutral-lightGray">
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
						<div className="p-6">
							<p className="text-ds-neutral-mediumGray mb-6">
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
											Estimated Volume (litres)
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
								<button className="w-full py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
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
