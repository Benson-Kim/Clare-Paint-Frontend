"use client";

import { useCallback, useRef, useState, useEffect } from "react";

interface SearchEvent {
	query: string;
	filters: any;
	timestamp: number;
	resultCount: number;
	sessionId: string;
	userId?: string;
}

interface FilterUsageEvent {
	filterType: string;
	filterValue: string;
	timestamp: number;
	sessionId: string;
}

interface ResultClickEvent {
	productId: string;
	query: string;
	position: number;
	timestamp: number;
	sessionId: string;
}

interface SearchSession {
	sessionId: string;
	startTime: number;
	searches: SearchEvent[];
	clicks: ResultClickEvent[];
	filters: FilterUsageEvent[];
}

export const useSearchAnalytics = () => {
	const searchEvents = useRef<SearchEvent[]>([]);
	const filterEvents = useRef<FilterUsageEvent[]>([]);
	const clickEvents = useRef<ResultClickEvent[]>([]);
	const [sessionId] = useState(
		() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
	);
	const [currentSession, setCurrentSession] = useState<SearchSession>({
		sessionId,
		startTime: Date.now(),
		searches: [],
		clicks: [],
		filters: [],
	});

	// Track session duration and behavior
	useEffect(() => {
		const startTime = Date.now();

		const handleBeforeUnload = () => {
			const sessionDuration = Date.now() - startTime;
			// In production, send session data to analytics
			console.log("Search session ended:", {
				sessionId,
				duration: sessionDuration,
				totalSearches: currentSession.searches.length,
				totalClicks: currentSession.clicks.length,
				conversionRate:
					currentSession.clicks.length /
					Math.max(1, currentSession.searches.length),
			});
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [sessionId, currentSession]);

	const trackSearch = useCallback(
		(query: string, filters: any, resultCount: number = 0) => {
			const event: SearchEvent = {
				query,
				filters,
				timestamp: Date.now(),
				resultCount,
				sessionId,
			};

			searchEvents.current.push(event);
			setCurrentSession((prev) => ({
				...prev,
				searches: [...prev.searches, event],
			}));

			// In a real app, send to analytics service
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", "search", {
					search_term: query,
					session_id: sessionId,
					custom_parameter_1: JSON.stringify(filters),
					custom_parameter_2: resultCount,
				});
			}

			// Track zero-result searches for optimization
			if (resultCount === 0) {
				console.log("Zero results search:", { query, filters, sessionId });
			}
		},
		[]
	);

	const trackFilterUsage = useCallback((filters: any) => {
		Object.entries(filters).forEach(([filterType, filterValue]) => {
			if (
				filterValue &&
				(Array.isArray(filterValue) ? filterValue.length > 0 : true)
			) {
				const event: FilterUsageEvent = {
					filterType,
					filterValue: Array.isArray(filterValue)
						? filterValue.join(",")
						: String(filterValue),
					timestamp: Date.now(),
					sessionId,
				};

				filterEvents.current.push(event);
				setCurrentSession((prev) => ({
					...prev,
					filters: [...prev.filters, event],
				}));
			}
		});
	}, []);

	const trackResultClick = useCallback(
		(productId: string, query: string, position: number) => {
			const event: ResultClickEvent = {
				productId,
				query,
				position,
				timestamp: Date.now(),
				sessionId,
			};

			clickEvents.current.push(event);
			setCurrentSession((prev) => ({
				...prev,
				clicks: [...prev.clicks, event],
			}));

			// In a real app, send to analytics service
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", "select_item", {
					item_id: productId,
					item_name: productId,
					item_category: "paint",
					item_list_name: "search_results",
					item_list_id: query,
					session_id: sessionId,
					index: position,
				});
			}
		},
		[]
	);

	const trackSearchRefinement = useCallback(
		(originalQuery: string, refinedQuery: string) => {
			// Track when users refine their searches
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", "search_refinement", {
					original_query: originalQuery,
					refined_query: refinedQuery,
					session_id: sessionId,
				});
			}
		},
		[sessionId]
	);

	const trackNoResultsAction = useCallback(
		(
			action: "clear_filters" | "contact_support" | "email_notify",
			query: string
		) => {
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", "no_results_action", {
					action,
					search_query: query,
					session_id: sessionId,
				});
			}
		},
		[sessionId]
	);

	const getSearchAnalytics = useCallback(() => {
		const now = Date.now();
		const dayMs = 24 * 60 * 60 * 1000;
		const weekMs = 7 * dayMs;
		const monthMs = 30 * dayMs;

		const recentSearches = searchEvents.current.filter(
			(event) => now - event.timestamp < monthMs
		);

		const zeroResultSearches = recentSearches.filter(
			(event) => event.resultCount === 0
		);
		const successfulSearches = recentSearches.filter(
			(event) => event.resultCount > 0
		);

		const topQueries = recentSearches.reduce((acc, event) => {
			acc[event.query] = (acc[event.query] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		const topFilters = filterEvents.current
			.filter((event) => now - event.timestamp < monthMs)
			.reduce((acc, event) => {
				const key = `${event.filterType}:${event.filterValue}`;
				acc[key] = (acc[key] || 0) + 1;
				return acc;
			}, {} as Record<string, number>);

		const clickThroughRate =
			recentSearches.length > 0
				? (clickEvents.current.filter(
						(event) => now - event.timestamp < monthMs
				  ).length /
						recentSearches.length) *
				  100
				: 0;

		return {
			totalSearches: recentSearches.length,
			successfulSearches: successfulSearches.length,
			zeroResultSearches: zeroResultSearches.length,
			clickThroughRate: Math.round(clickThroughRate * 100) / 100,
			topQueries: Object.entries(topQueries)
				.sort(([, a], [, b]) => b - a)
				.slice(0, 10),
			topFilters: Object.entries(topFilters)
				.sort(([, a], [, b]) => b - a)
				.slice(0, 10),
			avgResultsPerSearch:
				recentSearches.length > 0
					? recentSearches.reduce((sum, event) => sum + event.resultCount, 0) /
					  recentSearches.length
					: 0,
			sessionData: currentSession,
		};
	}, []);

	const getPopularSearches = useCallback(() => {
		const analytics = getSearchAnalytics();
		return analytics.topQueries.map(([query]) => query);
	}, [getSearchAnalytics]);

	const getTrendingColors = useCallback(() => {
		// Mock trending colors data with search volume
		return [
			{ name: "Sage Whisper", hex: "#5B7B7A", searches: 1250, trend: "up" },
			{ name: "Warm Cream", hex: "#F5F5DC", searches: 980, trend: "up" },
			{
				name: "Charcoal Depth",
				hex: "#2C2C2C",
				searches: 875,
				trend: "stable",
			},
			{ name: "Classic White", hex: "#FFFFFF", searches: 1420, trend: "down" },
			{ name: "Soft Gray", hex: "#D3D3D3", searches: 760, trend: "up" },
			{ name: "Warm Beige", hex: "#C4A57B", searches: 650, trend: "stable" },
		];
	}, []);

	const getSearchInsights = useCallback(() => {
		const analytics = getSearchAnalytics();
		const insights = [];

		if (analytics.zeroResultSearches > analytics.successfulSearches * 0.3) {
			insights.push({
				type: "warning",
				message: "High number of searches with no results detected",
				action:
					"Consider expanding product catalog or improving search algorithm",
			});
		}

		if (analytics.clickThroughRate < 10) {
			insights.push({
				type: "info",
				message: "Low click-through rate on search results",
				action: "Consider improving result relevance or product presentation",
			});
		}

		return insights;
	}, [getSearchAnalytics]);

	return {
		trackSearch,
		trackFilterUsage,
		trackResultClick,
		trackSearchRefinement,
		trackNoResultsAction,
		getSearchAnalytics,
		getPopularSearches,
		getTrendingColors,
		getSearchInsights,
		currentSession,
	};
};
