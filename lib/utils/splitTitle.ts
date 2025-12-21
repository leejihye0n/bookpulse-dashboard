export function splitTitle(raw: string) {
	const s = (raw ?? "").trim();
	if (!s) return { title: "", subTitle: "" };

	const idx = s.search(/[:：]/);
	if (idx === -1) return { title: s, subTitle: "" };

	const title = s.slice(0, idx).trim();
	const subTitle = s.slice(idx + 1).trim();

	if (!subTitle) return { title: s, subTitle: "" };

	return { title, subTitle };
}
