"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	isolate?: boolean;
	resetKeys?: Array<string | number>;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to console in development
		if (process.env.NODE_ENV === "development") {
			console.error("Error Boundary caught an error:", error);
			console.error("Error Info:", errorInfo);
		}

		// Log to external service in production
		this.logErrorToService(error, errorInfo);

		// Call custom error handler if provided
		this.props.onError?.(error, errorInfo);

		this.setState({
			errorInfo,
		});
	}

	componentDidUpdate(prevProps: ErrorBoundaryProps) {
		if (this.state.hasError && this.props.resetKeys) {
			const hasResetKeyChanged = this.props.resetKeys.some(
				(key, index) => key !== prevProps.resetKeys?.[index]
			);

			if (hasResetKeyChanged) {
				this.reset();
			}
		}
	}

	/**
	 * TODO: Log error to external service (// Example: Send to Sentry, LogRocket, etc.)
	 */
	private logErrorToService(error: Error, errorInfo: ErrorInfo) {
		try {
			// window.errorLogger?.log({
			//   error: error.toString(),
			//   stack: error.stack,
			//   componentStack: errorInfo.componentStack,
			//   timestamp: new Date().toISOString(),
			//   url: window.location.href,
			//   userAgent: navigator.userAgent,
			// });

			console.error("[Error Service]", {
				message: error.message,
				stack: error.stack,
				componentStack: errorInfo.componentStack,
			});
		} catch (loggingError) {
			console.error("Failed to log error:", loggingError);
		}
	}

	reset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			if (this.props.isolate) {
				return (
					<div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
						<div className="flex items-center space-x-2 text-red-700 mb-2">
							<AlertTriangle className="w-5 h-5" />
							<h3 className="font-semibold">Component Error</h3>
						</div>
						<p className="text-sm text-red-600 mb-4">
							This section encountered an error. The rest of the page should
							work normally.
						</p>
						<button
							onClick={this.reset}
							className="text-sm text-red-700 hover:text-red-800 underline"
						>
							Try again
						</button>
					</div>
				);
			}

			// Render full-page error UI
			return (
				<div className="min-h-screen bg-ds-neutral-white flex items-center justify-center p-4">
					<div className="max-w-md w-full">
						<div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
							<AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
							<h1 className="text-2xl font-bold text-red-700 mb-2">
								Oops! Something went wrong
							</h1>
							<p className="text-sm text-red-600 mb-6">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>

							{process.env.NODE_ENV === "development" &&
								this.state.errorInfo && (
									<details className="text-left mb-6 p-4 bg-red-100 rounded text-xs">
										<summary className="cursor-pointer font-medium text-red-700 mb-2">
											Error Details (Development Only)
										</summary>
										<pre className="whitespace-pre-wrap overflow-x-auto text-red-800">
											{this.state.error?.stack}
										</pre>
										<pre className="whitespace-pre-wrap overflow-x-auto text-red-800 mt-2">
											{this.state.errorInfo.componentStack}
										</pre>
									</details>
								)}

							<div className="flex flex-col sm:flex-row gap-3 justify-center">
								<button
									onClick={this.reset}
									className="inline-flex items-center justify-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
								>
									<RefreshCcw className="w-4 h-4" />
									<span>Try Again</span>
								</button>
								<Link
									href="/"
									className="inline-flex items-center justify-center space-x-2 px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
								>
									<Home className="w-4 h-4" />
									<span>Go Home</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

/**
 * Higher-order component to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
	Component: React.ComponentType<P>,
	errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
	const WrappedComponent = (props: P) => (
		<ErrorBoundary {...errorBoundaryProps}>
			<Component {...props} />
		</ErrorBoundary>
	);

	WrappedComponent.displayName = `withErrorBoundary(${
		Component.displayName || Component.name
	})`;

	return WrappedComponent;
}

/**
 * Hook to manually trigger error boundary
 */
export function useErrorHandler() {
	const [error, setError] = React.useState<Error | null>(null);

	React.useEffect(() => {
		if (error) {
			throw error;
		}
	}, [error]);

	return (error: Error | null) => setError(error);
}
