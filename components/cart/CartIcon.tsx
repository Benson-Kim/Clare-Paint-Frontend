"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

interface CartIconProps {
	className?: string;
	showCount?: boolean;
}

export const CartIcon: React.FC<CartIconProps> = ({
	className = "",
	showCount = true,
}) => {
	const { getTotalItems, setIsOpen } = useCartStore();
	const itemCount = getTotalItems();

	return (
		<Link
			href="/cart"
			className={cn(
				"relative p-2 text-gray-700 hover:text-ds-primary-sage transition-colors duration-200",
				className
			)}
			aria-label={`Shopping cart with ${itemCount} items`}
		>
			<ShoppingCart className="w-6 h-6" />
			{showCount && itemCount > 0 && (
				<span className="absolute -top-1 -right-1 bg-ds-primary-sage text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
					{itemCount > 99 ? "99+" : itemCount}
				</span>
			)}
		</Link>
	);
};
