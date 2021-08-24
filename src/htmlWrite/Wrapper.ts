export class Wrapper {
	public static hyperlinkOne(urlParts: string[], displayText: string) {
		return `<a href="/${urlParts.join("/")}">${displayText}</a>`;
	}
	public static hyperlinkMany(commonParts: string, diffParts: string[], displayTexts: string[]) {
		const ret: string[] = [];
		for (const [i, diffPart] of diffParts.entries()) {
			ret.push(Wrapper.hyperlinkOne([commonParts, diffPart], displayTexts[i]));
		}
		return ret;
	}
}
