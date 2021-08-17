import express from "express";

export const router = express.Router();

/* GET home page. */
router.get("/schema", function (_, res) {
	res.render("schema", {});
});
