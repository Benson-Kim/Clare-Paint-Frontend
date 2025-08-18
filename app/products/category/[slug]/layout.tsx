import { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const categorySlug = await params.slug;

	// Category-specific metadata
	const categoryMetadata: Record<string, any> = {
		"interior-paints": {
			title:
				"Interior Paints - Premium Collection for Every Room | Paint Store",
			description:
				"Explore our comprehensive collection of interior paints. From bedrooms to kitchens, find the perfect paint with room-specific recommendations, coverage calculators, and color coordination tools.",
			keywords:
				"interior paint, room paint, bedroom paint, kitchen paint, bathroom paint, living room paint, color coordination, coverage calculator",
		},
		"exterior-paints": {
			title: "Exterior Paints - Weather-Resistant Solutions | Paint Store",
			description:
				"Discover durable, weather-resistant exterior paints for all surface types and climate zones. Expert advice, project galleries, and maintenance guides included.",
			keywords:
				"exterior paint, weather resistant, outdoor paint, house paint, durable paint, climate zones, masonry paint, wood paint",
		},
		primers: {
			title: "Primers & Sealers - Essential Base Coats | Paint Store",
			description:
				"High-quality primers and sealers for perfect paint adhesion. Find the right primer for your surface type with our compatibility guide.",
			keywords:
				"primer, sealer, base coat, paint adhesion, stain blocking, surface preparation",
		},
		"specialty-coatings": {
			title: "Specialty Coatings - Unique Finishes & Effects | Paint Store",
			description:
				"Explore specialty coatings including textured finishes, metallic paints, and protective coatings for unique applications.",
			keywords:
				"specialty coating, textured paint, metallic finish, protective coating, unique effects",
		},
	};

	const metadata = categoryMetadata[categorySlug] || {
		title: `${categorySlug
			.replace("-", " ")
			.replace(/\b\w/g, (l) => l.toUpperCase())} | Paint Store`,
		description: `Explore our ${categorySlug.replace(
			"-",
			" "
		)} collection with advanced filtering, color matching, and expert recommendations.`,
		keywords: `${categorySlug.replace(
			"-",
			" "
		)}, paint, color, home improvement`,
	};

	return {
		title: metadata.title,
		description: metadata.description,
		keywords: metadata.keywords,
		openGraph: {
			title: metadata.title,
			description: metadata.description,
			type: "website",
			images: [
				{
					url: "https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=1200",
					width: 1200,
					height: 630,
					alt: metadata.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: metadata.title,
			description: metadata.description,
			images: [
				"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=1200",
			],
		},
	};
}

export default function CategoryLayout({
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
						"@type": "CollectionPage",
						name: "Product Category",
						description:
							"Browse our curated collection of premium paint products.",
						isPartOf: {
							"@type": "WebSite",
							name: "Paint Store",
						},
					}),
				}}
			/>
		</>
	);
}
