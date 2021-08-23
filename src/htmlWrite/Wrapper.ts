export class Wrapper {
	public static hyperlink(urlParts: string[], displayText: string) {
		return `<a href="/${urlParts.join("/")}">${displayText}</a>`;
	}
}
