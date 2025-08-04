"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
	X,
	Calendar,
	User,
	Info,
	CheckCircle,
	ArrowLeft,
	ArrowRight,
	Loader2,
	MapPin,
	Briefcase,
	Mail,
	Phone,
} from "lucide-react";
import { useConsultationStore } from "@/store/consultation-store";
import { ConsultationSlot, BookingFormData } from "@/types/consultation";
import { mockFetchAvailableSlots, mockBookConsultation } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
	format,
	addMonths,
	subMonths,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	isSameDay,
	isToday,
	isPast,
} from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema for form validation
const bookingSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Valid email is required"),
	phone: z.string().min(10, "Valid phone number is required (min 10 digits)"),
	address: z.string().optional(), // Only required for in-home
	projectBrief: z
		.string()
		.min(
			20,
			"Please provide a brief description of your project (min 20 characters)"
		),
	designerId: z.string().optional(), // For designer collaboration
});

export const BookingModal: React.FC = () => {
	const { isBookingModalOpen, selectedPackage, closeBookingModal } =
		useConsultationStore();
	const queryClient = useQueryClient();

	const [currentStep, setCurrentStep] = useState(1);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [availableSlots, setAvailableSlots] = useState<ConsultationSlot[]>([]);
	const [slotsLoading, setSlotsLoading] = useState(false);
	const [slotsError, setSlotsError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			address: "",
			projectBrief: "",
			designerId: "",
		},
	});

	const serviceType = selectedPackage?.type;
	const address = watch("address");

	// Fetch available slots for the selected date
	useEffect(() => {
		if (selectedDate) {
			setSlotsLoading(true);
			setSlotsError(null);
			const formattedDate = format(selectedDate, "yyyy-MM-dd");
			mockFetchAvailableSlots(formattedDate)
				.then((data) => {
					setAvailableSlots(data.filter((slot) => slot.isAvailable));
				})
				.catch((err) => {
					setSlotsError("Failed to load slots. Please try again.");
					console.error(err);
				})
				.finally(() => {
					setSlotsLoading(false);
				});
		} else {
			setAvailableSlots([]);
		}
	}, [selectedDate]);

	// Reset form and state when modal opens/closes
	useEffect(() => {
		if (isBookingModalOpen) {
			setCurrentStep(1);
			setCurrentMonth(new Date());
			setSelectedDate(null);
			setSelectedTime(null);
			setAvailableSlots([]);
			setSlotsError(null);
			reset();
		}
	}, [isBookingModalOpen, reset]);

	const bookConsultationMutation = useMutation({
		mutationFn: mockBookConsultation,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["consultationSlots"] });
			setCurrentStep(3); // Move to confirmation step
		},
		onError: (error: Error) => {
			setSlotsError(
				error.message || "An unexpected error occurred during booking."
			);
		},
	});

	const daysInMonth = useMemo(() => {
		const start = startOfMonth(currentMonth);
		const end = endOfMonth(currentMonth);
		return eachDayOfInterval({ start, end });
	}, [currentMonth]);

	const firstDayOfMonth = daysInMonth[0].getDay(); // 0 for Sunday, 1 for Monday...

	const handleDateSelect = (date: Date) => {
		if (isPast(date) && !isToday(date)) return; // Prevent selecting past dates
		setSelectedDate(date);
		setSelectedTime(null); // Reset time when date changes
	};

	const handleTimeSelect = (time: string) => {
		setSelectedTime(time);
	};

	const handleNextMonth = () => {
		setCurrentMonth(addMonths(currentMonth, 1));
		setSelectedDate(null);
	};

	const handlePrevMonth = () => {
		setCurrentMonth(subMonths(currentMonth, 1));
		setSelectedDate(null);
	};

	const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
		if (!selectedPackage || !selectedDate || !selectedTime) {
			setSlotsError("Please select a package, date, and time.");
			return;
		}

		const bookingData: BookingFormData = {
			packageId: selectedPackage.id,
			serviceType: selectedPackage.type,
			date: format(selectedDate, "yyyy-MM-dd"),
			time: selectedTime,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			address: data.address,
			projectBrief: data.projectBrief,
			designerId: data.designerId,
		};

		bookConsultationMutation.mutate(bookingData);
	};

	if (!isBookingModalOpen || !selectedPackage) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="booking-modal-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
					<h2
						id="booking-modal-title"
						className="text-xl font-bold text-ds-primary-charcoal"
					>
						Book Your {selectedPackage.name}
					</h2>
					<button
						onClick={closeBookingModal}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close booking modal"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Steps Indicator */}
				<div className="flex justify-between items-center px-8 pt-8">
					<div className="flex flex-col items-center">
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
								currentStep >= 1
									? "bg-ds-primary-sage text-ds-neutral-white"
									: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray"
							)}
						>
							1
						</div>
						<span className="text-xs text-ds-neutral-mediumGray mt-2">
							Date & Time
						</span>
					</div>
					<div
						className={cn(
							"flex-1 h-0.5 mx-4",
							currentStep >= 2
								? "bg-ds-primary-sage"
								: "bg-ds-neutral-lightGray"
						)}
					/>
					<div className="flex flex-col items-center">
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
								currentStep >= 2
									? "bg-ds-primary-sage text-ds-neutral-white"
									: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray"
							)}
						>
							2
						</div>
						<span className="text-xs text-ds-neutral-mediumGray mt-2">
							Your Details
						</span>
					</div>
					<div
						className={cn(
							"flex-1 h-0.5 mx-4",
							currentStep >= 3
								? "bg-ds-primary-sage"
								: "bg-ds-neutral-lightGray"
						)}
					/>
					<div className="flex flex-col items-center">
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
								currentStep >= 3
									? "bg-ds-primary-sage text-ds-neutral-white"
									: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray"
							)}
						>
							3
						</div>
						<span className="text-xs text-ds-neutral-mediumGray mt-2">
							Confirmation
						</span>
					</div>
				</div>

				{/* Content */}
				<div className="p-8 flex-1 overflow-y-auto">
					{/* Step 1: Date & Time Selection */}
					{currentStep === 1 && (
						<div className="space-y-8">
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Select a Date & Time
							</h3>

							{/* Calendar */}
							<div className="bg-ds-neutral-lightGray/20 rounded-lg p-4">
								<div className="flex items-center justify-between mb-4">
									<button
										onClick={handlePrevMonth}
										className="p-2 rounded-full hover:bg-ds-neutral-lightGray"
										aria-label="Previous month"
									>
										<ArrowLeft className="w-5 h-5 text-ds-primary-charcoal" />
									</button>
									<span className="text-lg font-semibold text-ds-primary-charcoal">
										{format(currentMonth, "MMMM yyyy")}
									</span>
									<button
										onClick={handleNextMonth}
										className="p-2 rounded-full hover:bg-ds-neutral-lightGray"
										aria-label="Next month"
									>
										<ArrowRight className="w-5 h-5 text-ds-primary-charcoal" />
									</button>
								</div>
								<div className="grid grid-cols-7 text-center text-sm font-medium text-ds-neutral-mediumGray mb-2">
									{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
										(day) => (
											<span key={day}>{day}</span>
										)
									)}
								</div>
								<div className="grid grid-cols-7 gap-2">
									{Array.from({ length: firstDayOfMonth }).map((_, i) => (
										<div key={`empty-${i}`} className="h-8" />
									))}
									{daysInMonth.map((day) => (
										<button
											key={day.toISOString()}
											onClick={() => handleDateSelect(day)}
											disabled={isPast(day) && !isToday(day)}
											className={cn(
												"w-full h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200",
												isSameDay(day, selectedDate || new Date())
													? "bg-ds-primary-sage text-ds-neutral-white"
													: isPast(day) && !isToday(day)
													? "text-ds-neutral-mediumGray cursor-not-allowed"
													: "text-ds-primary-charcoal hover:bg-ds-neutral-lightGray"
											)}
											aria-label={`Select date ${format(day, "PPP")}`}
											aria-pressed={isSameDay(day, selectedDate || new Date())}
										>
											{format(day, "d")}
										</button>
									))}
								</div>
							</div>

							{/* Available Times */}
							{selectedDate && (
								<div className="bg-ds-neutral-lightGray/20 rounded-lg p-4">
									<h4 className="font-semibold text-ds-primary-charcoal mb-4">
										Available Times for {format(selectedDate, "PPP")}
									</h4>
									{slotsLoading ? (
										<div className="flex justify-center items-center h-24">
											<Loader2 className="w-8 h-8 animate-spin text-ds-primary-sage" />
										</div>
									) : slotsError ? (
										<div className="text-red-500 text-sm text-center">
											{slotsError}
										</div>
									) : availableSlots.length === 0 ? (
										<div className="text-ds-neutral-mediumGray text-sm text-center">
											No available slots for this date. Please choose another.
										</div>
									) : (
										<div className="grid grid-cols-3 gap-2">
											{availableSlots.map((slot) => (
												<button
													key={slot.id}
													onClick={() => handleTimeSelect(slot.time)}
													className={cn(
														"px-4 py-2 rounded-lg border transition-colors duration-200 text-sm font-medium",
														selectedTime === slot.time
															? "bg-ds-primary-sage text-ds-neutral-white border-ds-primary-sage"
															: "bg-ds-neutral-white text-ds-primary-charcoal border-ds-neutral-lightGray hover:bg-ds-neutral-lightGray/50"
													)}
													aria-label={`Select time ${slot.time}`}
													aria-pressed={selectedTime === slot.time}
												>
													{slot.time}
												</button>
											))}
										</div>
									)}
								</div>
							)}

							<div className="flex justify-end">
								<button
									onClick={() => setCurrentStep(2)}
									disabled={!selectedDate || !selectedTime}
									className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center space-x-4"
									aria-label="Continue to personal details"
								>
									<span>Next</span>
									<ArrowRight className="w-5 h-5" />
								</button>
							</div>
						</div>
					)}

					{/* Step 2: Personal Details */}
					{currentStep === 2 && (
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Your Details & Project Brief
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="firstName"
										className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
									>
										First Name
									</label>
									<input
										type="text"
										id="firstName"
										{...register("firstName")}
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-invalid={errors.firstName ? "true" : "false"}
									/>
									{errors.firstName && (
										<p className="text-red-500 text-xs mt-2">
											{errors.firstName.message}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="lastName"
										className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
									>
										Last Name
									</label>
									<input
										type="text"
										id="lastName"
										{...register("lastName")}
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-invalid={errors.lastName ? "true" : "false"}
									/>
									{errors.lastName && (
										<p className="text-red-500 text-xs mt-2">
											{errors.lastName.message}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										{...register("email")}
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-invalid={errors.email ? "true" : "false"}
									/>
									{errors.email && (
										<p className="text-red-500 text-xs mt-2">
											{errors.email.message}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
									>
										Phone
									</label>
									<input
										type="tel"
										id="phone"
										{...register("phone")}
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										aria-invalid={errors.phone ? "true" : "false"}
									/>
									{errors.phone && (
										<p className="text-red-500 text-xs mt-2">
											{errors.phone.message}
										</p>
									)}
								</div>
								{serviceType === "in-home" && (
									<div className="md:col-span-2">
										<label
											htmlFor="address"
											className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
										>
											Full Address for In-Home Visit
										</label>
										<input
											type="text"
											id="address"
											{...register("address")}
											className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
											aria-invalid={errors.address ? "true" : "false"}
										/>
										{errors.address && (
											<p className="text-red-500 text-xs mt-2">
												{errors.address.message}
											</p>
										)}
									</div>
								)}
								<div className="md:col-span-2">
									<label
										htmlFor="projectBrief"
										className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
									>
										Project Brief
									</label>
									<textarea
										id="projectBrief"
										{...register("projectBrief")}
										rows={4}
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										placeholder="Describe your project, goals, and any specific challenges..."
										aria-invalid={errors.projectBrief ? "true" : "false"}
									/>
									{errors.projectBrief && (
										<p className="text-red-500 text-xs mt-2">
											{errors.projectBrief.message}
										</p>
									)}
								</div>
								{serviceType === "commercial" && (
									<div className="md:col-span-2">
										<label
											htmlFor="designerId"
											className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
										>
											Designer/Architect ID (Optional)
										</label>
										<input
											type="text"
											id="designerId"
											{...register("designerId")}
											className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										/>
									</div>
								)}
							</div>

							{slotsError && (
								<div
									className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4"
									role="alert"
								>
									<Info className="w-5 h-5" />
									<p className="text-sm">{slotsError}</p>
								</div>
							)}

							<div className="flex justify-between mt-8">
								<button
									type="button"
									onClick={() => setCurrentStep(1)}
									className="px-8 py-2 border border-ds-neutral-lightGray text-ds-primary-charcoal rounded-lg font-semibold hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 flex items-center space-x-4"
									aria-label="Go back to date and time selection"
								>
									<ArrowLeft className="w-5 h-5" />
									<span>Back</span>
								</button>
								<button
									type="submit"
									disabled={isSubmitting || bookConsultationMutation.isPending}
									className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
									aria-label="Confirm booking"
								>
									{isSubmitting || bookConsultationMutation.isPending ? (
										<Loader2 className="w-5 h-5 animate-spin" />
									) : (
										<CheckCircle className="w-5 h-5" />
									)}
									<span>
										{isSubmitting || bookConsultationMutation.isPending
											? "Booking..."
											: "Confirm Booking"}
									</span>
								</button>
							</div>
						</form>
					)}

					{/* Step 3: Confirmation */}
					{currentStep === 3 && (
						<div className="text-center space-y-8">
							<CheckCircle className="w-24 h-24 text-ds-primary-sage mx-auto mb-4" />
							<h3 className="text-2xl font-bold text-ds-primary-charcoal">
								Booking Confirmed!
							</h3>
							<p className="text-lg text-ds-neutral-darkSlate">
								{bookConsultationMutation.data ||
									"Your consultation has been successfully booked."}
							</p>
							<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8 text-left space-y-4">
								<h4 className="font-semibold text-ds-primary-charcoal">
									Consultation Details:
								</h4>
								<p className="text-ds-neutral-darkSlate flex items-center space-x-2">
									<Calendar className="w-5 h-5 text-ds-primary-sage" />
									<span>
										Date: {selectedDate ? format(selectedDate, "PPP") : "N/A"}
									</span>
								</p>
								<p className="text-ds-neutral-darkSlate flex items-center space-x-2">
									<Clock className="w-5 h-5 text-ds-primary-sage" />
									<span>Time: {selectedTime || "N/A"}</span>
								</p>
								<p className="text-ds-neutral-darkSlate flex items-center space-x-2">
									{selectedPackage.type === "virtual" && (
										<Monitor className="w-5 h-5 text-ds-primary-sage" />
									)}
									{selectedPackage.type === "in-home" && (
										<Home className="w-5 h-5 text-ds-primary-sage" />
									)}
									{selectedPackage.type === "commercial" && (
										<Building className="w-5 h-5 text-ds-primary-sage" />
									)}
									<span>Service Type: {selectedPackage.name}</span>
								</p>
								<p className="text-ds-neutral-darkSlate flex items-center space-x-2">
									<User className="w-5 h-5 text-ds-primary-sage" />
									<span>Consultant: Our expert team</span>
								</p>
								<p className="text-ds-neutral-darkSlate flex items-center space-x-2">
									<Mail className="w-5 h-5 text-ds-primary-sage" />
									<span>
										A confirmation email with all details has been sent to{" "}
										{watch("email")}.
									</span>
								</p>
								{serviceType === "in-home" && address && (
									<p className="text-ds-neutral-darkSlate flex items-center space-x-2">
										<MapPin className="w-5 h-5 text-ds-primary-sage" />
										<span>Address: {address}</span>
									</p>
								)}
								<p className="text-ds-neutral-darkSlate flex items-center space-x-2">
									<Briefcase className="w-5 h-5 text-ds-primary-sage" />
									<span>Project Brief: {watch("projectBrief")}</span>
								</p>
							</div>
							<button
								onClick={closeBookingModal}
								className="px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200"
								aria-label="Close confirmation and return to services page"
							>
								Done
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
