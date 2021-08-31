import express from "express";
import properties from "../../views/api/properties.json";

export const router = express.Router();

router.get("/", function (req, res) {
	// Assume only list page is needed.
	res.send(properties);
	return;
});
