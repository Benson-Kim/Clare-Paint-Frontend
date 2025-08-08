"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, Clock, TrendingUp, Mic, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SearchSuggestion {
	id: string;
	text: string;
	type: "product" | "color" | "brand" | "category" | "recent";
	count?: number;
	image?: string;
}

interface SearchInputProps {
	value: string;
	onSubmit: (query: string) => void;
	suggestions: SearchSuggestion[];
	isLoading: boolean;
	placeholder?: string;
	className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
	value,
	onSubmit,
	suggestions,
	isLoading,
	placeholder = "Search...",
	className = "",
}) => {
	const [inputValue, setInputValue] = useState(value);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isListening, setIsListening] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target as Node) &&
				!inputRef.current?.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		setShowSuggestions(newValue.length > 0 || suggestions.length > 0);
		setSelectedIndex(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showSuggestions) return;

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
			case "Escape":
				setShowSuggestions(false);
				setSelectedIndex(-1);
				break;
		}
	};

	const handleSubmit = () => {
		if (inputValue.trim()) {
			onSubmit(inputValue.trim());
			setShowSuggestions(false);
		}
	};

	const handleSuggestionClick = (suggestion: SearchSuggestion) => {
		setInputValue(suggestion.text);
		onSubmit(suggestion.text);
		setShowSuggestions(false);
		setSelectedIndex(-1);
	};

	const handleClear = () => {
		setInputValue("");
		setShowSuggestions(false);
		onSubmit("");
		inputRef.current?.focus();
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

			recognition.onstart = () => {
				setIsListening(true);
			};

			recognition.onresult = (event: any) => {
				const transcript = event.results[0][0].transcript;
				setInputValue(transcript);
				onSubmit(transcript);
				setIsListening(false);
			};

			recognition.onerror = () => {
				setIsListening(false);
			};

			recognition.onend = () => {
				setIsListening(false);
			};

			recognition.start();
		}
	};

	const getSuggestionIcon = (type: SearchSuggestion["type"]) => {
		switch (type) {
			case "recent":
				return <Clock className="w-4 h-4 text-ds-neutral-mediumGray" />;
			case "product":
				return <Search className="w-4 h-4 text-ds-primary-sage" />;
			case "color":
				return (
					<div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-blue-500" />
				);
			case "brand":
				return <TrendingUp className="w-4 h-4 text-ds-accent-warmBrown" />;
			case "category":
				return <Search className="w-4 h-4 text-ds-neutral-mediumGray" />;
			default:
				return <Search className="w-4 h-4 text-ds-neutral-mediumGray" />;
		}
	};

	return (
		<div className={cn("relative", className)}>
			<div className="relative">
				<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ds-neutral-mediumGray" />
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onFocus={() => setShowSuggestions(true)}
					placeholder={placeholder}
					className="w-full pl-12 pr-24 py-4 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent transition-all duration-200 text-lg"
					aria-label="Search input"
					aria-expanded={showSuggestions}
					aria-haspopup="listbox"
					aria-autocomplete="list"
					role="combobox"
				/>

				<div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
					{/* Voice Search */}
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
						<Mic className={cn("w-4 h-4", isListening && "animate-pulse")} />
					</button>

					{/* Clear Button */}
					{inputValue && (
						<button
							onClick={handleClear}
							className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal rounded-lg transition-colors duration-200"
							aria-label="Clear search"
						>
							<X className="w-4 h-4" />
						</button>
					)}

					{/* Loading Indicator */}
					{isLoading && (
						<div className="w-5 h-5 border-2 border-ds-primary-sage border-t-transparent rounded-full animate-spin" />
					)}
				</div>
			</div>

			{/* Suggestions Dropdown */}
			{showSuggestions && suggestions.length > 0 && (
				<div
					ref={suggestionsRef}
					className="absolute top-full left-0 right-0 mt-2 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
					role="listbox"
				>
					{suggestions.map((suggestion, index) => (
						<button
							key={suggestion.id}
							onClick={() => handleSuggestionClick(suggestion)}
							className={cn(
								"w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-ds-neutral-lightGray/50 transition-colors duration-200",
								selectedIndex === index && "bg-ds-primary-sage/10"
							)}
							role="option"
							aria-selected={selectedIndex === index}
						>
							{suggestion.image ? (
								<Image
									src={suggestion.image}
									alt=""
									className="w-8 h-8 rounded-full object-cover"
									loading="lazy"
								/>
							) : (
								getSuggestionIcon(suggestion.type)
							)}
							<div className="flex-1">
								<span className="text-ds-primary-charcoal">
									{suggestion.text}
								</span>
								{suggestion.count && (
									<span className="text-xs text-ds-neutral-mediumGray ml-2">
										({suggestion.count} results)
									</span>
								)}
							</div>
							<span className="text-xs text-ds-neutral-mediumGray capitalize">
								{suggestion.type}
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};
