import { Schema } from "../schema/Schema";

export class TypeContent {
	private schema: Schema;
	constructor(readonly typeId: string, schema: Schema) {
		this.schema = schema;
	}
	public tableHead = `<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th scope="col">Property</th>
				<th scope="col">Expected Type</th>
				<th scope="col">Description</th>
			</tr>
		</thead>`;
	public writeTableHead() {
		return this.tableHead;
	}
	public writeTableBody() {
		// TODO: Add parent group.
		return this.writeThisPropGroup();
	}
	public writeThisPropGroup() {
		let ret = "";
		if (typeof this.schema.types[this.typeId] !== "undefined") {
			const thisType = this.schema.types[this.typeId];
			ret += `<tr><th scope="row" colspan="4">Properties from ${thisType.name}</th></tr>`;

			if (typeof thisType.property === "undefined") return ret; // Return if no prop is defined.

			let propIndex = 0;
			for (const propId of thisType.property) {
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
			ret += `<td>${thisProp.expectedTypes}</td>`;
			ret += `<td>${thisProp.description}</td>`;
			ret += `</tr>`;
		}
		return ret;
	}
	public writeTable() {
		return `<div class="main-content">` + this.writeTableHead() + this.writeTableBody() + `</div>`;
	}
}
