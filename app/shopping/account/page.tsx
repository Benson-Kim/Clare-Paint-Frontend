import { PageLayout } from "@/components/layout/PageLayout";
import { UserAccountDashboard } from "@/components/account/UserAccountDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Account - Paint Store",
	description:
		"Manage your orders, saved colors, projects, addresses, and payment methods. Track your paint usage and get personalized color recommendations.",
	keywords:
		"account, orders, history, saved colors, projects, addresses, payment, paint usage, color recommendations",
	openGraph: {
		title: "My Account - Paint Store",
		description:
			"Manage your orders, saved colors, projects, addresses, and payment methods.",
		type: "profile",
	},
	twitter: {
		card: "summary",
		title: "My Account - Paint Store",
		description:
			"Manage your orders, saved colors, projects, addresses, and payment methods.",
	},
};

/**
 * User account dashboard page.
 * Provides access to order history, saved colors, project gallery,
 * address book, payment methods, and personalized recommendations.
 */
export default function AccountPage() {
	return (
		<PageLayout
			headerVariant="account"
			showBreadcrumbs={false}
			className="bg-gray-50"
		>
			<UserAccountDashboard />
		</PageLayout>
	);
}
