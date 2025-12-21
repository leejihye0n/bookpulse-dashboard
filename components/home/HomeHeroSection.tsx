export default function HomeHeroSection() {
    return (
        <section className="bg-[#e9e4d4] py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-semibold mb-6 text-[#3b2f1e]">
                    지금, 사람들은 무엇을 읽고 있을까요?
                </h1>

                <p className="text-base md:text-lg text-[#5a4a3a] mb-10 leading-relaxed">
                    인기 도서 Top 100과 트렌드 분석으로 당신의 책을 찾아보세요.
                </p>

                <a
                href="/dashboard"
                className="inline-block rounded-xl bg-[#8fa99a] px-8 py-4 text-white font-semibold text-sm md:text-base hover:bg-[#7d9687] transition"
                >
                    보러 가기
                </a>
            </div>
        </section>
    );
}