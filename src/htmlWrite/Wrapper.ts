import { Schema } from "../schema/Schema";

export class Wrapper {
	public static hyperlinkOne(typesOrProperties: "types" | "properties", name: string, schema: Schema) {
		let hasLink = false;
		if (typesOrProperties === "types" && typeof schema.typesNameToId[name] !== "undefined") {
			hasLink = true;
		}
		if (typesOrProperties == "properties" && typeof schema.propsNameToId[name] !== "undefined") {
			hasLink = true;
		}
		if (hasLink) {
			return `<a href="/${typesOrProperties}/${name}">${name}</a>`;
		}
		return name;
	}
	public static hyperlinkMany(typesOrProperties: "types" | "properties", names: string[], schema: Schema) {
		const ret: string[] = [];
		for (const name of names) {
			ret.push(Wrapper.hyperlinkOne(typesOrProperties, name, schema));
		}
		return ret;
	}
}
