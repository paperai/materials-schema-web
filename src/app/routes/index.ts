import express from "express";

export const router = express.Router();

/* GET home page. */
router.get("/", function (_, res) {
	res.render("index", { title: "Materials Schema Web" });
});
