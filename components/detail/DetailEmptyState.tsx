import DetailBackLink from "./DetailBackLink";

export default function DetailEmptyState({ isbn }: { isbn: string }) {
	return (
		<main className="min-h-screen bg-[#f6f2e8]">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<DetailBackLink />
				<div className="rounded-2xl border border-[#e0d9c8] bg-white p-6">
					<h1 className="text-xl font-semibold text-gray-800">상세 정보 없음</h1>
					<p className="mt-2 text-sm text-gray-600">
						public/data/details/{isbn}.json 파일이 없습니다.
					</p>
				</div>
			</div>
		</main>
	);
}
