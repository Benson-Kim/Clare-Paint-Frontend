"use client";

import React from "react";
import { Phone, Mail, MessageSquare, Headset, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ContactEscalation: React.FC = () => {
	return (
		<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8 text-center space-y-8 mt-20">
			<Headset className="w-16 h-16 text-ds-accent-warmBrown mx-auto" />
			<h2 className="text-2xl font-bold text-ds-primary-charcoal">
				Still Need Help?
			</h2>
			<p className="text-lg text-ds-neutral-mediumGray max-w-2xl mx-auto">
				If you couldn&apos;t find the answer you were looking for, our support
				team is here to assist you.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<a
					href="tel:+18001234567"
					className="flex flex-col items-center p-4 bg-ds-neutral-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
					aria-label="Call our support team"
				>
					<Phone className="w-8 h-8 text-ds-primary-sage mb-4 group-hover:text-ds-primary-sage/80" />
					<h3 className="font-semibold text-ds-primary-charcoal mb-2">
						Call Us
					</h3>
					<p className="text-sm text-ds-neutral-mediumGray">1-800-123-4567</p>
					<span className="text-xs text-ds-primary-sage mt-4 flex items-center space-x-2">
						<span>Available 9 AM - 5 PM EST</span>
						<ArrowRight className="w-4 h-4" />
					</span>
				</a>
				<a
					href="mailto:support@paintstore.com"
					className="flex flex-col items-center p-4 bg-ds-neutral-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
					aria-label="Email our support team"
				>
					<Mail className="w-8 h-8 text-ds-primary-sage mb-4 group-hover:text-ds-primary-sage/80" />
					<h3 className="font-semibold text-ds-primary-charcoal mb-2">
						Email Support
					</h3>
					<p className="text-sm text-ds-neutral-mediumGray">
						support@paintstore.com
					</p>
					<span className="text-xs text-ds-primary-sage mt-4 flex items-center space-x-2">
						<span>Response within 24 hours</span>
						<ArrowRight className="w-4 h-4" />
					</span>
				</a>
				<button
					className="flex flex-col items-center p-4 bg-ds-neutral-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
					aria-label="Start a live chat"
				>
					<MessageSquare className="w-8 h-8 text-ds-primary-sage mb-4 group-hover:text-ds-primary-sage/80" />
					<h3 className="font-semibold text-ds-primary-charcoal mb-2">
						Live Chat
					</h3>
					<p className="text-sm text-ds-neutral-mediumGray">
						Chat with a representative
					</p>
					<span className="text-xs text-ds-primary-sage mt-4 flex items-center space-x-2">
						<span>Typically responds in minutes</span>
						<ArrowRight className="w-4 h-4" />
					</span>
				</button>
			</div>
		</div>
	);
};
