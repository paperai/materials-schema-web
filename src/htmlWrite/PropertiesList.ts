import { StaticParser } from "../parse/StaticParser";
import { Property } from "../schema/Property";
import { Schema } from "../schema/Schema";
import { StaticWriter } from "./StaticWriter";
import { Wrapper } from "./Wrapper";

export class PropertiesList {
	/** Title and search bar. */
	private _beginning = `<h2 class="text-primary">${"Properties"}</h2>` + StaticWriter.makeRowSearchHtml();
	private _tableHead = `<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Id</th>
				<th scope="col">Expected Types</th>
				<th scope="col">Description</th>
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
		return this.writeProps();
	}

	private writeProps() {
		let ret = "";
		if (Object.keys(this.schema.types).length > 0) {
			let index = 1;
			for (const propName of StaticParser.makeSortedName(this.schema.properties)) {
				const currPropId = this.schema.propsNameToId[propName];
				ret += this.writeProp(index, this.schema.properties[currPropId]);
				index += 1;
			}
		}
		return ret;
	}

	private writeProp(index: number, prop: Property) {
		let ret = "";
		const thisTypesName = prop.makeExpectedTypesName(this.schema.types);
		const thisDataTypesName = prop.makeExpectedTypesName(this.schema.dataTypes);
		ret += `<tr class="search-row" data-name="${prop.name}">`;
		ret += `<th scope="row">${index}</th>`;
		ret += `<td>${Wrapper.hyperlinkOne("properties", prop.name, this.schema)}</td>`;
		ret += `<td scope="row">${prop.id}</td>`;
		ret +=
			`<td>` +
			[...thisDataTypesName, ...Wrapper.hyperlinkMany("types", thisTypesName, this.schema)].join(", ") +
			`</td>`;
		ret += `<td scope="row">${prop.description}</td>`;
		ret += `</tr>`;
		return ret;
	}
	public write() {
		return (
			`<div class="main-content m-5">` + this._beginning + this.writeTableHead() + this.writeTableBody() + `</div>`
		);
	}
}
