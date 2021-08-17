import express from "express";
// import path from "path";
// import * as express from "express";
// import * as path from "path";

// create express app
const app = express();
const port = 3333;

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/", indexRouter);

// app.listen(3333);

app.get("/", (req, res) => {
	res.send("init");
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
