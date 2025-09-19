import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Support - Get Expert Paint Help | Paint Store",
	description:
		"Get expert help with your paint projects. Multiple contact options including live chat, phone support, email assistance, and video consultations. Our paint experts are here to help.",
	keywords:
		"contact support, paint help, customer service, live chat, phone support, email support, paint experts, technical support",
	openGraph: {
		title: "Contact Support - Get Expert Paint Help | Paint Store",
		description:
			"Get expert help with your paint projects. Multiple contact options including live chat, phone support, email assistance, and video consultations.",
		type: "website",
		images: [
			{
				url: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200",
				width: 1200,
				height: 630,
				alt: "Paint Store Customer Support",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact Support - Get Expert Paint Help | Paint Store",
		description:
			"Get expert help with your paint projects. Multiple contact options including live chat, phone support, email assistance, and video consultations.",
		images: [
			"https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200",
		],
	},
};

export default function ContactSupportLayout({
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
						"@type": "ContactPage",
						name: "Contact Support",
						description:
							"Get expert help with paint projects through multiple contact channels.",
						url: "/support/contact",
						isPartOf: {
							"@type": "WebSite",
							name: "Paint Store",
						},
						contactPoint: [
							{
								"@type": "ContactPoint",
								telephone: "1-800-CLARE-01",
								contactType: "customer service",
								availableLanguage: "English",
								hoursAvailable: {
									"@type": "OpeningHoursSpecification",
									dayOfWeek: [
										"Monday",
										"Tuesday",
										"Wednesday",
										"Thursday",
										"Friday",
									],
									opens: "08:00",
									closes: "20:00",
								},
							},
						],
					}),
				}}
			/>
		</>
	);
}
