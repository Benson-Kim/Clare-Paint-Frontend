// app/api/addresses/route.ts
import {
	addAddress,
	getAddresses,
} from "@/mock-server/services/account-service";
import { NextResponse } from "next/server";
// import { getAddresses, addAddress } from "@/services/account-service";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const userId = parseInt(searchParams.get("userId") || "NaN");
	if (isNaN(userId)) {
		return NextResponse.json({ error: "userId required" }, { status: 400 });
	}
	try {
		const addresses = await getAddresses(userId);
		return NextResponse.json(addresses);
	} catch (error) {
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const newAddress = await request.json();
	if (!newAddress.userId) {
		return NextResponse.json({ error: "userId required" }, { status: 400 });
	}
	try {
		const address = await addAddress(newAddress);
		return NextResponse.json(address, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
