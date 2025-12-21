"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                    <h2 className="text-lg font-semibold text-red-600">
                        문제가 발생했습니다
                    </h2>
                    <p className="text-sm text-gray-600">
                        예상치 못한 오류가 발생했습니다.
                    </p>
                    <button
                        onClick={reset}
                        className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-white text-sm"
                    >
                        다시 시도
                    </button>
                </div>
            </body>
        </html>
    );
}