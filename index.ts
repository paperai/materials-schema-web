import * as fs from "fs";
// import path from "path";
// path.join(__dirname, "public")

import { MaterialParser } from "./src/parse/MaterialParser";
import { Page } from "./src/htmlWrite/Page";
import { TypeContent } from "./src/htmlWrite/TypeContent";

if (typeof require !== "undefined" && require.main === module) {
	console.log("Program Start...");
	const parser = new MaterialParser();
	const typer = new TypeContent("T100", parser.schema);
	const pager = new Page("T100", typer.writeTable());
	fs.writeFileSync("out.html", pager.htmlStr, { encoding: "utf-8" });
	// console.log(pager.htmlStr);
	// console.log("dataTypes = " + JSON.stringify(parser.schema.dataTypes, undefined, 4));
	// console.log("types = " + JSON.stringify(parser.schema.types, undefined, 4));
}
