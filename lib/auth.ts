import { apiFetch } from "./api-service";

export interface AuthResponse {
	accessToken: string;
	user: {
		id: number;
		email: string;
		name?: string;
		memberSince?: string;
		avatar?: string | null;
	};
}

export interface RegisterPayload {
	email: string;
	password: string;
	name?: string;
	memberSince?: string;
	avatar?: string | null;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export async function registerUser(
	data: RegisterPayload
): Promise<AuthResponse> {
	try {
		const response = await apiFetch<AuthResponse>("/register", {
			method: "POST",
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				name: data.name,
				memberSince: data.memberSince || new Date().getFullYear().toString(),
				avatar: data.avatar || null,
			}),
		});

		return response;
	} catch (error) {
		console.error("Registration error:", error);
		throw error;
	}
}

export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
	try {
		const response = await apiFetch<AuthResponse>("/login", {
			method: "POST",
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		});

		return response;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
}

export function saveAuth(auth: AuthResponse) {
	localStorage.setItem("auth_token", auth.accessToken);
	localStorage.setItem("auth_user", JSON.stringify(auth.user));
}

export function getAuthToken() {
	return localStorage.getItem("auth_token");
}

export function getAuthUser() {
	const data = localStorage.getItem("auth_user");
	return data ? JSON.parse(data) : null;
}

export function logoutUser() {
	localStorage.removeItem("auth_token");
	localStorage.removeItem("auth_user");
}
