import React from "react";
import { Metadata } from "next";
import { PolicySection } from "@/components/returns/PolicySection";
import { ReturnForm } from "@/components/returns/ReturnForm";
import { Check, Clock, Package, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
	title: "Return & Exchange Policy | PaintCo",
	description:
		"Understand our return guidelines, color guarantee, and process for returns or exchanges.",
};

export default function ReturnExchangePolicyPage() {
	return (
		<div className="bg-ds-primary-cream">
			<header className="text-center py-16 bg-ds-neutral-white">
				<h1 className="text-4xl md:text-5xl font-bold text-ds-primary-charcoal tracking-tight">
					Return & Exchange Policy
				</h1>
				<p className="mt-4 max-w-2xl mx-auto text-lg text-ds-neutral-darkSlate">
					Your satisfaction is our top priority. Here’s everything you need to
					know about returns and exchanges.
				</p>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<PolicySection title="Our 30-Day Return Policy">
					<p>
						We accept returns on most unopened and unused items within 30 days of
						purchase. To be eligible for a return, your item must be in the
						same condition that you received it, unused, and in its original
						packaging. You’ll also need the receipt or proof of purchase.
					</p>
					<p>
						<strong>Please note:</strong> Custom-tinted paints, special orders,
						and clearance items are final sale and cannot be returned or
						exchanged.
					</p>
				</PolicySection>

				<PolicySection title="Our Color Guarantee">
					<p>
						We want you to love your color! If you’re not satisfied with your
						choice, our Color Guarantee has you covered. You may be eligible
						for a replacement can of a different color in the same product
						line.
					</p>
					<ul className="list-disc pl-6 space-y-2 mt-4">
						<li>
							This guarantee applies to interior and exterior paints and is
							limited to one replacement per customer per year.
						</li>
						<li>
							To claim the guarantee, please bring the original paint can and
							your receipt to one of our store locations within 30 days of
							purchase.
						</li>
						<li>
							The guarantee does not cover issues arising from improper
							application or surface preparation.
						</li>
					</ul>
				</PolicySection>

				<PolicySection title="Damaged or Incorrect Items">
					<p>
						Please inspect your order upon reception and contact us immediately
						if the item is defective, damaged, or if you receive the wrong
						item, so that we can evaluate the issue and make it right.
					</p>
					<p>
						If your order arrives damaged, please take photos of the packaging
						and the damaged items and include them when you fill out the return
						form below. This helps us process your claim with our shipping
						partners quickly.
					</p>
				</PolicySection>

				<PolicySection title="Refund Processing Timeline">
					<p>
						Once we receive and inspect your return, we will notify you of the
						approval or rejection of your refund.
					</p>
					<div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-4 my-8">
						<div className="text-center w-48">
							<Package className="w-12 h-12 mx-auto text-ds-primary-sage mb-2" />
							<p className="font-semibold">1. We Receive Your Return</p>
							<p className="text-sm">(1-2 business days)</p>
						</div>
						<div className="text-center w-48">
							<Check className="w-12 h-12 mx-auto text-ds-primary-sage mb-2" />
							<p className="font-semibold">2. Inspection & Approval</p>
							<p className="text-sm">(2-3 business days)</p>
						</div>
						<div className="text-center w-48">
							<RefreshCw className="w-12 h-12 mx-auto text-ds-primary-sage mb-2" />
							<p className="font-semibold">3. Refund Processed</p>
							<p className="text-sm">(3-5 business days)</p>
						</div>
						<div className="text-center w-48">
							<Clock className="w-12 h-12 mx-auto text-ds-primary-sage mb-2" />
							<p className="font-semibold">4. Funds in Your Account</p>
							<p className="text-sm">(Varies by bank)</p>
						</div>
					</div>
					<p>
						If approved, you’ll be automatically refunded on your original
						payment method. Please remember it can take some time for your bank
						or credit card company to process and post the refund too.
					</p>
				</PolicySection>

				<PolicySection title="Prepaid Return Labels">
					<p>
						For eligible online returns, we provide a prepaid return shipping
						label to make the process as easy as possible. After you submit
						the return form below and it is approved, you will receive an
						email containing the shipping label and detailed instructions on
						how to package and send your items back to us.
					</p>
				</PolicySection>

				<ReturnForm />
			</main>
		</div>
	);
}
