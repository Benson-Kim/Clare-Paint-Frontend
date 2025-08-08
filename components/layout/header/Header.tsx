"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingCart, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { SearchOverlay } from "./SearchOverlay";
import { AccountDropdown } from "./AccountDropdown";
import { CartDropdown } from "./CartDropdown";
import { WishlistDropdown } from "./WishlistDropdown";

interface HeaderProps {
	className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
	const router = useRouter();
	const pathname = usePathname() ?? "/";
	const { getTotalItems } = useCartStore();

	// State management
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [wishlistCount, setWishlistCount] = useState(3); // Mock wishlist count

	// Refs for click outside detection
	const headerRef = useRef<HTMLElement>(null);
	const searchRef = useRef<HTMLDivElement>(null);

	// Scroll behavior for sticky header
	useEffect(() => {
		let lastScrollY = window.scrollY;
		let ticking = false;

		const updateScrolled = () => {
			const scrollY = window.scrollY;
			setIsScrolled(scrollY > 20);

			// Hide/show header based on scroll direction
			if (Math.abs(scrollY - lastScrollY) < 10) return;

			if (headerRef.current) {
				if (scrollY > lastScrollY && scrollY > 100) {
					headerRef.current.style.transform = "translateY(-100%)";
				} else {
					headerRef.current.style.transform = "translateY(0)";
				}
			}

			lastScrollY = scrollY;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updateScrolled);
				ticking = true;
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				setActiveDropdown(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setActiveDropdown(null);
				setIsSearchOpen(false);
				setIsMobileMenuOpen(false);
			}

			if (event.key === "/" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setIsSearchOpen(true);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handleDropdownToggle = (dropdownName: string) => {
		setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
	};

	const handleSearch = (query: string) => {
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query.trim())}`);
			setIsSearchOpen(false);
			setSearchQuery("");
		}
	};

	const cartItemCount = getTotalItems();

	return (
		<>
			{/* Skip to main content link for accessibility */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-ds-primary-sage text-ds-neutral-white px-4 py-2 rounded-lg z-50"
			>
				Skip to main content
			</a>

			<header
				ref={headerRef}
				className={cn(
					"fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
					isScrolled
						? "bg-ds-neutral-white/95 backdrop-blur-md shadow-lg"
						: "bg-ds-neutral-white",
					className
				)}
				role="banner"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-20 lg:h-20">
						{/* Logo */}
						<div className="flex items-center">
							<Link
								href="/"
								className="flex items-center space-x-3 group"
								aria-label="Clare Paint - Home"
							>
								<div className="w-10 h-10 bg-ds-primary-sage rounded-lg flex items-center justify-center group-hover:bg-ds-primary-sage/90 transition-colors duration-200">
									<span className="text-ds-neutral-white font-bold text-lg">
										C
									</span>
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
						</div>

						{/* Desktop Navigation */}
						<DesktopNavigation
							activeDropdown={activeDropdown}
							onDropdownToggle={handleDropdownToggle}
							className="hidden lg:flex"
							currentPath={pathname}
						/>

						{/* Utility Navigation */}
						<div className="flex items-center space-x-2">
							{/* Search Button */}
							<button
								onClick={() => setIsSearchOpen(true)}
								className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5"
								aria-label="Open search"
							>
								<Search className="w-6 h-6" />
							</button>

							{/* Account */}
							<div className="relative">
								<button
									onClick={() => handleDropdownToggle("account")}
									className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5"
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
									className="relative p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5"
									aria-label={`Wishlist with ${wishlistCount} items`}
									aria-expanded={activeDropdown === "wishlist"}
									aria-haspopup="true"
								>
									<Heart className="w-6 h-6" />
									{wishlistCount > 0 && (
										<span className="absolute -top-1 -right-1 bg-red-500 text-ds-neutral-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
									className="relative p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5"
									aria-label={`Shopping cart with ${cartItemCount} items`}
									aria-expanded={activeDropdown === "cart"}
									aria-haspopup="true"
								>
									<ShoppingCart className="w-6 h-6" />
									{cartItemCount > 0 && (
										<span className="absolute -top-1 -right-1 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
								onClick={() => setIsMobileMenuOpen(true)}
								className="lg:hidden p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5"
								aria-label="Open mobile menu"
								aria-expanded={isMobileMenuOpen}
							>
								<Menu className="w-6 h-6" />
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation Overlay */}
				<MobileNavigation
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
					onSearch={handleSearch}
					currentPath={pathname}
				/>

				{/* Search Overlay */}
				<SearchOverlay
					isOpen={isSearchOpen}
					onClose={() => setIsSearchOpen(false)}
					onSearch={handleSearch}
					searchQuery={searchQuery}
					onSearchQueryChange={setSearchQuery}
				/>
			</header>

			{/* Header spacer to prevent content overlap */}
			<div className="h-20 lg:h-20" aria-hidden="true" />
		</>
	);
};
