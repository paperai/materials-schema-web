/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DataType } from "./DataType";
import { Type } from "./Type";
import { Property } from "./Property";

// TODO: refactor to reduce similar codes.
export class Schema {
	private _dataTypes: Record<string, DataType> = {}; // {id1: dataType1, id2: dataType2}
	private _types: Record<string, Type> = {};
	private _properties: Record<string, Property> = {};

	public get dataTypes() {
		return this._dataTypes;
	}
	public get types() {
		return this._types;
	}
	public get properties() {
		return this._properties;
	}

	public get typesNameToId() {
		const ret: Record<string, string> = {};
		Object.values(this._types).map((type) => {
			ret[type.name] = type.id;
		});
		return ret;
	}

	public get propsNameToId() {
		const ret: Record<string, string> = {};
		Object.values(this._properties).map((prop) => {
			ret[prop.name] = prop.id;
		});
		return ret;
	}

	public addDataType(args: ConstructorParameters<typeof DataType>) {
		const id = args[0];
		if (typeof this.dataTypes[id] === "undefined") {
			this._dataTypes[id] = new DataType(...args);
		}
	}

	public addType(args: ConstructorParameters<typeof Type>) {
		const id = args[0];
		if (typeof this._types[id] === "undefined") {
			this._types[id] = new Type(...args);
		}
	}

	public addProperty(args: ConstructorParameters<typeof Property>) {
		const id = args[0];
		if (typeof this._properties[id] === "undefined") {
			this._properties[id] = new Property(...args);
		}
	}
}
