import { Type } from "../schema/Type";
import { Property } from "../schema/Property";

export class StaticParser {
	constructor() {
		throw new Error("DO NOT CALL THIS CLASS USING INSTANCE!");
	}

	public static makeSortedName(typesOrPropsOrNames: Record<string, Type> | Record<string, Property> | string[]) {
		let ret: string[] = [];
		if (Array.isArray(typesOrPropsOrNames)) return typesOrPropsOrNames.sort();

		if (Object.keys(typesOrPropsOrNames).length == 0) return ret;

		const typesOrProps = typesOrPropsOrNames;
		ret = Object.values(typesOrProps).map((typeOrProp) => {
			return typeOrProp.name;
		});
		return ret.sort();
	}
}
