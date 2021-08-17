import express from "express";
import { MaterialParser } from "../../parse/MaterialParser";

export const routerWrapper = function (parser: MaterialParser) {
	const router = express.Router();
	router.get("/schema", function (_, res) {
		res.render("schema", {});
	});
	return router;
};
