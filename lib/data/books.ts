// book.json 읽기
import fs from "fs/promises";
import path from "path";
import type { Book } from "@/types/book";

export async function readBooks(): Promise<Book[]> {
	const p = path.join(process.cwd(), "public", "data", "books.json");
	const raw = await fs.readFile(p, "utf-8");
	return JSON.parse(raw) as Book[];
}