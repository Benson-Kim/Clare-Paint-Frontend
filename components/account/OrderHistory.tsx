"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockFetchOrderHistory, mockReorderItems } from "@/lib/api";
import { Order } from "@/types/account";
import { formatCurrency } from "@/utils/cartUtils";
import { useCartStore } from "@/store/cart-store";
import {
	Package,
	Truck,
	CheckCircle,
	XCircle,
	RefreshCcw,
	ArrowRight,
	Eye,
	RotateCcw,
	ExternalLink,
	Search,
	Calendar,
	Download,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Renders the user's order history with filtering, search, and reorder functionality.
 */
export const OrderHistory: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [sortBy, setSortBy] = useState<"date" | "amount">("date");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

	const { addItem } = useCartStore();

	const {
		data: orders,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery<Order[], Error>({
		queryKey: ["orderHistory"],
		queryFn: mockFetchOrderHistory,
	});

	const reorderMutation = useMutation({
		mutationFn: mockReorderItems,
		onSuccess: (_, orderId) => {
			// Find the order and add its items to cart
			const order = orders?.find((o) => o.id === orderId);
			if (order) {
				order.items.forEach((item) => {
					if (
						item.productId !== "brush-set-001" &&
						item.productId !== "roller-kit-001" &&
						item.productId !== "primer-001"
					) {
						// Only add paint products to cart, skip tools
						addItem({
							productId: item.productId,
							colorId: "sage-green", // Default color ID
							finishId: "matte", // Default finish ID
							quantity: item.quantity,
							price: item.price,
						});
					}
				});
			}
		},
		onError: (error) => {
			console.error("Reorder failed:", error);
		},
	});

	// Filter and sort orders
	const filteredOrders = React.useMemo(() => {
		if (!orders) return [];

		let filtered = orders;

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(order) =>
					order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
					order.items.some(
						(item) =>
							item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
							item.color.toLowerCase().includes(searchQuery.toLowerCase())
					)
			);
		}

		// Apply status filter
		if (statusFilter !== "all") {
			filtered = filtered.filter(
				(order) => order.status.toLowerCase() === statusFilter
			);
		}

		// Apply sorting
		filtered.sort((a, b) => {
			let comparison = 0;
			if (sortBy === "date") {
				comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
			} else {
				comparison = a.totalAmount - b.totalAmount;
			}
			return sortOrder === "desc" ? -comparison : comparison;
		});

		return filtered;
	}, [orders, searchQuery, statusFilter, sortBy, sortOrder]);

	const handleReorder = (orderId: string) => {
		reorderMutation.mutate(orderId);
	};

	const getStatusIcon = (status: Order["status"]) => {
		switch (status) {
			case "Delivered":
				return <CheckCircle className="w-4 h-4 text-green-600" />;
			case "Shipped":
				return <Truck className="w-4 h-4 text-blue-600" />;
			case "Processing":
				return <Package className="w-4 h-4 text-yellow-600" />;
			case "Cancelled":
				return <XCircle className="w-4 h-4 text-red-600" />;
			default:
				return <Package className="w-4 h-4 text-gray-600" />;
		}
	};

	const getStatusColor = (status: Order["status"]) => {
		switch (status) {
			case "Delivered":
				return "bg-green-100 text-green-800 border-green-200";
			case "Shipped":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "Processing":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "Cancelled":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	if (isLoading) {
		return (
			<div className="p-8 space-y-4">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal">
					Order History
				</h2>
				<div className="animate-pulse space-y-4">
					<div className="h-10 bg-gray-200 rounded w-full" />
					<div className="h-20 bg-gray-200 rounded w-full" />
					<div className="h-20 bg-gray-200 rounded w-full" />
					<div className="h-20 bg-gray-200 rounded w-full" />
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="p-8 text-center space-y-4">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal">
					Order History
				</h2>
				<div className="bg-red-50 border border-red-200 rounded-lg p-8">
					<XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
					<p className="text-lg text-red-700 mb-4">
						Failed to load order history
					</p>
					<p className="text-sm text-red-600 mb-4">{error?.message}</p>
					<button
						onClick={() => refetch()}
						className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
					>
						<RefreshCcw className="w-4 h-4" />
						<span>Try Again</span>
					</button>
				</div>
			</div>
		);
	}

	if (!orders || orders.length === 0) {
		return (
			<div className="p-8 text-center space-y-4">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal">
					Order History
				</h2>
				<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
					<Package className="w-16 h-16 mx-auto text-ds-neutral-lightGray mb-4" />
					<p className="text-lg text-ds-neutral-mediumGray mb-4">
						You haven&apos;t placed any orders yet.
					</p>
					<p className="text-sm text-ds-neutral-mediumGray mb-4">
						Start your paint journey by exploring our premium collection.
					</p>
					<Link
						href="/products"
						className="inline-flex items-center space-x-2 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
					>
						<span>Start Shopping</span>
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="p-8 space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal">
					Order History
				</h2>
				<div className="flex items-center space-x-2">
					<button className="flex items-center space-x-1 px-4 py-2 border border-ds-neutral-lightGray text-ds-neutral-mediumGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 text-sm">
						<Download className="w-4 h-4" />
						<span>Export</span>
					</button>
					<button className="flex items-center space-x-1 px-4 py-2 border border-ds-neutral-lightGray text-ds-neutral-mediumGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 text-sm">
						<Calendar className="w-4 h-4" />
						<span>Date Range</span>
					</button>
				</div>
			</div>

			{/* Filters and Search */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ds-neutral-mediumGray" />
					<input
						type="text"
						placeholder="Search orders, products, or colors..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-label="Search orders"
					/>
				</div>

				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					aria-label="Filter by status"
				>
					<option value="all">All Status</option>
					<option value="processing">Processing</option>
					<option value="shipped">Shipped</option>
					<option value="delivered">Delivered</option>
					<option value="cancelled">Cancelled</option>
				</select>

				<select
					value={`${sortBy}-${sortOrder}`}
					onChange={(e) => {
						const [newSortBy, newSortOrder] = e.target.value.split("-") as [
							"date" | "amount",
							"asc" | "desc"
						];
						setSortBy(newSortBy);
						setSortOrder(newSortOrder);
					}}
					className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					aria-label="Sort orders"
				>
					<option value="date-desc">Newest First</option>
					<option value="date-asc">Oldest First</option>
					<option value="amount-desc">Highest Amount</option>
					<option value="amount-asc">Lowest Amount</option>
				</select>
			</div>

			{/* Orders List */}
			<div className="space-y-4">
				{filteredOrders.length === 0 ? (
					<div className="text-center py-8">
						<Package className="w-16 h-16 mx-auto text-ds-neutral-lightGray mb-4" />
						<p className="text-lg text-ds-neutral-mediumGray">
							No orders match your search criteria.
						</p>
						<button
							onClick={() => {
								setSearchQuery("");
								setStatusFilter("all");
							}}
							className="mt-4 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
						>
							Clear filters
						</button>
					</div>
				) : (
					filteredOrders.map((order) => (
						<div
							key={order.id}
							className="bg-ds-neutral-white p-4 rounded-lg shadow-sm border border-ds-neutral-lightGray hover:shadow-md transition-shadow duration-200"
						>
							{/* Order Header */}
							<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-ds-neutral-lightGray pb-4 mb-4">
								<div className="mb-4 lg:mb-0">
									<div className="flex items-center space-x-4 mb-1">
										<p className="text-sm font-medium text-ds-primary-charcoal">
											Order #{order.id}
										</p>
										<div
											className={cn(
												"flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold border",
												getStatusColor(order.status)
											)}
										>
											{getStatusIcon(order.status)}
											<span>{order.status}</span>
										</div>
									</div>
									<div className="flex items-center space-x-4 text-sm text-ds-neutral-mediumGray">
										<span>
											Placed on {new Date(order.date).toLocaleDateString()}
										</span>
										<span>•</span>
										<span>
											{order.items.length} item
											{order.items.length !== 1 ? "s" : ""}
										</span>
										{order.trackingNumber && (
											<>
												<span>•</span>
												<button className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 flex items-center space-x-1">
													<span>Track: {order.trackingNumber}</span>
													<ExternalLink className="w-3 h-3" />
												</button>
											</>
										)}
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="text-right">
										<p className="text-lg font-bold text-ds-primary-charcoal">
											{formatCurrency(order.totalAmount)}
										</p>
										<p className="text-sm text-ds-neutral-mediumGray">
											Delivery:{" "}
											{new Date(order.estimatedDelivery).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>

							{/* Order Items */}
							<div className="space-y-2 mb-4">
								{order.items.map((item, itemIndex) => (
									<div key={itemIndex} className="flex items-center space-x-4">
										<img
											src={item.image}
											alt={item.name}
											className="w-16 h-16 object-cover rounded-md border border-ds-neutral-lightGray"
											loading="lazy"
										/>
										<div className="flex-1">
											<p className="font-medium text-ds-primary-charcoal text-sm">
												{item.name}
											</p>
											{item.color !== "N/A" && (
												<p className="text-xs text-ds-neutral-darkSlate">
													{item.color}{" "}
													{item.finish !== "N/A" && `/ ${item.finish}`}
												</p>
											)}
											<p className="text-xs text-ds-neutral-mediumGray">
												Quantity: {item.quantity}
											</p>
										</div>
										<div className="text-right">
											<span className="font-semibold text-ds-primary-charcoal text-sm">
												{formatCurrency(item.price * item.quantity)}
											</span>
											<p className="text-xs text-ds-neutral-mediumGray">
												{formatCurrency(item.price)} each
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Shipping Address */}
							<div className="bg-ds-primary-cream/20 p-2 rounded-lg mb-4">
								<p className="text-xs font-medium text-ds-neutral-darkSlate mb-1">
									Shipping Address:
								</p>
								<p className="text-xs text-ds-neutral-mediumGray">
									{order.shippingAddress.firstName}{" "}
									{order.shippingAddress.lastName},{" "}
									{order.shippingAddress.address1}, {order.shippingAddress.city}
									, {order.shippingAddress.state}{" "}
									{order.shippingAddress.zipCode}
								</p>
							</div>

							{/* Order Actions */}
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4 border-t border-ds-neutral-lightGray">
								<div className="flex items-center space-x-4 text-sm text-ds-neutral-mediumGray">
									<Truck className="w-4 h-4" />
									<span>
										{order.status === "Delivered"
											? "Delivered"
											: `Est. Delivery: ${new Date(
													order.estimatedDelivery
											  ).toLocaleDateString()}`}
									</span>
								</div>
								<div className="flex space-x-2">
									<Link
										href={`/order/${order.id}`}
										className="flex items-center space-x-1 px-4 py-2 border border-ds-neutral-lightGray text-ds-neutral-darkSlate rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 text-sm"
									>
										<Eye className="w-4 h-4" />
										<span>View Details</span>
									</Link>
									<button
										onClick={() => handleReorder(order.id)}
										disabled={reorderMutation.isPending}
										className="flex items-center space-x-1 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 disabled:bg-ds-neutral-lightGray disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
									>
										{reorderMutation.isPending ? (
											<div className="w-4 h-4 border-2 border-ds-neutral-white/30 border-t-ds-neutral-white rounded-full animate-spin" />
										) : (
											<RotateCcw className="w-4 h-4" />
										)}
										<span>Reorder</span>
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* Pagination placeholder */}
			{filteredOrders.length > 10 && (
				<div className="flex justify-center pt-8">
					<div className="flex items-center space-x-2">
						<button className="px-4 py-2 border border-ds-neutral-lightGray text-ds-neutral-mediumGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 text-sm">
							Previous
						</button>
						<span className="px-4 py-2 text-sm text-ds-neutral-mediumGray">
							Page 1 of 1
						</span>
						<button className="px-4 py-2 border border-ds-neutral-lightGray text-ds-neutral-mediumGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 text-sm">
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
