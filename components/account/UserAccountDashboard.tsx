"use client";

import React from "react";
import {
	LayoutDashboard,
	History,
	Heart,
	Image,
	MapPin,
	CreditCard,
	Palette,
	Droplets,
	Menu,
	X,
	User,
	Settings,
	LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccountStore, DashboardSection } from "@/store/account-store";
import { DashboardOverview } from "./DashboardOverview";
import { OrderHistory } from "./OrderHistory";

interface NavItem {
	id: DashboardSection;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	component: React.ReactNode;
	badge?: number;
}

/**
 * Main component for the user's account dashboard.
 * Manages navigation between different sections and renders the active section.
 */
export const UserAccountDashboard: React.FC = () => {
	const {
		activeSection,
		setActiveSection,
		isMobileMenuOpen,
		setIsMobileMenuOpen,
	} = useAccountStore();

	const navItems: NavItem[] = [
		{
			id: "dashboard",
			label: "Dashboard",
			icon: LayoutDashboard,
			component: <DashboardOverview />,
		},
		{
			id: "order-history",
			label: "Order History",
			icon: History,
			component: <OrderHistory />,
		},
		{
			id: "saved-colors",
			label: "Saved Colors",
			icon: Heart,
			component: (
				<div className="p-8 text-center space-y-4">
					<Heart className="w-16 h-16 mx-auto text-ds-neutral-lightGray" />
					<h3 className="text-lg font-semibold text-ds-primary-charcoal">
						Saved Colors
					</h3>
					<p className="text-ds-neutral-mediumGray">
						Manage your favorite colors and create custom palettes.
					</p>
					<p className="text-sm text-ds-neutral-mediumGray bg-ds-primary-cream/30 p-4 rounded-lg">
						This feature will be implemented in the next phase.
					</p>
				</div>
			),
			badge: 12,
		},
		{
			id: "project-gallery",
			label: "Project Gallery",
			icon: Image,
			component: (
				<div className="p-8 text-center space-y-4">
					<Image className="w-16 h-16 mx-auto text-ds-neutral-lightGray" />
					<h3 className="text-lg font-semibold text-ds-primary-charcoal">
						Project Gallery
					</h3>
					<p className="text-ds-neutral-mediumGray">
						Upload photos and track your painting projects.
					</p>
					<p className="text-sm text-ds-neutral-mediumGray bg-ds-primary-cream/30 p-4 rounded-lg">
						This feature will be implemented in the next phase.
					</p>
				</div>
			),
		},
		{
			id: "addresses",
			label: "Address Book",
			icon: MapPin,
			component: (
				<div className="p-8 text-center space-y-4">
					<MapPin className="w-16 h-16 mx-auto text-ds-neutral-lightGray" />
					<h3 className="text-lg font-semibold text-ds-primary-charcoal">
						Address Book
					</h3>
					<p className="text-ds-neutral-mediumGray">
						Manage your shipping and billing addresses.
					</p>
					<p className="text-sm text-ds-neutral-mediumGray bg-ds-primary-cream/30 p-4 rounded-lg">
						This feature will be implemented in the next phase.
					</p>
				</div>
			),
		},
		{
			id: "payment-methods",
			label: "Payment Methods",
			icon: CreditCard,
			component: (
				<div className="p-8 text-center space-y-4">
					<CreditCard className="w-16 h-16 mx-auto text-ds-neutral-lightGray" />
					<h3 className="text-lg font-semibold text-ds-primary-charcoal">
						Payment Methods
					</h3>
					<p className="text-ds-neutral-mediumGray">
						Manage your saved payment methods and billing information.
					</p>
					<p className="text-sm text-ds-neutral-mediumGray bg-ds-primary-cream/30 p-4 rounded-lg">
						This feature will be implemented in the next phase.
					</p>
				</div>
			),
		},
		{
			id: "color-recommendations",
			label: "Color Recommendations",
			icon: Palette,
			component: (
				<div className="p-8 text-center space-y-4">
					<Palette className="w-16 h-16 mx-auto text-ds-neutral-lightGray" />
					<h3 className="text-lg font-semibold text-ds-primary-charcoal">
						Color Recommendations
					</h3>
					<p className="text-ds-neutral-mediumGray">
						Get personalized color suggestions based on your preferences.
					</p>
					<p className="text-sm text-ds-neutral-mediumGray bg-ds-primary-cream/30 p-4 rounded-lg">
						This feature will be implemented in the next phase.
					</p>
				</div>
			),
		},
		{
			id: "paint-usage",
			label: "Paint Usage Tracking",
			icon: Droplets,
			component: (
				<div className="p-8 text-center space-y-4">
					<Droplets className="w-16 h-16 mx-auto text-ds-neutral-lightGray" />
					<h3 className="text-lg font-semibold text-ds-primary-charcoal">
						Paint Usage Tracking
					</h3>
					<p className="text-ds-neutral-mediumGray">
						Track your paint consumption and project efficiency.
					</p>
					<p className="text-sm text-ds-neutral-mediumGray bg-ds-primary-cream/30 p-4 rounded-lg">
						This feature will be implemented in the next phase.
					</p>
				</div>
			),
		},
	];

	const renderActiveComponent = () => {
		const activeItem = navItems.find((item) => item.id === activeSection);
		return activeItem ? activeItem.component : navItems[0].component;
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-ds-neutral-white border-b border-ds-neutral-lightGray">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-ds-primary-sage rounded-full flex items-center justify-center">
								<User className="w-6 h-6 text-ds-neutral-white" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-ds-primary-charcoal">
									My Account
								</h1>
								<p className="text-sm text-ds-neutral-mediumGray">
									Manage your paint journey
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal transition-colors duration-200">
								<Settings className="w-5 h-5" />
							</button>
							<button className="p-2 text-ds-neutral-mediumGray hover:text-red-600 transition-colors duration-200">
								<LogOut className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8">
				{/* Mobile Menu Toggle */}
				<div className="lg:hidden mb-8">
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="flex items-center space-x-2 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
						aria-expanded={isMobileMenuOpen}
						aria-controls="dashboard-mobile-menu"
						aria-label={
							isMobileMenuOpen
								? "Close navigation menu"
								: "Open navigation menu"
						}
					>
						{isMobileMenuOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
						<span>{isMobileMenuOpen ? "Close Menu" : "Menu"}</span>
					</button>

					{isMobileMenuOpen && (
						<nav
							id="dashboard-mobile-menu"
							className="mt-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-lg p-4 space-y-1"
						>
							{navItems.map((item) => (
								<button
									key={item.id}
									onClick={() => {
										setActiveSection(item.id);
										setIsMobileMenuOpen(false);
									}}
									className={cn(
										"w-full flex items-center justify-between px-4 py-2 rounded-lg text-left transition-colors duration-200",
										activeSection === item.id
											? "bg-ds-primary-sage text-ds-neutral-white"
											: "text-ds-primary-charcoal hover:bg-ds-neutral-lightGray/50"
									)}
									aria-current={activeSection === item.id ? "page" : undefined}
								>
									<div className="flex items-center space-x-4">
										<item.icon className="w-5 h-5" />
										<span>{item.label}</span>
									</div>
									{item.badge && (
										<span className="bg-red-500 text-ds-neutral-white text-xs px-2 py-1 rounded-full">
											{item.badge}
										</span>
									)}
								</button>
							))}
						</nav>
					)}
				</div>

				<div className="flex flex-col lg:flex-row lg:space-x-8">
					{/* Sidebar Navigation (Desktop) */}
					<aside className="hidden lg:block w-64 flex-shrink-0">
						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-4 sticky top-8">
							<nav className="space-y-1" aria-label="Account navigation">
								{navItems.map((item) => (
									<button
										key={item.id}
										onClick={() => setActiveSection(item.id)}
										className={cn(
											"w-full flex items-center justify-between px-4 py-2 rounded-lg text-left transition-all duration-200 group",
											activeSection === item.id
												? "bg-ds-primary-sage text-ds-neutral-white shadow-sm"
												: "text-ds-primary-charcoal hover:bg-ds-neutral-lightGray/50 hover:text-ds-primary-sage"
										)}
										aria-current={
											activeSection === item.id ? "page" : undefined
										}
									>
										<div className="flex items-center space-x-4">
											<item.icon
												className={cn(
													"w-5 h-5 transition-colors duration-200",
													activeSection === item.id
														? "text-ds-neutral-white"
														: "text-ds-neutral-mediumGray group-hover:text-ds-primary-sage"
												)}
											/>
											<span className="font-medium">{item.label}</span>
										</div>
										{item.badge && (
											<span
												className={cn(
													"text-xs px-2 py-1 rounded-full font-medium",
													activeSection === item.id
														? "bg-ds-neutral-white/20 text-ds-neutral-white"
														: "bg-red-500 text-ds-neutral-white"
												)}
											>
												{item.badge}
											</span>
										)}
									</button>
								))}
							</nav>

							{/* Account Actions */}
							<div className="mt-8 pt-4 border-t border-ds-neutral-lightGray space-y-1">
								<button className="w-full flex items-center space-x-4 px-4 py-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal hover:bg-ds-neutral-lightGray/50 rounded-lg transition-colors duration-200">
									<Settings className="w-5 h-5" />
									<span>Account Settings</span>
								</button>
								<button className="w-full flex items-center space-x-4 px-4 py-2 text-ds-neutral-mediumGray hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
									<LogOut className="w-5 h-5" />
									<span>Sign Out</span>
								</button>
							</div>
						</div>
					</aside>

					{/* Main Content Area */}
					<main className="flex-1 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm min-h-[600px]">
						{renderActiveComponent()}
					</main>
				</div>
			</div>
		</div>
	);
};
