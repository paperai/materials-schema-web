/**
 * Primitive data types, such as `string`, `integer`, `boolean`, etc.
 */
export class DataType {
	/**
	 * @param id - unique; recommend to starts with "D" for the ease of distinguishment
	 * @param name - should be assigned in camelcase
	 */
	constructor(readonly id: string, readonly name: string) {}
}
