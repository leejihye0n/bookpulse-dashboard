import Link from "next/link";
import { Book } from "@/types/book";
import { formatNumber } from "@/lib/utils/formatNumber";

type Props = {
	books: Book[];
	title?: string;
    from?: number;
	to?: number;
};

export default function RelatedBooksRow({
	books,
	title = "같은 분류 인기 대출 도서",
}: Props) {

	return (
		<section className="mt-10">
			<div className="flex items-end justify-between gap-4">
				<h2 className="text-xl font-semibold text-[#1e3a5f]">{title}</h2>
			</div>

            {(!books || books.length === 0) && (
				<div className="mt-4 rounded-xl border border-dashed border-[#e0d9c8] bg-[#faf7f0] p-6 text-center">
					<p className="text-sm text-gray-500">
						관련 인기 도서가 없습니다.
					</p>
				</div>
			)}

			{books && books.length > 0 && (
                <div className="relative">
                    {/* 👉 오른쪽 스크롤 힌트 */}
                    <div
                        className="
                            absolute right-0 top-0 h-full w-10
                            pointer-events-none
                            bg-gradient-to-l from-[#f6f2e8] to-transparent
                            z-10
                        "
                    />

                    <div
                        className="
                            mt-4 flex gap-6 overflow-x-auto pb-6 pr-12
                            [-ms-overflow-style:none] [scrollbar-width:none]
                            [&::-webkit-scrollbar]:hidden
                        "
                    >
                        {books.map((b) => (
                            <Link
                                key={b.isbn}
                                href={`/detail/${b.isbn}`}
                                className="group shrink-0 w-[72vw] max-w-[180px]"
                            >
                                <div className="rounded-2xl border border-[#e6dfcf] bg-white overflow-hidden shadow-sm transition-shadow group-hover:shadow-md">
                                    <div className="aspect-[2/3] bg-[#faf7f0]">
                                        <img
                                            src={b.cover}
                                            alt={b.title}
                                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                                        />
                                    </div>

                                    <div className="p-4 space-y-1">
                                        <p className="text-sm font-semibold text-gray-800 line-clamp-2 whitespace-pre-line">
                                            {b.title}
                                        </p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{b.author}</p>

                                        <p className="text-xs text-gray-600">
                                            대출 {formatNumber(b.loanCount)}회
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
			)}
		</section>
	);
}