import { StaticParser } from "../parse/StaticParser";
import { Schema } from "../schema/Schema";
import { Type } from "../schema/Type";
import { StaticWriter } from "./StaticWriter";
import { Wrapper } from "./Wrapper";

export class TypesList {
	/** Title and search bar. */
	private _beginning = `<h2 class="text-primary">${"Types"}</h2>` + StaticWriter.makeRowSearchHtml();
	private _tableHead = `<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Id</th>
				<th scope="col">Properties</th>
			</tr>
		</thead>`;

	constructor(readonly schema: Schema) {
		this.schema = schema;
	}
	private writeTableHead() {
		return this._tableHead;
	}

	private writeTableBody() {
		// TODO: Add parent group.
		return this.writeTypes();
	}

	private writeTypes() {
		let ret = "";
		if (Object.keys(this.schema.types).length > 0) {
			let typeIndex = 1;
			for (const typeName of StaticParser.makeSortedName(this.schema.types)) {
				const currTypeId = this.schema.typesNameToId[typeName];
				ret += this.writeType(typeIndex, this.schema.types[currTypeId]);
				typeIndex += 1;
			}
		}
		return ret;
	}

	private writeType(typeIndex: number, type: Type) {
		let ret = "";
		const thisPropNames = type.makePropertiesName(this.schema.properties);
		ret += `<tr class="search-row" data-name="${type.name}">`;
		ret += `<th scope="row">${typeIndex}</th>`;
		ret += `<td>${Wrapper.hyperlinkOne("types", type.name, this.schema)}</td>`;
		ret += `<td scope="row">${type.id}</td>`;
		ret += `<td>${Wrapper.hyperlinkMany("properties", thisPropNames, this.schema).join(", ")}</td>`;
		ret += `</tr>`;
		return ret;
	}
	public write() {
		return (
			`<div class="main-content m-5">` + this._beginning + this.writeTableHead() + this.writeTableBody() + `</div>`
		);
	}
}
