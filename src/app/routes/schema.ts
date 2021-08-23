import express from "express";

export const router = express.Router();

router.get("schema", function (_, res) {
	res.render(`schema.html`);
});
