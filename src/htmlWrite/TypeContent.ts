import { Schema } from "../schema/Schema";
import { Type } from "../schema/Type";

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
			for (const propId of this.type.properties) {
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
			ret += `<tr>`;
			ret += `<th scope="row">${propIndex}</th>`;
			ret += `<td>${thisProp.name}</td>`;
			ret += `<td>${thisProp.makeExpectedTypesName(this.schema.types, this.schema.dataTypes).join(", ")}</td>`;
			ret += `<td>${thisProp.description}</td>`;
			ret += `</tr>`;
		}
		return ret;
	}
	public writeTable() {
		return `<div class="main-content">` + this._leadingIntro + this.writeTableHead() + this.writeTableBody() + `</div>`;
	}
}
