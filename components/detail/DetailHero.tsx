import type { BookDetail } from "@/types/bookDetail";
import DetailMetaList from "./DetailMetaList";
import DetailStatGrid from "./DetailStatGrid";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const PLACEHOLDER = `${base}/images/cover-placeholder.svg`;

function formatPrice(n: number) {
	if (!n) return "-";
	return `${n.toLocaleString("ko-KR")}원`;
}

export default function DetailHero({
	detail,
	isbn,
	loanCount,
}: {
	detail: BookDetail;
	isbn: string;
	loanCount?: number;
}) {
	const meta = [
		{ label: "저자", value: detail.author },
		{ label: "출판사", value: detail.publisher },
		{ label: "출판년도", value: detail.year ? `${detail.year}년` : "-" },
		{ label: "카테고리", value: detail.categoryName },
	];

	const stats = [
		{ label: "페이지", value: detail.itemPage ? `${detail.itemPage}쪽` : "-" },
		{ label: "정가", value: formatPrice(detail.priceStandard) },
		{ label: "대출건수", value: loanCount ? `${loanCount.toLocaleString("ko-KR")}회` : "-" },
		{ label: "ISBN", value: isbn },
	];

	return (
		<div className="rounded-2xl border border-[#e0d9c8] bg-white p-6">
			<div className="flex gap-10 flex-col md:flex-row">
				{/* 표지 */}
				<div className="md:w-[320px] flex justify-center md:justify-start">
					<img
						src={detail.cover || PLACEHOLDER}
						alt={detail.title}
						className="
							w-full max-w-[320px] h-[450px]
							object-cover
							rounded-2xl
							border border-[#e0d9c8]
						"
					/>
				</div>

				{/* 도서 정보 */}
				<div className="flex-1">
					<h1 className="text-xl font-semibold text-gray-900">{detail.title}</h1>

					<div className="mt-6">
						<DetailMetaList
                            author={detail.author || "-"}
                            publisher={detail.publisher || "-"}
                            year={detail.year ? `${detail.year}년` : "-"}
                            category={detail.categoryName || "-"}
                        />
						<DetailStatGrid stats={stats} />
					</div>

					{detail.link && (
                        <div className="mt-6 flex justify-end">
                            <a
                                href={detail.link}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    inline-flex items-center rounded-2xl
                                    bg-[#1e3a5f] text-white
                                    px-5 py-2 text-sm font-medium
                                    shadow-md shadow-black/10
                                    transition-colors
                                    hover:bg-[#efe6d6] hover:text-[#1e3a5f]
                                "
                            >
                                상세 정보 보기
                            </a>
                        </div>
                    )}
				</div>
			</div>
		</div>
	);
}
