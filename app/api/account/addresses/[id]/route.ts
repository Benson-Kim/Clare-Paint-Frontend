import { NextResponse } from "next/server";
import {
	updateAddress,
	deleteAddress,
} from "@/mock-server/services/account-service";

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = parseInt(params.id);
	if (isNaN(id)) {
		return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
	}
	const updatedAddress = await request.json();
	if (!updatedAddress.userId) {
		return NextResponse.json({ error: "userId required" }, { status: 400 });
	}
	try {
		const address = await updateAddress(id, updatedAddress);
		if (!address) {
			return NextResponse.json({ error: "Address not found" }, { status: 404 });
		}
		return NextResponse.json(address);
	} catch (error) {
		return NextResponse.json(
			{ error: `Server error: ${error}` },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = parseInt(params.id);
	if (isNaN(id)) {
		return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
	}
	try {
		const success = await deleteAddress(id);
		if (!success) {
			return NextResponse.json({ error: "Address not found" }, { status: 404 });
		}
		return new NextResponse(null, { status: 204 });
	} catch (error) {
		return NextResponse.json(
			{ error: `Server error: ${error}` },
			{ status: 500 }
		);
	}
}
