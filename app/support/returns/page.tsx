"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { mockSubmitReturnRequest, mockTrackReturn } from "@/lib/api";
import { PageLayout } from "@/components/layout/PageLayout";
import {
	RotateCcw,
	Shield,
	Clock,
	CheckCircle,
	Package,
	Truck,
	DollarSign,
	FileText,
	AlertCircle,
	Loader2,
	Download,
	Search,
	Calendar,
	Info,
	Star,
	Heart,
	ArrowRight,
	Mail,
	MessageCircle,
	Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Form validation schema
const returnRequestSchema = z.object({
	orderId: z.string().min(1, "Order ID is required"),
	customerName: z.string().min(1, "Name is required"),
	customerEmail: z.string().email("Valid email is required"),
	customerPhone: z.string().optional(),
	returnReason: z.enum([
		"color_not_as_expected",
		"quality_issue",
		"wrong_product",
		"damaged_shipping",
		"changed_mind",
		"other",
	]),
	additionalComments: z.string().optional(),
	items: z
		.array(
			z.object({
				productId: z.string(),
				quantity: z.number().min(1),
				reason: z.string().min(1),
			})
		)
		.min(1, "At least one item must be selected"),
});

type ReturnRequestData = z.infer<typeof returnRequestSchema>;

export default function ReturnExchangePolicyPage() {
	const [activeTab, setActiveTab] = useState<
		"policy" | "return-form" | "track-return"
	>("policy");
	const [returnSubmitted, setReturnSubmitted] = useState(false);
	const [trackingId, setTrackingId] = useState("");
	const [trackingResult, setTrackingResult] = useState<any>(null);
	const [policyAccepted, setPolicyAccepted] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm<ReturnRequestData>({
		resolver: zodResolver(returnRequestSchema),
		defaultValues: {
			returnReason: "color_not_as_expected",
			items: [{ productId: "", quantity: 1, reason: "" }],
		},
	});

	const returnMutation = useMutation({
		mutationFn: mockSubmitReturnRequest,
		onSuccess: () => {
			setReturnSubmitted(true);
			reset();
			setTimeout(() => setReturnSubmitted(false), 5000);
		},
	});

	const trackMutation = useMutation({
		mutationFn: mockTrackReturn,
		onSuccess: (data) => {
			setTrackingResult(data);
		},
	});

	const onReturnSubmit = (data: ReturnRequestData) => {
		returnMutation.mutate({
			orderId: data.orderId,
			items: data.items,
			customerInfo: {
				name: data.customerName,
				email: data.customerEmail,
				phone: data.customerPhone,
			},
			returnReason: data.returnReason,
			additionalComments: data.additionalComments,
		});
	};

	const handleTrackReturn = () => {
		if (trackingId.trim()) {
			trackMutation.mutate(trackingId);
		}
	};

	const addReturnItem = () => {
		const currentItems = watch("items");
		setValue("items", [
			...currentItems,
			{ productId: "", quantity: 1, reason: "" },
		]);
	};

	const removeReturnItem = (index: number) => {
		const currentItems = watch("items");
		if (currentItems.length > 1) {
			setValue(
				"items",
				currentItems.filter((_, i) => i !== index)
			);
		}
	};

	const policyHighlights = [
		{
			icon: Clock,
			title: "30-Day Return Window",
			description: "Returns accepted within 30 days of delivery",
			details: "Unopened containers in original packaging",
		},
		{
			icon: Shield,
			title: "Color Guarantee",
			description: "100% satisfaction with color accuracy",
			details: "We'll remake or refund if color doesn't match expectations",
		},
		{
			icon: Package,
			title: "Free Return Shipping",
			description: "Prepaid return labels provided",
			details: "No cost to you for returns due to our error",
		},
		{
			icon: DollarSign,
			title: "Full Refund Available",
			description: "Complete refund for qualifying returns",
			details: "Refunds processed within 5-7 business days",
		},
	];

	const returnReasons = [
		{
			value: "color_not_as_expected",
			label: "Color Not As Expected",
			description: "Color doesn't match sample or expectations",
		},
		{
			value: "quality_issue",
			label: "Quality Issue",
			description: "Paint quality or consistency problems",
		},
		{
			value: "wrong_product",
			label: "Wrong Product Received",
			description: "Received different product than ordered",
		},
		{
			value: "damaged_shipping",
			label: "Damaged During Shipping",
			description: "Product arrived damaged or leaking",
		},
		{
			value: "changed_mind",
			label: "Changed Mind",
			description: "No longer need the product",
		},
		{
			value: "other",
			label: "Other",
			description: "Other reason not listed above",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "initiated":
				return "bg-blue-100 text-blue-800";
			case "label_printed":
				return "bg-yellow-100 text-yellow-800";
			case "in_transit":
				return "bg-orange-100 text-orange-800";
			case "received":
				return "bg-purple-100 text-purple-800";
			case "processed":
				return "bg-green-100 text-green-800";
			case "refunded":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<PageLayout>
			<div className="min-h-screen bg-ds-neutral-white">
				{/* Hero Section */}
				<div className="relative bg-gradient-to-r from-ds-primary-sage to-ds-primary-charcoal text-ds-neutral-white overflow-hidden">
					<div className="absolute inset-0 bg-black/30" />
					<div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
						<div className="text-center">
							<RotateCcw className="w-24 h-24 text-ds-neutral-white mx-auto mb-6" />
							<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
								Returns & Exchanges Made Easy
							</h1>
							<p className="text-xl text-ds-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
								Your satisfaction is our priority. Learn about our hassle-free
								return policy and start a return if needed.
							</p>
						</div>
					</div>
				</div>

				{/* Tab Navigation */}
				<div className="bg-ds-neutral-white border-b border-ds-neutral-lightGray">
					<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
						<nav className="flex space-x-8 overflow-x-auto" role="tablist">
							{[
								{
									id: "policy",
									label: "Return Policy",
									icon: <FileText className="w-4 h-4" />,
								},
								{
									id: "return-form",
									label: "Start Return",
									icon: <RotateCcw className="w-4 h-4" />,
								},
								{
									id: "track-return",
									label: "Track Return",
									icon: <Search className="w-4 h-4" />,
								},
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() =>
										setActiveTab(
											tab.id as "policy" | "return-form" | "track-return"
										)
									}
									className={cn(
										"flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-all duration-200 whitespace-nowrap",
										activeTab === tab.id
											? "border-ds-primary-sage text-ds-primary-sage"
											: "border-transparent text-ds-neutral-mediumGray hover:text-ds-primary-charcoal hover:border-ds-neutral-lightGray"
									)}
									role="tab"
									aria-selected={activeTab === tab.id}
								>
									{tab.icon}
									<span>{tab.label}</span>
								</button>
							))}
						</nav>
					</div>
				</div>

				{/* Policy Tab */}
				{activeTab === "policy" && (
					<div className="py-20">
						<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
							{/* Policy Highlights */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
								{policyHighlights.map((highlight, index) => (
									<div
										key={index}
										className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-200"
									>
										<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<highlight.icon className="w-8 h-8 text-ds-primary-sage" />
										</div>
										<h3 className="text-lg font-bold text-ds-primary-charcoal mb-2">
											{highlight.title}
										</h3>
										<p className="text-ds-neutral-mediumGray mb-3">
											{highlight.description}
										</p>
										<p className="text-sm text-ds-neutral-darkSlate">
											{highlight.details}
										</p>
									</div>
								))}
							</div>

							{/* Detailed Policy */}
							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8">
								<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-8">
									Complete Return & Exchange Policy
								</h2>

								<div className="space-y-8">
									<div>
										<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
											<CheckCircle className="w-5 h-5 text-ds-primary-sage" />
											<span>What Can Be Returned</span>
										</h3>
										<ul className="space-y-2 text-ds-neutral-darkSlate">
											<li className="flex items-start space-x-2">
												<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2 flex-shrink-0" />
												<span>
													Unopened paint containers in original packaging within
													30 days
												</span>
											</li>
											<li className="flex items-start space-x-2">
												<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2 flex-shrink-0" />
												<span>
													Opened containers if there&apos;s a quality issue or
													color mismatch
												</span>
											</li>
											<li className="flex items-start space-x-2">
												<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2 flex-shrink-0" />
												<span>
													Painting tools and accessories in unused condition
												</span>
											</li>
											<li className="flex items-start space-x-2">
												<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2 flex-shrink-0" />
												<span>
													Custom-matched colors (subject to color guarantee
													terms)
												</span>
											</li>
										</ul>
									</div>

									<div>
										<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
											<Shield className="w-5 h-5 text-ds-primary-sage" />
											<span>Our Color Guarantee</span>
										</h3>
										<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-6">
											<p className="text-ds-neutral-darkSlate mb-4">
												We guarantee that your paint color will match your
												expectations. If you&apos;re not completely satisfied
												with the color accuracy:
											</p>
											<ul className="space-y-2 text-ds-neutral-darkSlate">
												<li className="flex items-start space-x-2">
													<Star className="w-4 h-4 text-ds-accent-warmBrown mt-1 flex-shrink-0" />
													<span>
														We&apos;ll work with you to adjust the color at no
														charge
													</span>
												</li>
												<li className="flex items-start space-x-2">
													<Star className="w-4 h-4 text-ds-accent-warmBrown mt-1 flex-shrink-0" />
													<span>
														Provide a full refund if we can&apos;t achieve the
														desired color
													</span>
												</li>
												<li className="flex items-start space-x-2">
													<Star className="w-4 h-4 text-ds-accent-warmBrown mt-1 flex-shrink-0" />
													<span>
														Cover return shipping costs for color-related issues
													</span>
												</li>
											</ul>
										</div>
									</div>

									<div>
										<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
											<Clock className="w-5 h-5 text-ds-primary-sage" />
											<span>Return Process Timeline</span>
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
											<div className="text-center">
												<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
													<span className="text-blue-600 font-bold">1</span>
												</div>
												<h4 className="font-medium text-ds-primary-charcoal mb-2">
													Submit Request
												</h4>
												<p className="text-sm text-ds-neutral-mediumGray">
													Complete return form online or call us
												</p>
											</div>
											<div className="text-center">
												<div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
													<span className="text-yellow-600 font-bold">2</span>
												</div>
												<h4 className="font-medium text-ds-primary-charcoal mb-2">
													Receive Label
												</h4>
												<p className="text-sm text-ds-neutral-mediumGray">
													Prepaid return label sent within 24 hours
												</p>
											</div>
											<div className="text-center">
												<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
													<span className="text-orange-600 font-bold">3</span>
												</div>
												<h4 className="font-medium text-ds-primary-charcoal mb-2">
													Ship Package
												</h4>
												<p className="text-sm text-ds-neutral-mediumGray">
													Drop off at any carrier location
												</p>
											</div>
											<div className="text-center">
												<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
													<span className="text-green-600 font-bold">4</span>
												</div>
												<h4 className="font-medium text-ds-primary-charcoal mb-2">
													Get Refund
												</h4>
												<p className="text-sm text-ds-neutral-mediumGray">
													Refund processed within 5-7 business days
												</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-4">
											Important Notes
										</h3>
										<div className="bg-ds-accent-warmBeige/10 border border-ds-accent-warmBeige/20 rounded-lg p-6">
											<ul className="space-y-3 text-ds-neutral-darkSlate">
												<li className="flex items-start space-x-2">
													<Info className="w-4 h-4 text-ds-accent-warmBrown mt-1 flex-shrink-0" />
													<span>
														Custom-tinted colors may have different return terms
													</span>
												</li>
												<li className="flex items-start space-x-2">
													<Info className="w-4 h-4 text-ds-accent-warmBrown mt-1 flex-shrink-0" />
													<span>
														Sale items may be final sale - check product page
													</span>
												</li>
												<li className="flex items-start space-x-2">
													<Info className="w-4 h-4 text-ds-accent-warmBrown mt-1 flex-shrink-0" />
													<span>
														Bulk orders over $1,000 require manager approval
													</span>
												</li>
												<li className="flex items-start space-x-2">
													<Info className="w-4 h-4 text-ds-accent-warmBrown mt-1 flex-shrink-0" />
													<span>
														International returns may have additional fees
													</span>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<div className="mt-12 text-center">
									<button
										onClick={() => setActiveTab("return-form")}
										className="inline-flex items-center space-x-2 px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
									>
										<RotateCcw className="w-5 h-5" />
										<span>Start a Return</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Return Form Tab */}
				{activeTab === "return-form" && (
					<div className="py-20">
						<div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-20">
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
									Start Your Return
								</h2>
								<p className="text-lg text-ds-neutral-mediumGray">
									Fill out the form below to begin your return process.
								</p>
							</div>

							{returnSubmitted && (
								<div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8 flex items-center space-x-4">
									<CheckCircle className="w-6 h-6" />
									<div>
										<p className="font-medium">
											Return request submitted successfully!
										</p>
										<p className="text-sm">
											You&apos;ll receive a confirmation email with return
											instructions and tracking information.
										</p>
									</div>
								</div>
							)}

							{/* Policy Acceptance */}
							<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-6 mb-8">
								<label className="flex items-start space-x-3 cursor-pointer">
									<input
										type="checkbox"
										checked={policyAccepted}
										onChange={(e) => setPolicyAccepted(e.target.checked)}
										className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage mt-1"
									/>
									<div className="text-sm">
										<span className="text-ds-neutral-darkSlate">
											I have read and agree to the{" "}
											<button
												onClick={() => setActiveTab("policy")}
												className="text-ds-primary-sage hover:underline font-medium"
											>
												return policy terms
											</button>
											. I understand the return conditions and timeline.
										</span>
									</div>
								</label>
							</div>

							<form
								onSubmit={handleSubmit(onReturnSubmit)}
								className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8 space-y-6"
							>
								{/* Customer Information */}
								<div>
									<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
										Customer Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label
												htmlFor="customer-name"
												className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
											>
												Full Name *
											</label>
											<input
												type="text"
												id="customer-name"
												{...register("customerName")}
												className="w-full px-4 py-3 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												aria-invalid={errors.customerName ? "true" : "false"}
											/>
											{errors.customerName && (
												<p className="text-red-500 text-sm mt-1">
													{errors.customerName.message}
												</p>
											)}
										</div>

										<div>
											<label
												htmlFor="customer-email"
												className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
											>
												Email Address *
											</label>
											<input
												type="email"
												id="customer-email"
												{...register("customerEmail")}
												className="w-full px-4 py-3 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												aria-invalid={errors.customerEmail ? "true" : "false"}
											/>
											{errors.customerEmail && (
												<p className="text-red-500 text-sm mt-1">
													{errors.customerEmail.message}
												</p>
											)}
										</div>

										<div>
											<label
												htmlFor="order-id"
												className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
											>
												Order ID *
											</label>
											<input
												type="text"
												id="order-id"
												{...register("orderId")}
												placeholder="ORD-2024-001"
												className="w-full px-4 py-3 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												aria-invalid={errors.orderId ? "true" : "false"}
											/>
											{errors.orderId && (
												<p className="text-red-500 text-sm mt-1">
													{errors.orderId.message}
												</p>
											)}
										</div>

										<div>
											<label
												htmlFor="customer-phone"
												className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
											>
												Phone Number (Optional)
											</label>
											<input
												type="tel"
												id="customer-phone"
												{...register("customerPhone")}
												className="w-full px-4 py-3 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
											/>
										</div>
									</div>
								</div>

								{/* Return Reason */}
								<div>
									<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
										Reason for Return
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{returnReasons.map((reason) => (
											<label
												key={reason.value}
												className="flex items-start space-x-3 p-4 border border-ds-neutral-lightGray rounded-lg cursor-pointer hover:bg-ds-primary-sage/5 transition-colors duration-200"
											>
												<input
													type="radio"
													{...register("returnReason")}
													value={reason.value}
													className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray focus:ring-ds-primary-sage mt-1"
												/>
												<div>
													<span className="font-medium text-ds-primary-charcoal">
														{reason.label}
													</span>
													<p className="text-sm text-ds-neutral-mediumGray">
														{reason.description}
													</p>
												</div>
											</label>
										))}
									</div>
								</div>

								{/* Additional Comments */}
								<div>
									<label
										htmlFor="additional-comments"
										className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
									>
										Additional Comments (Optional)
									</label>
									<textarea
										id="additional-comments"
										{...register("additionalComments")}
										rows={4}
										className="w-full px-4 py-3 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										placeholder="Please provide any additional details about your return..."
									/>
								</div>

								{returnMutation.isError && (
									<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4">
										<AlertCircle className="w-5 h-5" />
										<p className="text-sm">
											{returnMutation.error?.message ||
												"Failed to submit return request. Please try again."}
										</p>
									</div>
								)}

								<button
									type="submit"
									disabled={returnMutation.isPending || !policyAccepted}
									className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 disabled:bg-ds-neutral-lightGray disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
								>
									{returnMutation.isPending ? (
										<Loader2 className="w-5 h-5 animate-spin" />
									) : (
										<RotateCcw className="w-5 h-5" />
									)}
									<span>
										{returnMutation.isPending
											? "Submitting Return..."
											: "Submit Return Request"}
									</span>
								</button>
							</form>
						</div>
					</div>
				)}

				{/* Track Return Tab */}
				{activeTab === "track-return" && (
					<div className="py-20">
						<div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-20">
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
									Track Your Return
								</h2>
								<p className="text-lg text-ds-neutral-mediumGray">
									Enter your return ID to check the status of your return.
								</p>
							</div>

							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8">
								<div className="flex space-x-4 mb-8">
									<input
										type="text"
										value={trackingId}
										onChange={(e) => setTrackingId(e.target.value)}
										placeholder="Enter return ID (e.g., RET-123456)"
										className="flex-1 px-4 py-3 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-label="Return tracking ID"
									/>
									<button
										onClick={handleTrackReturn}
										disabled={trackMutation.isPending || !trackingId.trim()}
										className="px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 disabled:bg-ds-neutral-lightGray disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center space-x-2"
									>
										{trackMutation.isPending ? (
											<Loader2 className="w-4 h-4 animate-spin" />
										) : (
											<Search className="w-4 h-4" />
										)}
										<span>Track</span>
									</button>
								</div>

								{trackingResult && (
									<div className="space-y-6">
										<div className="flex items-center justify-between p-4 bg-ds-primary-sage/10 rounded-lg">
											<div>
												<h3 className="font-semibold text-ds-primary-charcoal">
													Return Status
												</h3>
												<p
													className={cn(
														"text-sm font-medium px-2 py-1 rounded-full inline-block mt-1",
														getStatusColor(trackingResult.status)
													)}
												>
													{trackingResult.status
														.replace("_", " ")
														.toUpperCase()}
												</p>
											</div>
											<div className="text-right">
												<p className="text-sm text-ds-neutral-mediumGray">
													Estimated Completion
												</p>
												<p className="font-medium text-ds-primary-charcoal">
													{new Date(
														trackingResult.estimatedCompletion
													).toLocaleDateString()}
												</p>
											</div>
										</div>

										<div>
											<h4 className="font-semibold text-ds-primary-charcoal mb-4">
												Return Timeline
											</h4>
											<div className="space-y-4">
												{trackingResult.updates.map(
													(update: any, index: number) => (
														<div
															key={index}
															className="flex items-start space-x-4 p-4 bg-ds-neutral-lightGray/20 rounded-lg"
														>
															<div className="w-3 h-3 bg-ds-primary-sage rounded-full mt-2" />
															<div>
																<p className="font-medium text-ds-primary-charcoal">
																	{update.status}
																</p>
																<p className="text-sm text-ds-neutral-mediumGray">
																	{update.description}
																</p>
																<p className="text-xs text-ds-neutral-mediumGray mt-1">
																	{new Date(update.date).toLocaleDateString()}
																</p>
															</div>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								)}

								{trackMutation.isError && (
									<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4">
										<AlertCircle className="w-5 h-5" />
										<p className="text-sm">
											{trackMutation.error?.message ||
												"Failed to track return. Please check your return ID and try again."}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Help Section */}
				<div className="py-20 bg-ds-primary-cream/30">
					<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
						<div className="text-center mb-12">
							<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-4">
								Need Additional Help?
							</h2>
							<p className="text-ds-neutral-mediumGray">
								Our support team is here to assist you through every step.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6 text-center">
								<Phone className="w-12 h-12 text-ds-primary-sage mx-auto mb-4" />
								<h3 className="font-semibold text-ds-primary-charcoal mb-2">
									Call Us
								</h3>
								<p className="text-sm text-ds-neutral-mediumGray mb-4">
									Speak with a return specialist
								</p>
								<a
									href="tel:18002527301"
									className="inline-flex items-center space-x-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 font-medium"
								>
									<span>1-800-CLARE-01</span>
									<ArrowRight className="w-4 h-4" />
								</a>
							</div>

							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6 text-center">
								<MessageCircle className="w-12 h-12 text-ds-primary-sage mx-auto mb-4" />
								<h3 className="font-semibold text-ds-primary-charcoal mb-2">
									Live Chat
								</h3>
								<p className="text-sm text-ds-neutral-mediumGray mb-4">
									Get instant help with returns
								</p>
								<button
									// onClick={handleChatStart}
									className="inline-flex items-center space-x-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 font-medium"
								>
									<span>Start Chat</span>
									<ArrowRight className="w-4 h-4" />
								</button>
							</div>

							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6 text-center">
								<Mail className="w-12 h-12 text-ds-primary-sage mx-auto mb-4" />
								<h3 className="font-semibold text-ds-primary-charcoal mb-2">
									Email Support
								</h3>
								<p className="text-sm text-ds-neutral-mediumGray mb-4">
									Detailed assistance via email
								</p>
								<a
									href="mailto:returns@clarepaint.com"
									className="inline-flex items-center space-x-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 font-medium"
								>
									<span>returns@clarepaint.com</span>
									<ArrowRight className="w-4 h-4" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
