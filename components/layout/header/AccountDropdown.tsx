"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
	User,
	LogIn,
	UserPlus,
	Package,
	Heart,
	Settings,
	LogOut,
	Eye,
	EyeOff,
	X,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/account-store";

interface AccountDropdownProps {
	onClose: () => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
	onClose,
}) => {
	const { user, login, register, logout, error, hydrate } = useAuthStore();

	const [showLoginForm, setShowLoginForm] = useState(false);
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		hydrate();
	}, [hydrate]);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email = e.currentTarget.email.value;
		const password = e.currentTarget.password.value;
		await login(email, password);
		if (!error) {
			setShowLoginForm(false);
			onClose();
		}
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const firstname = e.currentTarget.firstname.value;
		const lastname = e.currentTarget.lastname.value;
		const fullname = `${firstname} ${lastname}`;
		const email = e.currentTarget.email.value;
		const password = e.currentTarget.password.value;

		await register({ email, password, name: fullname }); // Pass object
		if (!error) {
			setShowRegisterForm(false);
			onClose();
		}
	};

	if (user) {
		return (
			<div className="absolute top-full right-0 mt-2 w-72 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-xl z-50 overflow-hidden">
				{/* User Info */}
				<div className="p-4 border-b border-ds-neutral-lightGray bg-ds-primary-cream/20">
					<div className="flex items-center space-x-3">
						<div className="w-12 h-12 bg-ds-primary-sage rounded-full flex items-center justify-center">
							{user.avatar ? (
								<Image
									src={user.avatar}
									alt={user.name || "avatar"}
									width={48}
									height={48}
									className="rounded-full object-cover"
								/>
							) : (
								<User className="w-6 h-6 text-ds-neutral-white" />
							)}
						</div>
						<div>
							<p className="font-medium text-ds-primary-charcoal">
								{user.name}
							</p>
							<p className="text-sm text-ds-neutral-mediumGray">{user.email}</p>
							<p className="text-xs text-ds-neutral-mediumGray">
								Member since {user.memberSince}
							</p>
						</div>
					</div>
				</div>

				{/* Menu Items */}
				<div className="p-2">
					<Link
						href="/account"
						onClick={onClose}
						className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group"
					>
						<User className="w-5 h-5 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
						<div>
							<span className="text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200 font-medium">
								My Account
							</span>
							<p className="text-xs text-ds-neutral-mediumGray">
								Profile and preferences
							</p>
						</div>
					</Link>

					<Link
						href="/account/orders"
						onClick={onClose}
						className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group"
					>
						<Package className="w-5 h-5 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
						<div>
							<span className="text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200 font-medium">
								Order History
							</span>
							<p className="text-xs text-ds-neutral-mediumGray">
								Track your orders
							</p>
						</div>
					</Link>

					<Link
						href="/wishlist"
						onClick={onClose}
						className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group"
					>
						<Heart className="w-5 h-5 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
						<div>
							<span className="text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200 font-medium">
								Wishlist
							</span>
							<p className="text-xs text-ds-neutral-mediumGray">Saved items</p>
						</div>
					</Link>

					<Link
						href="/account/settings"
						onClick={onClose}
						className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group"
					>
						<Settings className="w-5 h-5 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
						<div>
							<span className="text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200 font-medium">
								Settings
							</span>
							<p className="text-xs text-ds-neutral-mediumGray">
								Account preferences
							</p>
						</div>
					</Link>

					<button
						onClick={() => {
							// Handle logout
							logout();
							onClose();
						}}
						className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 group w-full text-left"
					>
						<LogOut className="w-5 h-5 text-ds-neutral-mediumGray group-hover:text-red-600 transition-colors duration-200" />
						<div>
							<span className="text-ds-neutral-darkSlate group-hover:text-red-600 transition-colors duration-200 font-medium">
								Sign Out
							</span>
							<p className="text-xs text-ds-neutral-mediumGray">
								See you soon!
							</p>
						</div>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="absolute top-full right-0 mt-2 w-80 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-xl z-50 overflow-hidden">
			{/* Welcome Message */}
			<div className="p-4 border-b border-ds-neutral-lightGray bg-ds-primary-cream/20">
				<h3 className="font-semibold text-ds-primary-charcoal mb-1">
					Welcome to Clare Paint!
				</h3>
				<p className="text-sm text-ds-neutral-mediumGray">
					Sign in to access your account and track orders.
				</p>
			</div>

			{/* Auth Forms */}
			{showLoginForm ? (
				<div className="p-4">
					<div className="flex items-center justify-between mb-4">
						<h4 className="font-semibold text-ds-primary-charcoal">Sign In</h4>
						<button
							onClick={() => setShowLoginForm(false)}
							className="text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
						>
							<X className="w-4 h-4" />
						</button>
					</div>

					<form onSubmit={handleLogin} className="space-y-3">
						<div>
							<label htmlFor="login-email" className="sr-only">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="login-email"
								placeholder="Email address"
								className="w-full px-3 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-0 focus:ring-ds-primary-sage focus:border-transparent text-sm"
								required
							/>
						</div>
						<div className="relative">
							<label htmlFor="login-password" className="sr-only">
								Password
							</label>
							<input
								type={showPassword ? "text" : "password"}
								id="login-password"
								name="password"
								placeholder="Password"
								className="w-full px-3 py-2 pr-10 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent text-sm"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
						<button
							type="submit"
							className="w-full py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium text-sm"
						>
							Sign In
						</button>
						<div className="text-center">
							<button
								type="button"
								onClick={() => {
									setShowLoginForm(false);
									setShowRegisterForm(true);
								}}
								className="text-sm text-ds-primary-sage hover:underline"
							>
								Don&apos;t have an account? Sign up
							</button>
						</div>
					</form>
				</div>
			) : showRegisterForm ? (
				<div className="p-4">
					<div className="flex items-center justify-between mb-4">
						<h4 className="font-semibold text-ds-primary-charcoal">
							Create Account
						</h4>
						<button
							onClick={() => setShowRegisterForm(false)}
							className="text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
						>
							<X className="w-4 h-4" />
						</button>
					</div>

					<form onSubmit={handleRegister} className="space-y-3">
						<div className="grid grid-cols-2 gap-2">
							<input
								type="text"
								name="firstname"
								placeholder="First name"
								className="px-3 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent text-sm"
								required
							/>
							<input
								type="text"
								name="lastname"
								placeholder="Last name"
								className="px-3 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent text-sm"
								required
							/>
						</div>
						<input
							type="email"
							name="email"
							placeholder="Email address"
							className="w-full px-3 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent text-sm"
							required
						/>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Password"
								className="w-full px-3 py-2 pr-10 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent text-sm"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
						<button
							type="submit"
							className="w-full py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium text-sm"
						>
							Create Account
						</button>
						<div className="text-center">
							<button
								type="button"
								onClick={() => {
									setShowRegisterForm(false);
									setShowLoginForm(true);
								}}
								className="text-sm text-ds-primary-sage hover:underline"
							>
								Already have an account? Sign in
							</button>
						</div>
					</form>
				</div>
			) : (
				/* Auth Actions */
				<div className="p-4 space-y-3">
					<button
						onClick={() => setShowLoginForm(true)}
						className="flex items-center justify-center space-x-2 w-full py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
					>
						<LogIn className="w-5 h-5" />
						<span>Sign In</span>
					</button>

					<button
						onClick={() => setShowRegisterForm(true)}
						className="flex items-center justify-center space-x-2 w-full py-3 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium"
					>
						<UserPlus className="w-5 h-5" />
						<span>Create Account</span>
					</button>

					{/* Guest Features */}
					<div className="pt-3 border-t border-ds-neutral-lightGray">
						<Link
							href="/consultation"
							onClick={onClose}
							className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group"
						>
							<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200">
								Free Color Consultation
							</span>
						</Link>

						<Link
							href="/trade-program"
							onClick={onClose}
							className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 group"
						>
							<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200">
								Professional Trade Program
							</span>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
