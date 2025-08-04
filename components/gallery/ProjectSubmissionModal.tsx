"use client";

import React, { useState } from "react";
import {
	X,
	Upload,
	Image,
	Palette,
	Tag,
	CheckCircle,
	AlertCircle,
	Loader2,
} from "lucide-react";
import { useGalleryStore } from "@/store/gallery-store";
import { ProjectSubmissionFormData } from "@/types/gallery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockSubmitProject } from "@/lib/api";
import { cn } from "@/lib/utils";

// Zod schema for form validation
const projectSubmissionSchema = z.object({
	title: z
		.string()
		.min(5, "Title must be at least 5 characters")
		.max(100, "Title cannot exceed 100 characters"),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters")
		.max(500, "Description cannot exceed 500 characters"),
	beforeImageFile: z.instanceof(File).optional(),
	afterImageFile: z.instanceof(File, { message: "After image is required" }),
	colorPalette: z
		.array(
			z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex code")
		)
		.optional(),
	paintProductsUsed: z
		.array(
			z.object({
				productId: z.string().min(1, "Product ID is required"),
				colorId: z.string().min(1, "Color ID is required"),
			})
		)
		.optional(),
	tags: z.array(z.string().min(1, "Tag cannot be empty")).optional(),
});

export const ProjectSubmissionModal: React.FC = () => {
	const { isSubmissionModalOpen, closeSubmissionModal } = useGalleryStore();
	const queryClient = useQueryClient();

	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	const [beforeImagePreview, setBeforeImagePreview] = useState<string | null>(
		null
	);
	const [afterImagePreview, setAfterImagePreview] = useState<string | null>(
		null
	);
	const [currentTags, setCurrentTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<ProjectSubmissionFormData>({
		resolver: zodResolver(projectSubmissionSchema),
	});

	const submitProjectMutation = useMutation({
		mutationFn: mockSubmitProject,
		onSuccess: () => {
			setSubmissionSuccess(true);
			setSubmissionError(null);
			queryClient.invalidateQueries({ queryKey: ["galleryProjects"] }); // Refetch gallery projects
			reset(); // Reset form fields
			setBeforeImagePreview(null);
			setAfterImagePreview(null);
			setCurrentTags([]);
			setTimeout(() => {
				setSubmissionSuccess(false);
				closeSubmissionModal();
			}, 3000);
		},
		onError: (error: Error) => {
			setSubmissionError(
				error.message || "Failed to submit project. Please try again."
			);
			setSubmissionSuccess(false);
		},
	});

	const onSubmit = async (data: ProjectSubmissionFormData) => {
		setSubmissionError(null);
		submitProjectMutation.mutate(data);
	};

	const handleBeforeImageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			setBeforeImagePreview(URL.createObjectURL(file));
			setValue("beforeImageFile", file);
		} else {
			setBeforeImagePreview(null);
			setValue("beforeImageFile", undefined);
		}
	};

	const handleAfterImageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			setAfterImagePreview(URL.createObjectURL(file));
			setValue("afterImageFile", file);
		} else {
			setAfterImagePreview(null);
			setValue("afterImageFile", undefined);
		}
	};

	const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && tagInput.trim() !== "") {
			e.preventDefault();
			const newTags = [...currentTags, tagInput.trim()];
			setCurrentTags(newTags);
			setValue("tags", newTags);
			setTagInput("");
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		const newTags = currentTags.filter((tag) => tag !== tagToRemove);
		setCurrentTags(newTags);
		setValue("tags", newTags);
	};

	if (!isSubmissionModalOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="submission-modal-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
					<h2
						id="submission-modal-title"
						className="text-xl font-bold text-ds-primary-charcoal"
					>
						Submit Your Project
					</h2>
					<button
						onClick={closeSubmissionModal}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close submission modal"
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
								Project submitted successfully! It will be reviewed shortly.
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
						<label
							htmlFor="title"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Project Title *
						</label>
						<input
							type="text"
							id="title"
							{...register("title")}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-invalid={errors.title ? "true" : "false"}
							aria-describedby={errors.title ? "title-error" : undefined}
						/>
						{errors.title && (
							<p id="title-error" className="text-red-500 text-xs mt-2">
								{errors.title.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Project Description *
						</label>
						<textarea
							id="description"
							{...register("description")}
							rows={4}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-invalid={errors.description ? "true" : "false"}
							aria-describedby={
								errors.description ? "description-error" : undefined
							}
						/>
						{errors.description && (
							<p id="description-error" className="text-red-500 text-xs mt-2">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<label
								htmlFor="beforeImage"
								className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
							>
								Before Image (Optional)
							</label>
							<div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-ds-neutral-lightGray rounded-lg cursor-pointer hover:border-ds-primary-sage transition-colors duration-200 relative">
								<input
									type="file"
									id="beforeImage"
									accept="image/*"
									onChange={handleBeforeImageChange}
									className="hidden"
									aria-label="Upload before image"
								/>
								{beforeImagePreview ? (
									<img
										src={beforeImagePreview}
										alt="Before Preview"
										className="w-full h-full object-cover rounded-lg"
									/>
								) : (
									<div className="text-center">
										<Upload className="w-8 h-8 text-ds-neutral-mediumGray mx-auto" />
										<p className="text-xs text-ds-neutral-mediumGray mt-2">
											Click to upload
										</p>
									</div>
								)}
							</div>
							{errors.beforeImageFile && (
								<p className="text-red-500 text-xs mt-2">
									{errors.beforeImageFile.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="afterImage"
								className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
							>
								After Image *
							</label>
							<div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-ds-neutral-lightGray rounded-lg cursor-pointer hover:border-ds-primary-sage transition-colors duration-200 relative">
								<input
									type="file"
									id="afterImage"
									accept="image/*"
									onChange={handleAfterImageChange}
									className="hidden"
									aria-label="Upload after image"
								/>
								{afterImagePreview ? (
									<img
										src={afterImagePreview}
										alt="After Preview"
										className="w-full h-full object-cover rounded-lg"
									/>
								) : (
									<div className="text-center">
										<Upload className="w-8 h-8 text-ds-neutral-mediumGray mx-auto" />
										<p className="text-xs text-ds-neutral-mediumGray mt-2">
											Click to upload
										</p>
									</div>
								)}
							</div>
							{errors.afterImageFile && (
								<p className="text-red-500 text-xs mt-2">
									{errors.afterImageFile.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="tags"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
						>
							Tags (e.g., living-room, modern, DIY)
						</label>
						<input
							type="text"
							id="tags"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							onKeyDown={handleAddTag}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							placeholder="Type a tag and press Enter"
							aria-label="Add tags to your project"
						/>
						<div className="mt-2 flex flex-wrap gap-2">
							{currentTags.map((tag, index) => (
								<span
									key={index}
									className="flex items-center bg-ds-neutral-lightGray/50 text-ds-neutral-darkSlate text-xs px-2 py-2 rounded-full"
								>
									{tag}
									<button
										type="button"
										onClick={() => handleRemoveTag(tag)}
										className="ml-2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
										aria-label={`Remove tag ${tag}`}
									>
										<X className="w-3 h-3" />
									</button>
								</span>
							))}
						</div>
						{errors.tags && (
							<p className="text-red-500 text-xs mt-2">{errors.tags.message}</p>
						)}
					</div>

					{/* Placeholder for Color Palette and Products Used */}
					<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4 text-sm text-ds-neutral-darkSlate">
						<p className="font-semibold mb-2 flex items-center space-x-2">
							<Palette className="w-4 h-4" />
							<span>Advanced Details (Optional)</span>
						</p>
						<p>
							Fields for color palette and specific paint products used would be
							implemented here.
						</p>
					</div>

					<div className="flex justify-end mt-8">
						<button
							type="submit"
							disabled={submitProjectMutation.isPending}
							className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
							aria-label="Submit project"
						>
							{submitProjectMutation.isPending ? (
								<Loader2 className="w-5 h-5 animate-spin" />
							) : (
								<CheckCircle className="w-5 h-5" />
							)}
							<span>
								{submitProjectMutation.isPending
									? "Submitting..."
									: "Submit Project"}
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
