import { PageLayout } from "@/components/layout/PageLayout";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
	return (
		<PageLayout
			headerVariant="checkout"
			showBreadcrumbs={false}
			showFooter={false}
		>
			<CheckoutForm />
		</PageLayout>
	);
}
