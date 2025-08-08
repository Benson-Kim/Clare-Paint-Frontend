"use client";

import { useCallback, useRef } from "react";

interface FooterAnalyticsEvent {
	event: string;
	section: string;
	link?: string;
	timestamp: number;
	sessionId: string;
}

interface NewsletterAnalyticsEvent {
	event: "newsletter_signup" | "newsletter_error" | "newsletter_view";
	email?: string;
	error?: string;
	timestamp: number;
	sessionId: string;
}

interface SocialMediaAnalyticsEvent {
	event: "social_click";
	platform: string;
	timestamp: number;
	sessionId: string;
}

export const useFooterAnalytics = () => {
	const sessionId = useRef(
		`footer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
	);

	const trackFooterInteraction = useCallback(
		(section: string, link?: string, additionalData?: Record<string, any>) => {
			const event: FooterAnalyticsEvent = {
				event: "footer_interaction",
				section,
				link,
				timestamp: Date.now(),
				sessionId: sessionId.current,
			};

			// Send to analytics service
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", "footer_interaction", {
					event_category: "footer",
					event_label: link || section,
					custom_parameter_1: section,
					custom_parameter_2: sessionId.current,
					...additionalData,
				});
			}

			// Send to other analytics services
			if (typeof window !== "undefined" && (window as any).mixpanel) {
				(window as any).mixpanel.track("Footer Interaction", {
					section,
					link,
					session_id: sessionId.current,
					...additionalData,
				});
			}

			console.log("Footer Analytics:", event);
		},
		[]
	);

	const trackNewsletterEvent = useCallback(
		(
			event: NewsletterAnalyticsEvent["event"],
			data?: { email?: string; error?: string }
		) => {
			const analyticsEvent: NewsletterAnalyticsEvent = {
				event,
				email: data?.email,
				error: data?.error,
				timestamp: Date.now(),
				sessionId: sessionId.current,
			};

			// Send to analytics service
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", event, {
					event_category: "newsletter",
					event_label: data?.email ? "signup_success" : "signup_attempt",
					custom_parameter_1: sessionId.current,
				});
			}

			// Track newsletter conversion funnel
			if (event === "newsletter_signup" && typeof window !== "undefined") {
				// Track successful conversion
				if ((window as any).gtag) {
					(window as any).gtag("event", "conversion", {
						send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
						value: 1.0,
						currency: "USD",
					});
				}
			}

			console.log("Newsletter Analytics:", analyticsEvent);
		},
		[]
	);

	const trackSocialMediaClick = useCallback((platform: string) => {
		const event: SocialMediaAnalyticsEvent = {
			event: "social_click",
			platform,
			timestamp: Date.now(),
			sessionId: sessionId.current,
		};

		// Send to analytics service
		if (typeof window !== "undefined" && (window as any).gtag) {
			(window as any).gtag("event", "social_click", {
				event_category: "social_media",
				event_label: platform,
				custom_parameter_1: sessionId.current,
			});
		}

		console.log("Social Media Analytics:", event);
	}, []);

	const trackContactInteraction = useCallback(
		(contactType: string, contactValue: string) => {
			trackFooterInteraction("contact", contactType, {
				contact_type: contactType,
				contact_value: contactValue,
			});
		},
		[trackFooterInteraction]
	);

	const trackTrustSignalView = useCallback(
		(signalType: string) => {
			trackFooterInteraction("trust_signals", signalType, {
				signal_type: signalType,
			});
		},
		[trackFooterInteraction]
	);

	return {
		trackFooterInteraction,
		trackNewsletterEvent,
		trackSocialMediaClick,
		trackContactInteraction,
		trackTrustSignalView,
		sessionId: sessionId.current,
	};
};
