import { DataType } from "./DataType";
import { Type } from "./Type";

export class Property {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly expectedTypes: string[] = [],
		readonly description = ""
	) {
		console.log("in Property");
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
}
