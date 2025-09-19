import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Return & Exchange Policy - Hassle-Free Returns | Paint Store",
	description:
		"Learn about our 30-day return policy, color guarantee, and hassle-free return process. Start a return, track your return status, or contact our support team.",
	keywords:
		"return policy, exchange policy, color guarantee, refund, return process, 30 day return, paint return, customer satisfaction",
	openGraph: {
		title: "Return & Exchange Policy - Hassle-Free Returns | Paint Store",
		description:
			"Learn about our 30-day return policy, color guarantee, and hassle-free return process. Start a return or track your return status.",
		type: "website",
		images: [
			{
				url: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200",
				width: 1200,
				height: 630,
				alt: "Paint Store Return Policy",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Return & Exchange Policy - Hassle-Free Returns | Paint Store",
		description:
			"Learn about our 30-day return policy, color guarantee, and hassle-free return process.",
		images: [
			"https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200",
		],
	},
};

export default function ReturnExchangePolicyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: "Return & Exchange Policy",
						description:
							"Comprehensive return and exchange policy including color guarantee and return process.",
						url: "/support/return-exchange-policy",
						isPartOf: {
							"@type": "WebSite",
							name: "Paint Store",
						},
						mainEntity: {
							"@type": "ReturnPolicy",
							returnPolicyCategory:
								"https://schema.org/MerchantReturnFiniteReturnWindow",
							returnWithin: "P30D",
							returnMethod: "https://schema.org/ReturnByMail",
							returnFees: "https://schema.org/FreeReturn",
						},
					}),
				}}
			/>
		</>
	);
}
