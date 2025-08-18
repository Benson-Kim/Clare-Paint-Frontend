"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchConsultationPackages } from "@/lib/api";
import { ConsultationPackage } from "@/types/consultation";
import {
	CheckCircle,
	DollarSign,
	Clock,
	Home,
	Monitor,
	Building,
} from "lucide-react";
import { useConsultationStore } from "@/store/consultation-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const ConsultationPackages: React.FC = () => {
	const { openBookingModal } = useConsultationStore();

	const {
		data: packages,
		isLoading,
		isError,
		error,
	} = useQuery<ConsultationPackage[], Error>({
		queryKey: ["consultationPackages"],
		queryFn: mockFetchConsultationPackages,
	});

	if (isLoading) {
		return (
			<section id="packages" className="py-20 bg-ds-neutral-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
						Our Consultation Packages
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="bg-ds-neutral-lightGray/20 rounded-lg p-8 space-y-4"
							>
								<div className="h-8 bg-ds-neutral-lightGray rounded w-3/4 mb-4" />
								<div className="h-6 bg-ds-neutral-lightGray rounded w-1/2" />
								<div className="h-4 bg-ds-neutral-lightGray rounded w-full" />
								<div className="h-4 bg-ds-neutral-lightGray rounded w-full" />
								<div className="h-4 bg-ds-neutral-lightGray rounded w-full" />
								<div className="h-12 bg-ds-neutral-lightGray rounded-lg w-full mt-8" />
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section id="packages" className="py-20 bg-ds-neutral-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-8">
						Our Consultation Packages
					</h2>
					<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg">
						<p className="mb-4">
							Failed to load consultation packages: {error?.message}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
						>
							Try Again
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="packages" className="py-20 bg-ds-neutral-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
					Our Consultation Packages
				</h2>
				<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto mb-20">
					Choose the perfect consultation package to match your project needs
					and budget. Our experts are ready to guide you.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{packages?.map((pkg) => (
						<div
							key={pkg.id}
							className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col"
						>
							<div className="relative h-48 overflow-hidden rounded-t-lg">
								<Image
									src={pkg.image || "/placeholder.png"}
									alt={pkg.name || "Package image"}
									fill
									className="object-cover"
								/>

								<div className="absolute inset-0 bg-black/20" />
								<div className="absolute top-4 left-4 bg-ds-primary-sage text-ds-neutral-white px-2 py-2 rounded-full text-sm font-bold flex items-center space-x-2">
									{pkg.type === "virtual" && <Monitor className="w-4 h-4" />}
									{pkg.type === "in-home" && <Home className="w-4 h-4" />}
									{pkg.type === "commercial" && (
										<Building className="w-4 h-4" />
									)}
									<span className="capitalize">{pkg.type}</span>
								</div>
							</div>
							<div className="p-8 flex-1 flex flex-col">
								<h3 className="text-2xl font-bold text-ds-primary-charcoal mb-2">
									{pkg.name}
								</h3>
								<p className="text-ds-neutral-mediumGray text-sm mb-4 flex-1">
									{pkg.description}
								</p>

								<div className="flex items-center space-x-4 mb-4">
									<DollarSign className="w-5 h-5 text-ds-primary-sage" />
									<span className="text-2xl font-bold text-ds-primary-charcoal">
										${pkg.price.toFixed(2)}
									</span>
									<Clock className="w-5 h-5 text-ds-primary-sage ml-auto" />
									<span className="text-ds-primary-charcoal font-medium">
										{pkg.duration}
									</span>
								</div>

								<ul className="space-y-2 mb-8">
									{pkg.features.map((feature, index) => (
										<li
											key={index}
											className="flex items-start space-x-2 text-sm text-ds-neutral-darkSlate"
										>
											<CheckCircle className="w-4 h-4 text-ds-primary-sage mt-2 flex-shrink-0" />
											<span>{feature}</span>
										</li>
									))}
								</ul>

								<button
									onClick={() => openBookingModal(pkg)}
									className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-semibold mt-auto"
									aria-label={`Book ${pkg.name} consultation`}
								>
									Book Now
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
