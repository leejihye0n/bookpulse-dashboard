import { PieChart, BarChart3, Trophy } from "lucide-react";

export default function HomeFeatureSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div>
                    <PieChart className="mx-auto mb-4 h-12 w-12 text-[#8fa99a]" />
                    <h3 className="text-black text-2xl font-semibold mb-2">인기 장르 분석</h3>
                    <p className="text-gray-600">
                        지금 가장 인기 있는 장르를<br />
                        한눈에 파악하세요.
                    </p>
                </div>

                <div>
                    <BarChart3 className="mx-auto mb-4 h-12 w-12 text-[#8fa99a]" />
                    <h3 className="text-black text-2xl font-semibold mb-2">주목받는 작가</h3>
                    <p className="text-gray-600">
                        Top 500에서 가장 많은 책을 보유한<br />
                        작가들을 확인하세요.
                    </p>
                </div>

                <div>
                    <Trophy className="mx-auto mb-4 h-12 w-12 text-[#8fa99a]" />
                    <h3 className="text-black text-2xl font-semibold mb-2">실시간 베스트셀러</h3>
                    <p className="text-gray-600">
                        도서관 정보나루 기반<br />
                        Top 500 인기 도서 목록을 확인하세요.
                    </p>
                </div>
            </div>
        </section>
    );
}
