import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	getAuthUser,
	getAuthToken,
	loginUser,
	logoutUser,
	registerUser,
	saveAuth,
} from "@/lib/auth";
import { toast } from "@/lib/toast";

export type DashboardSection =
	| "dashboard"
	| "order-history"
	| "saved-colors"
	| "project-gallery"
	| "addresses"
	| "payment-methods"
	| "color-recommendations"
	| "paint-usage";

interface AccountStore {
	activeSection: DashboardSection;

	setActiveSection: (section: DashboardSection) => void;

	isMobileMenuOpen: boolean;

	setIsMobileMenuOpen: (isOpen: boolean) => void;
}

interface AuthUser {
	id: number;
	email: string;
	name?: string;
	avatar?: string | null;
	memberSince?: string;
}

interface AuthState {
	user: AuthUser | null;
	accessToken: string | null;
	loading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	register: (payload: {
		email: string;
		password: string;
		name?: string;
	}) => Promise<void>;
	logout: () => void;
	hydrate: () => void;
	refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			loading: false,
			error: null,

			hydrate: () => {
				const token = getAuthToken();
				const savedUser = getAuthUser();
				if (token && savedUser) {
					set({
						user: savedUser,
						accessToken: token,
						loading: false,
						error: null,
					});
				}
			},

			login: async (email: string, password: string) => {
				set({ loading: true, error: null });
				try {
					const auth = await loginUser({ email, password });

					// Persist tokens
					saveAuth(auth);
					set({
						user: auth.user,
						accessToken: auth.accessToken,
						loading: false,
					});

					toast.success("Successfully logged in!");
				} catch (err) {
					const errorMessage =
						err instanceof Error ? err.message : "Invalid credentials";
					toast.error(errorMessage);
					set({ loading: false, error: errorMessage });
					throw err;
				}
			},

			register: async (payload) => {
				set({ loading: true, error: null });
				try {
					const memberSince = new Date().getFullYear().toString();
					const auth = await registerUser({
						email: payload.email,
						password: payload.password,
						name: payload.name,
						memberSince,
						avatar: null,
					});

					saveAuth(auth);
					set({
						user: auth.user,
						accessToken: auth.accessToken,
						loading: false,
					});

					toast.success("Account created successfully!");
				} catch (err) {
					const errorMessage =
						err instanceof Error ? err.message : "Failed to register";
					toast.error(errorMessage);
					set({ loading: false, error: errorMessage });
					throw err;
				}
			},

			logout: () => {
				logoutUser();
				set({
					user: null,
					accessToken: null,
					loading: false,
					error: null,
				});
				toast.success("Logged out successfully");
			},

			refreshAccessToken: async () => {
				// Simple refresh logic: re-login if token is expired (or implement proper refresh endpoint)
				// For now, since our Express server doesn't have refresh tokens, just logout on 401
				const { logout } = get();
				logout();
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
			}),
		}
	)
);

export const useAccountStore = create<AccountStore>()(
	persist(
		(set) => ({
			activeSection: "dashboard",
			setActiveSection: (section) => set({ activeSection: section }),
			isMobileMenuOpen: false,
			setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
		}),

		{
			name: "account-storage",
			partialize: (state) => ({ activeSection: state.activeSection }),
		}
	)
);
