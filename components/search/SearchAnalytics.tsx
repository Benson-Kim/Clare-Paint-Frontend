"use client";

import React, { useState } from "react";
import {
	X,
	TrendingUp,
	BarChart3,
	Users,
	Search,
	Palette,
	Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchAnalyticsProps {
	onClose: () => void;
	analytics: any;
	popularSearches: string[];
	trendingColors: any[];
}

export const SearchAnalytics: React.FC<SearchAnalyticsProps> = ({
	onClose,
	analytics,
	popularSearches,
	trendingColors,
}) => {
	const [activeTab, setActiveTab] = useState<
		"overview" | "searches" | "colors" | "trends"
	>("overview");

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const mockAnalytics = {
		totalSearches: 15420,
		uniqueUsers: 8930,
		avgResultsPerSearch: 24.5,
		topCategories: [
			{ name: "Interior Paint", searches: 5420, percentage: 35 },
			{ name: "Exterior Paint", searches: 3210, percentage: 21 },
			{ name: "Color Matching", searches: 2890, percentage: 19 },
			{ name: "Room Specific", searches: 2340, percentage: 15 },
			{ name: "Brand Search", searches: 1560, percentage: 10 },
		],
		searchTrends: [
			{ period: "This Week", searches: 2340, change: 12 },
			{ period: "This Month", searches: 9870, change: 8 },
			{ period: "This Quarter", searches: 28450, change: 15 },
		],
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="analytics-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-ds-neutral-lightGray">
					<div className="flex items-center space-x-3">
						<TrendingUp className="w-6 h-6 text-ds-primary-sage" />
						<h2
							id="analytics-title"
							className="text-2xl font-bold text-ds-primary-charcoal"
						>
							Search Analytics & Trends
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close analytics"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Tab Navigation */}
				<div className="flex space-x-1 bg-ds-neutral-lightGray/20 p-1 m-6 rounded-lg">
					{[
						{
							id: "overview",
							label: "Overview",
							icon: <BarChart3 className="w-4 h-4" />,
						},
						{
							id: "searches",
							label: "Popular Searches",
							icon: <Search className="w-4 h-4" />,
						},
						{
							id: "colors",
							label: "Trending Colors",
							icon: <Palette className="w-4 h-4" />,
						},
						{
							id: "trends",
							label: "Trends",
							icon: <TrendingUp className="w-4 h-4" />,
						},
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() =>
								setActiveTab(
									tab.id as "overview" | "searches" | "colors" | "trends"
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

				{/* Content */}
				<div className="p-6">
					{activeTab === "overview" && (
						<div className="space-y-6">
							{/* Key Metrics */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="bg-ds-primary-sage/10 p-6 rounded-lg text-center">
									<Search className="w-8 h-8 text-ds-primary-sage mx-auto mb-2" />
									<div className="text-2xl font-bold text-ds-primary-charcoal">
										{mockAnalytics.totalSearches.toLocaleString()}
									</div>
									<div className="text-sm text-ds-neutral-mediumGray">
										Total Searches
									</div>
								</div>
								<div className="bg-ds-accent-warmBeige/10 p-6 rounded-lg text-center">
									<Users className="w-8 h-8 text-ds-accent-warmBrown mx-auto mb-2" />
									<div className="text-2xl font-bold text-ds-primary-charcoal">
										{mockAnalytics.uniqueUsers.toLocaleString()}
									</div>
									<div className="text-sm text-ds-neutral-mediumGray">
										Unique Users
									</div>
								</div>
								<div className="bg-ds-primary-cream/50 p-6 rounded-lg text-center">
									<BarChart3 className="w-8 h-8 text-ds-accent-warmBrown mx-auto mb-2" />
									<div className="text-2xl font-bold text-ds-primary-charcoal">
										{mockAnalytics.avgResultsPerSearch}
									</div>
									<div className="text-sm text-ds-neutral-mediumGray">
										Avg Results/Search
									</div>
								</div>
							</div>

							{/* Top Categories */}
							<div>
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
									Top Search Categories
								</h3>
								<div className="space-y-3">
									{mockAnalytics.topCategories.map((category, index) => (
										<div
											key={index}
											className="flex items-center justify-between"
										>
											<div className="flex items-center space-x-3">
												<span className="text-sm font-medium text-ds-primary-charcoal">
													{category.name}
												</span>
												<span className="text-xs text-ds-neutral-mediumGray">
													{category.searches.toLocaleString()} searches
												</span>
											</div>
											<div className="flex items-center space-x-2">
												<div className="w-24 bg-ds-neutral-lightGray rounded-full h-2">
													<div
														className="bg-ds-primary-sage h-2 rounded-full transition-all duration-500"
														style={{ width: `${category.percentage}%` }}
													/>
												</div>
												<span className="text-sm text-ds-neutral-mediumGray w-8">
													{category.percentage}%
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{activeTab === "searches" && (
						<div>
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Most Popular Searches
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{popularSearches.map((search, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg"
									>
										<div className="flex items-center space-x-3">
											<span className="w-6 h-6 bg-ds-primary-sage text-ds-neutral-white rounded-full flex items-center justify-center text-xs font-bold">
												{index + 1}
											</span>
											<span className="text-ds-primary-charcoal">{search}</span>
										</div>
										<TrendingUp className="w-4 h-4 text-ds-primary-sage" />
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "colors" && (
						<div>
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Trending Colors This Month
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{trendingColors.map((color, index) => (
									<div
										key={index}
										className="p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg"
									>
										<div className="flex items-center space-x-3 mb-3">
											<div
												className="w-8 h-8 rounded-full border border-ds-neutral-lightGray"
												style={{ backgroundColor: color.hex }}
											/>
											<div>
												<p className="font-medium text-ds-primary-charcoal">
													{color.name}
												</p>
												<p className="text-xs text-ds-neutral-mediumGray">
													{color.hex}
												</p>
											</div>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-ds-neutral-mediumGray">
												Searches:
											</span>
											<span className="font-medium text-ds-primary-charcoal">
												{color.searches?.toLocaleString() ||
													Math.floor(Math.random() * 1000)}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "trends" && (
						<div className="space-y-6">
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Search Trends Over Time
							</h3>

							{/* Trend Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{mockAnalytics.searchTrends.map((trend, index) => (
									<div
										key={index}
										className="p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg"
									>
										<div className="flex items-center justify-between mb-2">
											<span className="text-sm text-ds-neutral-mediumGray">
												{trend.period}
											</span>
											<div
												className={cn(
													"flex items-center space-x-1 text-xs font-medium",
													trend.change > 0 ? "text-green-600" : "text-red-600"
												)}
											>
												<TrendingUp className="w-3 h-3" />
												<span>
													{trend.change > 0 ? "+" : ""}
													{trend.change}%
												</span>
											</div>
										</div>
										<div className="text-xl font-bold text-ds-primary-charcoal">
											{trend.searches.toLocaleString()}
										</div>
										<div className="text-xs text-ds-neutral-mediumGray">
											searches
										</div>
									</div>
								))}
							</div>

							{/* Seasonal Trends */}
							<div>
								<h4 className="font-semibold text-ds-primary-charcoal mb-3">
									Seasonal Trends
								</h4>
								<div className="space-y-3">
									<div className="p-4 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
										<div className="flex items-center space-x-2 mb-2">
											<Calendar className="w-4 h-4 text-ds-accent-warmBrown" />
											<span className="font-medium text-ds-primary-charcoal">
												Spring Trends
											</span>
										</div>
										<p className="text-sm text-ds-neutral-darkSlate">
											Fresh greens and light blues are trending as customers
											prepare for spring renovations.
										</p>
									</div>
									<div className="p-4 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
										<div className="flex items-center space-x-2 mb-2">
											<Palette className="w-4 h-4 text-ds-accent-warmBrown" />
											<span className="font-medium text-ds-primary-charcoal">
												Color Preferences
											</span>
										</div>
										<p className="text-sm text-ds-neutral-darkSlate">
											Neutral tones continue to dominate, with sage green
											showing 45% increase in searches.
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
