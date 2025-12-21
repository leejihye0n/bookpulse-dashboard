import type { Metadata } from "next";
import { readBooks } from "@/lib/data/books";
import { readDetail } from "@/lib/data/details";

import DetailBackLink from "@/components/detail/DetailBackLink";
import DetailHero from "@/components/detail/DetailHero";
import DetailDescription from "@/components/detail/DetailDescription";
import DetailEmptyState from "@/components/detail/DetailEmptyState";

export const metadata: Metadata = {
  	title: "Detail | BookPulse",
  	description: "Detail page",
};

export async function generateStaticParams() {
	const books = await readBooks();
	return books.map((b) => ({ isbn: b.isbn }));
}

export default async function DetailPage({
	params,
}: {
	params: { isbn: string } | Promise<{ isbn: string }>;
}) {
	const { isbn } = await Promise.resolve(params);

	const [books, detail] = await Promise.all([readBooks(), readDetail(isbn)]);

	const loanCount = books.find((b) => String(b.isbn) === String(isbn))?.loanCount ?? 0;

	if (!detail) {
		return <DetailEmptyState isbn={isbn} />;
	}

	return (
		<main className="min-h-screen bg-[#f6f2e8]">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<DetailBackLink />
				<DetailHero detail={detail} isbn={isbn} loanCount={loanCount} />
				<DetailDescription text={detail.description} />
			</div>
		</main>
	);
}
