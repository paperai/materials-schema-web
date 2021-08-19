import ejs from "ejs"; // Use ejs to help organize html files like view engine.
import express from "express";
import path from "path";

import { router as indexRouter } from "./routes/index";
import { router as schemaRouter } from "./routes/schema";
import { router as typeRouter } from "./routes/type";
import { router as propertyRouter } from "./routes/property";
// import { routerWrapper as typeRouterWrapper } from "./routes/type";

// import { MaterialParser } from "../parse/MaterialParser";

// create express app
const app = express();
const port = 3333;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

// app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/", schemaRouter);
app.use("/types/", typeRouter);
app.use("/properties/", propertyRouter);

app.listen(port);
