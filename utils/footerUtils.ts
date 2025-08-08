import { FooterSection, BusinessHours, TrustSignal } from "@/types/footer";
import {
	Award,
	CheckCircle,
	RotateCcw,
	Shield,
	Star,
	Truck,
} from "lucide-react";

/**
 * Utility functions for footer functionality
 */

export const normalizePath = (path: string) => {
	try {
		const url = new URL(path, "http://dummy");
		return (url.pathname || "/").replace(/\/+$/, "") || "/";
	} catch {
		return path.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";
	}
};

export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.trim());
};

export const formatPhoneNumber = (phone: string): string => {
	// Remove all non-digits
	const digits = phone.replace(/\D/g, "");

	// Format as (XXX) XXX-XXXX
	if (digits.length === 10) {
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
	}

	// Format as 1-XXX-XXX-XXXX for 11 digits
	if (digits.length === 11 && digits[0] === "1") {
		return `1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
	}

	return phone; // Return original if doesn't match expected format
};

export const getCurrentBusinessHours = (): BusinessHours | null => {
	const now = new Date();
	const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

	const businessHours: BusinessHours[] = [
		{ day: "Sunday", hours: "10:00 AM - 5:00 PM EST" },
		{ day: "Monday", hours: "8:00 AM - 8:00 PM EST" },
		{ day: "Tuesday", hours: "8:00 AM - 8:00 PM EST" },
		{ day: "Wednesday", hours: "8:00 AM - 8:00 PM EST" },
		{ day: "Thursday", hours: "8:00 AM - 8:00 PM EST" },
		{ day: "Friday", hours: "8:00 AM - 8:00 PM EST" },
		{ day: "Saturday", hours: "9:00 AM - 6:00 PM EST" },
	];

	return businessHours[currentDay] || null;
};

export const isBusinessOpen = (): boolean => {
	const now = new Date();
	const currentDay = now.getDay();
	const currentHour = now.getHours();
	const currentMinute = now.getMinutes();
	const currentTime = currentHour + currentMinute / 60;

	// Business hours in 24-hour format
	const hours = {
		0: { open: 10, close: 17 }, // Sunday
		1: { open: 8, close: 20 }, // Monday
		2: { open: 8, close: 20 }, // Tuesday
		3: { open: 8, close: 20 }, // Wednesday
		4: { open: 8, close: 20 }, // Thursday
		5: { open: 8, close: 20 }, // Friday
		6: { open: 9, close: 18 }, // Saturday
	};

	const todayHours = hours[currentDay as keyof typeof hours];
	return currentTime >= todayHours.open && currentTime < todayHours.close;
};

export const getFooterSectionsByPageType = (
	pathname: string
): FooterSection[] => {
	// Customize footer sections based on current page
	const baseSections: FooterSection[] = [
		{
			title: "Products & Services",
			links: [
				{ label: "Interior Paints", href: "/interior-paints" },
				{ label: "Exterior Paints", href: "/exterior-paints" },
				{ label: "Color Matching", href: "/color-matching" },
				{ label: "Professional Services", href: "/consultation" },
				{ label: "Paint Calculator", href: "/calculator" },
				{ label: "Color Visualizer", href: "/visualizer" },
				{ label: "Custom Colors", href: "/custom-colors" },
				{ label: "Trade Program", href: "/trade-program" },
			],
		},
		{
			title: "Customer Support",
			links: [
				{ label: "FAQ / Help Center", href: "/faq" },
				{ label: "Contact Us", href: "/contact" },
				{ label: "Shipping Information", href: "/shipping" },
				{ label: "Return Policy", href: "/returns" },
				{ label: "Color Guarantee", href: "/guarantee" },
				{ label: "Technical Support", href: "/support/technical" },
				{ label: "Live Chat", href: "/chat" },
				{ label: "Store Locator", href: "/stores" },
			],
		},
		{
			title: "Company & Legal",
			links: [
				{ label: "About Us", href: "/about" },
				{ label: "Our Story", href: "/story" },
				{ label: "Sustainability", href: "/sustainability" },
				{ label: "Careers", href: "/careers" },
				{ label: "Press Room", href: "/press" },
				{ label: "Terms of Service", href: "/terms" },
				{ label: "Privacy Policy", href: "/privacy" },
				{ label: "Accessibility Statement", href: "/accessibility" },
			],
		},
	];

	// Add page-specific sections
	if (pathname.startsWith("/trade")) {
		baseSections[0].links.unshift({
			label: "Trade Dashboard",
			href: "/trade-program/dashboard",
		});
	}

	if (pathname.startsWith("/account")) {
		baseSections[1].links.unshift({
			label: "My Account",
			href: "/account",
		});
	}

	return baseSections;
};

export const getTrustSignals = (): TrustSignal[] => {
	return [
		{
			icon: Shield,
			title: "SSL Secured",
			description: "Your data is protected with 256-bit encryption",
			link: "/security",
		},
		{
			icon: RotateCcw,
			title: "30-Day Returns",
			description: "Hassle-free returns and exchanges",
			link: "/returns",
		},
		{
			icon: Truck,
			title: "Free Shipping",
			description: "On orders over $100 within continental US",
			link: "/shipping",
		},
		{
			icon: Award,
			title: "Quality Guarantee",
			description: "100% satisfaction promise or money back",
			link: "/guarantee",
		},
		{
			icon: Star,
			title: "Expert Rated",
			description: "Trusted by professional contractors",
			link: "/reviews",
		},
		{
			icon: CheckCircle,
			title: "Eco-Friendly",
			description: "Zero-VOC and low-emission options",
			link: "/sustainability",
		},
	];
};

export const generateFooterStructuredData = (establishedYear: number) => {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Clare Paint",
		url: "https://clare-paint.com",
		logo: "https://clare-paint.com/logo.png",
		description:
			"Premium paint crafted for the modern home. Sophisticated colors and superior quality.",
		foundingDate: establishedYear.toString(),
		address: {
			"@type": "PostalAddress",
			addressLocality: "New York",
			addressRegion: "NY",
			addressCountry: "US",
		},
		contactPoint: [
			{
				"@type": "ContactPoint",
				telephone: "1-800-CLARE-01",
				contactType: "customer service",
				availableLanguage: "English",
				hoursAvailable: {
					"@type": "OpeningHoursSpecification",
					dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					opens: "08:00",
					closes: "20:00",
				},
			},
		],
		sameAs: [
			"https://instagram.com/clarepaint",
			"https://facebook.com/clarepaint",
			"https://twitter.com/clarepaint",
			"https://youtube.com/clarepaint",
		],
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.9",
			reviewCount: "12000",
			bestRating: "5",
			worstRating: "1",
		},
	};
};

export const subscribeToNewsletter = async (formData: {
	email: string;
	preferences?: string[];
}): Promise<{ success: boolean; message: string }> => {
	// Validate email
	if (!validateEmail(formData.email)) {
		throw new Error("Invalid email address");
	}

	// Simulate API call
	const response = await fetch("/api/newsletter/subscribe", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Subscription failed");
	}

	const result = await response.json();
	return result;
};

export const trackFooterPerformance = () => {
	// Track footer load time
	if (typeof window !== "undefined" && window.performance) {
		const footerElement = document.getElementById("footer");
		if (footerElement) {
			const observer = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				entries.forEach((entry) => {
					if (entry.name.includes("footer")) {
						console.log("Footer Performance:", {
							name: entry.name,
							duration: entry.duration,
							startTime: entry.startTime,
						});
					}
				});
			});

			observer.observe({ entryTypes: ["measure", "navigation"] });
		}
	}
};

export const optimizeFooterImages = () => {
	// Lazy load footer images
	if (typeof window !== "undefined" && "IntersectionObserver" in window) {
		const footerImages = document.querySelectorAll("footer img[data-src]");

		const imageObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target as HTMLImageElement;
					img.src = img.dataset.src || "";
					img.removeAttribute("data-src");
					imageObserver.unobserve(img);
				}
			});
		});

		footerImages.forEach((img) => imageObserver.observe(img));
	}
};

export const handleFooterKeyboardNavigation = () => {
	// Enhanced keyboard navigation for footer
	if (typeof window !== "undefined") {
		const footer = document.getElementById("footer");
		if (!footer) return;

		footer.addEventListener("keydown", (event) => {
			const focusableElements = footer.querySelectorAll(
				'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const focusableArray = Array.from(focusableElements) as HTMLElement[];
			const currentIndex = focusableArray.indexOf(
				document.activeElement as HTMLElement
			);

			switch (event.key) {
				case "ArrowDown":
					event.preventDefault();
					const nextIndex = (currentIndex + 1) % focusableArray.length;
					focusableArray[nextIndex]?.focus();
					break;
				case "ArrowUp":
					event.preventDefault();
					const prevIndex =
						(currentIndex - 1 + focusableArray.length) % focusableArray.length;
					focusableArray[prevIndex]?.focus();
					break;
				case "Home":
					if (event.ctrlKey) {
						event.preventDefault();
						focusableArray[0]?.focus();
					}
					break;
				case "End":
					if (event.ctrlKey) {
						event.preventDefault();
						focusableArray[focusableArray.length - 1]?.focus();
					}
					break;
			}
		});
	}
};
