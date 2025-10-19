"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProgressIndicator } from "./ProgressIndicator";
import { ScrollToTop } from "./ScrollToTop";
import { ErrorBoundary } from "../ui/ErrorBoundary";
import { LoadingOverlay } from "./LoadingOverlay";

import { cn } from "@/lib/utils";
import { usePageLayout } from "@/hooks/usePageLayout";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

interface PageLayoutProps {
	children: React.ReactNode;
	className?: string;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
	showBreadcrumbs?: boolean;
	showFooter?: boolean;
	headerVariant?: "default" | "minimal" | "checkout" | "overlay" | "account";
	fullWidth?: boolean;
	loading?: boolean;
	error?: Error | null;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
	children,
	className = "",
	maxWidth = "xl",
	showBreadcrumbs = true,
	showFooter = true,
	headerVariant = "default",
	fullWidth = false,
	loading = false,
	error = null,
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const mainRef = useRef<HTMLElement>(null);

	const {
		isHeaderSticky,
		headerHeight,
		footerHeight,
		isScrolled,
		scrollDirection,
		safeAreaInsets,
	} = usePageLayout();

	useScrollRestoration();
	const { trackPageView, trackUserInteraction } = useAnalytics();

	// Track page views
	useEffect(() => {
		trackPageView(pathname);
	}, [pathname, trackPageView]);

	// Determine layout configuration based on route
	const layoutConfig = getLayoutConfig(pathname, headerVariant);

	const effectiveFullWidth = fullWidth || layoutConfig.forceFullWidth;

	// Calculate main content styles
	const mainContentStyles = {
		minHeight: `calc(100vh - ${headerHeight}px - ${
			showFooter ? footerHeight : 0
		}px)`,
		paddingTop: layoutConfig.headerOverlay ? 0 : `${headerHeight}px`,
		paddingBottom: safeAreaInsets.bottom,
		paddingLeft: safeAreaInsets.left,
		paddingRight: safeAreaInsets.right,
	};

	const containerMaxWidth = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-4xl",
		xl: "max-w-7xl",
		"2xl": "max-w-screen-2xl",
		full: "max-w-none",
	};

	return (
		<ErrorBoundary>
			<div className="relative min-h-screen bg-ds-neutral-white">
				{/* Skip Links for Accessibility */}
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-ds-primary-sage text-ds-neutral-white px-4 py-2 rounded-lg z-50 font-medium"
				>
					Skip to main content
				</a>
				<a
					href="#footer"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-20 bg-ds-primary-sage text-ds-neutral-white px-4 py-2 rounded-lg z-50 font-medium"
				>
					Skip to footer
				</a>

				{/* Header */}
				<Header
					variant={layoutConfig.headerVariant}
					isSticky={true}
					overlay={layoutConfig.headerOverlay}
					className={cn(
						"transition-all duration-300 ease-in-out z-40",
						layoutConfig.headerOverlay && "absolute bg-transparent"
					)}
				/>

				{/* Progress Indicator for Checkout */}
				{layoutConfig.showProgress && (
					<ProgressIndicator
						currentStep={getCheckoutStep(pathname)}
						totalSteps={4}
						className="sticky top-0 z-30"
						style={{ top: `${headerHeight}px` }}
					/>
				)}

				{/* Breadcrumbs */}
				{showBreadcrumbs && layoutConfig.showBreadcrumbs && (
					<Breadcrumbs
						className="bg-ds-neutral-lightGray/20 border-b border-ds-neutral-lightGray"
						style={{
							marginTop: layoutConfig.headerOverlay ? `${headerHeight}px` : 0,
						}}
					/>
				)}

				{/* Main Content */}
				<main
					ref={mainRef}
					id="main-content"
					className={cn(
						"relative",
						!effectiveFullWidth && "mx-auto px-4 sm:px-6 lg:px-8",
						!effectiveFullWidth && containerMaxWidth[maxWidth],
						className
					)}
					style={mainContentStyles}
					role="main"
					aria-label="Main content"
				>
					{loading ? (
						<LoadingOverlay />
					) : error ? (
						<ErrorDisplay error={error} onRetry={() => router.refresh()} />
					) : (
						children
					)}
				</main>

				{/* Footer */}
				{showFooter && (
					<Footer
						id="footer"
						className={cn(
							"mt-auto",
							layoutConfig.footerSticky && "sticky bottom-0"
						)}
					/>
				)}

				{/* Scroll to Top Button */}
				<ScrollToTop
					show={isScrolled}
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
						trackUserInteraction("scroll_to_top", { page: pathname });
					}}
				/>

				{/* Loading Overlay for Page Transitions */}
				{loading && <LoadingOverlay />}
			</div>
		</ErrorBoundary>
	);
};

// Layout configuration based on route
function getLayoutConfig(pathname: string, headerVariant: string) {
	const config = {
		headerVariant: headerVariant as
			| "default"
			| "minimal"
			| "account"
			| "checkout"
			| "overlay",
		headerOverlay: false,
		showBreadcrumbs: true,
		showProgress: false,
		footerSticky: false,
		forceFullWidth: false,
	};

	// Homepage
	if (pathname === "/") {
		config.headerOverlay = headerVariant === "overlay";
		config.showBreadcrumbs = false;
		config.forceFullWidth = true;
	}

	// Checkout pages
	if (pathname.startsWith("/checkout")) {
		config.headerVariant = "checkout";
		config.showProgress = true;
		config.showBreadcrumbs = false;
	}

	// Product pages
	if (pathname.startsWith("/product/")) {
		config.showBreadcrumbs = true;
	}

	// Account pages
	if (pathname.startsWith("/account")) {
		config.headerVariant = "account";
	}

	// Category pages
	if (pathname.includes("/products") || pathname.includes("/search")) {
		config.showBreadcrumbs = true;
		config.forceFullWidth = true;
	}

	return config;
}

// Get checkout step based on pathname
function getCheckoutStep(pathname: string): number {
	if (pathname.includes("/checkout/shipping")) return 1;
	if (pathname.includes("/checkout/payment")) return 2;
	if (pathname.includes("/checkout/review")) return 3;
	if (pathname.includes("/checkout/confirmation")) return 4;
	return 1;
}

// Error Display Component
interface ErrorDisplayProps {
	error: Error;
	onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => (
	<div className="min-h-[400px] flex items-center justify-center">
		<div className="text-center p-8 max-w-md">
			<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg
					className="w-8 h-8 text-red-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
					/>
				</svg>
			</div>
			<h2 className="text-xl font-bold text-ds-primary-charcoal mb-2">
				Something went wrong
			</h2>
			<p className="text-ds-neutral-mediumGray mb-6">
				{error.message || "An unexpected error occurred"}
			</p>
			<button
				onClick={onRetry}
				className="px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
			>
				Try Again
			</button>
		</div>
	</div>
);
