import { Property } from "./Property";

export class Type {
	constructor(readonly id: string, readonly name: string, readonly properties: string[] = []) {
		console.log("in Type");
	}
	// Custom set fucntion because setter/getter does not allow types that differ from args.
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
