// lib/account-api.ts
import { UserAddress, AddressFormData } from "@/types/account";

export async function getAddresses(userId: number): Promise<UserAddress[]> {
	const res = await fetch(`/api/account/addresses?userId=${userId}`, {
		cache: "no-store",
	});
	if (!res.ok) throw new Error("Failed to fetch addresses");
	return res.json();
}

export async function addAddress(
	address: AddressFormData,
	userId: number
): Promise<UserAddress> {
	const res = await fetch("/api/account/addresses", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...address, userId }),
	});
	if (!res.ok) throw new Error("Failed to add address");
	return res.json();
}

export async function updateAddress(
	id: number,
	address: AddressFormData,
	userId: number
): Promise<UserAddress> {
	const res = await fetch(`/api/account/addresses/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...address, userId }),
	});
	if (!res.ok) throw new Error("Failed to update address");
	return res.json();
}

export async function deleteAddress(id: number): Promise<void> {
	const res = await fetch(`/api/account/addresses/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("Failed to delete address");
}
