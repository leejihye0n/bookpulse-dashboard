export default function AboutPurposeSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div>
                    <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                    alt="Library"
                    className="rounded-xl"
                    />
                </div>

                {/* Text */}
                <div className="text-[#3b2f1e] leading-relaxed space-y-4 md:pl-8">
                    <p>책을 고르는 일은 때로 막막합니다.</p>

                    <p>
                        어디서부터 시작해야 할지 모를 때, 다른 사람들의 선택이<br />
                        좋은 나침반이 됩니다.
                    </p>

                    <p>
                        이 웹사이트는 도서관 정보나루 API를 활용해<br />
                        실시간 인기 도서 Top 100과 장르별, 작가별 트렌드를 시각화합니다.
                    </p>

                    <p>
                        복잡한 추천 알고리즘 없이 데이터가 보여주는 독서의 흐름 속에서<br />
                        당신의 다음 책을 발견하세요.
                    </p>

                    <p className="pt-6 text-lg font-semibold italic">
                        Readers are Leaders.
                    </p>

                    <p>
                        당신의 독서 여정이 여기서 시작됩니다.
                    </p>
                </div>
            </div>
        </section>
    );
}