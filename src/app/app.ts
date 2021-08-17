import express from "express";
import path from "path";
import { router as indexRouter } from "./routes/index";
import { router as schemaRouter } from "./routes/schema";
import { router as documentationRouter } from "./routes/documentation";
import { routerWrapper as typeRouterWrapper } from "./routes/type";

import { MaterialParser } from "../parse/MaterialParser";

// create express app
const app = express();
const port = 3333;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/", schemaRouter);
app.use("/", documentationRouter);
const parser = new MaterialParser();
app.use(
	"/",
	typeRouterWrapper({
		parser: parser,
	})
);

app.listen(port);
