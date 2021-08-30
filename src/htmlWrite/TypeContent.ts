import { StaticParser } from "../parse/StaticParser";
import { Schema } from "../schema/Schema";
import { Type } from "../schema/Type";
import { Wrapper } from "./Wrapper";

export class TypeContent {
	private schema: Schema;
	private _leadingIntro = `<h2 class="text-primary">${this.type.name}</h2>`;
	private _tableHead = `<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Property</th>
				<th scope="col">Expected Type</th>
				<th scope="col">Description</th>
			</tr>
		</thead>`;

	// ALERT: the given definition name of "type" is somehow confusing -> convert to a common name in future development?
	constructor(readonly type: Type, schema: Schema) {
		this.schema = schema;
	}
	public writeTableHead() {
		return this._tableHead;
	}

	public writeTableBody() {
		// TODO: Add parent group.
		return this.writeThisPropGroup();
	}

	public writeThisPropGroup() {
		let ret = "";
		if (typeof this.schema.types[this.type.id] !== "undefined") {
			ret += `<tr><th scope="row" colspan="4">Properties from ${this.type.name}</th></tr>`;

			if (typeof this.type.properties === "undefined") return ret; // Return if no prop is defined.

			let propIndex = 0;
			const propNames = this.type.properties.map((propId) => {
				return this.schema.properties[propId].name;
			});
			for (const propName of StaticParser.makeSortedName(propNames)) {
				const propId = this.schema.propsNameToId[propName];
				if (typeof this.schema.properties[propId] !== "undefined") {
					propIndex += 1;
					ret += this.writeThisProp(propIndex, propId);
				}
			}
		}
		return ret;
	}

	public writeThisProp(propIndex: number, propId: string) {
		let ret = "";
		if (typeof this.schema.properties[propId] !== "undefined") {
			const thisProp = this.schema.properties[propId];
			const thisTypesName = thisProp.makeExpectedTypesName(this.schema.types);
			const thisDataTypesName = thisProp.makeExpectedTypesName(this.schema.dataTypes);
			ret += `<tr>`;
			ret += `<th scope="row">${propIndex}</th>`;
			ret += `<td>${Wrapper.hyperlinkOne("properties", thisProp.name, this.schema)}</td>`;
			ret +=
				`<td>` +
				[...thisDataTypesName, ...Wrapper.hyperlinkMany("types", thisTypesName, this.schema)].join(", ") +
				`</td>`;
			ret += `<td>${thisProp.description}</td>`;
			ret += `</tr>`;
		}
		return ret;
	}
	public writeTable() {
		return (
			`<div class="main-content m-5">` + this._leadingIntro + this.writeTableHead() + this.writeTableBody() + `</div>`
		);
	}
}
