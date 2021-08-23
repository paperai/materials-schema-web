import express from "express";
import { MaterialParser } from "../../parse/MaterialParser";

export const router = express.Router();

router.get("/:id?", function (req, res) {
	if (typeof req.params.id === "undefined") {
		const parser = new MaterialParser();
		console.log(Object.values(parser.schema.types));
		res.send(parser.schema.types); // TODO: Make parser as a singleton to prevent parsing multiple times.
		return;
	}
	res.render(`types/${req.params.id}.html`);
});
