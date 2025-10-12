import fs from "fs";
import path from "path";

const dataDir = path.resolve("./data");
const outputFile = path.resolve("./db.json");

const db = {};

fs.readdirSync(dataDir)
	.filter((f) => f.endsWith(".json"))
	.forEach((file) => {
		const name = file
			.replace(/^mock/i, "") // remove “mock” prefix
			.replace(/\.json$/, "") // remove extension
			.toLowerCase();
		const filePath = path.join(dataDir, file);
		db[name] = JSON.parse(fs.readFileSync(filePath, "utf8"));
	});

fs.writeFileSync(outputFile, JSON.stringify(db, null, 2));
console.log("✅ Combined all JSON files into db.json");
