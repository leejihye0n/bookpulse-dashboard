import fs from "fs/promises";
import path from "path";
import type { Book } from "@/types/book";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
	const p = path.join(process.cwd(), "public", "data", "books.json");
	const raw = await fs.readFile(p, "utf-8");
	const books = JSON.parse(raw) as Book[];

	books.sort((a, b) => (b.loanCount ?? 0) - (a.loanCount ?? 0));

	return <DashboardClient books={books} />;
}
