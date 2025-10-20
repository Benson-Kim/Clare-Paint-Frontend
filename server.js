import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import os from "os";

const app = express();
const PORT = 3001;
const DB_PATH = path.resolve("./db.json");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// --- Dynamically detect local IP for LAN access ---
function getLocalIp() {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			if (iface.family === "IPv4" && !iface.internal) {
				return iface.address;
			}
		}
	}
	return "localhost";
}

const FRONTEND_URL =
	process.env.NEXT_PUBLIC_API_URL || `http://${getLocalIp()}:3000`;

app.use(
	cors({
		origin: (incomingOrigin, callback) => {
			if (!incomingOrigin || incomingOrigin === FRONTEND_URL) {
				callback(null, true);
			} else {
				console.warn("Blocked CORS request from:", incomingOrigin);
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	})
);

app.use(express.json());

async function loadDb() {
	try {
		const data = await fs.readFile(DB_PATH, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading db.json:", error);
		return { users: [] };
	}
}

async function saveDb(data) {
	await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

app.post("/register", async (req, res) => {
	const { email, password, name, memberSince, avatar } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	const db = await loadDb();
	const existingUser = db.users.find((user) => user.email === email);

	if (existingUser) {
		return res.status(400).json({ error: "Email already exists" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		id: db.users.length + 1,
		email,
		password: hashedPassword,
		name: name || undefined,
		memberSince: memberSince || new Date().getFullYear().toString(),
		avatar: avatar || null,
	};

	db.users.push(newUser);
	await saveDb(db);

	const accessToken = jwt.sign({ id: newUser.id, email }, JWT_SECRET, {
		expiresIn: "1h",
	});

	res.status(201).json({
		accessToken,
		user: {
			id: newUser.id,
			email,
			name: newUser.name,
			memberSince: newUser.memberSince,
			avatar: newUser.avatar,
		},
	});
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	const db = await loadDb();
	const user = db.users.find((user) => user.email === email);

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).json({ error: "Invalid credentials" });
	}

	const accessToken = jwt.sign({ id: user.id, email }, JWT_SECRET, {
		expiresIn: "1h",
	});

	res.json({
		accessToken,
		user: {
			id: user.id,
			email,
			name: user.name,
			memberSince: user.memberSince,
			avatar: user.avatar,
		},
	});
});

app.get("/:resource", async (req, res) => {
	const db = await loadDb();
	const resource = req.params.resource;
	if (db[resource]) {
		res.json(db[resource]);
	} else {
		res.status(404).json({ error: "Resource not found" });
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`Express server is running on http://localhost:${PORT}`);
});
