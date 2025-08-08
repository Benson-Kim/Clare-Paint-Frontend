"use client";

import React, { useState, useRef } from "react";
import {
	X,
	Upload,
	Camera,
	Image as IconImage,
	Search,
	Loader2,
	CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface VisualSearchProps {
	onClose: () => void;
	onSearchByImage: (imageUrl: string) => void;
}

export const VisualSearch: React.FC<VisualSearchProps> = ({
	onClose,
	onSearchByImage,
}) => {
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [analysisResults, setAnalysisResults] = useState<any>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const imageUrl = e.target?.result as string;
				setUploadedImage(imageUrl);
				analyzeImage(imageUrl);
			};
			reader.readAsDataURL(file);
		}
	};

	const analyzeImage = async (imageUrl: string) => {
		setIsAnalyzing(true);

		// Simulate image analysis
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Mock analysis results
		const mockResults = {
			dominantColors: [
				{ hex: "#5B7B7A", name: "Sage Green", confidence: 95 },
				{ hex: "#F5F5DC", name: "Cream", confidence: 87 },
				{ hex: "#2C2C2C", name: "Charcoal", confidence: 78 },
			],
			suggestedProducts: [
				{ id: "1", name: "Sage Whisper Interior Paint", match: 95 },
				{ id: "2", name: "Warm Cream Premium Paint", match: 87 },
				{ id: "3", name: "Charcoal Depth Paint", match: 78 },
			],
			roomType: "Living Room",
			style: "Modern Farmhouse",
		};

		setAnalysisResults(mockResults);
		setIsAnalyzing(false);
	};

	const handleCameraCapture = () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			// In a real implementation, this would open camera capture
			alert("Camera capture would be implemented here");
		}
	};

	const handleSearchByColors = () => {
		if (analysisResults) {
			const colorQuery = analysisResults.dominantColors
				.map((color: any) => color.name)
				.join(" ");
			onSearchByImage(colorQuery);
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="visual-search-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-ds-neutral-lightGray">
					<div className="flex items-center space-x-3">
						<IconImage className="w-6 h-6 text-ds-primary-sage" />
						<h2
							id="visual-search-title"
							className="text-2xl font-bold text-ds-primary-charcoal"
						>
							Visual Search
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close visual search"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					<p className="text-ds-neutral-mediumGray text-center">
						Upload an image or take a photo to find matching paint colors and
						products.
					</p>

					{!uploadedImage ? (
						<div className="space-y-4">
							{/* Upload Options */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div
									className="border-2 border-dashed border-ds-neutral-lightGray rounded-lg p-8 text-center hover:border-ds-primary-sage transition-colors duration-200 cursor-pointer"
									onClick={() => fileInputRef.current?.click()}
								>
									<Upload className="w-12 h-12 text-ds-neutral-mediumGray mx-auto mb-4" />
									<h3 className="font-semibold text-ds-primary-charcoal mb-2">
										Upload Image
									</h3>
									<p className="text-sm text-ds-neutral-mediumGray">
										Choose a photo from your device
									</p>
									<input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										onChange={handleFileUpload}
										className="hidden"
										aria-label="Upload image for visual search"
									/>
								</div>

								<div
									className="border-2 border-dashed border-ds-neutral-lightGray rounded-lg p-8 text-center hover:border-ds-primary-sage transition-colors duration-200 cursor-pointer"
									onClick={handleCameraCapture}
								>
									<Camera className="w-12 h-12 text-ds-neutral-mediumGray mx-auto mb-4" />
									<h3 className="font-semibold text-ds-primary-charcoal mb-2">
										Take Photo
									</h3>
									<p className="text-sm text-ds-neutral-mediumGray">
										Use your camera to capture colors
									</p>
								</div>
							</div>

							{/* Tips */}
							<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4">
								<h4 className="font-semibold text-ds-primary-charcoal mb-2">
									Tips for Best Results:
								</h4>
								<ul className="text-sm text-ds-neutral-darkSlate space-y-1">
									<li>• Use well-lit, clear images</li>
									<li>• Focus on the colors you want to match</li>
									<li>• Avoid images with heavy filters or effects</li>
									<li>• Include multiple colors for better suggestions</li>
								</ul>
							</div>
						</div>
					) : (
						<div className="space-y-6">
							{/* Uploaded Image */}
							<div className="relative">
								<Image
									src={uploadedImage}
									alt="Uploaded for color analysis"
									className="w-full max-h-64 object-contain rounded-lg border border-ds-neutral-lightGray"
								/>
								<button
									onClick={() => {
										setUploadedImage(null);
										setAnalysisResults(null);
										setIsAnalyzing(false);
									}}
									className="absolute top-2 right-2 p-1 bg-ds-neutral-white/80 rounded-full hover:bg-ds-neutral-white transition-colors duration-200"
									aria-label="Remove image"
								>
									<X className="w-4 h-4 text-ds-neutral-mediumGray" />
								</button>
							</div>

							{/* Analysis Loading */}
							{isAnalyzing && (
								<div className="text-center py-8">
									<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage mx-auto mb-4" />
									<p className="text-ds-neutral-mediumGray">
										Analyzing colors in your image...
									</p>
								</div>
							)}

							{/* Analysis Results */}
							{analysisResults && !isAnalyzing && (
								<div className="space-y-6">
									<div className="flex items-center space-x-2 text-green-600">
										<CheckCircle className="w-5 h-5" />
										<span className="font-semibold">Analysis Complete</span>
									</div>

									{/* Detected Colors */}
									<div>
										<h4 className="font-semibold text-ds-primary-charcoal mb-3">
											Detected Colors
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
											{analysisResults.dominantColors.map(
												(color: any, index: number) => (
													<div
														key={index}
														className="flex items-center space-x-3 p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg"
													>
														<div
															className="w-8 h-8 rounded-full border border-ds-neutral-lightGray"
															style={{ backgroundColor: color.hex }}
														/>
														<div>
															<p className="font-medium text-ds-primary-charcoal text-sm">
																{color.name}
															</p>
															<p className="text-xs text-ds-neutral-mediumGray">
																{color.confidence}% match
															</p>
														</div>
													</div>
												)
											)}
										</div>
									</div>

									{/* Room & Style Detection */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="p-4 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
											<h5 className="font-semibold text-ds-primary-charcoal mb-1">
												Detected Room
											</h5>
											<p className="text-ds-neutral-darkSlate">
												{analysisResults.roomType}
											</p>
										</div>
										<div className="p-4 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
											<h5 className="font-semibold text-ds-primary-charcoal mb-1">
												Style
											</h5>
											<p className="text-ds-neutral-darkSlate">
												{analysisResults.style}
											</p>
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex space-x-4">
										<button
											onClick={handleSearchByColors}
											className="flex-1 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
											aria-label="Search for matching products"
										>
											<Search className="w-5 h-5" />
											<span>Find Matching Products</span>
										</button>
										<button
											onClick={() => {
												setUploadedImage(null);
												setAnalysisResults(null);
											}}
											className="px-6 py-3 border border-ds-neutral-lightGray text-ds-neutral-darkSlate rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
											aria-label="Try another image"
										>
											Try Another
										</button>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
