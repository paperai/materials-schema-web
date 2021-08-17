/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DataType } from "./DataType";
import { Type } from "./Type";
import { Property } from "./Property";
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

	public addDataType(args: ConstructorParameters<typeof DataType>) {
		const id = args[0];
		if (typeof this.dataTypes[id] === "undefined") {
			this.dataTypes[id] = new DataType(...args);
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
		if (typeof this._types[id] === "undefined") {
			this._types[id] = new Property(...args);
		}
	}
}
