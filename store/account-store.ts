import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	getAuthUser,
	loginUser,
	logoutUser,
	registerUser,
	saveAuth,
} from "@/lib/auth";
import { toast } from "@/lib/toast";

interface AuthUser {
	id: number;
	email: string;
	name?: string;
	avatar?: string | null;
	memberSince?: string;
}

// interface AuthResponse {
// 	accessToken: string;
// 	user: AuthUser;
// }

interface AuthStore {
	user: AuthUser | null;
	accessToken: string | null;
	loading: boolean;
	error?: string;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	hydrate: () => void;
	refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			loading: false,
			error: undefined,

			hydrate: () => {
				const savedUser = getAuthUser();
				if (savedUser) {
					set({ user: savedUser, loading: false, error: undefined });
				}
			},

			login: async (email: string, password: string) => {
				set({ loading: true, error: undefined });
				try {
					const auth = await loginUser({ email, password });

					// persist tokens
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

			register: async (name: string, email: string, password: string) => {
				set({ loading: true, error: undefined });
				try {
					const memberSince = new Date().getFullYear().toString();
					const auth = await registerUser({
						name,
						email,
						password,
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
					error: undefined,
				});
				toast.success("Logged out successfully");
			},

			refreshAccessToken: async () => {
				const accessToken = get().accessToken;
				if (!accessToken) {
					get().logout();
				}
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
