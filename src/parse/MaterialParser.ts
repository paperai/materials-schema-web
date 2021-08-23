import { Schema } from "../schema/Schema";
import dataToBeParsed from "../../material.json";

export class MaterialParser {
	private _material = dataToBeParsed;
	private _schema: Schema;
	public get schema() {
		return this._schema;
	}
	constructor() {
		this._schema = new Schema();
		this.makeProperties(); // Must be first one to be executed for building usedByTypes
		this.makeDataTypes();
		this.makeTypes();
	}

	private makeDataTypes(dataTypes = this._material.dataTypes) {
		if (!Array.isArray(dataTypes) || dataTypes.length == 0) return;

		for (const dataType of dataTypes) {
			this._schema.addDataType([dataType.id, dataType.name]); // TODO: make these args type dynamically depending on input.
		}
	}

	private makeTypes(types = this._material.types) {
		if (!Array.isArray(types) || types.length == 0) return;

		for (const type of types) {
			this._schema.addType([type.id, type.name, type.properties]); // TODO: make these args type dynamically depending on input.

			// Add connection from prop to type.
			for (const propId of type.properties) {
				if (typeof this._schema.properties[propId] !== "undefined") {
					this._schema.properties[propId].addUsedByType(type.name);
				}
			}
		}
	}

	private makeProperties(properties = this._material.properties) {
		if (!Array.isArray(properties) || properties.length == 0) return;

		for (const property of properties) {
			this._schema.addProperty([property.id, property.name, property.expectedTypes, property.description]); // TODO: make these args type dynamically depending on input.
		}
	}
}
