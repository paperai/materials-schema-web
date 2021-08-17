export class Property {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly expectedTypes?: string[],
		readonly description?: string
	) {
		console.log("in Property");
	}
}
