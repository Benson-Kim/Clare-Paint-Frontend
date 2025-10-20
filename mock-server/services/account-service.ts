// services/account-service.ts
import { loadDb, saveDb } from "../utils/common-utils";
import { UserAddress } from "@/types/account";
import {
	generateAddressId,
	ensureDefaultAddress,
} from "../utils/address-utils";

export async function getAddresses(userId: number): Promise<UserAddress[]> {
	const db = await loadDb();
	return (db.addresses || []).filter((addr) => addr.userId === userId);
}

export async function addAddress(
	newAddress: Partial<UserAddress>
): Promise<UserAddress> {
	const db = await loadDb();
	db.addresses = db.addresses || [];
	const address: UserAddress = {
		id: generateAddressId(db.addresses),
		userId: newAddress.userId!,
		firstName: newAddress.firstName!,
		lastName: newAddress.lastName!,
		company: newAddress.company,
		address1: newAddress.address1!,
		address2: newAddress.address2,
		city: newAddress.city!,
		state: newAddress.state!,
		zipCode: newAddress.zipCode!,
		country: newAddress.country!,
		phone: newAddress.phone,
		isDefault: newAddress.isDefault || false,
		type: newAddress.type || "both",
	};

	db.addresses = ensureDefaultAddress(db.addresses, address);
	if (
		address.isDefault ||
		db.addresses.filter((addr) => addr.userId === address.userId).length === 0
	) {
		address.isDefault = true;
	}

	db.addresses.push(address);
	await saveDb(db);
	return address;
}

export async function updateAddress(
	id: number,
	updatedAddress: Partial<UserAddress>
): Promise<UserAddress | null> {
	const db = await loadDb();
	db.addresses = db.addresses || [];
	const index = db.addresses.findIndex((addr) => addr.id === id);
	if (index === -1 || db.addresses[index].userId !== updatedAddress.userId) {
		return null;
	}

	if (updatedAddress.isDefault) {
		db.addresses = db.addresses.map((addr) =>
			addr.userId === updatedAddress.userId && addr.id !== id
				? { ...addr, isDefault: false }
				: addr
		);
	}

	const address: UserAddress = {
		...db.addresses[index],
		...updatedAddress,
		id,
		userId: updatedAddress.userId!,
		type: updatedAddress.type || db.addresses[index].type,
		isDefault: updatedAddress.isDefault ?? db.addresses[index].isDefault,
	};
	db.addresses[index] = address;
	await saveDb(db);
	return address;
}

export async function deleteAddress(id: number): Promise<boolean> {
	const db = await loadDb();
	db.addresses = db.addresses || [];
	const index = db.addresses.findIndex((addr) => addr.id === id);
	if (index === -1) {
		return false;
	}
	const userId = db.addresses[index].userId;
	const isDefault = db.addresses[index].isDefault;

	db.addresses.splice(index, 1);

	if (isDefault) {
		const remaining = db.addresses.filter((addr) => addr.userId === userId);
		if (remaining.length > 0) {
			remaining[0].isDefault = true;
		}
	}

	await saveDb(db);
	return true;
}
