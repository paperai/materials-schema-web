import express from "express";

export const router = express.Router();

router.get("/:id?", function (req, res) {
	if (typeof req.params.id === "undefined") {
		res.render(`types.html`);
		return;
	}
	res.render(`types/${req.params.id}.html`);
});
