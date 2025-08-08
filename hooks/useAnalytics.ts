"use client";

import { useCallback, useEffect, useRef } from "react";

interface AnalyticsEvent {
	event: string;
	properties?: Record<string, unknown>;
	timestamp: number;
	sessionId: string;
	userId?: string;
}

interface PageViewEvent {
	page: string;
	title: string;
	referrer: string;
	timestamp: number;
	sessionId: string;
	userId?: string;
}

export const useAnalytics = () => {
	const sessionId = useRef(
		`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
	);
	const events = useRef<AnalyticsEvent[]>([]);
	const pageViews = useRef<PageViewEvent[]>([]);

	// Track page views
	const trackPageView = useCallback((pathname: string) => {
		const pageView: PageViewEvent = {
			page: pathname,
			title: document.title,
			referrer: document.referrer,
			timestamp: Date.now(),
			sessionId: sessionId.current,
		};

		pageViews.current.push(pageView);

		// Send to analytics service (Google Analytics, Mixpanel, etc.)
		if (typeof window !== "undefined" && (window as any).gtag) {
			(window as any).gtag("config", "GA_MEASUREMENT_ID", {
				page_path: pathname,
				page_title: document.title,
				custom_map: {
					custom_parameter_1: sessionId.current,
				},
			});
		}

		// Send to other analytics services
		if (typeof window !== "undefined" && (window as any).mixpanel) {
			(window as any).mixpanel.track("Page View", {
				page: pathname,
				title: document.title,
				session_id: sessionId.current,
			});
		}

		console.log("Page View:", pageView);
	}, []);

	// Track user interactions
	const trackUserInteraction = useCallback(
		(event: string, properties: Record<string, unknown> = {}) => {
			const analyticsEvent: AnalyticsEvent = {
				event,
				properties,
				timestamp: Date.now(),
				sessionId: sessionId.current,
			};

			events.current.push(analyticsEvent);

			// Send to Google Analytics
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", event, {
					event_category: "user_interaction",
					event_label: properties.label || "",
					value: properties.value || 0,
					custom_parameter_1: sessionId.current,
					...properties,
				});
			}

			// Send to Mixpanel
			if (typeof window !== "undefined" && (window as any).mixpanel) {
				(window as any).mixpanel.track(event, {
					session_id: sessionId.current,
					...properties,
				});
			}

			console.log("User Interaction:", analyticsEvent);
		},
		[]
	);

	// Track performance metrics
	const trackPerformance = useCallback(
		(
			metric: string,
			value: number,
			properties: Record<string, unknown> = {}
		) => {
			const performanceEvent: AnalyticsEvent = {
				event: "performance_metric",
				properties: {
					metric,
					value,
					...properties,
				},
				timestamp: Date.now(),
				sessionId: sessionId.current,
			};

			events.current.push(performanceEvent);

			// Send to Google Analytics
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", "timing_complete", {
					name: metric,
					value: Math.round(value),
					event_category: "performance",
					custom_parameter_1: sessionId.current,
				});
			}

			console.log("Performance Metric:", performanceEvent);
		},
		[]
	);

	// Track errors
	const trackError = useCallback((error: Error, context: string = "") => {
		const errorEvent: AnalyticsEvent = {
			event: "error",
			properties: {
				error_message: error.message,
				error_stack: error.stack,
				context,
				user_agent: navigator.userAgent,
				url: window.location.href,
			},
			timestamp: Date.now(),
			sessionId: sessionId.current,
		};

		events.current.push(errorEvent);

		// Send to error tracking service
		if (typeof window !== "undefined" && (window as any).Sentry) {
			(window as any).Sentry.captureException(error, {
				tags: {
					context,
					session_id: sessionId.current,
				},
			});
		}

		// Send to Google Analytics
		if (typeof window !== "undefined" && (window as any).gtag) {
			(window as any).gtag("event", "exception", {
				description: error.message,
				fatal: false,
				custom_parameter_1: sessionId.current,
			});
		}

		console.error("Tracked Error:", errorEvent);
	}, []);

	// Get session analytics
	const getSessionAnalytics = useCallback(() => {
		return {
			sessionId: sessionId.current,
			totalEvents: events.current.length,
			totalPageViews: pageViews.current.length,
			sessionDuration:
				Date.now() - (pageViews.current[0]?.timestamp || Date.now()),
			events: events.current,
			pageViews: pageViews.current,
		};
	}, []);

	// Initialize analytics on mount
	useEffect(() => {
		// Track session start
		trackUserInteraction("session_start", {
			user_agent: navigator.userAgent,
			screen_resolution: `${screen.width}x${screen.height}`,
			viewport_size: `${window.innerWidth}x${window.innerHeight}`,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			language: navigator.language,
		});

		// Track session end on page unload
		const handleBeforeUnload = () => {
			const sessionAnalytics = getSessionAnalytics();
			trackUserInteraction("session_end", {
				session_duration: sessionAnalytics.sessionDuration,
				total_events: sessionAnalytics.totalEvents,
				total_page_views: sessionAnalytics.totalPageViews,
			});
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [trackUserInteraction, getSessionAnalytics]);

	return {
		trackPageView,
		trackUserInteraction,
		trackPerformance,
		trackError,
		getSessionAnalytics,
		sessionId: sessionId.current,
	};
};
