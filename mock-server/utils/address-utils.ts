import { UserAddress } from "@/types/account";

export function generateAddressId(addresses: UserAddress[]): number {
	return Math.max(...addresses.map((a) => a.id || 0), 0) + 1;
}

export function ensureDefaultAddress(
	addresses: UserAddress[],
	newAddress: UserAddress
): UserAddress[] {
	if (
		newAddress.isDefault ||
		addresses.filter((addr) => addr.userId === newAddress.userId).length === 0
	) {
		return addresses.map((addr) =>
			addr.userId === newAddress.userId ? { ...addr, isDefault: false } : addr
		);
	}
	return addresses;
}
