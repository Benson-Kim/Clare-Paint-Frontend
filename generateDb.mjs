import fs from "fs";
import path from "path";

const dataDir = path.resolve("./data");
const outputFile = path.resolve("./db.json");

const db = {};

fs.readdirSync(dataDir)
	.filter((f) => f.endsWith(".json"))
	.forEach((file) => {
		const name = file
			.replace(/^mock[-_]?/i, "")
			.replace(/\.json$/, "")
			.toLowerCase();

		const filePath = path.join(dataDir, file);
		const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));

		// 🧠 Flatten nested object if needed (e.g. { products: [...] } → [...])
		if (
			typeof parsed === "object" &&
			!Array.isArray(parsed) &&
			parsed[name] &&
			Array.isArray(parsed[name])
		) {
			db[name] = parsed[name];
		} else {
			db[name] = parsed;
		}
	});

if (!db.users) {
	db.users = [];
}

fs.writeFileSync(outputFile, JSON.stringify(db, null, 2));
console.log("Combined all JSON files into db.json");
