import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title:
		"Clare Paint - Where Artistry Meets Innovation | Premium Paint for Modern Homes",
	description:
		"Transform your space with Clare Paint's premium paint collection. Sophisticated colors, superior quality, and expert curation for the modern home. Shop paint colors and collections.",
	keywords:
		"paint, interior paint, color, home design, premium paint, modern colors, sage green, paint colors, wall paint",
	authors: [{ name: "Clare Paint" }],
	creator: "Clare Paint",
	publisher: "Clare Paint",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://clare-paint.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Clare Paint - Where Artistry Meets Innovation",
		description:
			"Premium paint crafted for the modern home. Discover colors that transform spaces and inspire creativity.",
		url: "https://clare-paint.com",
		siteName: "Clare Paint",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Clare Paint - Premium Paint for Modern Homes",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Clare Paint - Where Artistry Meets Innovation",
		description:
			"Premium paint crafted for the modern home. Discover colors that transform spaces and inspire creativity.",
		images: ["/twitter-image.jpg"],
		creator: "@clarepaint",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "google-verification-code",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{/* Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							name: "Clare Paint",
							url: "https://clare-paint.com",
							logo: "https://clare-paint.com/logo.png",
							description:
								"Premium paint crafted for the modern home. Sophisticated colors and superior quality.",
							address: {
								"@type": "PostalAddress",
								addressLocality: "New York",
								addressRegion: "NY",
								addressCountry: "US",
							},
							contactPoint: {
								"@type": "ContactPoint",
								telephone: "1-800-CLARE-01",
								contactType: "customer service",
							},
							sameAs: [
								"https://instagram.com/clarepaint",
								"https://facebook.com/clarepaint",
								"https://twitter.com/clarepaint",
							],
						}),
					}}
				/>
				{/* Preconnect to external domains */}
				<link rel="preconnect" href="https://images.pexels.com" />
				<link rel="dns-prefetch" href="https://images.pexels.com" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ReactQueryProvider>
					<main id="main-content">{children}</main>
				</ReactQueryProvider>
				{/* Analytics and tracking scripts  */}
			</body>
		</html>
	);
}
