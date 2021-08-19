import { Header } from "./Header";
import { Footer } from "./Footer";

export class Page {
	public get htmlStr() {
		const header = new Header();
		const footer = new Footer();
		return header.writeAll() + this.mainContent + footer.writeAll();
	}
	constructor(readonly id: string, readonly mainContent: string, useDivWrapper = true) {}
}
