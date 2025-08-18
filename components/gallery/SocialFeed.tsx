"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchSocialMediaFeed } from "@/lib/api";
import { SocialMediaPost } from "@/types/gallery";
import { Heart, MessageCircle, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import {
	SiInstagram,
	SiFacebook,
	SiPinterest,
} from "@icons-pack/react-simple-icons";

export const SocialFeed: React.FC = () => {
	const {
		data: posts,
		isLoading,
		isError,
		error,
	} = useQuery<SocialMediaPost[], Error>({
		queryKey: ["socialMediaFeed"],
		queryFn: mockFetchSocialMediaFeed,
	});

	const getPlatformIcon = (platform: SocialMediaPost["platform"]) => {
		switch (platform) {
			case "instagram":
				return <SiInstagram className="w-5 h-5 text-pink-500" />;
			case "facebook":
				return <SiFacebook className="w-5 h-5 text-blue-600" />;
			case "pinterest":
				return <SiPinterest className="w-5 h-5 text-red-600" />;
			default:
				return null;
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-8">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal text-center">
					#PaintInspiration on Social Media
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="bg-ds-neutral-lightGray/20 rounded-lg h-80"
						/>
					))}
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg">
				<p className="mb-4">
					Error loading social media feed: {error?.message}
				</p>
				<button
					onClick={() => window.location.reload()}
					className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
				>
					Try Again
				</button>
			</div>
		);
	}

	if (!posts || posts.length === 0) {
		return (
			<div className="text-center p-8 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
				<p className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					No social media posts to display.
				</p>
				<p className="text-ds-neutral-mediumGray">
					Follow us on social media for daily inspiration!
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal text-center">
				#PaintInspiration on Social Media
			</h2>
			<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto">
				See what our community is sharing on Instagram, Facebook, and Pinterest.
				Get daily doses of color and design ideas!
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{posts.map((post) => (
					<div
						key={post.id}
						className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden"
					>
						<div className="relative aspect-square overflow-hidden">
							<Image
								src={post.imageUrl}
								alt={post.caption}
								className="w-full h-full object-cover"
								loading="lazy"
							/>
							<div className="absolute top-4 left-4 p-2 bg-ds-neutral-white/80 rounded-full">
								{getPlatformIcon(post.platform)}
							</div>
						</div>
						<div className="p-4">
							<div className="flex items-center space-x-2 mb-2">
								<a
									href={post.profileUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold text-ds-primary-charcoal hover:text-ds-primary-sage transition-colors duration-200"
								>
									@{post.username}
								</a>
								<span className="text-xs text-ds-neutral-mediumGray">
									•{" "}
									{formatDistanceToNow(new Date(post.timestamp), {
										addSuffix: true,
									})}
								</span>
							</div>
							<p className="text-sm text-ds-neutral-darkSlate mb-4 line-clamp-3">
								{post.caption}
							</p>
							<div className="flex items-center justify-between text-sm text-ds-neutral-mediumGray">
								<div className="flex items-center space-x-2">
									<Heart className="w-4 h-4 text-red-500" />
									<span>{post.likes}</span>
								</div>
								<div className="flex items-center space-x-2">
									<MessageCircle className="w-4 h-4" />
									<span>{post.comments}</span>
								</div>
								<a
									href={post.postUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
									aria-label={`View post on ${post.platform}`}
								>
									<span>View Post</span>
									<ExternalLink className="w-4 h-4" />
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
