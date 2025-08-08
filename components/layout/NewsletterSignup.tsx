"use client";

import React, { useState } from "react";
import {
	Mail,
	ArrowRight,
	CheckCircle,
	AlertCircle,
	Loader2,
	Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NewsletterSignupProps {
	variant?: "default" | "compact" | "inline";
	className?: string;
	placeholder?: string;
	buttonText?: string;
	showDescription?: boolean;
	onSuccess?: (email: string) => void;
	onError?: (error: string) => void;
}

interface NewsletterFormData {
	email: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
	variant = "default",
	className = "",
	placeholder = "Enter your email address",
	buttonText = "Subscribe",
	showDescription = true,
	onSuccess,
	onError,
}) => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");
	const [emailError, setEmailError] = useState("");

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setEmailError("");

		if (!email.trim()) {
			setEmailError("Email address is required");
			return;
		}

		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email address");
			return;
		}

		setStatus("loading");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Simulate success (95% success rate)
			if (Math.random() > 0.05) {
				setStatus("success");
				setMessage(
					"Welcome to the Clare Paint family! Check your email for a special welcome offer."
				);
				onSuccess?.(email);
				setEmail("");

				// Reset success state after 5 seconds
				setTimeout(() => {
					setStatus("idle");
					setMessage("");
				}, 5000);
			} else {
				throw new Error("Subscription failed. Please try again.");
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to subscribe. Please try again.";

			setStatus("error");
			setMessage(errorMessage);
			onError?.(errorMessage);

			// Reset error state after 5 seconds
			setTimeout(() => {
				setStatus("idle");
				setMessage("");
			}, 5000);
		}
	};

	if (status === "success") {
		return (
			<div className={cn("text-center", className)}>
				<div className="flex items-center justify-center space-x-3 p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-300 mb-4">
					<CheckCircle className="w-6 h-6" />
					<span className="font-medium">{message}</span>
				</div>
				{variant === "default" && (
					<div className="space-y-2">
						<p className="text-ds-neutral-lightGray/80 text-sm">
							You&apos;ll receive our latest color trends and exclusive offers.
						</p>
						<Link
							href="/newsletter"
							className="inline-flex items-center space-x-2 text-ds-accent-warmBeige hover:text-ds-accent-warmBeige/80 transition-colors duration-200 text-sm"
						>
							<span>Manage preferences</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className={cn("", className)}>
			{variant === "default" && (
				<div className="text-center mb-6">
					<div className="flex items-center justify-center space-x-3 mb-4">
						<Mail className="w-8 h-8 text-ds-accent-warmBeige" />
						<h3 className="text-2xl font-bold text-ds-neutral-white">
							Stay Inspired
						</h3>
					</div>

					{showDescription && (
						<p className="text-ds-neutral-lightGray/80 max-w-2xl mx-auto leading-relaxed">
							Get the latest color trends, DIY tips, and exclusive offers
							delivered to your inbox. Join thousands of paint enthusiasts who
							trust Clare Paint for inspiration.
						</p>
					)}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div
					className={cn(
						"flex gap-3",
						variant === "compact"
							? "flex-col sm:flex-row"
							: "flex-col sm:flex-row",
						variant === "inline" && "flex-row"
					)}
				>
					<div className="flex-1">
						<label htmlFor={`newsletter-email-${variant}`} className="sr-only">
							Email address for newsletter subscription
						</label>
						<input
							id={`newsletter-email-${variant}`}
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setEmailError("");
							}}
							placeholder={placeholder}
							className={cn(
								"w-full px-4 py-3 bg-ds-neutral-white text-ds-primary-charcoal rounded-lg border border-ds-neutral-mediumGray transition-all duration-200",
								"focus:ring-2 focus:ring-ds-accent-warmBeige focus:border-transparent",
								"placeholder:text-ds-neutral-mediumGray",
								emailError && "border-red-400 focus:ring-red-400"
							)}
							required
							disabled={status === "loading"}
							aria-describedby={
								emailError ? `email-error-${variant}` : undefined
							}
							aria-invalid={emailError ? "true" : "false"}
						/>
					</div>

					<button
						type="submit"
						disabled={status === "loading" || !email.trim()}
						className={cn(
							"px-6 py-3 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2",
							"hover:bg-ds-accent-warmBeige/90 hover:scale-105 active:scale-95",
							"disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
							"focus:ring-2 focus:ring-ds-accent-warmBeige/50 focus:outline-none",
							variant === "compact" && "min-w-[120px]",
							variant === "inline" && "min-w-[140px]"
						)}
						aria-label="Subscribe to newsletter"
					>
						{status === "loading" ? (
							<Loader2 className="w-5 h-5 animate-spin" />
						) : (
							<>
								<span>{buttonText}</span>
								<ArrowRight className="w-4 h-4" />
							</>
						)}
					</button>
				</div>

				{emailError && (
					<p
						id={`email-error-${variant}`}
						className="text-red-400 text-sm"
						role="alert"
					>
						{emailError}
					</p>
				)}

				{status === "error" && (
					<div className="flex items-center space-x-2 text-red-400 text-sm">
						<AlertCircle className="w-4 h-4" />
						<span>{message}</span>
					</div>
				)}

				{variant === "default" && (
					<p className="text-xs text-ds-neutral-lightGray/60 text-center">
						By subscribing, you agree to our{" "}
						<Link
							href="/privacy"
							className="text-ds-accent-warmBeige hover:underline focus:underline focus:outline-none"
						>
							Privacy Policy
						</Link>
						. Unsubscribe at any time.
					</p>
				)}
			</form>

			{variant === "default" && (
				<div className="mt-6 text-center">
					<div className="flex items-center justify-center space-x-6 text-sm text-ds-neutral-lightGray/60">
						<div className="flex items-center space-x-2">
							<CheckCircle className="w-4 h-4 text-green-400" />
							<span>50,000+ subscribers</span>
						</div>
						<div className="flex items-center space-x-2">
							<Mail className="w-4 h-4 text-ds-accent-warmBeige" />
							<span>Weekly color trends</span>
						</div>
						<div className="flex items-center space-x-2">
							<Star className="w-4 h-4 text-yellow-400" />
							<span>Exclusive offers</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
