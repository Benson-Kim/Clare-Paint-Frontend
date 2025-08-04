"use client";

import React, { useState } from "react";
import {
	TrendingUp,
	Calculator,
	CheckCircle,
	Star,
	ArrowRight,
	DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DiscountTier {
	id: string;
	name: string;
	minVolume: number;
	discount: number;
	features: string[];
	color: string;
	popular?: boolean;
}

export const DiscountTierDisplay: React.FC = () => {
	const [selectedTier, setSelectedTier] = useState<string>("professional");
	const [calculatorVolume, setCalculatorVolume] = useState(100000);

	const discountTiers: DiscountTier[] = [
		{
			id: "starter",
			name: "Starter",
			minVolume: 5000,
			discount: 5,
			features: [
				"Basic volume pricing",
				"Standard delivery",
				"Email support",
				"Online ordering",
				"Basic project tools",
			],
			color: "from-ds-neutral-mediumGray to-ds-neutral-darkSlate",
		},
		{
			id: "professional",
			name: "Professional",
			minVolume: 25000,
			discount: 10,
			features: [
				"Enhanced volume pricing",
				"Priority delivery",
				"Phone & email support",
				"Advanced project tools",
				"Quarterly business reviews",
				"Custom color matching",
			],
			color: "from-ds-primary-sage to-ds-accent-warmBeige",
			popular: true,
		},
		{
			id: "contractor",
			name: "Contractor",
			minVolume: 75000,
			discount: 15,
			features: [
				"Premium volume pricing",
				"Free delivery on $1000+ orders",
				"Dedicated account manager",
				"Job site delivery",
				"Net 30 payment terms",
				"Exclusive product access",
				"Training workshops",
			],
			color: "from-ds-accent-warmBrown to-ds-accent-mustard",
		},
		{
			id: "enterprise",
			name: "Enterprise",
			minVolume: 200000,
			discount: 25,
			features: [
				"Maximum volume pricing",
				"Free delivery on all orders",
				"Executive account management",
				"Custom delivery scheduling",
				"Extended payment terms",
				"Private label options",
				"Annual strategic planning",
				"VIP event invitations",
			],
			color: "from-ds-primary-charcoal to-ds-neutral-darkSlate",
		},
	];

	const calculateSavings = (volume: number, discount: number) => {
		return volume * (discount / 100);
	};

	const getCurrentTier = (volume: number) => {
		return (
			discountTiers
				.slice()
				.reverse()
				.find((tier) => volume >= tier.minVolume) || discountTiers[0]
		);
	};

	const currentTier = getCurrentTier(calculatorVolume);
	const annualSavings = calculateSavings(
		calculatorVolume,
		currentTier.discount
	);

	return (
		<div className="space-y-20">
			<div className="text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
					Volume Discount Tiers
				</h2>
				<p className="text-lg text-ds-neutral-mediumGray max-w-3xl mx-auto">
					The more you purchase, the more you save. Our tiered discount
					structure rewards your business growth with increasing benefits and
					exclusive perks.
				</p>
			</div>

			{/* Savings Calculator */}
			<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
				<div className="flex items-center space-x-4 mb-8">
					<Calculator className="w-6 h-6 text-ds-primary-sage" />
					<h3 className="text-xl font-bold text-ds-primary-charcoal">
						Savings Calculator
					</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
					<div>
						<label
							htmlFor="volume-input"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Annual Paint Volume ($)
						</label>
						<input
							type="number"
							id="volume-input"
							value={calculatorVolume}
							onChange={(e) => setCalculatorVolume(Number(e.target.value))}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							min="0"
							step="1000"
							aria-label="Annual paint volume in dollars"
						/>
					</div>

					<div className="text-center">
						<div className="text-3xl font-bold text-ds-primary-sage mb-2">
							{currentTier.discount}%
						</div>
						<div className="text-sm text-ds-neutral-mediumGray">
							{currentTier.name} Tier Discount
						</div>
					</div>

					<div className="text-center">
						<div className="text-3xl font-bold text-green-600 mb-2">
							${annualSavings.toLocaleString()}
						</div>
						<div className="text-sm text-ds-neutral-mediumGray">
							Annual Savings
						</div>
					</div>
				</div>
			</div>

			{/* Discount Tiers Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{discountTiers.map((tier) => (
					<div
						key={tier.id}
						className={cn(
							"relative bg-ds-neutral-white border-2 rounded-lg p-8 transition-all duration-200 cursor-pointer group",
							selectedTier === tier.id
								? "border-ds-primary-sage shadow-lg scale-105"
								: "border-ds-neutral-lightGray hover:border-ds-primary-sage/50 hover:shadow-md"
						)}
						onClick={() => setSelectedTier(tier.id)}
						role="button"
						tabIndex={0}
						aria-label={`Select ${tier.name} tier`}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setSelectedTier(tier.id);
							}
						}}
					>
						{tier.popular && (
							<div className="absolute -top-4 left-1/2 -translate-x-1/2">
								<span className="bg-ds-primary-sage text-ds-neutral-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2">
									<Star className="w-3 h-3" />
									<span>Most Popular</span>
								</span>
							</div>
						)}

						<div
							className={cn(
								"w-full h-2 rounded-full mb-8 bg-gradient-to-r",
								tier.color
							)}
						/>

						<div className="text-center mb-8">
							<h3 className="text-xl font-bold text-ds-primary-charcoal mb-2">
								{tier.name}
							</h3>
							<div className="text-3xl font-bold text-ds-primary-sage mb-2">
								{tier.discount}%
							</div>
							<p className="text-sm text-ds-neutral-mediumGray">
								${tier.minVolume.toLocaleString()}+ annual volume
							</p>
						</div>

						<ul className="space-y-4 mb-8">
							{tier.features.map((feature, index) => (
								<li
									key={index}
									className="flex items-start space-x-2 text-sm text-ds-neutral-darkSlate"
								>
									<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-2 flex-shrink-0" />
									<span>{feature}</span>
								</li>
							))}
						</ul>

						<div className="text-center">
							<div className="text-lg font-bold text-ds-primary-charcoal mb-2">
								$
								{calculateSavings(
									tier.minVolume,
									tier.discount
								).toLocaleString()}
							</div>
							<p className="text-xs text-ds-neutral-mediumGray">
								Minimum annual savings
							</p>
						</div>

						{selectedTier === tier.id && (
							<div className="absolute inset-0 rounded-lg ring-2 ring-ds-primary-sage/20 pointer-events-none" />
						)}
					</div>
				))}
			</div>

			{/* Additional Benefits */}
			<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8">
				<h3 className="text-xl font-bold text-ds-primary-charcoal mb-8 text-center">
					All Tiers Include These Benefits
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="text-center">
						<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<DollarSign className="w-8 h-8 text-ds-primary-sage" />
						</div>
						<h4 className="font-semibold text-ds-primary-charcoal mb-2">
							No Membership Fees
						</h4>
						<p className="text-sm text-ds-neutral-mediumGray">
							Join for free with no annual or monthly fees
						</p>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<CheckCircle className="w-8 h-8 text-ds-primary-sage" />
						</div>
						<h4 className="font-semibold text-ds-primary-charcoal mb-2">
							Quality Guarantee
						</h4>
						<p className="text-sm text-ds-neutral-mediumGray">
							100% satisfaction guarantee on all products
						</p>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<TrendingUp className="w-8 h-8 text-ds-primary-sage" />
						</div>
						<h4 className="font-semibold text-ds-primary-charcoal mb-2">
							Business Growth
						</h4>
						<p className="text-sm text-ds-neutral-mediumGray">
							Tools and resources to grow your business
						</p>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<Star className="w-8 h-8 text-ds-primary-sage" />
						</div>
						<h4 className="font-semibold text-ds-primary-charcoal mb-2">
							Exclusive Access
						</h4>
						<p className="text-sm text-ds-neutral-mediumGray">
							First access to new products and promotions
						</p>
					</div>
				</div>
			</div>

			{/* Tier Comparison Table */}
			<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg overflow-hidden">
				<div className="p-8 border-b border-ds-neutral-lightGray">
					<h3 className="text-xl font-bold text-ds-primary-charcoal text-center">
						Detailed Tier Comparison
					</h3>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-ds-neutral-lightGray/20">
							<tr>
								<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
									Feature
								</th>
								{discountTiers.map((tier) => (
									<th
										key={tier.id}
										className="text-center p-4 text-sm font-semibold text-ds-primary-charcoal"
									>
										{tier.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-ds-neutral-lightGray">
								<td className="p-4 text-sm text-ds-neutral-darkSlate font-medium">
									Discount Rate
								</td>
								{discountTiers.map((tier) => (
									<td
										key={tier.id}
										className="p-4 text-center text-sm font-bold text-ds-primary-sage"
									>
										{tier.discount}%
									</td>
								))}
							</tr>
							<tr className="border-b border-ds-neutral-lightGray">
								<td className="p-4 text-sm text-ds-neutral-darkSlate font-medium">
									Free Delivery Threshold
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									$2,000
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									$1,500
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									$1,000
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									All Orders
								</td>
							</tr>
							<tr className="border-b border-ds-neutral-lightGray">
								<td className="p-4 text-sm text-ds-neutral-darkSlate font-medium">
									Payment Terms
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Net 15
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Net 30
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Net 30
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Net 45
								</td>
							</tr>
							<tr className="border-b border-ds-neutral-lightGray">
								<td className="p-4 text-sm text-ds-neutral-darkSlate font-medium">
									Account Manager
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									-
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Shared
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Dedicated
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Executive
								</td>
							</tr>
							<tr>
								<td className="p-4 text-sm text-ds-neutral-darkSlate font-medium">
									Training & Support
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Online Only
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Online + Phone
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Full Support
								</td>
								<td className="p-4 text-center text-sm text-ds-neutral-darkSlate">
									Premium Support
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* ROI Calculator */}
			<div className="bg-gradient-to-r from-ds-primary-sage to-ds-accent-warmBeige text-ds-neutral-white rounded-lg p-8">
				<div className="text-center mb-8">
					<h3 className="text-2xl font-bold mb-4">
						Calculate Your Return on Investment
					</h3>
					<p className="text-ds-neutral-white/90">
						See how much you could save by joining our trade program
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div>
						<div className="text-3xl font-bold mb-2">
							${calculatorVolume.toLocaleString()}
						</div>
						<div className="text-ds-neutral-white/80 text-sm">
							Annual Volume
						</div>
					</div>

					<div>
						<div className="text-3xl font-bold mb-2">
							{currentTier.discount}%
						</div>
						<div className="text-ds-neutral-white/80 text-sm">
							Your Discount Rate
						</div>
					</div>

					<div>
						<div className="text-3xl font-bold mb-2">
							${annualSavings.toLocaleString()}
						</div>
						<div className="text-ds-neutral-white/80 text-sm">
							Annual Savings
						</div>
					</div>
				</div>

				<div className="text-center mt-8">
					<button className="bg-ds-neutral-white text-ds-primary-sage px-8 py-4 rounded-lg font-semibold hover:bg-ds-neutral-white/90 transition-colors duration-200 flex items-center space-x-4 mx-auto">
						<span>Start Saving Today</span>
						<ArrowRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};
