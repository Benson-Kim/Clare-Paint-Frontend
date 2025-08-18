"use client";

import React from "react";
import { useCheckoutStore } from "@/store/checkout-store";
import {
	CheckCircle,
	Package,
	Truck,
	Mail,
	Download,
	Home,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/utils/cartUtils";
import Image from "next/image";

export const OrderConfirmation: React.FC = () => {
	const { orderData } = useCheckoutStore();

	if (!orderData) {
		return (
			<div className="min-h-screen bg-ds-neutral-white flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-ds-primary-sage border-t-transparent rounded-full animate-spin mx-auto mb-4" />
					<p className="text-lg text-ds-neutral-mediumGray">
						Loading order confirmation...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="text-center py-20">
			<CheckCircle className="w-24 h-24 text-ds-primary-sage mx-auto mb-8" />
			<h2 className="text-4xl font-bold text-ds-primary-charcoal mb-4">
				Order Confirmed!
			</h2>
			<p className="text-lg text-ds-neutral-darkSlate mb-8">
				Thank you for your purchase.
			</p>

			<div className="bg-ds-primary-cream p-8 rounded-lg shadow-lg max-w-2xl mx-auto space-y-4 text-left">
				<div className="flex items-center space-x-4 text-ds-primary-charcoal">
					<Package className="w-5 h-5" />
					<p className="font-semibold">
						Order ID: <span className="font-normal">{orderData.orderId}</span>
					</p>
				</div>
				<div className="flex items-center space-x-4 text-ds-primary-charcoal">
					<Truck className="w-5 h-5" />
					<p className="font-semibold">
						Estimated Delivery:{" "}
						<span className="font-normal">{orderData.estimatedDelivery}</span>
					</p>
				</div>
				<div className="flex items-center space-x-4 text-ds-primary-charcoal">
					<Mail className="w-5 h-5" />
					<p className="font-semibold">
						A confirmation email has been sent to your inbox.
					</p>
				</div>

				<div className="border-t border-ds-neutral-lightGray pt-4 mt-4">
					<h3 className="text-xl font-bold text-ds-primary-charcoal mb-4">
						Order Summary
					</h3>
					<div className="space-y-2">
						{orderData.items.map((item, index) => (
							<div key={index} className="flex items-center space-x-4">
								<Image
									src={item.image || "/placeholder.png"}
									alt={item.name || "Item image"}
									width={48}
									height={48}
									className="object-cover rounded-md"
								/>
								<div className="flex-1">
									<p className="text-sm font-medium text-ds-primary-charcoal">
										{item.name}
									</p>
									<p className="text-xs text-ds-neutral-darkSlate">
										{item.color} / {item.finish} (Qty: {item.quantity})
									</p>
								</div>
								<span className="text-sm font-semibold text-ds-primary-charcoal">
									{formatCurrency(item.price * item.quantity)}
								</span>
							</div>
						))}
					</div>
					<div className="flex justify-between text-lg font-bold text-ds-primary-charcoal mt-4 pt-4 border-t border-ds-neutral-lightGray">
						<span>Total Paid:</span>
						<span>{formatCurrency(orderData.totalAmount)}</span>
					</div>
				</div>

				<div className="border-t border-ds-neutral-lightGray pt-4 mt-4">
					<h3 className="text-xl font-bold text-ds-primary-charcoal mb-4">
						Paint Mixing Instructions
					</h3>
					<p className="text-ds-neutral-darkSlate text-sm mb-4">
						Your custom paint mixing instructions will be delivered to your
						email shortly. You can also access them here:
					</p>
					<Link
						href={orderData.mixingInstructionsLink}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center space-x-4 px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200"
						aria-label="Download paint mixing instructions"
					>
						<Download className="w-5 h-5" />
						<span>Download Instructions</span>
					</Link>
				</div>
			</div>

			<div className="mt-20 space-y-4">
				<Link
					href="/"
					className="inline-flex items-center space-x-4 px-8 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg font-semibold hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-colors duration-200"
					aria-label="Continue shopping"
				>
					<Home className="w-5 h-5" />
					<span>Continue Shopping</span>
				</Link>
				<div className="text-center">
					<Link
						href="/products"
						className="inline-flex items-center space-x-4 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-sm"
					>
						<span>Browse More Products</span>
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</div>
	);
};
