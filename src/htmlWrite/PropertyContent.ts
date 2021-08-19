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
		ret += this.writeCard(
			"Values Expected to Be One of These Types",
			this.property.makeExpectedTypesName(this.schema.types, this.schema.dataTypes)
		);
		ret += this.writeCard("Used by These Types", Array.from(this.property.usedByTypesName), true);
		return ret;
	}

	private writeCard(cardHeader: string, cardItems: string[], useWrapper = false) {
		let ret = "";
		ret += `<div class="card my-5" style="width: 35rem;">`;
		ret += `<div class="card-header">${cardHeader}</div>`;

		ret += `<ul class="list-group list-group-flush">`;
		for (const item of cardItems) {
			const displayItem = useWrapper ? Wrapper.hyperlink(["types", item], item) : item; // TODO: Might need further update for considering DataType.
			ret += `<li class="list-group-item">${displayItem}</li>`;
		}

		ret += `</ul>`;
		ret += `</div>`;
		return ret;
	}

	public writeContent() {
		return `<div class="main-content">` + this._leadingIntro + this.writeCards() + `</div>`;
	}
}
