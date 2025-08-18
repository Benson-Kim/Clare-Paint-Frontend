import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Advanced Search - Find Your Perfect Paint | Paint Store",
	description:
		"Search our extensive collection of paints with advanced filters, visual search, and intelligent suggestions. Find exactly what you need for your project.",
	keywords:
		"paint search, color search, advanced filters, visual search, paint finder, color finder, room paint, finish types",
	openGraph: {
		title: "Advanced Search - Find Your Perfect Paint | Paint Store",
		description:
			"Search our extensive collection of paints with advanced filters, visual search, and intelligent suggestions.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Advanced Search - Find Your Perfect Paint | Paint Store",
		description:
			"Search our extensive collection of paints with advanced filters, visual search, and intelligent suggestions.",
	},
};

export default function SearchLayout({
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
						"@type": "SearchAction",
						target: {
							"@type": "EntryPoint",
							urlTemplate: "/search?q={search_term_string}",
						},
						"query-input": "required name=search_term_string",
					}),
				}}
			/>
		</>
	);
}
