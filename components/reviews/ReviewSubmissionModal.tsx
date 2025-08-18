"use client";

import React, { useState } from "react";
import {
	X,
	Star,
	Upload,
	Image as IconImage,
	CheckCircle,
	AlertCircle,
	Loader2,
} from "lucide-react";
import { useReviewsStore } from "@/store/reviews-store";
import { ReviewSubmissionFormData } from "@/types/reviews";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockSubmitReview } from "@/lib/api";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Zod schema for form validation
const reviewSubmissionSchema = z.object({
	productId: z.string().optional(),
	userName: z.string().min(1, "Name is required"),
	userEmail: z.string().email("Valid email is required"),
	rating: z
		.number()
		.min(1, "Rating is required")
		.max(5, "Rating must be between 1 and 5"),
	comment: z
		.string()
		.min(10, "Comment must be at least 10 characters")
		.max(500, "Comment cannot exceed 500 characters"),
	photos: z
		.array(z.instanceof(File))
		.max(3, "You can upload a maximum of 3 photos")
		.optional(),
});

export const ReviewSubmissionModal: React.FC = () => {
	const { isReviewModalOpen, closeReviewModal } = useReviewsStore();
	const queryClient = useQueryClient();

	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<ReviewSubmissionFormData>({
		resolver: zodResolver(reviewSubmissionSchema),
		defaultValues: {
			rating: 0,
			photos: [],
		},
	});

	const submitReviewMutation = useMutation({
		mutationFn: mockSubmitReview,
		onSuccess: () => {
			setSubmissionSuccess(true);
			setSubmissionError(null);
			queryClient.invalidateQueries({ queryKey: ["customerReviews"] }); // Refetch reviews
			reset(); // Reset form fields
			setPhotoPreviews([]);
			setTimeout(() => {
				setSubmissionSuccess(false);
				closeReviewModal();
			}, 3000);
		},
		onError: (error: Error) => {
			setSubmissionError(
				error.message || "Failed to submit review. Please try again."
			);
			setSubmissionSuccess(false);
		},
	});

	const onSubmit = async (data: ReviewSubmissionFormData) => {
		setSubmissionError(null);
		submitReviewMutation.mutate(data);
	};

	const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		if (files.length > 3) {
			alert("You can only upload a maximum of 3 photos.");
			return;
		}
		setValue("photos", files);
		setPhotoPreviews(files.map((file) => URL.createObjectURL(file)));
	};

	const handleRemovePhoto = (index: number) => {
		const currentPhotos = watch("photos") || [];
		const newPhotos = currentPhotos.filter((_, i) => i !== index);
		setValue("photos", newPhotos);
		setPhotoPreviews(newPhotos.map((file) => URL.createObjectURL(file)));
	};

	const currentRating = watch("rating");

	if (!isReviewModalOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="review-modal-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
					<h2
						id="review-modal-title"
						className="text-xl font-bold text-ds-primary-charcoal"
					>
						Write a Review
					</h2>
					<button
						onClick={closeReviewModal}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close review submission modal"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
					{submissionSuccess && (
						<div
							className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center space-x-4"
							role="alert"
						>
							<CheckCircle className="w-5 h-5" />
							<p className="text-sm">
								Review submitted successfully! Thank you for your feedback.
							</p>
						</div>
					)}
					{submissionError && (
						<div
							className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4"
							role="alert"
						>
							<AlertCircle className="w-5 h-5" />
							<p className="text-sm">{submissionError}</p>
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
							Your Rating *
						</label>
						<div className="flex items-center space-x-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									onClick={() =>
										setValue("rating", star, { shouldValidate: true })
									}
									className={cn(
										"w-8 h-8 cursor-pointer transition-colors duration-200",
										star <= currentRating
											? "text-yellow-400 fill-current"
											: "text-ds-neutral-lightGray hover:text-yellow-300"
									)}
									aria-label={`${star} star rating`}
								/>
							))}
						</div>
						{errors.rating && (
							<p className="text-red-500 text-xs mt-2">
								{errors.rating.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="userName"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Your Name *
						</label>
						<input
							type="text"
							id="userName"
							{...register("userName")}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-invalid={errors.userName ? "true" : "false"}
							aria-describedby={errors.userName ? "userName-error" : undefined}
						/>
						{errors.userName && (
							<p id="userName-error" className="text-red-500 text-xs mt-2">
								{errors.userName.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="userEmail"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Your Email *
						</label>
						<input
							type="email"
							id="userEmail"
							{...register("userEmail")}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-invalid={errors.userEmail ? "true" : "false"}
							aria-describedby={
								errors.userEmail ? "userEmail-error" : undefined
							}
						/>
						{errors.userEmail && (
							<p id="userEmail-error" className="text-red-500 text-xs mt-2">
								{errors.userEmail.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="comment"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Your Review *
						</label>
						<textarea
							id="comment"
							{...register("comment")}
							rows={5}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-invalid={errors.comment ? "true" : "false"}
							aria-describedby={errors.comment ? "comment-error" : undefined}
						/>
						{errors.comment && (
							<p id="comment-error" className="text-red-500 text-xs mt-2">
								{errors.comment.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="photos"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Add Photos (Max 3)
						</label>
						<div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-ds-neutral-lightGray rounded-lg cursor-pointer hover:border-ds-primary-sage transition-colors duration-200 relative">
							<input
								type="file"
								id="photos"
								accept="image/*"
								multiple
								onChange={handlePhotoChange}
								className="hidden"
								aria-label="Upload review photos"
							/>
							<div className="text-center">
								<Upload className="w-6 h-6 text-ds-neutral-mediumGray mx-auto" />
								<p className="text-xs text-ds-neutral-mediumGray mt-2">
									Click to upload
								</p>
							</div>
						</div>
						{photoPreviews.length > 0 && (
							<div className="mt-2 flex flex-wrap gap-2">
								{photoPreviews.map((src, index) => (
									<div key={index} className="relative">
										<Image
											src={src}
											alt={`Preview ${index + 1}`}
											className="w-20 h-20 object-cover rounded-lg border border-ds-neutral-lightGray"
										/>
										<button
											type="button"
											onClick={() => handleRemovePhoto(index)}
											className="absolute -top-2 -right-2 bg-red-500 text-ds-neutral-white rounded-full p-2"
											aria-label={`Remove photo ${index + 1}`}
										>
											<X className="w-3 h-3" />
										</button>
									</div>
								))}
							</div>
						)}
						{errors.photos && (
							<p className="text-red-500 text-xs mt-2">
								{errors.photos.message}
							</p>
						)}
					</div>

					<div className="flex justify-end mt-8">
						<button
							type="submit"
							disabled={submitReviewMutation.isPending}
							className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
							aria-label="Submit review"
						>
							{submitReviewMutation.isPending ? (
								<Loader2 className="w-5 h-5 animate-spin" />
							) : (
								<CheckCircle className="w-5 h-5" />
							)}
							<span>
								{submitReviewMutation.isPending
									? "Submitting..."
									: "Submit Review"}
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
