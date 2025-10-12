/**
 * Retry configuration interface
 */
export interface RetryConfig {
	maxAttempts?: number;
	baseDelay?: number;
	maxDelay?: number;
	exponentialBackoff?: boolean;
	onRetry?: (attempt: number, error: Error) => void;
	shouldRetry?: (error: Error) => boolean;
}

/**
 * Retry error class
 */
export class RetryError extends Error {
	constructor(
		message: string,
		public attempts: number,
		public lastError: Error
	) {
		super(message);
		this.name = "RetryError";
	}
}

/**
 * Calculate delay with exponential backoff
 */
function calculateDelay(
	attempt: number,
	baseDelay: number,
	maxDelay: number,
	exponential: boolean
): number {
	if (!exponential) {
		return baseDelay;
	}

	const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
	// Add jitter to prevent thundering herd
	const jitter = Math.random() * 0.3 * delay;
	return delay + jitter;
}

/**
 * Default retry predicate - retry on network errors and 5xx status codes
 */
interface RetryableError {
	message?: string;
	status?: number;
	code?: string;
}

function defaultShouldRetry(error: RetryableError): boolean {
	// Network errors
	if (
		error.message?.includes("NetworkError") ||
		error.message?.includes("Failed to fetch")
	) {
		return true;
	}

	// HTTP 5xx errors
	if (
		typeof error.status === "number" &&
		error.status >= 500 &&
		error.status < 600
	) {
		return true;
	}

	// Timeout errors
	if (error.code === "ETIMEDOUT" || error.message?.includes("timeout")) {
		return true;
	}

	return false;
}

/**
 * Retry a function with exponential backoff
 */
export async function withRetry<T>(
	fn: () => Promise<T>,
	config: RetryConfig = {}
): Promise<T> {
	const {
		maxAttempts = 3,
		baseDelay = 1000,
		maxDelay = 10000,
		exponentialBackoff = true,
		onRetry,
		shouldRetry = defaultShouldRetry,
	} = config;

	let lastError: Error;
	let attempt = 0;

	while (attempt < maxAttempts) {
		attempt++;

		try {
			return await fn();
		} catch (error) {
			lastError = error as Error;

			// Don't retry if it's the last attempt or if error is not retryable
			if (attempt >= maxAttempts || !shouldRetry(lastError)) {
				break;
			}

			// Calculate delay and notify
			const delay = calculateDelay(
				attempt,
				baseDelay,
				maxDelay,
				exponentialBackoff
			);
			onRetry?.(attempt, lastError);

			// Wait before retrying
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	throw new RetryError(
		`Failed after ${attempt} attempts: ${lastError!.message}`,
		attempt,
		lastError!
	);
}

/**
 * Retry wrapper for fetch requests
 */
export async function fetchWithRetry(
	url: string,
	options?: RequestInit,
	retryConfig?: RetryConfig
): Promise<Response> {
	return withRetry(
		async () => {
			const response = await fetch(url, options);

			// Consider non-2xx responses as errors for retry logic
			if (!response.ok) {
				const error = new Error(
					`HTTP ${response.status}: ${response.statusText}`
				) as Error & { status: number };
				error.status = response.status;
				throw error;
			}

			return response;
		},
		{
			maxAttempts: 3,
			baseDelay: 1000,
			...retryConfig,
		}
	);
}

/**
 * Hook to use retry functionality in React components
 */
import { useState, useCallback } from "react";

export function useRetry<T>(fn: () => Promise<T>, config?: RetryConfig) {
	const [isRetrying, setIsRetrying] = useState(false);
	const [retryCount, setRetryCount] = useState(0);
	const [error, setError] = useState<Error | null>(null);

	const execute = useCallback(async (): Promise<T | null> => {
		setIsRetrying(true);
		setError(null);

		try {
			const result = await withRetry(fn, {
				...config,
				onRetry: (attempt, err) => {
					setRetryCount(attempt);
					config?.onRetry?.(attempt, err);
				},
			});
			setIsRetrying(false);
			setRetryCount(0);
			return result;
		} catch (err) {
			setError(err as Error);
			setIsRetrying(false);
			return null;
		}
	}, [fn, config]);

	return {
		execute,
		isRetrying,
		retryCount,
		error,
	};
}

/**
 * Retry with circuit breaker pattern
 */
class CircuitBreaker {
	private failureCount = 0;
	private lastFailureTime = 0;
	private state: "closed" | "open" | "half-open" = "closed";

	constructor(
		private failureThreshold = 5,
		private resetTimeout = 60000 // 1 minute
	) {}

	async execute<T>(fn: () => Promise<T>): Promise<T> {
		if (this.state === "open") {
			if (Date.now() - this.lastFailureTime > this.resetTimeout) {
				this.state = "half-open";
			} else {
				throw new Error("Circuit breaker is open");
			}
		}

		try {
			const result = await fn();
			this.onSuccess();
			return result;
		} catch (error) {
			this.onFailure();
			throw error;
		}
	}

	private onSuccess() {
		this.failureCount = 0;
		this.state = "closed";
	}

	private onFailure() {
		this.failureCount++;
		this.lastFailureTime = Date.now();

		if (this.failureCount >= this.failureThreshold) {
			this.state = "open";
		}
	}

	getState() {
		return this.state;
	}
}

/**
 * Global circuit breaker instances for different services
 */
export const circuitBreakers = {
	api: new CircuitBreaker(5, 60000),
	payment: new CircuitBreaker(3, 120000),
	analytics: new CircuitBreaker(10, 30000),
};

/**
 * Retry with exponential backoff for API calls
 */
export async function retryApiCall<T>(
	apiCall: () => Promise<T>,
	serviceName: keyof typeof circuitBreakers = "api"
): Promise<T> {
	const breaker = circuitBreakers[serviceName];

	return breaker.execute(() =>
		withRetry(apiCall, {
			maxAttempts: 3,
			baseDelay: 1000,
			maxDelay: 10000,
			exponentialBackoff: true,
			shouldRetry: (error: RetryableError) => {
				// Retry on network errors and 5xx status codes
				if (
					error.message?.includes("NetworkError") ||
					error.message?.includes("Failed to fetch")
				) {
					return true;
				}

				// Retry on 5xx errors
				if (
					typeof error.status === "number" &&
					error.status >= 500 &&
					error.status < 600
				) {
					return true;
				}

				// Retry on timeout
				if (error.code === "ETIMEDOUT") {
					return true;
				}

				// Don't retry on 4xx errors (client errors)
				return false;
			},
		})
	);
}
