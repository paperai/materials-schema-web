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
		this.makeDataTypes();
		this.makeTypes();
		this.makeProperties();
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
		}
	}

	private makeProperties(properties = this._material.properties) {
		if (!Array.isArray(properties) || properties.length == 0) return;

		for (const property of properties) {
			this._schema.addProperty([property.id, property.name, property.expectedTypes, property.description]); // TODO: make these args type dynamically depending on input.
		}
	}
}
