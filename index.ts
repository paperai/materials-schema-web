import * as fs from "fs";
import path from "path";

import { MaterialParser } from "./src/parse/MaterialParser";
import { Page } from "./src/htmlWrite/Page";
import { TypeContent } from "./src/htmlWrite/TypeContent";
import { PropertyContent } from "./src/htmlWrite/PropertyContent";

if (typeof require !== "undefined" && require.main === module) {
	console.log("Html Creation Start...");
	const parser = new MaterialParser();

	// Write index.html as home page
	fs.writeFileSync(
		path.join(__dirname, "src", "app", "views", "index.html"),
		new Page("", `<h1 class="m-5">Welcom to Material Schema Web</h1>`).htmlStr,
		{
			encoding: "utf-8",
		}
	);

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
	console.log("Html Creation End...");
}
