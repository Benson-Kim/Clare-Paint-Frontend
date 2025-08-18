"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";
import { mockInteriorPaints } from "@/data/mock-interior-paints";
import { mockExteriorPaints } from "@/data/mock-exterior-paints";

interface CategoryData {
	slug: string;
	name: string;
	description: string;
	image: string;
	features: string[];
	benefits: string[];
}

export const useProductCategoryData = (categorySlug: string) => {
	const [products, setProducts] = useState<Product[] | null>(null);
	const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchCategoryData = async () => {
			setIsLoading(true);
			setIsError(false);
			setError(null);

			try {
				// Simulate API delay
				await new Promise((resolve) => setTimeout(resolve, 800));

				// Get category-specific data
				const categoryConfigs: Record<string, CategoryData> = {
					"interior-paints": {
						slug: "interior-paints",
						name: "Interior Paints",
						description:
							"Transform your indoor spaces with our premium interior paint collection. From calming bedrooms to vibrant kitchens, find the perfect color and finish for every room.",
						image:
							"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
						features: [
							"Zero-VOC formulations for healthier homes",
							"Superior coverage and hide",
							"Stain and scuff resistant technology",
							"Easy application and cleanup",
						],
						benefits: [
							"Premium Quality",
							"Health Conscious",
							"Easy Maintenance",
							"Professional Results",
						],
					},
					"exterior-paints": {
						slug: "exterior-paints",
						name: "Exterior Paints",
						description:
							"Protect and beautify your home's exterior with our weather-resistant paint collection. Engineered for maximum durability in any climate.",
						image:
							"https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1200",
						features: [
							"All-weather protection",
							"Fade and UV resistant",
							"Mold and mildew resistant",
							"Superior adhesion",
						],
						benefits: [
							"Weather Protection",
							"Long-Lasting Color",
							"Climate Resistant",
							"Professional Grade",
						],
					},
					primers: {
						slug: "primers",
						name: "Primers & Sealers",
						description:
							"Essential base coats for perfect paint adhesion and coverage. Our primer collection ensures your paint job looks professional and lasts longer.",
						image:
							"https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=1200",
						features: [
							"Superior adhesion",
							"Stain blocking technology",
							"Multi-surface compatibility",
							"Fast drying formulas",
						],
						benefits: [
							"Perfect Adhesion",
							"Stain Blocking",
							"Versatile Application",
							"Time Saving",
						],
					},
					"specialty-coatings": {
						slug: "specialty-coatings",
						name: "Specialty Coatings",
						description:
							"Unique finishes and protective coatings for specialized applications. From textured walls to metallic accents, create stunning effects.",
						image:
							"https://images.pexels.com/photos/3682293/pexels-photo-3682293.jpeg?auto=compress&cs=tinysrgb&w=1200",
						features: [
							"Unique textures and effects",
							"Specialized applications",
							"Professional-grade formulations",
							"Creative possibilities",
						],
						benefits: [
							"Unique Effects",
							"Creative Freedom",
							"Professional Quality",
							"Specialized Solutions",
						],
					},
				};

				const categoryConfig = categoryConfigs[categorySlug];
				if (!categoryConfig) {
					throw new Error(`Category "${categorySlug}" not found`);
				}

				setCategoryData(categoryConfig);

				// Get products for category
				let categoryProducts: Product[] = [];
				switch (categorySlug) {
					case "interior-paints":
						categoryProducts = [...mockInteriorPaints, ...mockProducts];
						break;
					case "exterior-paints":
						categoryProducts = mockExteriorPaints;
						break;
					case "primers":
						categoryProducts = mockProducts.filter((p) =>
							p.category.toLowerCase().includes("primer")
						);
						break;
					case "specialty-coatings":
						categoryProducts = mockProducts.filter((p) =>
							p.category.toLowerCase().includes("specialty")
						);
						break;
					default:
						categoryProducts = mockProducts;
				}

				setProducts(categoryProducts);
			} catch (err) {
				setIsError(true);
				setError(err instanceof Error ? err : new Error("Unknown error"));
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategoryData();
	}, [categorySlug]);

	return {
		products,
		categoryData,
		isLoading,
		isError,
		error,
		totalProducts: products?.length || 0,
	};
};
