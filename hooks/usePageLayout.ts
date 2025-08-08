"use client";

import { useState, useEffect, useCallback } from "react";

interface SafeAreaInsets {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

interface PageLayoutState {
	isHeaderSticky: boolean;
	headerHeight: number;
	footerHeight: number;
	isScrolled: boolean;
	scrollDirection: "up" | "down" | null;
	safeAreaInsets: SafeAreaInsets;
	viewportHeight: number;
	isVisible: boolean;
}

export const usePageLayout = () => {
	const [state, setState] = useState<PageLayoutState>({
		isHeaderSticky: true,
		headerHeight: 80,
		footerHeight: 400,
		isScrolled: false,
		scrollDirection: null,
		safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
		viewportHeight: 0,
		isVisible: true,
	});

	// Track scroll behavior
	useEffect(() => {
		let lastScrollY = window.scrollY;
		let ticking = false;

		const updateScrollState = () => {
			const scrollY = window.scrollY;
			const direction = scrollY > lastScrollY ? "down" : "up";

			setState((prev) => ({
				...prev,
				isScrolled: scrollY > 20,
				scrollDirection:
					Math.abs(scrollY - lastScrollY) > 5
						? direction
						: prev.scrollDirection,
				isVisible: scrollY < lastScrollY || scrollY < 100,
			}));

			lastScrollY = scrollY;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updateScrollState);
				ticking = true;
			}
		};

		// Initial scroll state
		updateScrollState();

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Track viewport changes and safe area insets
	useEffect(() => {
		const updateViewport = () => {
			const vh = window.innerHeight;

			// Detect safe area insets for mobile devices
			const safeAreaInsets: SafeAreaInsets = {
				top: parseInt(
					getComputedStyle(document.documentElement).getPropertyValue(
						"--sat"
					) || "0"
				),
				bottom: parseInt(
					getComputedStyle(document.documentElement).getPropertyValue(
						"--sab"
					) || "0"
				),
				left: parseInt(
					getComputedStyle(document.documentElement).getPropertyValue(
						"--sal"
					) || "0"
				),
				right: parseInt(
					getComputedStyle(document.documentElement).getPropertyValue(
						"--sar"
					) || "0"
				),
			};

			setState((prev) => ({
				...prev,
				viewportHeight: vh,
				safeAreaInsets,
			}));
		};

		// Set CSS custom properties for safe area insets
		const setCSSProperties = () => {
			const root = document.documentElement;
			root.style.setProperty("--sat", "env(safe-area-inset-top)");
			root.style.setProperty("--sab", "env(safe-area-inset-bottom)");
			root.style.setProperty("--sal", "env(safe-area-inset-left)");
			root.style.setProperty("--sar", "env(safe-area-inset-right)");
		};

		setCSSProperties();
		updateViewport();

		window.addEventListener("resize", updateViewport);
		window.addEventListener("orientationchange", updateViewport);

		return () => {
			window.removeEventListener("resize", updateViewport);
			window.removeEventListener("orientationchange", updateViewport);
		};
	}, []);

	// Measure header and footer heights
	useEffect(() => {
		const measureElements = () => {
			const header = document.querySelector("header");
			const footer = document.querySelector("footer");

			setState((prev) => ({
				...prev,
				headerHeight: header?.offsetHeight || 80,
				footerHeight: footer?.offsetHeight || 400,
			}));
		};

		// Measure on mount and when content changes
		measureElements();

		const observer = new ResizeObserver(measureElements);
		const header = document.querySelector("header");
		const footer = document.querySelector("footer");

		if (header) observer.observe(header);
		if (footer) observer.observe(footer);

		return () => observer.disconnect();
	}, []);

	// Keyboard navigation support
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Home key - scroll to top
			if (event.key === "Home" && (event.ctrlKey || event.metaKey)) {
				event.preventDefault();
				window.scrollTo({ top: 0, behavior: "smooth" });
			}

			// End key - scroll to bottom
			if (event.key === "End" && (event.ctrlKey || event.metaKey)) {
				event.preventDefault();
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: "smooth",
				});
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const scrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const scrollToBottom = useCallback(() => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
	}, []);

	const scrollToElement = useCallback(
		(elementId: string) => {
			const element = document.getElementById(elementId);
			if (element) {
				const offsetTop = element.offsetTop - state.headerHeight - 20;
				window.scrollTo({ top: offsetTop, behavior: "smooth" });
			}
		},
		[state.headerHeight]
	);

	return {
		...state,
		scrollToTop,
		scrollToBottom,
		scrollToElement,
	};
};
