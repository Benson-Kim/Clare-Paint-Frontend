import React from "react";
import { Metadata } from "next";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactOptionsGrid } from "@/components/contact/ContactOptionsGrid";
import { SupportTicketForm } from "@/components/contact/SupportTicketForm";
import { ConsultationCallout } from "@/components/contact/ConsultationCallout";

export const metadata: Metadata = {
	title: "Contact Support | PaintCo",
	description:
		"Get help with your order, ask a technical question, or book a color consultation. Our support team is here to help.",
};

export default function ContactSupportPage() {
	return (
		<div className="bg-ds-primary-cream min-h-screen">
			<ContactHeader />
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<ContactOptionsGrid />
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
					<div className="lg:col-span-2">
						<SupportTicketForm />
					</div>
					<div className="lg:col-span-1">
						<div className="bg-ds-neutral-white p-6 border border-ds-neutral-lightGray rounded-lg shadow-sm">
							<h4 className="text-lg font-bold text-ds-primary-charcoal mb-4">
								Response Times
							</h4>
							<ul className="space-y-3 text-ds-neutral-mediumGray">
								<li className="flex justify-between">
									<span>High Priority:</span>
									<span className="font-semibold text-ds-primary-charcoal">
										Within 12 hours
									</span>
								</li>
								<li className="flex justify-between">
									<span>Medium Priority:</span>
									<span className="font-semibold text-ds-primary-charcoal">
										24-48 hours
									</span>
								</li>
								<li className="flex justify-between">
									<span>Low Priority:</span>
									<span className="font-semibold text-ds-primary-charcoal">
										2-3 business days
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<ConsultationCallout />
			</main>
		</div>
	);
}
