"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mockFetchContests, mockSubmitContestEntry } from "@/lib/api";
import { Contest, ContestSubmissionFormData } from "@/types/gallery";
import {
	Trophy,
	Calendar,
	Gift,
	FileText,
	Upload,
	CheckCircle,
	AlertCircle,
	Loader2,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isPast, isFuture, isToday } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema for contest submission form
const contestSubmissionSchema = z.object({
	contestId: z.string().min(1, "Contest ID is required"),
	projectName: z.string().min(5, "Project name must be at least 5 characters"),
	description: z.string().min(20, "Description must be at least 20 characters"),
	imageFile: z.instanceof(File, { message: "Project image is required" }),
	consentToRules: z
		.boolean()
		.refine((val) => val === true, "You must agree to the contest rules"),
});

export const ContestSection: React.FC = () => {
	const {
		data: contests,
		isLoading,
		isError,
		error,
	} = useQuery<Contest[], Error>({
		queryKey: ["contests"],
		queryFn: mockFetchContests,
	});

	const [showSubmissionModal, setShowSubmissionModal] = useState(false);
	const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<ContestSubmissionFormData>({
		resolver: zodResolver(contestSubmissionSchema),
	});

	const submitContestEntryMutation = useMutation({
		mutationFn: mockSubmitContestEntry,
		onSuccess: () => {
			alert("Contest entry submitted successfully!");
			setShowSubmissionModal(false);
			reset();
			setImagePreview(null);
		},
		onError: (err: Error) => {
			alert(`Submission failed: ${err.message}`);
		},
	});

	const openSubmissionForm = (contest: Contest) => {
		setSelectedContest(contest);
		setValue("contestId", contest.id);
		setShowSubmissionModal(true);
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImagePreview(URL.createObjectURL(file));
			setValue("imageFile", file);
		} else {
			setImagePreview(null);
			setValue("imageFile", undefined);
		}
	};

	const onSubmit = async (data: ContestSubmissionFormData) => {
		submitContestEntryMutation.mutate(data);
	};

	if (isLoading) {
		return (
			<div className="space-y-8">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal text-center">
					Paint Contests & Challenges
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
					{[...Array(2)].map((_, i) => (
						<div
							key={i}
							className="bg-ds-neutral-lightGray/20 rounded-lg h-64"
						/>
					))}
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg">
				<p className="mb-4">Error loading contests: {error?.message}</p>
				<button
					onClick={() => window.location.reload()}
					className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
				>
					Try Again
				</button>
			</div>
		);
	}

	const activeContests = contests?.filter((c) => c.status === "active");
	const upcomingContests = contests?.filter((c) => c.status === "upcoming");
	const pastContests = contests?.filter((c) => c.status === "past");

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal text-center">
				Paint Contests & Challenges
			</h2>
			<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto">
				Unleash your creativity and win amazing prizes! Participate in our
				painting contests and get your project recognized.
			</p>

			{activeContests && activeContests.length > 0 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold text-ds-primary-charcoal flex items-center space-x-2">
						<Trophy className="w-6 h-6 text-ds-primary-sage" />
						<span>Active Contests</span>
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{activeContests.map((contest) => (
							<div
								key={contest.id}
								className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden"
							>
								<div className="relative h-48 overflow-hidden">
									<img
										src={contest.imageUrl}
										alt={contest.name}
										className="w-full h-full object-cover"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-black/30 flex items-center justify-center text-ds-neutral-white text-lg font-bold">
										LIVE NOW!
									</div>
								</div>
								<div className="p-4">
									<h4 className="font-bold text-ds-primary-charcoal mb-2">
										{contest.name}
									</h4>
									<p className="text-sm text-ds-neutral-mediumGray mb-4 line-clamp-2">
										{contest.description}
									</p>
									<div className="flex items-center space-x-4 text-sm text-ds-neutral-mediumGray mb-2">
										<Calendar className="w-4 h-4" />
										<span>
											Ends: {format(new Date(contest.endDate), "MMM dd, yyyy")}
										</span>
									</div>
									<div className="flex items-center space-x-4 text-sm text-ds-neutral-mediumGray mb-4">
										<Gift className="w-4 h-4" />
										<span>Prizes: {contest.prizes.join(", ")}</span>
									</div>
									<button
										onClick={() => openSubmissionForm(contest)}
										className="w-full py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-semibold"
										aria-label={`Enter ${contest.name} contest`}
									>
										Enter Contest
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{upcomingContests && upcomingContests.length > 0 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold text-ds-primary-charcoal flex items-center space-x-2">
						<Calendar className="w-6 h-6 text-ds-accent-warmBeige" />
						<span>Upcoming Contests</span>
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{upcomingContests.map((contest) => (
							<div
								key={contest.id}
								className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden"
							>
								<div className="relative h-48 overflow-hidden">
									<img
										src={contest.imageUrl}
										alt={contest.name}
										className="w-full h-full object-cover"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-black/30 flex items-center justify-center text-ds-neutral-white text-lg font-bold">
										Starts: {format(new Date(contest.startDate), "MMM dd")}
									</div>
								</div>
								<div className="p-4">
									<h4 className="font-bold text-ds-primary-charcoal mb-2">
										{contest.name}
									</h4>
									<p className="text-sm text-ds-neutral-mediumGray mb-4 line-clamp-2">
										{contest.description}
									</p>
									<div className="flex items-center space-x-4 text-sm text-ds-neutral-mediumGray mb-2">
										<Calendar className="w-4 h-4" />
										<span>Theme: {contest.theme}</span>
									</div>
									<div className="flex items-center space-x-4 text-sm text-ds-neutral-mediumGray mb-4">
										<Gift className="w-4 h-4" />
										<span>Prizes: {contest.prizes.join(", ")}</span>
									</div>
									<a
										href={contest.rulesUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="w-full py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
										aria-label={`View rules for ${contest.name} contest`}
									>
										<FileText className="w-4 h-4" />
										<span>View Rules</span>
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Contest Submission Modal */}
			{showSubmissionModal && selectedContest && (
				<div
					className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
					aria-labelledby="contest-submission-title"
				>
					<div className="bg-ds-neutral-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
						{/* Header */}
						<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
							<h2
								id="contest-submission-title"
								className="text-xl font-bold text-ds-primary-charcoal"
							>
								Submit to: {selectedContest.name}
							</h2>
							<button
								onClick={() => setShowSubmissionModal(false)}
								className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
								aria-label="Close contest submission form"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
							{submitContestEntryMutation.isSuccess && (
								<div
									className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center space-x-4"
									role="alert"
								>
									<CheckCircle className="w-5 h-5" />
									<p className="text-sm">{submitContestEntryMutation.data}</p>
								</div>
							)}
							{submitContestEntryMutation.isError && (
								<div
									className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4"
									role="alert"
								>
									<AlertCircle className="w-5 h-5" />
									<p className="text-sm">
										{submitContestEntryMutation.error?.message ||
											"An error occurred."}
									</p>
								</div>
							)}

							<input type="hidden" {...register("contestId")} />

							<div>
								<label
									htmlFor="projectName"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Your Project Name *
								</label>
								<input
									type="text"
									id="projectName"
									{...register("projectName")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.projectName ? "true" : "false"}
									aria-describedby={
										errors.projectName ? "projectName-error" : undefined
									}
								/>
								{errors.projectName && (
									<p
										id="projectName-error"
										className="text-red-500 text-xs mt-2"
									>
										{errors.projectName.message}
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
									<p
										id="description-error"
										className="text-red-500 text-xs mt-2"
									>
										{errors.description.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="imageFile"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Project Image *
								</label>
								<div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-ds-neutral-lightGray rounded-lg cursor-pointer hover:border-ds-primary-sage transition-colors duration-200 relative">
									<input
										type="file"
										id="imageFile"
										accept="image/*"
										onChange={handleImageChange}
										className="hidden"
										aria-label="Upload project image"
									/>
									{imagePreview ? (
										<img
											src={imagePreview}
											alt="Project Preview"
											className="w-full h-full object-cover rounded-lg"
										/>
									) : (
										<div className="text-center">
											<Upload className="w-12 h-12 text-ds-neutral-mediumGray mx-auto" />
											<p className="text-sm text-ds-neutral-mediumGray mt-2">
												Click to upload your project photo
											</p>
										</div>
									)}
								</div>
								{errors.imageFile && (
									<p className="text-red-500 text-xs mt-2">
										{errors.imageFile.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="consentToRules"
									className="flex items-start space-x-2 cursor-pointer"
								>
									<input
										type="checkbox"
										id="consentToRules"
										{...register("consentToRules")}
										className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-2 focus:ring-ds-primary-sage"
										aria-invalid={errors.consentToRules ? "true" : "false"}
									/>
									<span className="text-sm text-ds-neutral-darkSlate">
										I agree to the{" "}
										<a
											href={selectedContest.rulesUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-ds-primary-sage hover:underline"
										>
											official contest rules
										</a>
										.
									</span>
								</label>
								{errors.consentToRules && (
									<p className="text-red-500 text-xs mt-2">
										{errors.consentToRules.message}
									</p>
								)}
							</div>

							<div className="flex justify-end mt-8">
								<button
									type="submit"
									disabled={submitContestEntryMutation.isPending}
									className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
									aria-label="Submit contest entry"
								>
									{submitContestEntryMutation.isPending ? (
										<Loader2 className="w-5 h-5 animate-spin" />
									) : (
										<CheckCircle className="w-5 h-5" />
									)}
									<span>
										{submitContestEntryMutation.isPending
											? "Submitting..."
											: "Submit Entry"}
									</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
