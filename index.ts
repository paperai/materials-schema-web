import * as fs from "fs";
import path from "path";

import dataToBeParsed from "./material.json";

import { MaterialParser } from "./src/parse/MaterialParser";
import { StaticParser } from "./src/parse/StaticParser";
import { Page } from "./src/htmlWrite/Page";
import { TypeContent } from "./src/htmlWrite/TypeContent";
import { PropertyContent } from "./src/htmlWrite/PropertyContent";
import { TypesList } from "./src/htmlWrite/TypesList";
import { PropertiesList } from "./src/htmlWrite/PropertiesList";

/**
 * Write static html pages based on `material.json`.
 */
if (typeof require !== "undefined" && require.main === module) {
	// TODO: maybe add a validator class if validation content grows.
	let hasDuplicateId = false;
	const duplicateDataTypeIds = StaticParser.findDuplicate<string>(
		dataToBeParsed.dataTypes.map((eachMap) => eachMap.id)
	);
	const duplicateTypeIds = StaticParser.findDuplicate<string>(dataToBeParsed.types.map((eachMap) => eachMap.id));
	const duplicatePropertyIds = StaticParser.findDuplicate<string>(
		dataToBeParsed.properties.map((eachMap) => eachMap.id)
	);
	for (const duplicateIds of [duplicateDataTypeIds, duplicateTypeIds, duplicatePropertyIds]) {
		if (duplicateIds.length > 0) {
			console.log("\x1b[31m" + "Duplicate Ids exist: " + duplicateIds.join(", "));
			hasDuplicateId = true;
		}
	}

	// Stop the program if any duplicate id exists.
	if (hasDuplicateId) {
		console.log("Please resolve all duplicate Ids and then execute program again." + "\x1b[0m");
		process.exit(0);
	}

	console.log("\x1b[32m");
	console.log("Html Creation Start... \n", "\x1b[0m");

	const parser = new MaterialParser();

	// Write index.html as home page
	let indexContent = `<div class="m-5">`;
	indexContent += `<h1>Welcome to Material Schema Web</h1>`;
	indexContent += `<div class="tot-count m-5">`;
	indexContent += `<h4 class="type-count">Types all list (<a href="/types">${
		Object.keys(parser.schema.types).length
	}</a>)</h4>`;
	indexContent += `<h4 class="prop-count">Properties all list (<a href="/properties">${
		Object.keys(parser.schema.properties).length
	}</a>)</h4>`;
	indexContent += `</div>`;
	indexContent += `</div>`;
	fs.writeFileSync(path.join(__dirname, "src", "app", "views", "index.html"), new Page("", indexContent).htmlStr, {
		encoding: "utf-8",
	});

	// Write types.html
	console.log("Start writing  Type html pages...");
	const typeList = new TypesList(parser.schema);
	fs.writeFileSync(path.join(__dirname, "src", "app", "views", "types.html"), new Page("", typeList.write()).htmlStr, {
		encoding: "utf-8",
	});

	for (const [typeId, type] of Object.entries(parser.schema.types)) {
		const typeContent = new TypeContent(type, parser.schema);
		const pager = new Page(typeId, typeContent.writeTable());
		fs.writeFileSync(path.join(__dirname, "src", "app", "views", "types", `${type.name}.html`), pager.htmlStr, {
			encoding: "utf-8",
		});
	}
	console.log("Finish writing Type html pages. \n");

	// Write properties.html
	console.log("Start writing Propertie html pages...");
	const propertiesList = new PropertiesList(parser.schema);
	fs.writeFileSync(
		path.join(__dirname, "src", "app", "views", "properties.html"),
		new Page("", propertiesList.write()).htmlStr,
		{
			encoding: "utf-8",
		}
	);

	for (const [propId, prop] of Object.entries(parser.schema.properties)) {
		const propContent = new PropertyContent(prop, parser.schema);
		const pager = new Page(propId, propContent.writeContent());
		fs.writeFileSync(path.join(__dirname, "src", "app", "views", "properties", `${prop.name}.html`), pager.htmlStr, {
			encoding: "utf-8",
		});
	}
	console.log("Finish writing Propertie html pages... \n");

	console.log("Start writing api json pages...");
	// const apiHtmlStartStr = `<html><script>myHeaders = response.headers;myHeaders.set('Content-Type', 'application/json');</script><head><meta http-equiv="content-type" content="application/json"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">`;
	// const apiHtmlEndStr = `</pre></body></html>`;
	fs.writeFileSync(
		path.join(__dirname, "src", "app", "views", "api", "types.json"),
		// apiHtmlStartStr + JSON.stringify(Object.values(parser.schema.types)) + apiHtmlEndStr,
		JSON.stringify(Object.values(parser.schema.types)),
		{
			encoding: "utf-8",
		}
	);
	fs.writeFileSync(
		path.join(__dirname, "src", "app", "views", "api", "properties.json"),
		// apiHtmlStartStr + JSON.stringify(Object.values(parser.schema.properties)) + apiHtmlEndStr,
		JSON.stringify(Object.values(parser.schema.properties)),
		{
			encoding: "utf-8",
		}
	);
	console.log("Finish writing api json pages... \n");

	console.log("\x1b[32m");
	console.log("Html Creation End...", "\x1b[0m");
}
