import { Schema } from "../schema/Schema";
import { Property } from "../schema/Property";
import { Wrapper } from "./Wrapper";

export class PropertyContent {
	private schema: Schema;
	private _leadingIntro = `<h3 class="text-primary">${this.property.name}</h3>`;

	constructor(readonly property: Property, schema: Schema) {
		this.schema = schema;
	}

	public writeCards() {
		let ret = "";
		const thisSortedTypesName = this.property.makeExpectedTypesName(this.schema.types).sort();
		const thisDataTypesName = this.property.makeExpectedTypesName(this.schema.dataTypes);
		ret += this.writeCard("Values Expected to Be One of These Types", [
			...thisDataTypesName,
			...Wrapper.hyperlinkMany("types", thisSortedTypesName, this.schema),
		]);
		ret += this.writeCard(
			"Used by These Types",
			Wrapper.hyperlinkMany("types", Array.from(this.property.usedByTypesName).sort(), this.schema)
		);
		return ret;
	}

	private writeCard(cardHeader: string, hyperlinkedTypes: string[]) {
		let ret = "";
		ret += `<div class="card my-5" style="width: 35rem;">`;
		ret += `<div class="card-header">${cardHeader}</div>`;

		ret += `<ul class="list-group list-group-flush">`;
		for (const hyperlinkedType of hyperlinkedTypes) {
			ret += `<li class="list-group-item">${hyperlinkedType}</li>`;
		}

		ret += `</ul>`;
		ret += `</div>`;
		return ret;
	}

	public writeContent() {
		return `<div class="main-content m-5">` + this._leadingIntro + this.writeCards() + `</div>`;
	}
}
