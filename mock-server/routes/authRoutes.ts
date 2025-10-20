// routes/authRoutes.ts
import bcrypt from "bcryptjs";
import { loadDb, saveDb } from "../utils/common-utils";
import { Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const authRoutes = (app: express.Express) => {
	app.post("/register", async (req: Request, res: Response) => {
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

	app.post("/login", async (req: Request, res: Response) => {
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
};
