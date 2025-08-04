"use client";

import React, { useState } from "react";
import { X, Calculator, Home, Ruler, Info, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExteriorCoverageCalculatorProps {
	onClose: () => void;
}

interface Surface {
	id: string;
	name: string;
	length: number;
	height: number;
	doors: number;
	windows: number;
	type: "wall" | "siding" | "deck";
}

export const ExteriorCoverageCalculator: React.FC<
	ExteriorCoverageCalculatorProps
> = ({ onClose }) => {
	const [surfaces, setSurfaces] = useState<Surface[]>([
		{
			id: "1",
			name: "Front Wall",
			length: 20,
			height: 10,
			doors: 1,
			windows: 2,
			type: "wall",
		},
	]);
	const [coats, setCoats] = useState(2);
	const [coverage, setCoverage] = useState(250);
	const [activeTab, setActiveTab] = useState<"simple" | "detailed">("detailed");

	const addSurface = () => {
		const newSurface: Surface = {
			id: Date.now().toString(),
			name: `Surface ${surfaces.length + 1}`,
			length: 0,
			height: 0,
			doors: 0,
			windows: 0,
			type: "wall",
		};
		setSurfaces([...surfaces, newSurface]);
	};

	const updateSurface = (
		id: string,
		field: keyof Surface,
		value: string | number
	) => {
		setSurfaces(
			surfaces.map((surface) =>
				surface.id === id ? { ...surface, [field]: value } : surface
			)
		);
	};

	const removeSurface = (id: string) => {
		if (surfaces.length > 1) {
			setSurfaces(surfaces.filter((surface) => surface.id !== id));
		}
	};

	const calculateSurfaceArea = (surface: Surface) => {
		let area = surface.length * surface.height;
		if (surface.type === "deck") {
			area = surface.length * surface.height;
		}
		const doorArea = surface.doors * 20;
		const windowArea = surface.windows * 15;
		return Math.max(0, area - doorArea - windowArea);
	};

	const totalArea = surfaces.reduce(
		(sum, surface) => sum + calculateSurfaceArea(surface),
		0
	);
	const totalAreaWithCoats = totalArea * coats;
	const gallonsNeeded = Math.ceil(totalAreaWithCoats / coverage);

	const estimatedCost = {
		premium: gallonsNeeded * 99.99,
		standard: gallonsNeeded * 79.99,
		budget: gallonsNeeded * 59.99,
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="calculator-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
					<div className="flex items-center space-x-2">
						<Calculator className="w-6 h-6 text-ds-primary-sage" />
						<h2
							id="calculator-title"
							className="text-2xl font-bold text-ds-primary-charcoal"
						>
							Exterior Paint Coverage Calculator
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close calculator"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				<div className="p-8">
					{/* Tab Navigation */}
					<div className="flex space-x-2 bg-ds-neutral-lightGray/50 rounded-lg p-2 mb-8">
						<button
							onClick={() => setActiveTab("simple")}
							className={cn(
								"flex-1 px-8 py-2 rounded-md text-sm font-medium transition-all duration-200",
								activeTab === "simple"
									? "bg-ds-neutral-white text-ds-primary-sage shadow-sm"
									: "text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
							)}
							aria-selected={activeTab === "simple"}
							role="tab"
						>
							Simple Calculator
						</button>
						<button
							onClick={() => setActiveTab("detailed")}
							className={cn(
								"flex-1 px-8 py-2 rounded-md text-sm font-medium transition-all duration-200",
								activeTab === "detailed"
									? "bg-ds-neutral-white text-ds-primary-sage shadow-sm"
									: "text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
							)}
							aria-selected={activeTab === "detailed"}
							role="tab"
						>
							Surface by Surface
						</button>
					</div>

					{activeTab === "simple" ? (
						/* Simple Calculator */
						<div className="space-y-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<label
										htmlFor="total-sqft"
										className="block text-sm font-medium text-ds-primary-charcoal mb-2"
									>
										Total Square Feet to Paint
									</label>
									<input
										type="number"
										id="total-sqft"
										placeholder="Enter total sq ft"
										className="w-full px-8 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-label="Total square feet to paint"
									/>
								</div>
								<div>
									<label
										htmlFor="num-coats-simple"
										className="block text-sm font-medium text-ds-primary-charcoal mb-2"
									>
										Number of Coats
									</label>
									<select
										id="num-coats-simple"
										value={coats}
										onChange={(e) => setCoats(Number(e.target.value))}
										className="w-full px-8 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-label="Number of coats"
									>
										<option value={1}>1 Coat</option>
										<option value={2}>2 Coats (Recommended)</option>
										<option value={3}>3 Coats</option>
									</select>
								</div>
							</div>
						</div>
					) : (
						/* Detailed Calculator */
						<div className="space-y-8">
							{/* Surface Inputs */}
							<div className="space-y-4">
								{surfaces.map((surface, index) => (
									<div
										key={surface.id}
										className="bg-ds-neutral-lightGray/20 p-4 rounded-lg"
									>
										<div className="flex items-center justify-between mb-4">
											<div className="flex items-center space-x-2">
												<Home className="w-5 h-5 text-ds-primary-sage" />
												<input
													type="text"
													value={surface.name}
													onChange={(e) =>
														updateSurface(surface.id, "name", e.target.value)
													}
													className="font-medium text-ds-primary-charcoal bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-ds-primary-sage rounded px-2"
													aria-label={`Surface ${index + 1} name`}
												/>
											</div>
											{surfaces.length > 1 && (
												<button
													onClick={() => removeSurface(surface.id)}
													className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
													aria-label={`Remove surface ${surface.name}`}
												>
													<X className="w-4 h-4" />
												</button>
											)}
										</div>

										<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
											<div>
												<label
													htmlFor={`surface-type-${surface.id}`}
													className="block text-xs font-medium text-ds-neutral-mediumGray mb-2"
												>
													Type
												</label>
												<select
													id={`surface-type-${surface.id}`}
													value={surface.type}
													onChange={(e) =>
														updateSurface(
															surface.id,
															"type",
															e.target.value as Surface["type"]
														)
													}
													className="w-full px-2 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
													aria-label={`Type of surface ${surface.name}`}
												>
													<option value="wall">Wall</option>
													<option value="siding">Siding</option>
													<option value="deck">Deck</option>
												</select>
											</div>
											<div>
												<label
													htmlFor={`length-${surface.id}`}
													className="block text-xs font-medium text-ds-neutral-mediumGray mb-2"
												>
													Length (ft)
												</label>
												<input
													type="number"
													id={`length-${surface.id}`}
													value={surface.length || ""}
													onChange={(e) =>
														updateSurface(
															surface.id,
															"length",
															Number(e.target.value)
														)
													}
													className="w-full px-2 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
													placeholder="0"
													aria-label={`Length of surface ${surface.name}`}
												/>
											</div>
											<div>
												<label
													htmlFor={`height-${surface.id}`}
													className="block text-xs font-medium text-ds-neutral-mediumGray mb-2"
												>
													{surface.type === "deck"
														? "Width (ft)"
														: "Height (ft)"}
												</label>
												<input
													type="number"
													id={`height-${surface.id}`}
													value={surface.height || ""}
													onChange={(e) =>
														updateSurface(
															surface.id,
															"height",
															Number(e.target.value)
														)
													}
													className="w-full px-2 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
													placeholder={surface.type === "deck" ? "0" : "10"}
													aria-label={`${
														surface.type === "deck" ? "Width" : "Height"
													} of surface ${surface.name}`}
												/>
											</div>
											<div>
												<label
													htmlFor={`doors-${surface.id}`}
													className="block text-xs font-medium text-ds-neutral-mediumGray mb-2"
												>
													Doors
												</label>
												<input
													type="number"
													id={`doors-${surface.id}`}
													value={surface.doors || ""}
													onChange={(e) =>
														updateSurface(
															surface.id,
															"doors",
															Number(e.target.value)
														)
													}
													className="w-full px-2 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
													placeholder="0"
													aria-label={`Number of doors on surface ${surface.name}`}
												/>
											</div>
											<div>
												<label
													htmlFor={`windows-${surface.id}`}
													className="block text-xs font-medium text-ds-neutral-mediumGray mb-2"
												>
													Windows
												</label>
												<input
													type="number"
													id={`windows-${surface.id}`}
													value={surface.windows || ""}
													onChange={(e) =>
														updateSurface(
															surface.id,
															"windows",
															Number(e.target.value)
														)
													}
													className="w-full px-2 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
													placeholder="0"
													aria-label={`Number of windows on surface ${surface.name}`}
												/>
											</div>
										</div>

										<div className="mt-2 text-sm text-ds-neutral-mediumGray">
											Calculated area:{" "}
											{calculateSurfaceArea(surface).toFixed(0)} sq ft
										</div>
									</div>
								))}

								<button
									onClick={addSurface}
									className="w-full py-4 border-2 border-dashed border-ds-neutral-lightGray rounded-lg text-ds-neutral-mediumGray hover:border-ds-primary-sage hover:text-ds-primary-sage transition-colors duration-200"
									aria-label="Add another surface"
								>
									+ Add Another Surface
								</button>
							</div>

							{/* Paint Settings */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<label
										htmlFor="num-coats-detailed"
										className="block text-sm font-medium text-ds-primary-charcoal mb-2"
									>
										Number of Coats
									</label>
									<select
										id="num-coats-detailed"
										value={coats}
										onChange={(e) => setCoats(Number(e.target.value))}
										className="w-full px-8 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-label="Number of coats"
									>
										<option value={1}>1 Coat</option>
										<option value={2}>2 Coats (Recommended)</option>
										<option value={3}>3 Coats</option>
									</select>
								</div>
								<div>
									<label
										htmlFor="paint-coverage"
										className="block text-sm font-medium text-ds-primary-charcoal mb-2"
									>
										Paint Coverage (sq ft per gallon)
									</label>
									<select
										id="paint-coverage"
										value={coverage}
										onChange={(e) => setCoverage(Number(e.target.value))}
										className="w-full px-8 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-label="Paint coverage per gallon"
									>
										<option value={80}>80 sq ft (Elastomeric)</option>
										<option value={150}>150 sq ft (Solid Stain)</option>
										<option value={250}>250 sq ft (Oil-Based)</option>
										<option value={300}>300 sq ft (Acrylic Latex)</option>
									</select>
								</div>
							</div>
						</div>
					)}

					{/* Results */}
					<div className="mt-8 bg-ds-primary-sage/5 border border-ds-primary-sage/20 rounded-lg p-8">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-8 flex items-center space-x-2">
							<CheckCircle className="w-5 h-5 text-ds-primary-sage" />
							<span>Paint Requirements</span>
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="text-3xl font-bold text-ds-primary-sage mb-2">
									{totalArea.toFixed(0)}
								</div>
								<div className="text-sm text-ds-neutral-mediumGray">
									Total Square Feet
								</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-ds-primary-sage mb-2">
									{gallonsNeeded}
								</div>
								<div className="text-sm text-ds-neutral-mediumGray">
									Gallons Needed
								</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-ds-primary-sage mb-2">
									{coats}
								</div>
								<div className="text-sm text-ds-neutral-mediumGray">Coats</div>
							</div>
						</div>

						{/* Cost Estimates */}
						<div className="mt-8">
							<h4 className="font-semibold text-ds-primary-charcoal mb-4">
								Estimated Cost by Paint Quality
							</h4>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="bg-ds-neutral-white p-4 rounded-lg border border-ds-neutral-lightGray">
									<div className="font-medium text-ds-primary-charcoal">
										Budget Paint
									</div>
									<div className="text-2xl font-bold text-ds-primary-sage">
										${estimatedCost.budget.toFixed(2)}
									</div>
									<div className="text-xs text-ds-neutral-mediumGray">
										~$60/gallon
									</div>
								</div>
								<div className="bg-ds-neutral-white p-4 rounded-lg border border-ds-neutral-lightGray">
									<div className="font-medium text-ds-primary-charcoal">
										Standard Paint
									</div>
									<div className="text-2xl font-bold text-ds-primary-sage">
										${estimatedCost.standard.toFixed(2)}
									</div>
									<div className="text-xs text-ds-neutral-mediumGray">
										~$80/gallon
									</div>
								</div>
								<div className="bg-ds-neutral-white p-4 rounded-lg border border-ds-neutral-lightGray">
									<div className="font-medium text-ds-primary-charcoal">
										Premium Paint
									</div>
									<div className="text-2xl font-bold text-ds-primary-sage">
										${estimatedCost.premium.toFixed(2)}
									</div>
									<div className="text-xs text-ds-neutral-mediumGray">
										~$100/gallon
									</div>
								</div>
							</div>
						</div>

						{/* Tips */}
						<div className="mt-8 bg-ds-accent-warmBeige/10 border border-ds-accent-warmBeige/20 rounded-lg p-4">
							<div className="flex items-start space-x-2">
								<Info className="w-5 h-5 text-ds-accent-warmBrown mt-2 flex-shrink-0" />
								<div>
									<h5 className="font-medium text-ds-accent-warmBrown mb-2">
										Pro Tips for Exterior Painting
									</h5>
									<ul className="text-sm text-ds-neutral-darkSlate space-y-2">
										<li>
											• Always prepare the surface thoroughly (clean, scrape,
											sand, prime).
										</li>
										<li>
											• Consider weather conditions; avoid painting in direct
											sun or high humidity.
										</li>
										<li>
											• Use a high-quality primer, especially on bare wood or
											masonry.
										</li>
										<li>
											• Two thin coats are always better than one thick coat for
											durability.
										</li>
										<li>
											• Buy 10-15% extra paint for touch-ups and future repairs.
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
						<button
							className="flex-1 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
							aria-label="Shop recommended exterior paints"
						>
							Shop Recommended Paints
						</button>
						<button
							className="flex-1 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium"
							aria-label="Save this calculation"
						>
							Save Calculation
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
