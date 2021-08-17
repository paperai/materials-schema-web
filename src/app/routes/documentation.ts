import express from "express";

export const router = express.Router();

/* GET home page. */
router.get("/documentation", function (_, res) {
	res.render("documentation", {});
});
