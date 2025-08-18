"use client";

import React, { useState } from "react";
import {
	Play,
	Clock,
	CheckCircle,
	AlertTriangle,
	Brush,
	Droplets,
	Thermometer,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicationGuideProps {
	productName: string;
}

export const ApplicationGuide: React.FC<ApplicationGuideProps> = ({
	productName,
}) => {
	const [activeStep, setActiveStep] = useState(0);
	const [activeGuide, setActiveGuide] = useState<
		"preparation" | "application" | "cleanup"
	>("preparation");

	const preparationSteps = [
		{
			title: "Surface Preparation",
			duration: "30-60 minutes",
			description: "Clean and prepare the surface for optimal paint adhesion.",
			details: [
				"Remove loose or peeling paint with a scraper",
				"Sand glossy surfaces lightly with 220-grit sandpaper",
				"Fill holes and cracks with spackling compound",
				"Clean surface with damp cloth and let dry completely",
			],
			tips: "Use TSP (trisodium phosphate) cleaner for heavily soiled surfaces.",
			warning: "Always wear safety glasses and dust mask when sanding.",
		},
		{
			title: "Priming",
			duration: "45 minutes + dry time",
			description: "Apply primer to ensure proper paint adhesion and coverage.",
			details: [
				"Choose appropriate primer for your surface type",
				"Apply primer with brush or roller in thin, even coats",
				"Allow primer to dry completely (2-4 hours)",
				"Lightly sand primer if needed for smooth finish",
			],
			tips: "Use high-quality primer for best results - it saves paint and improves durability.",
			warning:
				"Never skip primer on bare surfaces or when making dramatic color changes.",
		},
		{
			title: "Room Preparation",
			duration: "20-30 minutes",
			description: "Protect furniture and floors from paint splatter.",
			details: [
				"Remove or cover furniture with plastic sheeting",
				"Lay drop cloths on floors",
				"Remove outlet covers and switch plates",
				"Apply painter's tape to trim and edges",
			],
			tips: "Use high-quality painter's tape and remove while paint is still slightly wet.",
			warning: "Cheap tape can leave residue or allow paint bleed-through.",
		},
	];

	const applicationSteps = [
		{
			title: "Cutting In",
			duration: "30-45 minutes",
			description: "Paint edges and corners with a brush before rolling.",
			details: [
				"Use a high-quality angled brush (2-3 inches)",
				"Load brush properly - not too much paint",
				"Paint a 2-3 inch border around edges",
				"Maintain a wet edge to avoid lap marks",
			],
			tips: "Work in sections and always maintain a wet edge for seamless blending.",
			warning: "Don't let cut-in areas dry before rolling adjacent areas.",
		},
		{
			title: "Rolling Technique",
			duration: "1-2 hours per coat",
			description: "Apply paint with roller using proper technique.",
			details: [
				"Use appropriate roller nap for your surface",
				"Load roller evenly in paint tray",
				"Apply paint in W or M pattern, then fill in",
				"Maintain consistent pressure and speed",
			],
			tips: "Work in 4x4 foot sections for best results and to maintain wet edge.",
			warning: "Don't press too hard on roller - let the paint flow naturally.",
		},
		{
			title: "Second Coat",
			duration: "1-2 hours + dry time",
			description: "Apply second coat for optimal coverage and durability.",
			details: [
				"Wait for first coat to dry completely (4+ hours)",
				"Lightly sand any drips or imperfections",
				"Apply second coat using same technique",
				"Remove tape while paint is slightly tacky",
			],
			tips: "Two thin coats always look better than one thick coat.",
			warning: "Don't rush between coats - proper dry time is crucial.",
		},
	];

	const cleanupSteps = [
		{
			title: "Tool Cleaning",
			duration: "15-20 minutes",
			description: "Clean brushes and rollers immediately after use.",
			details: [
				"Remove excess paint from tools",
				"Wash with warm soapy water",
				"Rinse until water runs clear",
				"Reshape brushes and store properly",
			],
			tips: "Clean tools immediately - dried paint is much harder to remove.",
			warning: "Never pour paint down drains - dispose of properly.",
		},
		{
			title: "Surface Cleanup",
			duration: "10-15 minutes",
			description: "Remove tape and clean up any spills or splatters.",
			details: [
				"Remove painter's tape at 45-degree angle",
				"Clean up any paint spills immediately",
				"Remove drop cloths carefully",
				"Reinstall outlet covers and switch plates",
			],
			tips: "Remove tape while paint is still slightly wet for clean lines.",
			warning: "Don't leave tape on for more than 24 hours.",
		},
		{
			title: "Paint Storage",
			duration: "5 minutes",
			description: "Properly store leftover paint for future touch-ups.",
			details: [
				"Clean paint can rim and lid",
				"Store paint in cool, dry place",
				"Label can with room and date",
				"Store brushes in original packaging",
			],
			tips: "Store paint cans upside down to create better seal.",
			warning: "Never store paint in freezing temperatures.",
		},
	];

	const getCurrentSteps = () => {
		switch (activeGuide) {
			case "preparation":
				return preparationSteps;
			case "application":
				return applicationSteps;
			case "cleanup":
				return cleanupSteps;
			default:
				return preparationSteps;
		}
	};

	const currentSteps = getCurrentSteps();
	const currentStep = currentSteps[activeStep];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal">
					Application Guide
				</h3>
				<div className="flex items-center space-x-2 text-sm text-gray-600">
					<Play className="w-4 h-4" />
					<span>Step-by-step instructions</span>
				</div>
			</div>

			{/* Guide Navigation */}
			<div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
				<button
					onClick={() => {
						setActiveGuide("preparation");
						setActiveStep(0);
					}}
					className={cn(
						"flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2",
						activeGuide === "preparation"
							? "bg-white text-ds-primary-sage shadow-sm"
							: "text-gray-600 hover:text-gray-800"
					)}
				>
					<Brush className="w-4 h-4" />
					<span>Preparation</span>
				</button>
				<button
					onClick={() => {
						setActiveGuide("application");
						setActiveStep(0);
					}}
					className={cn(
						"flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2",
						activeGuide === "application"
							? "bg-white text-ds-primary-sage shadow-sm"
							: "text-gray-600 hover:text-gray-800"
					)}
				>
					<Droplets className="w-4 h-4" />
					<span>Application</span>
				</button>
				<button
					onClick={() => {
						setActiveGuide("cleanup");
						setActiveStep(0);
					}}
					className={cn(
						"flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2",
						activeGuide === "cleanup"
							? "bg-white text-ds-primary-sage shadow-sm"
							: "text-gray-600 hover:text-gray-800"
					)}
				>
					<CheckCircle className="w-4 h-4" />
					<span>Cleanup</span>
				</button>
			</div>

			{/* Step Progress */}
			<div className="flex items-center space-x-2">
				{currentSteps.map((_, index) => (
					<button
						key={index}
						onClick={() => setActiveStep(index)}
						className={cn(
							"flex-1 h-2 rounded-full transition-all duration-200",
							index === activeStep
								? "bg-ds-primary-sage"
								: index < activeStep
								? "bg-ds-primary-sage/60"
								: "bg-gray-200"
						)}
					/>
				))}
			</div>

			{/* Current Step */}
			<div className="border border-gray-200 rounded-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 bg-ds-primary-sage text-white rounded-full flex items-center justify-center font-bold text-sm">
							{activeStep + 1}
						</div>
						<div>
							<h4 className="font-semibold text-ds-primary-charcoal">
								{currentStep.title}
							</h4>
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<Clock className="w-4 h-4" />
								<span>{currentStep.duration}</span>
							</div>
						</div>
					</div>
				</div>

				<p className="text-gray-700 mb-4">{currentStep.description}</p>

				<div className="space-y-3 mb-4">
					{currentStep.details.map((detail, index) => (
						<div key={index} className="flex items-start space-x-3">
							<CheckCircle className="w-5 h-5 text-ds-primary-sage mt-0.5 flex-shrink-0" />
							<span className="text-sm text-gray-700">{detail}</span>
						</div>
					))}
				</div>

				{/* Tips and Warnings */}
				<div className="space-y-3">
					<div className="bg-ds-primary-sage/5 border border-ds-primary-sage/20 rounded-lg p-3">
						<div className="flex items-start space-x-2">
							<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-0.5 flex-shrink-0" />
							<div>
								<p className="text-sm font-medium text-ds-primary-sage">
									Pro Tip
								</p>
								<p className="text-sm text-gray-700">{currentStep.tips}</p>
							</div>
						</div>
					</div>

					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
						<div className="flex items-start space-x-2">
							<AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
							<div>
								<p className="text-sm font-medium text-yellow-800">Important</p>
								<p className="text-sm text-yellow-700">{currentStep.warning}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<div className="flex justify-between mt-6">
					<button
						onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
						disabled={activeStep === 0}
						className={cn(
							"px-4 py-2 rounded-lg font-medium transition-all duration-200",
							activeStep === 0
								? "bg-gray-100 text-gray-400 cursor-not-allowed"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						)}
					>
						Previous Step
					</button>
					<button
						onClick={() =>
							setActiveStep(Math.min(currentSteps.length - 1, activeStep + 1))
						}
						disabled={activeStep === currentSteps.length - 1}
						className={cn(
							"px-4 py-2 rounded-lg font-medium transition-all duration-200",
							activeStep === currentSteps.length - 1
								? "bg-gray-100 text-gray-400 cursor-not-allowed"
								: "bg-ds-primary-sage text-white hover:bg-ds-primary-sage/90"
						)}
					>
						Next Step
					</button>
				</div>
			</div>

			{/* Tools and Materials */}
			<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-6">
				<h4 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
					<Brush className="w-5 h-5 text-ds-primary-sage" />
					<span>Required Tools & Materials</span>
				</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h5 className="font-medium text-ds-primary-charcoal mb-2">Tools</h5>
						<ul className="space-y-1 text-sm text-gray-700">
							<li>• High-quality angled brush (2-3&quot;)</li>
							<li>• Roller frame and covers</li>
							<li>• Paint tray and liners</li>
							<li>• Drop cloths</li>
							<li>• Painter&apos;s tape</li>
							<li>• Sandpaper (220-grit)</li>
						</ul>
					</div>
					<div>
						<h5 className="font-medium text-ds-primary-charcoal mb-2">
							Materials
						</h5>
						<ul className="space-y-1 text-sm text-gray-700">
							<li>• {productName}</li>
							<li>• Appropriate primer</li>
							<li>• Spackling compound</li>
							<li>• TSP cleaner (if needed)</li>
							<li>• Rags and cleaning supplies</li>
							<li>• Safety equipment</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Environmental Conditions */}
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h4 className="font-semibold text-ds-primary-charcoal mb-3 flex items-center space-x-2">
					<Thermometer className="w-5 h-5 text-blue-600" />
					<span>Optimal Conditions</span>
				</h4>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
					<div className="text-center">
						<p className="font-medium text-blue-800">Temperature</p>
						<p className="text-blue-700">50-85°F (10-29°C)</p>
					</div>
					<div className="text-center">
						<p className="font-medium text-blue-800">Humidity</p>
						<p className="text-blue-700">Less than 85%</p>
					</div>
					<div className="text-center">
						<p className="font-medium text-blue-800">Ventilation</p>
						<p className="text-blue-700">Good air circulation</p>
					</div>
				</div>
			</div>
		</div>
	);
};
