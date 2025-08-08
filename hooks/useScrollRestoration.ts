"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface ScrollPosition {
	x: number;
	y: number;
}

export const useScrollRestoration = () => {
	const pathname = usePathname();
	const scrollPositions = useRef<Map<string, ScrollPosition>>(new Map());
	const isRestoringRef = useRef(false);

	// Save scroll position when leaving a page
	useEffect(() => {
		const saveScrollPosition = () => {
			if (!isRestoringRef.current) {
				scrollPositions.current.set(pathname, {
					x: window.scrollX,
					y: window.scrollY,
				});
			}
		};

		// Save position before page unload
		window.addEventListener("beforeunload", saveScrollPosition);

		// Save position on route change
		return () => {
			saveScrollPosition();
			window.removeEventListener("beforeunload", saveScrollPosition);
		};
	}, [pathname]);

	// Restore scroll position when entering a page
	useEffect(() => {
		const restoreScrollPosition = () => {
			const savedPosition = scrollPositions.current.get(pathname);

			if (savedPosition) {
				isRestoringRef.current = true;

				// Use requestAnimationFrame to ensure DOM is ready
				requestAnimationFrame(() => {
					window.scrollTo(savedPosition.x, savedPosition.y);

					// Reset flag after restoration
					setTimeout(() => {
						isRestoringRef.current = false;
					}, 100);
				});
			} else {
				// New page - scroll to top
				window.scrollTo(0, 0);
			}
		};

		// Restore position after a short delay to ensure content is loaded
		const timeoutId = setTimeout(restoreScrollPosition, 100);

		return () => clearTimeout(timeoutId);
	}, [pathname]);

	// Handle browser back/forward navigation
	useEffect(() => {
		const handlePopState = () => {
			// Browser will handle scroll restoration for back/forward
			isRestoringRef.current = true;
			setTimeout(() => {
				isRestoringRef.current = false;
			}, 100);
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);

	// Smooth scroll to element with header offset
	const scrollToElement = (elementId: string, offset: number = 80) => {
		const element = document.getElementById(elementId);
		if (element) {
			const elementTop = element.offsetTop - offset;
			window.scrollTo({
				top: elementTop,
				behavior: "smooth",
			});
		}
	};

	// Scroll to top of page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return {
		scrollToElement,
		scrollToTop,
		isRestoring: isRestoringRef.current,
	};
};
