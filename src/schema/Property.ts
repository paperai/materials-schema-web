import { DataType } from "./DataType";
import { Type } from "./Type";

/**
 * Class Property.
 */
export class Property {
	private _usedByTypesName: Set<string>;

	public get usedByTypesName() {
		return this._usedByTypesName;
	}

	/**
	 * @param id - unique; recommend to starts with "P" for the ease of distinguishment
	 * @param name - should be assigned in camelcase
	 * @param expectedTypes - all `Type`s' `id` in which this `Property` can be found
	 * @param description
	 */
	constructor(
		readonly id: string,
		readonly name: string,
		readonly expectedTypes: string[] = [], // Type in Id format.
		readonly description = ""
	) {
		this._usedByTypesName = new Set();
	}

	/**
	 * Making all `Type`s' `name` in which this `Property` can be found.
	 * @note should make this function into class property if it will be called multiple times.
	 */
	public makeExpectedTypesName(recordedTypes: Record<string, Type> | Record<string, DataType>) {
		const expectedTypesName: string[] = [];
		for (const typeIdOrDataTypeId of this.expectedTypes) {
			if (typeof recordedTypes[typeIdOrDataTypeId] !== "undefined") {
				expectedTypesName.push(recordedTypes[typeIdOrDataTypeId].name);
			}
		}
		return expectedTypesName;
	}

	public addUsedByType(typeId: string) {
		this._usedByTypesName.add(typeId);
	}
}
