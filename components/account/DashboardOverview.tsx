"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchDashboardStats, mockFetchOrderHistory } from "@/lib/api";
import { DashboardStats } from "@/types/account";
import { formatCurrency } from "@/utils/cartUtils";
import {
	ShoppingBag,
	DollarSign,
	Heart,
	Droplets,
	Palette,
	TrendingUp,
	Package,
	ArrowRight,
	ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useAccountStore } from "@/store/account-store";

/**
 * Dashboard overview component showing user statistics and quick actions.
 */
export const DashboardOverview: React.FC = () => {
	const { setActiveSection } = useAccountStore();

	const { data: stats, isLoading: statsLoading } = useQuery<
		DashboardStats,
		Error
	>({
		queryKey: ["dashboardStats"],
		queryFn: mockFetchDashboardStats,
	});

	const { data: recentOrders, isLoading: ordersLoading } = useQuery({
		queryKey: ["recentOrders"],
		queryFn: async () => {
			const orders = await mockFetchOrderHistory();
			return orders.slice(0, 3); // Get 3 most recent orders
		},
	});

	if (statsLoading) {
		return (
			<div className="p-8 space-y-8">
				<h2 className="text-2xl font-bold p- text-ds-primary-charcoal">
					Dashboard Overview
				</h2>
				<div className="animate-pulse">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="h-32 bg-gray-200 rounded-lg" />
						))}
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="h-64 bg-gray-200 rounded-lg" />
						<div className="h-64 bg-gray-200 rounded-lg" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-8 space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal">
					Dashboard Overview
				</h2>
				<p className="text-ds-neutral-mediumGray">
					Welcome back! Here&apos;s your paint journey summary.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-gradient-to-br from-ds-primary-sage to-ds-primary-sage/80 text-ds-neutral-white p-4 rounded-lg">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-ds-neutral-white/80 text-sm">Total Orders</p>
							<p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
						</div>
						<ShoppingBag className="w-8 h-8 text-ds-neutral-white/80" />
					</div>
				</div>

				<div className="bg-gradient-to-br from-ds-accent-warmBeige to-ds-accent-warmBrown text-ds-neutral-white p-4 rounded-lg">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-ds-neutral-white/80 text-sm">Total Spent</p>
							<p className="text-2xl font-bold">
								{formatCurrency(stats?.totalSpent || 0)}
							</p>
						</div>
						<DollarSign className="w-8 h-8 text-ds-neutral-white/80" />
					</div>
				</div>

				<div className="bg-gradient-to-br from-red-500 to-red-600 text-ds-neutral-white p-4 rounded-lg">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-ds-neutral-white/80 text-sm">Saved Colors</p>
							<p className="text-2xl font-bold">{stats?.savedColors || 0}</p>
						</div>
						<Heart className="w-8 h-8 text-ds-neutral-white/80" />
					</div>
				</div>

				<div className="bg-gradient-to-br from-blue-500 to-blue-600 text-ds-neutral-white p-4 rounded-lg">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-ds-neutral-white/80 text-sm">Paint Used</p>
							<p className="text-2xl font-bold">{stats?.paintUsed || 0} gal</p>
						</div>
						<Droplets className="w-8 h-8 text-ds-neutral-white/80" />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Recent Orders */}
				<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal flex items-center space-x-2">
							<Package className="w-5 h-5 text-ds-primary-sage" />
							<span>Recent Orders</span>
						</h3>
						<button
							onClick={() => setActiveSection("order-history")}
							className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-sm font-medium flex items-center space-x-1"
						>
							<span>View All</span>
							<ArrowRight className="w-4 h-4" />
						</button>
					</div>

					{ordersLoading ? (
						<div className="animate-pulse space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="h-16 bg-gray-200 rounded" />
							))}
						</div>
					) : (
						<div className="space-y-4">
							{recentOrders?.map((order) => (
								<div
									key={order.id}
									className="flex items-center justify-between p-2 bg-ds-primary-cream/30 rounded-lg"
								>
									<div>
										<p className="font-medium text-ds-primary-charcoal text-sm">
											{order.id}
										</p>
										<p className="text-xs text-ds-neutral-mediumGray">
											{order.date} • {order.items.length} items
										</p>
									</div>
									<div className="text-right">
										<p className="font-bold text-ds-primary-charcoal">
											{formatCurrency(order.totalAmount)}
										</p>
										<p className="text-xs text-ds-neutral-mediumGray">
											{order.status}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Favorite Color */}
				<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4">
					<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
						<Palette className="w-5 h-5 text-ds-primary-sage" />
						<span>Your Favorite Color</span>
					</h3>

					{stats?.favoriteColor ? (
						<div className="flex items-center space-x-4">
							<div
								className="w-16 h-16 rounded-lg border-2 border-ds-neutral-lightGray"
								style={{ backgroundColor: stats.favoriteColor.hex }}
							/>
							<div>
								<p className="font-semibold text-ds-primary-charcoal">
									{stats.favoriteColor.name}
								</p>
								<p className="text-sm text-ds-neutral-mediumGray">
									{stats.favoriteColor.hex}
								</p>
								<p className="text-xs text-ds-neutral-mediumGray">
									Ordered {stats.favoriteColor.timesOrdered} times
								</p>
							</div>
						</div>
					) : (
						<div className="text-center py-4">
							<Palette className="w-12 h-12 text-ds-neutral-lightGray mx-auto mb-2" />
							<p className="text-ds-neutral-mediumGray">
								No favorite color yet
							</p>
						</div>
					)}

					<button
						onClick={() => setActiveSection("color-recommendations")}
						className="w-full mt-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 text-sm font-medium"
					>
						Get Color Recommendations
					</button>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					Quick Actions
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<button
						onClick={() => setActiveSection("saved-colors")}
						className="flex items-center space-x-2 p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
					>
						<Heart className="w-5 h-5 text-red-500" />
						<span className="text-sm font-medium text-ds-primary-charcoal">
							Saved Colors
						</span>
					</button>

					<button
						onClick={() => setActiveSection("project-gallery")}
						className="flex items-center space-x-2 p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
					>
						<ImageIcon className="w-5 h-5 text-blue-500" />
						<span className="text-sm font-medium text-ds-primary-charcoal">
							Projects
						</span>
					</button>

					<Link
						href="/products"
						className="flex items-center space-x-2 p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
					>
						<ShoppingBag className="w-5 h-5 text-ds-primary-sage" />
						<span className="text-sm font-medium text-ds-primary-charcoal">
							Shop Paints
						</span>
					</Link>

					<button
						onClick={() => setActiveSection("paint-usage")}
						className="flex items-center space-x-2 p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
					>
						<TrendingUp className="w-5 h-5 text-green-500" />
						<span className="text-sm font-medium text-ds-primary-charcoal">
							Usage Tracking
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};
