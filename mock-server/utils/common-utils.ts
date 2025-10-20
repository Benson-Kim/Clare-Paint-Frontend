import { UserAddress } from "@/types/account";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.resolve("./db.json");

export interface Database {
	users: {
		id: number;
		email: string;
		password: string;
		name?: string;
		memberSince: string;
		avatar?: string | null;
	}[];
	addresses: UserAddress[];
	// Add other arrays (e.g., paymentMethods) as needed
}

export async function loadDb(): Promise<Database> {
	try {
		const data = await fs.readFile(DB_PATH, "utf8");
		return JSON.parse(data) as Database;
	} catch (error) {
		console.error("Error reading db.json:", error);
		return { users: [], addresses: [] };
	}
}

export async function saveDb(data: Database): Promise<void> {
	await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
