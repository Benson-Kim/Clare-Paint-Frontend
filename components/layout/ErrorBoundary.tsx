"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error,
			errorInfo,
		});

		// Log error to analytics service
		if (typeof window !== "undefined") {
			console.error("Error Boundary caught an error:", error, errorInfo);

			// Send to error tracking service
			if ((window as any).Sentry) {
				(window as any).Sentry.captureException(error, {
					contexts: {
						react: {
							componentStack: errorInfo.componentStack,
						},
					},
				});
			}

			// Send to Google Analytics
			if ((window as any).gtag) {
				(window as any).gtag("event", "exception", {
					description: error.message,
					fatal: true,
				});
			}
		}
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined });
	};

	handleGoHome = () => {
		window.location.href = "/";
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen bg-ds-neutral-white flex items-center justify-center p-4">
					<div className="max-w-md w-full text-center">
						<div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<AlertTriangle className="w-10 h-10 text-red-600" />
						</div>

						<h1 className="text-2xl font-bold text-ds-primary-charcoal mb-4">
							Oops! Something went wrong
						</h1>

						<p className="text-ds-neutral-mediumGray mb-8 leading-relaxed">
							We&apos;re sorry, but something unexpected happened. Our team has
							been notified and is working to fix the issue.
						</p>

						{/* Error Details (Development Only) */}
						{process.env.NODE_ENV === "development" && this.state.error && (
							<details className="mb-8 text-left bg-red-50 border border-red-200 rounded-lg p-4">
								<summary className="font-medium text-red-800 cursor-pointer">
									Error Details (Development)
								</summary>
								<pre className="mt-2 text-xs text-red-700 overflow-auto">
									{this.state.error.message}
									{this.state.errorInfo?.componentStack}
								</pre>
							</details>
						)}

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								onClick={this.handleRetry}
								className="flex items-center justify-center space-x-2 px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
							>
								<RefreshCw className="w-4 h-4" />
								<span>Try Again</span>
							</button>

							<button
								onClick={this.handleGoHome}
								className="flex items-center justify-center space-x-2 px-6 py-3 border border-ds-neutral-lightGray text-ds-neutral-darkSlate rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 font-medium"
							>
								<Home className="w-4 h-4" />
								<span>Go Home</span>
							</button>
						</div>

						{/* Support Contact */}
						<div className="mt-8 pt-6 border-t border-ds-neutral-lightGray">
							<p className="text-sm text-ds-neutral-mediumGray">
								Need help? Contact our support team at{" "}
								<a
									href="mailto:support@clarepaint.com"
									className="text-ds-primary-sage hover:underline"
								>
									support@clarepaint.com
								</a>
							</p>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
