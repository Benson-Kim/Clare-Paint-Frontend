"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
	Search,
	User,
	Heart,
	ShoppingCart,
	Menu,
	X,
	ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { useHeaderState } from "@/hooks/useHeaderState";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { SearchOverlay } from "./header/SearchOverlay";
import { AccountDropdown } from "./header/AccountDropdown";
import { CartDropdown } from "./header/CartDropdown";
import { WishlistDropdown } from "./header/WishlistDropdown";

interface HeaderProps {
	className?: string;
	variant?: "default" | "minimal" | "checkout" | "overlay" | "account";
	isSticky?: boolean;
	overlay?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
	className = "",
	variant = "default",
	isSticky = true,
	overlay = false,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const { getTotalItems } = useCartStore();

	const {
		isScrolled,
		isVisible,
		activeDropdown,
		isMobileMenuOpen,
		isSearchOpen,
		setActiveDropdown,
		setMobileMenuOpen,
		setSearchOpen,
	} = useHeaderState();

	const [searchQuery, setSearchQuery] = useState("");
	const [wishlistCount] = useState(3); // Mock wishlist count
	const headerRef = useRef<HTMLElement>(null);

	const cartItemCount = getTotalItems();

	// Handle dropdown toggle
	const handleDropdownToggle = (dropdownName: string) => {
		setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
	};

	// Handle search submission
	const handleSearch = (query: string) => {
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query.trim())}`);
			setSearchOpen(false);
			setSearchQuery("");
		}
	};

	// Skip links for accessibility
	const SkipLinks = () => (
		<>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-ds-primary-sage text-ds-neutral-white px-4 py-2 rounded-lg z-50 font-medium transition-all duration-200"
			>
				Skip to main content
			</a>
			<a
				href="#footer"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-20 bg-ds-primary-sage text-ds-neutral-white px-4 py-2 rounded-lg z-50 font-medium transition-all duration-200"
			>
				Skip to footer
			</a>
		</>
	);

	// Logo component
	const Logo = () => (
		<Link
			href="/"
			className="flex items-center space-x-3 group"
			aria-label="Clare Paint - Home"
		>
			<div className="w-10 h-10 bg-ds-primary-sage rounded-lg flex items-center justify-center group-hover:bg-ds-primary-sage/90 transition-colors duration-200">
				<span className="text-ds-neutral-white font-bold text-lg">C</span>
			</div>
			<div className="hidden sm:block">
				<span className="text-2xl font-bold text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
					Clare Paint
				</span>
				<p className="text-xs text-ds-neutral-mediumGray -mt-1">
					Where Artistry Meets Innovation
				</p>
			</div>
		</Link>
	);

	// Utility navigation component
	const UtilityNavigation = () => (
		<div className="flex items-center space-x-2">
			{/* Search Button */}
			<button
				onClick={() => setSearchOpen(true)}
				className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
				aria-label="Open search"
				aria-keyshortcuts="Ctrl+/"
			>
				<Search className="w-6 h-6" />
			</button>

			{/* Account Dropdown */}
			<div className="relative">
				<button
					onClick={() => handleDropdownToggle("account")}
					className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
					aria-label="Account menu"
					aria-expanded={activeDropdown === "account"}
					aria-haspopup="true"
				>
					<User className="w-6 h-6" />
				</button>
				{activeDropdown === "account" && (
					<AccountDropdown onClose={() => setActiveDropdown(null)} />
				)}
			</div>

			{/* Wishlist */}
			<div className="relative">
				<button
					onClick={() => handleDropdownToggle("wishlist")}
					className="relative p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
					aria-label={`Wishlist with ${wishlistCount} items`}
					aria-expanded={activeDropdown === "wishlist"}
					aria-haspopup="true"
				>
					<Heart className="w-6 h-6" />
					{wishlistCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-red-500 text-ds-neutral-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] min-h-[20px]">
							{wishlistCount > 99 ? "99+" : wishlistCount}
						</span>
					)}
				</button>
				{activeDropdown === "wishlist" && (
					<WishlistDropdown
						itemCount={wishlistCount}
						onClose={() => setActiveDropdown(null)}
					/>
				)}
			</div>

			{/* Cart */}
			<div className="relative">
				<button
					onClick={() => handleDropdownToggle("cart")}
					className="relative p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
					aria-label={`Shopping cart with ${cartItemCount} items`}
					aria-expanded={activeDropdown === "cart"}
					aria-haspopup="true"
				>
					<ShoppingCart className="w-6 h-6" />
					{cartItemCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] min-h-[20px]">
							{cartItemCount > 99 ? "99+" : cartItemCount}
						</span>
					)}
				</button>
				{activeDropdown === "cart" && (
					<CartDropdown onClose={() => setActiveDropdown(null)} />
				)}
			</div>

			{/* Mobile Menu Toggle */}
			<button
				onClick={() => setMobileMenuOpen(true)}
				className="lg:hidden p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
				aria-label="Open mobile menu"
				aria-expanded={isMobileMenuOpen}
			>
				<Menu className="w-6 h-6" />
			</button>
		</div>
	);

	// Render different header variants
	const renderHeaderContent = () => {
		const baseHeight = "h-20 lg:h-20";
		const mobileHeight = "h-16 lg:h-20";

		switch (variant) {
			case "minimal":
				return (
					<div
						className={cn("flex items-center justify-between", mobileHeight)}
					>
						<Logo />
						<div className="flex items-center space-x-4">
							<Link
								href="/cart"
								className="text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200"
								aria-label={`Cart with ${cartItemCount} items`}
							>
								<div className="relative">
									<ShoppingCart className="w-6 h-6" />
									{cartItemCount > 0 && (
										<span className="absolute -top-1 -right-1 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
											{cartItemCount}
										</span>
									)}
								</div>
							</Link>
						</div>
					</div>
				);

			case "checkout":
				return (
					<div
						className={cn("flex items-center justify-between", mobileHeight)}
					>
						<Logo />
						<div className="flex items-center space-x-4 text-sm text-ds-neutral-mediumGray">
							<span>Need help? Call 1-800-CLARE-01</span>
						</div>
					</div>
				);

			case "account":
				return (
					<div className={cn("flex items-center justify-between", baseHeight)}>
						<Logo />
						<nav
							className="hidden md:flex items-center space-x-6"
							aria-label="Account navigation"
						>
							<Link
								href="/account"
								className={cn(
									"text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 font-medium",
									pathname === "/account" && "text-ds-primary-sage"
								)}
							>
								My Account
							</Link>
							<Link
								href="/account/orders"
								className={cn(
									"text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200",
									pathname.includes("/orders") && "text-ds-primary-sage"
								)}
							>
								Orders
							</Link>
							<Link
								href="/account/colors"
								className={cn(
									"text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200",
									pathname.includes("/colors") && "text-ds-primary-sage"
								)}
							>
								Saved Colors
							</Link>
						</nav>
						<UtilityNavigation />
					</div>
				);

			default:
				return (
					<div className={cn("flex items-center justify-between", baseHeight)}>
						<Logo />
						<DesktopNavigation
							activeDropdown={activeDropdown}
							onDropdownToggle={handleDropdownToggle}
							className="hidden lg:flex"
							currentPath={pathname}
						/>
						<UtilityNavigation />
					</div>
				);
		}
	};

	return (
		<>
			<SkipLinks />

			<header
				ref={headerRef}
				className={cn(
					"w-full z-40 transition-all duration-300 ease-in-out",
					isSticky && "fixed top-0 left-0 right-0",
					overlay
						? "bg-transparent"
						: isScrolled
						? "bg-ds-neutral-white/95 backdrop-blur-md shadow-lg"
						: "bg-ds-neutral-white",
					isSticky && !isVisible && isScrolled && "transform -translate-y-full",
					className
				)}
				role="banner"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{renderHeaderContent()}
				</div>

				{/* Mobile Navigation */}
				{variant !== "minimal" && variant !== "checkout" && (
					<MobileNavigation
						isOpen={isMobileMenuOpen}
						onClose={() => setMobileMenuOpen(false)}
						onSearch={handleSearch}
						currentPath={pathname}
					/>
				)}

				{/* Search Overlay */}
				{variant !== "minimal" && variant !== "checkout" && (
					<SearchOverlay
						isOpen={isSearchOpen}
						onClose={() => setSearchOpen(false)}
						onSearch={handleSearch}
						searchQuery={searchQuery}
						onSearchQueryChange={setSearchQuery}
					/>
				)}
			</header>

			{/* Header spacer to prevent content overlap */}
			{isSticky && <div className="h-16 lg:h-20" aria-hidden="true" />}
		</>
	);
};
