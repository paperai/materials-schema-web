import * as fs from "fs";
import path from "path";

import { MaterialParser } from "./src/parse/MaterialParser";
import { Page } from "./src/htmlWrite/Page";
import { TypeContent } from "./src/htmlWrite/TypeContent";
import { PropertyContent } from "./src/htmlWrite/PropertyContent";

if (typeof require !== "undefined" && require.main === module) {
	console.log("Program Start...");
	const parser = new MaterialParser();

	for (const [typeId, type] of Object.entries(parser.schema.types)) {
		const typeContent = new TypeContent(type, parser.schema);
		const pager = new Page(typeId, typeContent.writeTable());
		fs.writeFileSync(path.join(__dirname, "src", "app", "views", "types", `${type.name}.html`), pager.htmlStr, {
			encoding: "utf-8",
		});
	}

	for (const [propId, prop] of Object.entries(parser.schema.properties)) {
		const propContent = new PropertyContent(prop, parser.schema);
		const pager = new Page(propId, propContent.writeContent());
		fs.writeFileSync(path.join(__dirname, "src", "app", "views", "properties", `${prop.name}.html`), pager.htmlStr, {
			encoding: "utf-8",
		});
	}
	// console.log(pager.htmlStr);
	// console.log("dataTypes = " + JSON.stringify(parser.schema.dataTypes, undefined, 4));
	// console.log("types = " + JSON.stringify(parser.schema.types, undefined, 4));
}
