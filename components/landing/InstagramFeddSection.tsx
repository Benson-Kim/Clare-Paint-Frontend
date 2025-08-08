"use client";

import React, { useState } from "react";
import {
	Instagram,
	Heart,
	MessageCircle,
	ExternalLink,
	ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface InstagramPost {
	id: string;
	imageUrl: string;
	caption: string;
	likes: number;
	comments: number;
	postUrl: string;
	hashtags: string[];
}

export const InstagramFeedSection: React.FC = () => {
	const [hoveredPost, setHoveredPost] = useState<string | null>(null);

	// Mock Instagram posts - in production, this would come from Instagram API
	const instagramPosts: InstagramPost[] = [
		{
			id: "1",
			imageUrl:
				"https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption:
				"Sage Whisper bringing tranquility to this beautiful bedroom transformation ✨",
			likes: 1247,
			comments: 89,
			postUrl: "https://instagram.com/p/example1",
			hashtags: ["#SageWhisper", "#BedroomGoals", "#ClarePaint"],
		},
		{
			id: "2",
			imageUrl:
				"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "When Warm Cream meets natural light magic happens 🌟",
			likes: 892,
			comments: 56,
			postUrl: "https://instagram.com/p/example2",
			hashtags: ["#WarmCream", "#NaturalLight", "#HomeDesign"],
		},
		{
			id: "3",
			imageUrl:
				"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "Charcoal Depth creating the perfect accent wall drama 🖤",
			likes: 1456,
			comments: 123,
			postUrl: "https://instagram.com/p/example3",
			hashtags: ["#CharcoalDepth", "#AccentWall", "#DramaticDesign"],
		},
		{
			id: "4",
			imageUrl:
				"https://images.pexels.com/photos/6782367/pexels-photo-6782367.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption:
				"Behind the scenes: Our color lab where innovation meets artistry 🎨",
			likes: 734,
			comments: 67,
			postUrl: "https://instagram.com/p/example4",
			hashtags: ["#BehindTheScenes", "#ColorLab", "#Innovation"],
		},
		{
			id: "5",
			imageUrl:
				"https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "Warm Beige creating the coziest reading nook 📚",
			likes: 1089,
			comments: 78,
			postUrl: "https://instagram.com/p/example5",
			hashtags: ["#WarmBeige", "#ReadingNook", "#CozySpaces"],
		},
		{
			id: "6",
			imageUrl:
				"https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption:
				"Kitchen transformation with our premium whites - timeless elegance ✨",
			likes: 1623,
			comments: 145,
			postUrl: "https://instagram.com/p/example6",
			hashtags: ["#KitchenDesign", "#TimelessWhite", "#Elegance"],
		},
	];

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-[1200px] mx-auto px-8">
				<div className="text-center mb-16">
					<div className="flex items-center justify-center space-x-3 mb-4">
						<Instagram className="w-8 h-8 text-pink-500" />
						<h2
							className="font-semibold text-ds-primary-charcoal"
							style={{ fontSize: "36px", fontFamily: "Inter, sans-serif" }}
						>
							#ClarePaintInspiration
						</h2>
					</div>
					<p
						className="text-ds-neutral-mediumGray max-w-3xl mx-auto"
						style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
					>
						See how our community is using Clare Paint to create beautiful
						spaces. Follow us for daily inspiration and share your own
						transformations.
					</p>
				</div>

				{/* Instagram Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{instagramPosts.map((post) => (
						<div
							key={post.id}
							className="group relative bg-ds-neutral-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
							onMouseEnter={() => setHoveredPost(post.id)}
							onMouseLeave={() => setHoveredPost(null)}
						>
							{/* Post Image */}
							<div className="relative aspect-square overflow-hidden">
								<Image
									src={post.imageUrl}
									alt={post.caption}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-700"
									loading="lazy"
								/>

								{/* Overlay */}
								<div
									className={cn(
										"absolute inset-0 bg-black/0 transition-all duration-300",
										hoveredPost === post.id && "bg-black/40"
									)}
								>
									{/* Engagement Stats */}
									<div
										className={cn(
											"absolute top-4 left-4 right-4 flex justify-between items-start transition-all duration-300",
											hoveredPost === post.id
												? "opacity-100 translate-y-0"
												: "opacity-0 -translate-y-2"
										)}
									>
										<div className="bg-ds-neutral-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
											<div className="flex items-center space-x-4 text-sm">
												<div className="flex items-center space-x-1">
													<Heart className="w-4 h-4 text-red-500" />
													<span className="font-medium">
														{post.likes.toLocaleString()}
													</span>
												</div>
												<div className="flex items-center space-x-1">
													<MessageCircle className="w-4 h-4 text-ds-primary-sage" />
													<span className="font-medium">{post.comments}</span>
												</div>
											</div>
										</div>
										<a
											href={post.postUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 bg-ds-neutral-white/90 backdrop-blur-sm rounded-full hover:bg-ds-neutral-white transition-colors duration-200"
											aria-label="View post on Instagram"
										>
											<ExternalLink className="w-4 h-4 text-ds-primary-charcoal" />
										</a>
									</div>

									{/* Caption */}
									<div
										className={cn(
											"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all duration-300",
											hoveredPost === post.id
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-4"
										)}
									>
										<p className="text-ds-neutral-white text-sm leading-relaxed mb-3">
											{post.caption}
										</p>
										<div className="flex flex-wrap gap-1">
											{post.hashtags.map((hashtag, index) => (
												<span
													key={index}
													className="text-xs text-ds-accent-warmBeige font-medium"
												>
													{hashtag}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* Instagram Icon */}
								<div className="absolute top-4 right-4 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center opacity-80">
									<Instagram className="w-4 h-4 text-white" />
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Follow CTA */}
				<div className="text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-8">
					<div className="space-y-4">
						<Instagram className="w-12 h-12 mx-auto" />
						<h3 className="text-2xl font-bold">
							Follow @ClarePaint for Daily Inspiration
						</h3>
						<p className="text-white/90 max-w-2xl mx-auto">
							Join our community of 50,000+ paint enthusiasts. Get daily color
							inspiration, behind-the-scenes content, and be the first to see
							new collections.
						</p>
						<div className="flex items-center justify-center space-x-6 text-sm">
							<div className="text-center">
								<div className="text-2xl font-bold">50K+</div>
								<div className="text-white/80">Followers</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold">1M+</div>
								<div className="text-white/80">Monthly Views</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold">25K+</div>
								<div className="text-white/80">Projects Shared</div>
							</div>
						</div>
						<a
							href="https://instagram.com/clarepaint"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-pink-600 rounded-lg hover:bg-white/90 transition-all duration-300 font-semibold text-lg group hover:scale-105"
						>
							<Instagram className="w-5 h-5" />
							<span>Follow Us</span>
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
