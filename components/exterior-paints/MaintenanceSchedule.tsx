"use client";

import React from "react";
import { X, CalendarCheck, Wrench, Info, CheckCircle } from "lucide-react";
import { MaintenanceSchedule } from "@/types/product";

interface MaintenanceScheduleProps {
	schedule: MaintenanceSchedule;
	onClose: () => void;
}

export const MaintenanceScheduleModal: React.FC<MaintenanceScheduleProps> = ({
	schedule,
	onClose,
}) => {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="maintenance-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
					<div className="flex items-center space-x-2">
						<CalendarCheck className="w-6 h-6 text-ds-primary-sage" />
						<h2
							id="maintenance-title"
							className="text-2xl font-bold text-ds-primary-charcoal"
						>
							Maintenance Schedule
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close maintenance schedule"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-8 space-y-8">
					<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4 flex items-start space-x-2">
						<Info className="w-5 h-5 text-ds-accent-warmBrown flex-shrink-0" />
						<div>
							<h3 className="font-semibold text-ds-primary-charcoal mb-2">
								Why is Maintenance Important?
							</h3>
							<p className="text-sm text-ds-neutral-darkSlate">
								Regular maintenance extends the life of your exterior paint,
								protects your home from the elements, and keeps it looking its
								best. It also helps identify minor issues before they become
								costly repairs.
							</p>
						</div>
					</div>

					<div className="bg-ds-neutral-lightGray/20 p-4 rounded-lg">
						<h3 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
							<CalendarCheck className="w-5 h-5 text-ds-primary-sage" />
							<span>Recommended Interval:</span>
						</h3>
						<p className="text-lg font-bold text-ds-primary-sage">
							{schedule.interval}
						</p>
					</div>

					<div className="bg-ds-neutral-lightGray/20 p-4 rounded-lg">
						<h3 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
							<Wrench className="w-5 h-5 text-ds-primary-sage" />
							<span>Key Maintenance Tasks:</span>
						</h3>
						<ul className="space-y-2">
							{schedule.tasks.map((task, index) => (
								<li
									key={index}
									className="flex items-start space-x-2 text-ds-neutral-darkSlate"
								>
									<CheckCircle className="w-4 h-4 text-ds-primary-sage flex-shrink-0 mt-2" />
									<span>{task}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4">
						<h3 className="font-semibold text-ds-primary-charcoal mb-4">
							Additional Tips:
						</h3>
						<ul className="space-y-2 text-sm text-ds-neutral-darkSlate">
							<li>
								• Always use a soft brush or low-pressure washer for cleaning to
								avoid damaging the paint.
							</li>
							<li>
								• Address any mildew or algae growth promptly with a suitable
								cleaner.
							</li>
							<li>
								• Keep gutters clean to prevent water overflow and paint damage.
							</li>
							<li>
								• Trim shrubs and trees away from the house to prevent rubbing
								and moisture retention.
							</li>
							<li>
								• For minor chips or cracks, clean the area and apply a small
								amount of matching paint.
							</li>
						</ul>
					</div>
				</div>

				{/* Footer */}
				<div className="p-8 border-t border-ds-neutral-lightGray text-center">
					<button
						onClick={onClose}
						className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
						aria-label="Close and return to products"
					>
						Return to Products
					</button>
				</div>
			</div>
		</div>
	);
};
