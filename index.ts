import { MaterialParser } from "./src/parse/MaterialParser";
if (typeof require !== "undefined" && require.main === module) {
	console.log("Program Start...");
	const parser = new MaterialParser();
	console.log("dataTypes = " + JSON.stringify(parser.schema.dataTypes, undefined, 4));
	console.log("types = " + JSON.stringify(parser.schema.types, undefined, 4));
}
