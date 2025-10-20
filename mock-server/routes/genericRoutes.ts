// routes/genericRoutes.ts
import { loadDb } from "../utils/common-utils";
import { Request, Response } from "express";
import express from "express";

export const genericRoutes = (app: express.Application) => {
	app.get("/:resource", async (req: Request, res: Response) => {
		const db = await loadDb();
		const resource = req.params.resource;
		if (db[resource]) {
			res.json(db[resource]);
		} else {
			res.status(404).json({ error: "Resource not found" });
		}
	});
};
