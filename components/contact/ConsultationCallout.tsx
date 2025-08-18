import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

export const ConsultationCallout = () => {
	return (
		<div className="bg-ds-primary-sage text-ds-neutral-white rounded-lg p-8 my-16 flex flex-col md:flex-row items-center justify-between">
			<div className="flex items-center mb-4 md:mb-0">
				<Palette className="w-10 h-10 mr-4 text-ds-accent-mustard" />
				<div>
					<h3 className="text-2xl font-bold">Need Expert Color Advice?</h3>
					<p className="text-ds-primary-cream">
						Book a dedicated session with one of our color consultants.
					</p>
				</div>
			</div>
			<Link href="/support/consultation" passHref>
				<Button
					variant="secondary"
					className="bg-ds-accent-warmBeige hover:bg-ds-accent-warmBrown text-ds-primary-charcoal font-bold"
					aria-label="Book a color consultation"
				>
					Book a Consultation
				</Button>
			</Link>
		</div>
	);
};
