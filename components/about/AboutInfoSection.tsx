import { Database, Code } from "lucide-react";

export default function AboutInfoSection() {
    return (
        <section className="py-24 bg-[#f6f2e8]">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 text-center">
                {/* Data Source */}
                <div className="bg-white rounded-2xl p-15 text-center shadow-sm">
                    <Database className="mx-auto mb-4 h-12 w-12 text-[#8fa99a]" />
                    <h3 className="text-black text-2xl font-semibold mb-2">Data Source</h3>
                    <p className="text-gray-600">
                        본 서비스는 도서관 정보나루에서 제공하는<br />
                        인기 대출 도서 csv 파일과 알라딘 API를 활용하여<br />
                        실제 도서관 대출 데이터를 기반으로 분석하였습니다.
                    </p>
                </div>

                {/* Technology */}
                <div className="bg-white rounded-2xl p-15 text-center shadow-sm">
                    <Code className="mx-auto mb-4 h-12 w-12 text-[#8fa99a]" />
                    <h3 className="text-black text-2xl font-semibold mb-2">Technology</h3>
                    <p className="text-gray-600">
                        Next.js, TypeScript,<br />
                        Tailwind CSS를 사용하여<br />
                        정적 웹 기반의 대시보드를 구현하였습니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
