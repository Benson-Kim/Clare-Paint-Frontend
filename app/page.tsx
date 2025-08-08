import React from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ShopColorSection } from "@/components/landing/ShopColorSection";
import { ShopPaintSection } from "@/components/landing/ShopPaintSection";
import { ColorPaletteDisplay } from "@/components/landing/ColorPaletteDisplay";
import { BrandMessagingSection } from "@/components/landing/BrandMessagingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PageLayout } from "@/components/layout/PageLayout";
import { InstagramFeedSection } from "@/components/landing/InstagramFeddSection";

export default function Home() {
	return (
		<PageLayout
			headerVariant="overlay"
			fullWidth={true}
			showBreadcrumbs={false}
		>
			<HeroSection />
			<AboutSection />
			<ShopColorSection />
			<ShopPaintSection />
			<ColorPaletteDisplay />
			<BrandMessagingSection />
			<TestimonialsSection />
			<InstagramFeedSection />
		</PageLayout>
	);
}
