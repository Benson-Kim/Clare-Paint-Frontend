"use client";

import { useState, useEffect, useCallback } from "react";

interface HeaderState {
	isScrolled: boolean;
	isVisible: boolean;
	activeDropdown: string | null;
	isMobileMenuOpen: boolean;
	isSearchOpen: boolean;
	scrollDirection: "up" | "down" | null;
	lastScrollY: number;
}

export const useHeaderState = () => {
	const [state, setState] = useState<HeaderState>({
		isScrolled: false,
		isVisible: true,
		activeDropdown: null,
		isMobileMenuOpen: false,
		isSearchOpen: false,
		scrollDirection: null,
		lastScrollY: 0,
	});

	// Scroll behavior with direction detection
	useEffect(() => {
		let ticking = false;

		const updateScrollState = () => {
			const scrollY = window.scrollY;
			const direction = scrollY > state.lastScrollY ? "down" : "up";

			setState((prev) => ({
				...prev,
				isScrolled: scrollY > 20,
				isVisible: scrollY < prev.lastScrollY || scrollY < 100,
				scrollDirection:
					Math.abs(scrollY - prev.lastScrollY) > 5
						? direction
						: prev.scrollDirection,
				lastScrollY: scrollY,
			}));

			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updateScrollState);
				ticking = true;
			}
		};

		// Initial state
		updateScrollState();

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [state.lastScrollY]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Escape key closes all dropdowns and overlays
			if (event.key === "Escape") {
				setState((prev) => ({
					...prev,
					activeDropdown: null,
					isSearchOpen: false,
					isMobileMenuOpen: false,
				}));
			}

			// Ctrl/Cmd + / opens search
			if (event.key === "/" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setState((prev) => ({ ...prev, isSearchOpen: true }));
			}

			// Ctrl/Cmd + K opens search (alternative)
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setState((prev) => ({ ...prev, isSearchOpen: true }));
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Body scroll lock for mobile menu
	useEffect(() => {
		if (state.isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
		} else {
			document.body.style.overflow = "unset";
			document.body.style.paddingRight = "0px";
		}

		return () => {
			document.body.style.overflow = "unset";
			document.body.style.paddingRight = "0px";
		};
	}, [state.isMobileMenuOpen]);

	// Close dropdowns on route change
	useEffect(() => {
		setState((prev) => ({
			...prev,
			activeDropdown: null,
			isMobileMenuOpen: false,
			isSearchOpen: false,
		}));
	}, []);

	const setActiveDropdown = useCallback((dropdown: string | null) => {
		setState((prev) => ({ ...prev, activeDropdown: dropdown }));
	}, []);

	const setMobileMenuOpen = useCallback((isOpen: boolean) => {
		setState((prev) => ({ ...prev, isMobileMenuOpen: isOpen }));
	}, []);

	const setSearchOpen = useCallback((isOpen: boolean) => {
		setState((prev) => ({ ...prev, isSearchOpen: isOpen }));
	}, []);

	return {
		...state,
		setActiveDropdown,
		setMobileMenuOpen,
		setSearchOpen,
	};
};
