import type { Metadata } from "next";
import { readBooks } from "@/lib/data/books";
import { readDetail } from "@/lib/data/details";

import RelatedBooksRow from "@/components/detail/RelatedBooksRow";
import DetailBackLink from "@/components/detail/DetailBackLink";
import DetailHero from "@/components/detail/DetailHero";
import DetailDescription from "@/components/detail/DetailDescription";
import DetailEmptyState from "@/components/detail/DetailEmptyState";

export const metadata: Metadata = {
	title: "Detail | BookPulse",
	description: "Detail page",
};

function kdcPrefix(kdc: string | undefined, digits = 3) {
	const s = String(kdc ?? "").trim();
	const only = s.replace(/[^0-9]/g, "");
	return only.slice(0, digits);
}

export async function generateStaticParams() {
	const books = await readBooks();
	return books.map((b) => ({ isbn: b.isbn }));
}

export default async function DetailPage({
	params,
}: {
	params: { isbn: string } | Promise<{ isbn: string }>;
}) {
	const { isbn } = await params;

	const [books, detail] = await Promise.all([readBooks(), readDetail(isbn)]);

	const currentBook = books.find((b) => String(b.isbn) === String(isbn));
	const loanCount = currentBook?.loanCount ?? 0;

	if (!detail) {
		return <DetailEmptyState isbn={isbn} />;
	}

	const baseKdc = kdcPrefix(currentBook?.kdc, 3);

	const relatedBooks =
		currentBook && baseKdc
		? books
			.filter((b) => {
				if (String(b.isbn) === String(currentBook.isbn)) return false;
				return kdcPrefix(b.kdc, 3) === baseKdc;
			})
			.sort((a, b) => (b.loanCount ?? 0) - (a.loanCount ?? 0))
			.slice(0, 10)
		: [];

	return (
		<main className="min-h-screen bg-[#f6f2e8]">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<DetailBackLink />
				<DetailHero detail={detail} isbn={isbn} loanCount={loanCount} />
				<DetailDescription text={detail.description} />

				<RelatedBooksRow
					books={relatedBooks}
					title="같은 카테고리의 인기 도서"
				/>
			</div>
		</main>
	);
}
