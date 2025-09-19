import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
	title: "Premium Interior Paint - Artisan Pro | Paint Store",
	description:
		"Premium interior paint with exceptional coverage, durability, and color richness. Available in multiple colors and finishes for professional results.",
	keywords:
		"interior paint, premium paint, wall paint, home improvement, color matching",
	openGraph: {
		title: "Premium Interior Paint - Artisan Pro",
		description:
			"Premium interior paint with exceptional coverage, durability, and color richness.",
		type: "website",
		url: "https://example.com/product/premium-interior-paint-001",
		images: [
			{
				url: "https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=1200",
				width: 1200,
				height: 630,
				alt: "Premium Interior Paint",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Premium Interior Paint - Artisan Pro",
		description:
			"Premium interior paint with exceptional coverage, durability, and color richness.",
		images: [
			"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=1200",
		],
	},
};

export default function ProductLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* Custom OG type injection for social platforms that support "product" */}
			<Head>
				<meta property="og:type" content="product" />
			</Head>

			{children}

			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Product",
						name: "Premium Interior Paint",
						description:
							"Premium interior paint with exceptional coverage, durability, and color richness.",
						brand: {
							"@type": "Brand",
							name: "Artisan Pro",
						},
						offers: {
							"@type": "Offer",
							price: "89.99",
							priceCurrency: "USD",
							availability: "https://schema.org/InStock",
						},
						aggregateRating: {
							"@type": "AggregateRating",
							ratingValue: "4.8",
							reviewCount: "127",
						},
						image:
							"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=1200",
					}),
				}}
			/>
		</>
	);
}
