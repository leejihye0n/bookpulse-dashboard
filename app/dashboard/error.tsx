"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <h2 className="text-lg font-semibold text-red-600">
                데이터를 불러오지 못했습니다
            </h2>

            <p className="text-sm text-gray-600">
                잠시 후 다시 시도해 주세요.
            </p>

            <button
                onClick={reset}
                className="mt-4 rounded-lg bg-[#1e3a5f] px-4 py-2 text-white text-sm hover:opacity-90"
            >
                다시 시도
            </button>
        </div>
    );
}
