"use client";

import React, { useState, useEffect, useRef } from "react";
import {
	Search,
	X,
	Clock,
	TrendingUp,
	ArrowRight,
	Mic,
	Camera,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SearchOverlayProps {
	isOpen: boolean;
	onClose: () => void;
	onSearch: (query: string) => void;
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
}

interface SearchSuggestion {
	id: string;
	text: string;
	type: "product" | "color" | "category" | "recent" | "popular";
	count?: number;
	image?: string;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
	isOpen,
	onClose,
	onSearch,
	searchQuery,
	onSearchQueryChange,
}) => {
	const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isListening, setIsListening] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Mock data
	const [recentSearches] = useState<string[]>([
		"sage green paint",
		"bathroom paint",
		"exterior white paint",
		"primer for walls",
	]);

	const [popularSearches] = useState<string[]>([
		"interior paint",
		"color matching",
		"exterior paint",
		"paint samples",
		"primer",
		"color visualizer",
	]);

	const [trendingColors] = useState([
		{ name: "Sage Whisper", hex: "#5B7B7A" },
		{ name: "Warm Cream", hex: "#F5F5DC" },
		{ name: "Charcoal Depth", hex: "#2C2C2C" },
		{ name: "Classic White", hex: "#FFFFFF" },
	]);

	// Focus input when overlay opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Generate suggestions based on search query
	useEffect(() => {
		if (!searchQuery.trim()) {
			setSuggestions([]);
			setSelectedIndex(-1);
			return;
		}

		const mockSuggestions: SearchSuggestion[] = [
			{
				id: "1",
				text: "Sage Green Interior Paint",
				type: "product",
				count: 12,
				image:
					"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=400",
			},
			{ id: "2", text: "Sage Whisper Color", type: "color", count: 1 },
			{ id: "3", text: "Green Paint Collection", type: "category", count: 45 },
			{
				id: "4",
				text: "Sage Green Bathroom Ideas",
				type: "category",
				count: 8,
			},
		].filter((suggestion) =>
			suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
		);

		setSuggestions(mockSuggestions);
		setSelectedIndex(-1);
	}, [searchQuery]);

	// Keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!suggestions.length) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev < suggestions.length - 1 ? prev + 1 : prev
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
				break;
			case "Enter":
				e.preventDefault();
				if (selectedIndex >= 0 && suggestions[selectedIndex]) {
					handleSuggestionClick(suggestions[selectedIndex]);
				} else {
					handleSubmit();
				}
				break;
		}
	};

	const handleSubmit = () => {
		if (searchQuery.trim()) {
			onSearch(searchQuery);
		}
	};

	const handleSuggestionClick = (suggestion: SearchSuggestion) => {
		onSearchQueryChange(suggestion.text);
		onSearch(suggestion.text);
	};

	const handleRecentSearchClick = (search: string) => {
		onSearchQueryChange(search);
		onSearch(search);
	};

	const handleVoiceSearch = () => {
		if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
			const SpeechRecognition =
				(window as any).webkitSpeechRecognition ||
				(window as any).SpeechRecognition;
			const recognition = new SpeechRecognition();

			recognition.continuous = false;
			recognition.interimResults = false;
			recognition.lang = "en-US";

			recognition.onstart = () => setIsListening(true);
			recognition.onresult = (event: any) => {
				const transcript = event.results[0][0].transcript;
				onSearchQueryChange(transcript);
				onSearch(transcript);
				setIsListening(false);
			};
			recognition.onerror = () => setIsListening(false);
			recognition.onend = () => setIsListening(false);

			recognition.start();
		}
	};

	const getSuggestionIcon = (type: SearchSuggestion["type"]) => {
		switch (type) {
			case "recent":
				return <Clock className="w-4 h-4 text-ds-neutral-mediumGray" />;
			case "popular":
				return <TrendingUp className="w-4 h-4 text-ds-primary-sage" />;
			case "product":
				return <Search className="w-4 h-4 text-ds-primary-sage" />;
			case "color":
				return (
					<div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-blue-500" />
				);
			case "category":
				return <Search className="w-4 h-4 text-ds-neutral-mediumGray" />;
			default:
				return <Search className="w-4 h-4 text-ds-neutral-mediumGray" />;
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-hidden">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 transition-opacity duration-300"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Search Panel */}
			<div className="absolute top-0 left-0 right-0 bg-ds-neutral-white shadow-xl transform transition-transform duration-300 ease-out">
				<div className="max-w-4xl mx-auto p-6">
					{/* Search Header */}
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-bold text-ds-primary-charcoal">
							Search Clare Paint
						</h2>
						<button
							onClick={onClose}
							className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal transition-colors duration-200 rounded-lg hover:bg-ds-neutral-lightGray/50"
							aria-label="Close search"
						>
							<X className="w-6 h-6" />
						</button>
					</div>

					{/* Search Form */}
					<div className="relative mb-8">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-ds-neutral-mediumGray" />
						<input
							ref={inputRef}
							type="text"
							value={searchQuery}
							onChange={(e) => onSearchQueryChange(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Search for paints, colors, or inspiration..."
							className="w-full pl-12 pr-24 py-4 text-lg border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-label="Search input"
							aria-expanded={suggestions.length > 0}
							aria-haspopup="listbox"
							aria-autocomplete="list"
							role="combobox"
						/>

						{/* Voice and Visual Search */}
						<div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
							<button
								onClick={handleVoiceSearch}
								disabled={isListening}
								className={cn(
									"p-2 rounded-lg transition-colors duration-200",
									isListening
										? "bg-red-100 text-red-600"
										: "text-ds-neutral-mediumGray hover:text-ds-primary-sage hover:bg-ds-primary-sage/5"
								)}
								aria-label="Voice search"
								title="Voice search"
							>
								<Mic
									className={cn("w-4 h-4", isListening && "animate-pulse")}
								/>
							</button>

							<button
								className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage hover:bg-ds-primary-sage/5 rounded-lg transition-colors duration-200"
								aria-label="Visual search"
								title="Visual search"
							>
								<Camera className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Search Content */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Suggestions or Recent Searches */}
						<div>
							{searchQuery && suggestions.length > 0 ? (
								<div>
									<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
										Suggestions
									</h3>
									<div className="space-y-2" role="listbox">
										{suggestions.map((suggestion, index) => (
											<button
												key={suggestion.id}
												onClick={() => handleSuggestionClick(suggestion)}
												className={cn(
													"flex items-center justify-between w-full p-3 text-left hover:bg-ds-primary-sage/5 rounded-lg transition-colors duration-200 group",
													selectedIndex === index && "bg-ds-primary-sage/10"
												)}
												role="option"
												aria-selected={selectedIndex === index}
											>
												<div className="flex items-center space-x-3">
													{suggestion.image ? (
														<Image
															src={suggestion.image}
															alt=""
															width={32}
															height={32}
															className="rounded-full object-cover"
															loading="lazy"
														/>
													) : (
														getSuggestionIcon(suggestion.type)
													)}
													<span className="text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200">
														{suggestion.text}
													</span>
												</div>
												<div className="flex items-center space-x-2">
													{suggestion.count && (
														<span className="text-xs text-ds-neutral-mediumGray">
															{suggestion.count} results
														</span>
													)}
													<ArrowRight className="w-4 h-4 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
												</div>
											</button>
										))}
									</div>
								</div>
							) : (
								<div>
									<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
										<Clock className="w-5 h-5 text-ds-neutral-mediumGray" />
										<span>Recent Searches</span>
									</h3>
									<div className="space-y-2">
										{recentSearches.map((search, index) => (
											<button
												key={index}
												onClick={() => handleRecentSearchClick(search)}
												className="flex items-center justify-between w-full p-3 text-left hover:bg-ds-primary-sage/5 rounded-lg transition-colors duration-200 group"
											>
												<div className="flex items-center space-x-3">
													<Clock className="w-4 h-4 text-ds-neutral-mediumGray" />
													<span className="text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200">
														{search}
													</span>
												</div>
												<ArrowRight className="w-4 h-4 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Popular Searches and Trending Colors */}
						<div className="space-y-8">
							<div>
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
									<TrendingUp className="w-5 h-5 text-ds-primary-sage" />
									<span>Popular Searches</span>
								</h3>
								<div className="space-y-2">
									{popularSearches.map((search, index) => (
										<button
											key={index}
											onClick={() => handleRecentSearchClick(search)}
											className="flex items-center justify-between w-full p-3 text-left hover:bg-ds-primary-sage/5 rounded-lg transition-colors duration-200 group"
										>
											<div className="flex items-center space-x-3">
												<TrendingUp className="w-4 h-4 text-ds-primary-sage" />
												<span className="text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200">
													{search}
												</span>
											</div>
											<ArrowRight className="w-4 h-4 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
										</button>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
									Trending Colors
								</h3>
								<div className="grid grid-cols-2 gap-3">
									{trendingColors.map((color, index) => (
										<button
											key={index}
											onClick={() => handleRecentSearchClick(color.name)}
											className="flex items-center space-x-3 p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:border-ds-primary-sage hover:bg-ds-primary-sage/5 transition-colors duration-200 text-left group"
										>
											<div
												className="w-6 h-6 rounded-full border border-ds-neutral-lightGray"
												style={{ backgroundColor: color.hex }}
											/>
											<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200">
												{color.name}
											</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div className="mt-8 pt-6 border-t border-ds-neutral-lightGray">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<Link
								href="/products"
								onClick={onClose}
								className="p-4 bg-ds-primary-cream/30 rounded-lg hover:bg-ds-primary-cream/50 transition-colors duration-200 text-center group"
							>
								<span className="text-sm font-medium text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
									All Products
								</span>
							</Link>
							<Link
								href="/colors"
								onClick={onClose}
								className="p-4 bg-ds-primary-cream/30 rounded-lg hover:bg-ds-primary-cream/50 transition-colors duration-200 text-center group"
							>
								<span className="text-sm font-medium text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
									Color Collections
								</span>
							</Link>
							<Link
								href="/inspiration"
								onClick={onClose}
								className="p-4 bg-ds-primary-cream/30 rounded-lg hover:bg-ds-primary-cream/50 transition-colors duration-200 text-center group"
							>
								<span className="text-sm font-medium text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
									Inspiration
								</span>
							</Link>
							<Link
								href="/consultation"
								onClick={onClose}
								className="p-4 bg-ds-primary-cream/30 rounded-lg hover:bg-ds-primary-cream/50 transition-colors duration-200 text-center group"
							>
								<span className="text-sm font-medium text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
									Color Consultation
								</span>
							</Link>
						</div>
					</div>

					{/* Search Tips */}
					<div className="mt-6 text-center">
						<p className="text-sm text-ds-neutral-mediumGray">
							<kbd className="px-2 py-1 bg-ds-neutral-lightGray rounded text-xs">
								Ctrl
							</kbd>{" "}
							+
							<kbd className="px-2 py-1 bg-ds-neutral-lightGray rounded text-xs ml-1">
								/
							</kbd>{" "}
							to search anytime
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
