import express from "express";

export const router = express.Router();

router.get("/:id?", function (req, res) {
	if (typeof req.params.id === "undefined") {
		res.render(`properties.html`);
		return;
	}
	res.render(`properties/${req.params.id}.html`);
});
