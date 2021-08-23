import { DataType } from "./DataType";
import { Type } from "./Type";

export class Property {
	private _usedByTypesName: Set<string>;

	public get usedByTypesName() {
		return this._usedByTypesName;
	}

	constructor(
		readonly id: string,
		readonly name: string,
		readonly expectedTypes: string[] = [],
		readonly description = ""
	) {
		console.log("in Property");
		this._usedByTypesName = new Set();
	}

	public makeExpectedTypesName(recordedTypes: Record<string, Type>, recordedDataTypes: Record<string, DataType>) {
		const expectedTypesName: string[] = [];
		for (const typeIdOrDataTypeId of this.expectedTypes) {
			if (typeof recordedTypes[typeIdOrDataTypeId] !== "undefined") {
				expectedTypesName.push(recordedTypes[typeIdOrDataTypeId].name);
			}
			if (typeof recordedDataTypes[typeIdOrDataTypeId] !== "undefined") {
				expectedTypesName.push(recordedDataTypes[typeIdOrDataTypeId].name);
			}
		}
		return expectedTypesName;
	}

	public addUsedByType(typeId: string) {
		this._usedByTypesName.add(typeId);
	}
}
