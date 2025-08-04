"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Building2,
	User,
	Mail,
	Phone,
	MapPin,
	Upload,
	CheckCircle,
	AlertCircle,
	FileText,
	CreditCard,
	Shield,
	ArrowRight,
	ArrowLeft,
	X,
	Download,
	Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tradeRegistrationSchema = z.object({
	// Business Information
	businessName: z.string().min(2, "Business name is required"),
	businessType: z.enum([
		"sole_proprietorship",
		"partnership",
		"llc",
		"corporation",
		"other",
	]),
	taxId: z.string().min(9, "Valid tax ID is required"),
	yearsInBusiness: z.number().min(0, "Years in business must be positive"),
	licenseNumber: z.string().optional(),
	insuranceProvider: z.string().optional(),

	// Contact Information
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	title: z.string().min(1, "Job title is required"),
	email: z.string().email("Valid email is required"),
	phone: z.string().min(10, "Valid phone number is required"),

	// Business Address
	address1: z.string().min(1, "Address is required"),
	address2: z.string().optional(),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	zipCode: z.string().min(5, "Valid ZIP code is required"),

	// Business Details
	annualVolume: z.enum([
		"under_50k",
		"50k_100k",
		"100k_250k",
		"250k_500k",
		"over_500k",
	]),
	employeeCount: z.number().min(1, "Employee count is required"),
	serviceAreas: z
		.array(z.string())
		.min(1, "At least one service area is required"),
	specialties: z.array(z.string()).min(1, "At least one specialty is required"),

	// References
	references: z
		.array(
			z.object({
				companyName: z.string().min(1, "Company name is required"),
				contactName: z.string().min(1, "Contact name is required"),
				phone: z.string().min(10, "Valid phone number is required"),
				relationship: z.string().min(1, "Relationship is required"),
			})
		)
		.min(2, "At least 2 references are required"),

	// Terms and Agreements
	agreeToTerms: z
		.boolean()
		.refine((val) => val === true, "You must agree to the terms"),
	agreeToCredit: z
		.boolean()
		.refine((val) => val === true, "You must agree to credit check"),
});

type TradeRegistrationData = z.infer<typeof tradeRegistrationSchema>;

interface TradeRegistrationFormProps {
	onRegistrationComplete: () => void;
}

interface UploadedDocument {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
}

export const TradeRegistrationForm: React.FC<TradeRegistrationFormProps> = ({
	onRegistrationComplete,
}) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [uploadedDocuments, setUploadedDocuments] = useState<
		UploadedDocument[]
	>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [verificationStatus, setVerificationStatus] = useState<
		"pending" | "approved" | "rejected" | null
	>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		setValue,
		trigger,
		getValues,
	} = useForm<TradeRegistrationData>({
		resolver: zodResolver(tradeRegistrationSchema),
		mode: "onBlur",
		defaultValues: {
			references: [
				{ companyName: "", contactName: "", phone: "", relationship: "" },
				{ companyName: "", contactName: "", phone: "", relationship: "" },
			],
			serviceAreas: [],
			specialties: [],
		},
	});

	const steps = [
		{ id: 1, title: "Business Information", icon: Building2 },
		{ id: 2, title: "Contact Details", icon: User },
		{ id: 3, title: "Business Operations", icon: FileText },
		{ id: 4, title: "References & Documents", icon: Shield },
		{ id: 5, title: "Review & Submit", icon: CheckCircle },
	];

	const businessTypes = [
		{ value: "sole_proprietorship", label: "Sole Proprietorship" },
		{ value: "partnership", label: "Partnership" },
		{ value: "llc", label: "LLC" },
		{ value: "corporation", label: "Corporation" },
		{ value: "other", label: "Other" },
	];

	const volumeRanges = [
		{ value: "under_50k", label: "Under $50,000", discount: "5%" },
		{ value: "50k_100k", label: "$50,000 - $100,000", discount: "10%" },
		{ value: "100k_250k", label: "$100,000 - $250,000", discount: "15%" },
		{ value: "250k_500k", label: "$250,000 - $500,000", discount: "20%" },
		{ value: "over_500k", label: "Over $500,000", discount: "25%" },
	];

	const serviceAreaOptions = [
		"Residential Interior",
		"Residential Exterior",
		"Commercial Interior",
		"Commercial Exterior",
		"Industrial",
		"Restoration",
		"New Construction",
	];

	const specialtyOptions = [
		"Drywall Finishing",
		"Cabinet Refinishing",
		"Deck Staining",
		"Pressure Washing",
		"Wallpaper Removal",
		"Texture Application",
		"Epoxy Flooring",
		"Specialty Coatings",
	];

	const requiredDocuments = [
		{ type: "business_license", name: "Business License", required: true },
		{
			type: "insurance_certificate",
			name: "Insurance Certificate",
			required: true,
		},
		{ type: "contractor_license", name: "Contractor License", required: false },
		{ type: "tax_document", name: "Tax Document (W-9)", required: true },
	];

	const handleFileUpload = (
		event: React.ChangeEvent<HTMLInputElement>,
		documentType: string
	) => {
		const file = event.target.files?.[0];
		if (file) {
			// Simulate file upload
			const newDocument: UploadedDocument = {
				id: Date.now().toString(),
				name: file.name,
				type: documentType,
				size: file.size,
				url: URL.createObjectURL(file),
			};
			setUploadedDocuments((prev) => [...prev, newDocument]);
		}
	};

	const removeDocument = (documentId: string) => {
		setUploadedDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
	};

	const nextStep = async () => {
		const isStepValid = await trigger();
		if (isStepValid && currentStep < 5) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const onSubmit = async (data: TradeRegistrationData) => {
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			// Simulate API call for registration
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Simulate verification process
			setVerificationStatus("pending");

			// In production, this would submit to your API
			console.log("Trade Registration Data:", data);
			console.log("Uploaded Documents:", uploadedDocuments);

			onRegistrationComplete();
		} catch (error) {
			setSubmitError("Registration failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const addReference = () => {
		const currentRefs = getValues("references");
		setValue("references", [
			...currentRefs,
			{ companyName: "", contactName: "", phone: "", relationship: "" },
		]);
	};

	const removeReference = (index: number) => {
		const currentRefs = getValues("references");
		if (currentRefs.length > 2) {
			setValue(
				"references",
				currentRefs.filter((_, i) => i !== index)
			);
		}
	};

	const toggleServiceArea = (area: string) => {
		const current = getValues("serviceAreas");
		const updated = current.includes(area)
			? current.filter((a) => a !== area)
			: [...current, area];
		setValue("serviceAreas", updated);
		trigger("serviceAreas");
	};

	const toggleSpecialty = (specialty: string) => {
		const current = getValues("specialties");
		const updated = current.includes(specialty)
			? current.filter((s) => s !== specialty)
			: [...current, specialty];
		setValue("specialties", updated);
		trigger("specialties");
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-ds-primary-charcoal mb-4">
					Join Our Professional Trade Program
				</h1>
				<p className="text-lg text-ds-neutral-mediumGray">
					Get exclusive access to volume discounts, priority service, and
					professional tools
				</p>
			</div>

			{/* Progress Stepper */}
			<div className="flex justify-between items-center mb-20">
				{steps.map((step, index) => (
					<div key={step.id} className="flex flex-col items-center relative">
						<div
							className={cn(
								"w-12 h-12 rounded-full flex items-center justify-center text-ds-neutral-white font-bold transition-all duration-300",
								currentStep >= step.id
									? "bg-ds-primary-sage"
									: "bg-ds-neutral-lightGray"
							)}
						>
							<step.icon className="w-6 h-6" />
						</div>
						<p
							className={cn(
								"text-sm mt-4 whitespace-nowrap transition-colors duration-300",
								currentStep >= step.id
									? "text-ds-primary-charcoal font-medium"
									: "text-ds-neutral-mediumGray"
							)}
						>
							{step.title}
						</p>
						{index < steps.length - 1 && (
							<div
								className={cn(
									"absolute left-[calc(50%+24px)] top-6 h-0.5 w-[calc(100vw/5-48px)] -translate-y-1/2 transition-all duration-300",
									currentStep > step.id
										? "bg-ds-primary-sage"
										: "bg-ds-neutral-lightGray"
								)}
							/>
						)}
					</div>
				))}
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-lg p-8"
			>
				{/* Step 1: Business Information */}
				{currentStep === 1 && (
					<div className="space-y-8">
						<div className="flex items-center space-x-4 mb-8">
							<Building2 className="w-6 h-6 text-ds-primary-sage" />
							<h2 className="text-2xl font-bold text-ds-primary-charcoal">
								Business Information
							</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="md:col-span-2">
								<label
									htmlFor="businessName"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Business Name *
								</label>
								<input
									type="text"
									id="businessName"
									{...register("businessName")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="Your Business Name"
									aria-invalid={errors.businessName ? "true" : "false"}
									aria-describedby={
										errors.businessName ? "businessName-error" : undefined
									}
								/>
								{errors.businessName && (
									<p
										id="businessName-error"
										className="text-red-500 text-sm mt-2"
									>
										{errors.businessName.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="businessType"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Business Type *
								</label>
								<select
									id="businessType"
									{...register("businessType")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.businessType ? "true" : "false"}
								>
									<option value="">Select business type</option>
									{businessTypes.map((type) => (
										<option key={type.value} value={type.value}>
											{type.label}
										</option>
									))}
								</select>
								{errors.businessType && (
									<p className="text-red-500 text-sm mt-2">
										{errors.businessType.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="taxId"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Tax ID / EIN *
								</label>
								<input
									type="text"
									id="taxId"
									{...register("taxId")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="XX-XXXXXXX"
									aria-invalid={errors.taxId ? "true" : "false"}
								/>
								{errors.taxId && (
									<p className="text-red-500 text-sm mt-2">
										{errors.taxId.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="yearsInBusiness"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Years in Business *
								</label>
								<input
									type="number"
									id="yearsInBusiness"
									{...register("yearsInBusiness", { valueAsNumber: true })}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="5"
									min="0"
									aria-invalid={errors.yearsInBusiness ? "true" : "false"}
								/>
								{errors.yearsInBusiness && (
									<p className="text-red-500 text-sm mt-2">
										{errors.yearsInBusiness.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="licenseNumber"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Contractor License Number
								</label>
								<input
									type="text"
									id="licenseNumber"
									{...register("licenseNumber")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="Optional"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Step 2: Contact Details */}
				{currentStep === 2 && (
					<div className="space-y-8">
						<div className="flex items-center space-x-4 mb-8">
							<User className="w-6 h-6 text-ds-primary-sage" />
							<h2 className="text-2xl font-bold text-ds-primary-charcoal">
								Contact Information
							</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									First Name *
								</label>
								<input
									type="text"
									id="firstName"
									{...register("firstName")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.firstName ? "true" : "false"}
								/>
								{errors.firstName && (
									<p className="text-red-500 text-sm mt-2">
										{errors.firstName.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Last Name *
								</label>
								<input
									type="text"
									id="lastName"
									{...register("lastName")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.lastName ? "true" : "false"}
								/>
								{errors.lastName && (
									<p className="text-red-500 text-sm mt-2">
										{errors.lastName.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="title"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Job Title *
								</label>
								<input
									type="text"
									id="title"
									{...register("title")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="Owner, Manager, etc."
									aria-invalid={errors.title ? "true" : "false"}
								/>
								{errors.title && (
									<p className="text-red-500 text-sm mt-2">
										{errors.title.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Email Address *
								</label>
								<input
									type="email"
									id="email"
									{...register("email")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.email ? "true" : "false"}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-2">
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Phone Number *
								</label>
								<input
									type="tel"
									id="phone"
									{...register("phone")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									placeholder="(555) 123-4567"
									aria-invalid={errors.phone ? "true" : "false"}
								/>
								{errors.phone && (
									<p className="text-red-500 text-sm mt-2">
										{errors.phone.message}
									</p>
								)}
							</div>

							<div className="md:col-span-2">
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-4">
									<MapPin className="w-5 h-5 text-ds-primary-sage" />
									<span>Business Address</span>
								</h3>
							</div>

							<div className="md:col-span-2">
								<label
									htmlFor="address1"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Street Address *
								</label>
								<input
									type="text"
									id="address1"
									{...register("address1")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.address1 ? "true" : "false"}
								/>
								{errors.address1 && (
									<p className="text-red-500 text-sm mt-2">
										{errors.address1.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="city"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									City *
								</label>
								<input
									type="text"
									id="city"
									{...register("city")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.city ? "true" : "false"}
								/>
								{errors.city && (
									<p className="text-red-500 text-sm mt-2">
										{errors.city.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="state"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									State *
								</label>
								<input
									type="text"
									id="state"
									{...register("state")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.state ? "true" : "false"}
								/>
								{errors.state && (
									<p className="text-red-500 text-sm mt-2">
										{errors.state.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="zipCode"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									ZIP Code *
								</label>
								<input
									type="text"
									id="zipCode"
									{...register("zipCode")}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									aria-invalid={errors.zipCode ? "true" : "false"}
								/>
								{errors.zipCode && (
									<p className="text-red-500 text-sm mt-2">
										{errors.zipCode.message}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Step 3: Business Operations */}
				{currentStep === 3 && (
					<div className="space-y-8">
						<div className="flex items-center space-x-4 mb-8">
							<FileText className="w-6 h-6 text-ds-primary-sage" />
							<h2 className="text-2xl font-bold text-ds-primary-charcoal">
								Business Operations
							</h2>
						</div>

						<div className="space-y-8">
							<div>
								<label
									htmlFor="annualVolume"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Annual Paint Volume *
								</label>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{volumeRanges.map((range) => (
										<label
											key={range.value}
											className="flex items-center space-x-4 cursor-pointer p-4 border border-ds-neutral-lightGray rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200"
										>
											<input
												type="radio"
												{...register("annualVolume")}
												value={range.value}
												className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray focus:ring-ds-primary-sage"
											/>
											<div className="flex-1">
												<span className="font-medium text-ds-primary-charcoal">
													{range.label}
												</span>
												<span className="block text-sm text-ds-primary-sage">
													Discount: {range.discount}
												</span>
											</div>
										</label>
									))}
								</div>
								{errors.annualVolume && (
									<p className="text-red-500 text-sm mt-2">
										{errors.annualVolume.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="employeeCount"
									className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
								>
									Number of Employees *
								</label>
								<input
									type="number"
									id="employeeCount"
									{...register("employeeCount", { valueAsNumber: true })}
									className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
									min="1"
									aria-invalid={errors.employeeCount ? "true" : "false"}
								/>
								{errors.employeeCount && (
									<p className="text-red-500 text-sm mt-2">
										{errors.employeeCount.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
									Service Areas * (Select all that apply)
								</label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{serviceAreaOptions.map((area) => (
										<label
											key={area}
											className="flex items-center space-x-2 cursor-pointer"
										>
											<input
												type="checkbox"
												checked={watch("serviceAreas")?.includes(area) || false}
												onChange={() => toggleServiceArea(area)}
												className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage"
											/>
											<span className="text-sm text-ds-neutral-darkSlate">
												{area}
											</span>
										</label>
									))}
								</div>
								{errors.serviceAreas && (
									<p className="text-red-500 text-sm mt-2">
										{errors.serviceAreas.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
									Specialties * (Select all that apply)
								</label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{specialtyOptions.map((specialty) => (
										<label
											key={specialty}
											className="flex items-center space-x-2 cursor-pointer"
										>
											<input
												type="checkbox"
												checked={
													watch("specialties")?.includes(specialty) || false
												}
												onChange={() => toggleSpecialty(specialty)}
												className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage"
											/>
											<span className="text-sm text-ds-neutral-darkSlate">
												{specialty}
											</span>
										</label>
									))}
								</div>
								{errors.specialties && (
									<p className="text-red-500 text-sm mt-2">
										{errors.specialties.message}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Step 4: References & Documents */}
				{currentStep === 4 && (
					<div className="space-y-8">
						<div className="flex items-center space-x-4 mb-8">
							<Shield className="w-6 h-6 text-ds-primary-sage" />
							<h2 className="text-2xl font-bold text-ds-primary-charcoal">
								References & Documents
							</h2>
						</div>

						{/* Business References */}
						<div>
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Business References (Minimum 2)
							</h3>
							<div className="space-y-4">
								{watch("references")?.map((_, index) => (
									<div
										key={index}
										className="bg-ds-neutral-lightGray/20 p-4 rounded-lg"
									>
										<div className="flex items-center justify-between mb-4">
											<h4 className="font-medium text-ds-primary-charcoal">
												Reference {index + 1}
											</h4>
											{index >= 2 && (
												<button
													type="button"
													onClick={() => removeReference(index)}
													className="text-red-500 hover:text-red-700 transition-colors duration-200"
												>
													<X className="w-4 h-4" />
												</button>
											)}
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
													Company Name *
												</label>
												<input
													type="text"
													{...register(`references.${index}.companyName`)}
													className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
													Contact Name *
												</label>
												<input
													type="text"
													{...register(`references.${index}.contactName`)}
													className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
													Phone Number *
												</label>
												<input
													type="tel"
													{...register(`references.${index}.phone`)}
													className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
													Relationship *
												</label>
												<input
													type="text"
													{...register(`references.${index}.relationship`)}
													className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
													placeholder="Supplier, Client, etc."
												/>
											</div>
										</div>
									</div>
								))}
								<button
									type="button"
									onClick={addReference}
									className="w-full py-4 border-2 border-dashed border-ds-neutral-lightGray rounded-lg text-ds-neutral-mediumGray hover:border-ds-primary-sage hover:text-ds-primary-sage transition-colors duration-200"
								>
									+ Add Another Reference
								</button>
							</div>
						</div>

						{/* Document Upload */}
						<div>
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Required Documents
							</h3>
							<div className="space-y-4">
								{requiredDocuments.map((doc) => {
									const uploaded = uploadedDocuments.find(
										(d) => d.type === doc.type
									);
									return (
										<div
											key={doc.type}
											className="border border-ds-neutral-lightGray rounded-lg p-4"
										>
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center space-x-4">
													<FileText className="w-5 h-5 text-ds-primary-sage" />
													<div>
														<h4 className="font-medium text-ds-primary-charcoal">
															{doc.name}
														</h4>
														{doc.required && (
															<span className="text-sm text-red-600">
																Required
															</span>
														)}
													</div>
												</div>
												{uploaded && (
													<div className="flex items-center space-x-4">
														<CheckCircle className="w-5 h-5 text-green-600" />
														<span className="text-sm text-green-600">
															Uploaded
														</span>
													</div>
												)}
											</div>

											{uploaded ? (
												<div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
													<div className="flex items-center space-x-4">
														<FileText className="w-4 h-4 text-green-600" />
														<span className="text-sm text-green-800">
															{uploaded.name}
														</span>
													</div>
													<div className="flex items-center space-x-4">
														<button
															type="button"
															className="text-green-600 hover:text-green-800 transition-colors duration-200"
														>
															<Eye className="w-4 h-4" />
														</button>
														<button
															type="button"
															onClick={() => removeDocument(uploaded.id)}
															className="text-red-500 hover:text-red-700 transition-colors duration-200"
														>
															<X className="w-4 h-4" />
														</button>
													</div>
												</div>
											) : (
												<div className="border-2 border-dashed border-ds-neutral-lightGray rounded-lg p-8 text-center hover:border-ds-primary-sage transition-colors duration-200">
													<input
														type="file"
														accept=".pdf,.jpg,.jpeg,.png"
														onChange={(e) => handleFileUpload(e, doc.type)}
														className="hidden"
														id={`upload-${doc.type}`}
													/>
													<label
														htmlFor={`upload-${doc.type}`}
														className="cursor-pointer"
													>
														<Upload className="w-8 h-8 text-ds-neutral-mediumGray mx-auto mb-4" />
														<p className="text-sm text-ds-neutral-mediumGray mb-2">
															Click to upload {doc.name}
														</p>
														<p className="text-xs text-ds-neutral-mediumGray">
															PDF, JPG, PNG up to 10MB
														</p>
													</label>
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}

				{/* Step 5: Review & Submit */}
				{currentStep === 5 && (
					<div className="space-y-8">
						<div className="flex items-center space-x-4 mb-8">
							<CheckCircle className="w-6 h-6 text-ds-primary-sage" />
							<h2 className="text-2xl font-bold text-ds-primary-charcoal">
								Review & Submit
							</h2>
						</div>

						{/* Review Summary */}
						<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Application Summary
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<h4 className="font-medium text-ds-primary-charcoal mb-4">
										Business Information
									</h4>
									<div className="space-y-2 text-sm">
										<p>
											<span className="text-ds-neutral-mediumGray">
												Business:
											</span>{" "}
											{watch("businessName")}
										</p>
										<p>
											<span className="text-ds-neutral-mediumGray">Type:</span>{" "}
											{
												businessTypes.find(
													(t) => t.value === watch("businessType")
												)?.label
											}
										</p>
										<p>
											<span className="text-ds-neutral-mediumGray">Years:</span>{" "}
											{watch("yearsInBusiness")}
										</p>
										<p>
											<span className="text-ds-neutral-mediumGray">
												Volume:
											</span>{" "}
											{
												volumeRanges.find(
													(v) => v.value === watch("annualVolume")
												)?.label
											}
										</p>
									</div>
								</div>
								<div>
									<h4 className="font-medium text-ds-primary-charcoal mb-4">
										Contact Information
									</h4>
									<div className="space-y-2 text-sm">
										<p>
											<span className="text-ds-neutral-mediumGray">
												Contact:
											</span>{" "}
											{watch("firstName")} {watch("lastName")}
										</p>
										<p>
											<span className="text-ds-neutral-mediumGray">Title:</span>{" "}
											{watch("title")}
										</p>
										<p>
											<span className="text-ds-neutral-mediumGray">Email:</span>{" "}
											{watch("email")}
										</p>
										<p>
											<span className="text-ds-neutral-mediumGray">Phone:</span>{" "}
											{watch("phone")}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Terms and Agreements */}
						<div className="space-y-4">
							<label className="flex items-start space-x-4 cursor-pointer">
								<input
									type="checkbox"
									{...register("agreeToTerms")}
									className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage mt-2"
								/>
								<div className="text-sm">
									<span className="text-ds-neutral-darkSlate">
										I agree to the{" "}
										<a
											href="/terms"
											className="text-ds-primary-sage hover:underline"
											target="_blank"
										>
											Terms and Conditions
										</a>{" "}
										and{" "}
										<a
											href="/privacy"
											className="text-ds-primary-sage hover:underline"
											target="_blank"
										>
											Privacy Policy
										</a>
									</span>
									{errors.agreeToTerms && (
										<p className="text-red-500 mt-2">
											{errors.agreeToTerms.message}
										</p>
									)}
								</div>
							</label>

							<label className="flex items-start space-x-4 cursor-pointer">
								<input
									type="checkbox"
									{...register("agreeToCredit")}
									className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage mt-2"
								/>
								<div className="text-sm">
									<span className="text-ds-neutral-darkSlate">
										I authorize a credit check for trade account approval and
										agree to Net 30 payment terms
									</span>
									{errors.agreeToCredit && (
										<p className="text-red-500 mt-2">
											{errors.agreeToCredit.message}
										</p>
									)}
								</div>
							</label>
						</div>

						{submitError && (
							<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4">
								<AlertCircle className="w-5 h-5" />
								<p className="text-sm">{submitError}</p>
							</div>
						)}

						{verificationStatus && (
							<div
								className={cn(
									"border rounded-lg p-4 flex items-center space-x-4",
									verificationStatus === "pending" &&
										"bg-yellow-50 border-yellow-200 text-yellow-800",
									verificationStatus === "approved" &&
										"bg-green-50 border-green-200 text-green-800",
									verificationStatus === "rejected" &&
										"bg-red-50 border-red-200 text-red-800"
								)}
							>
								{verificationStatus === "pending" && (
									<AlertCircle className="w-5 h-5" />
								)}
								{verificationStatus === "approved" && (
									<CheckCircle className="w-5 h-5" />
								)}
								{verificationStatus === "rejected" && (
									<AlertCircle className="w-5 h-5" />
								)}
								<div>
									<p className="font-medium">
										{verificationStatus === "pending" &&
											"Application Submitted"}
										{verificationStatus === "approved" &&
											"Application Approved"}
										{verificationStatus === "rejected" &&
											"Application Requires Review"}
									</p>
									<p className="text-sm">
										{verificationStatus === "pending" &&
											"Your application is being reviewed. We'll contact you within 2-3 business days."}
										{verificationStatus === "approved" &&
											"Welcome to our Trade Program! Your account is now active."}
										{verificationStatus === "rejected" &&
											"Please contact our trade team for assistance."}
									</p>
								</div>
							</div>
						)}
					</div>
				)}

				{/* Navigation Buttons */}
				<div className="flex justify-between mt-8 pt-8 border-t border-ds-neutral-lightGray">
					<button
						type="button"
						onClick={prevStep}
						disabled={currentStep === 1}
						className={cn(
							"flex items-center space-x-4 px-8 py-4 rounded-lg font-medium transition-all duration-200",
							currentStep === 1
								? "bg-ds-neutral-lightGray text-ds-neutral-mediumGray cursor-not-allowed"
								: "border border-ds-neutral-lightGray text-ds-primary-charcoal hover:bg-ds-neutral-lightGray/50"
						)}
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Previous</span>
					</button>

					{currentStep < 5 ? (
						<button
							type="button"
							onClick={nextStep}
							className="flex items-center space-x-4 px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-medium hover:bg-ds-primary-sage/90 transition-all duration-200"
						>
							<span>Next</span>
							<ArrowRight className="w-5 h-5" />
						</button>
					) : (
						<button
							type="submit"
							disabled={isSubmitting || !isValid}
							className={cn(
								"flex items-center space-x-4 px-8 py-4 rounded-lg font-medium transition-all duration-200",
								isSubmitting || !isValid
									? "bg-ds-neutral-lightGray text-ds-neutral-mediumGray cursor-not-allowed"
									: "bg-ds-primary-sage text-ds-neutral-white hover:bg-ds-primary-sage/90"
							)}
						>
							{isSubmitting ? (
								<div className="w-5 h-5 border-2 border-ds-neutral-white/30 border-t-ds-neutral-white rounded-full animate-spin" />
							) : (
								<CheckCircle className="w-5 h-5" />
							)}
							<span>
								{isSubmitting ? "Submitting..." : "Submit Application"}
							</span>
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
