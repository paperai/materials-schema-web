import express from "express";

export const router = express.Router();

router.get("/", function (req, res) {
	// Assume only list page is needed.
	res.render(`api/properties.html`);
	return;
});
