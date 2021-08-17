export class Type {
	// public readonly name: string;
	// public readonly property: string[];
	constructor(readonly id: string, readonly name: string, readonly property?: string[]) {
		console.log("in Type");
	}
}
