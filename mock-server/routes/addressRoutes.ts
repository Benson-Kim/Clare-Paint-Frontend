// routes/addressRoutes.ts
import {
	getAddresses,
	addAddress,
	updateAddress,
	deleteAddress,
} from "../services/account-service";
import { Request, Response } from "express";
import express from "express";

export const addressRoutes = (app: express.Application) => {
	app.get("/addresses", async (req: Request, res: Response) => {
		const userId = parseInt(req.query.userId as string);
		if (isNaN(userId)) {
			return res.status(400).json({ error: "userId required" });
		}
		try {
			const addresses = await getAddresses(userId);
			res.json(addresses);
		} catch (error) {
			res.status(500).json({ error: "Server error" });
		}
	});

	app.post("/addresses", async (req: Request, res: Response) => {
		const newAddress = req.body;
		if (!newAddress.userId) {
			return res.status(400).json({ error: "userId required" });
		}
		try {
			const address = await addAddress(newAddress);
			res.status(201).json(address);
		} catch (error) {
			res.status(500).json({ error: "Server error" });
		}
	});

	app.put("/addresses/:id", async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const updatedAddress = req.body;
		try {
			const address = await updateAddress(id, updatedAddress);
			if (!address) {
				return res.status(404).json({ error: "Address not found" });
			}
			res.json(address);
		} catch (error) {
			res.status(500).json({ error: "Server error" });
		}
	});

	app.delete("/addresses/:id", async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		try {
			const success = await deleteAddress(id);
			if (!success) {
				return res.status(404).json({ error: "Address not found" });
			}
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: "Server error" });
		}
	});
};
