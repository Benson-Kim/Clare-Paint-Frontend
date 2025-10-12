import Link from "next/link";

import { PageLayout } from "@/components/layout/PageLayout";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function CheckoutPage() {
	return (
		<PageLayout
			headerVariant="checkout"
			showBreadcrumbs={false}
			showFooter={false}
		>
			<ErrorBoundary
				fallback={
					<div className="p-8 text-center">
						<h2 className="text-2xl font-bold text-red-700 mb-4">
							Checkout Error
						</h2>
						<p className="text-red-600 mb-6">
							We&apos;re having trouble loading the checkout. Please try again.
						</p>
						<Link
							href="/cart"
							className="inline-block px-6 py-3 bg-ds-primary-sage text-white rounded-lg"
						>
							Return to Cart
						</Link>
					</div>
				}
			>
				<CheckoutForm />
			</ErrorBoundary>
		</PageLayout>
	);
}
