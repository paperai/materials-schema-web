import { Property } from "./Property";

export class Type {
	/**
	 * @param id - unique; recommend to starts with "T" for the ease of distinguishment
	 * @param name - should be assigned in camelcase
	 * @param properties - all `Property`s' `id` this Type has
	 */
	constructor(readonly id: string, readonly name: string, readonly properties: string[] = []) {}

	/**
	 * Making all `Property`s' `name` this Type has.
	 * @note should make this function into class property if it will be called multiple times.
	 */
	public makePropertiesName(recordedProps: Record<string, Property>) {
		const propertiesName: string[] = [];
		for (const propId of this.properties) {
			if (typeof recordedProps[propId] !== "undefined") {
				propertiesName.push(recordedProps[propId].name);
			}
		}
		return propertiesName;
	}
}
