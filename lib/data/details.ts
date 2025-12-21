// {isbn}.json 읽기
import fs from "fs/promises";
import path from "path";
import type { BookDetail } from "@/types/bookDetail";

export async function readDetail(isbn: string): Promise<BookDetail | null> {
	try {
		const p = path.join(process.cwd(), "public", "data", "details", `${isbn}.json`);
		const raw = await fs.readFile(p, "utf-8");
		return JSON.parse(raw) as BookDetail;
	} catch {
		return null;
	}
}