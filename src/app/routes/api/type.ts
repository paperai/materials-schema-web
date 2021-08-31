import express from "express";
import types from "../../views/api/types.json";

export const router = express.Router();

router.get("/", function (req, res) {
	// Assume only list page is needed.
	res.send(types);
	return;
});
