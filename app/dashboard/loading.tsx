export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e0d9c8] border-t-[#1e3a5f]" />
            <p className="text-sm text-gray-600">
                데이터를 불러오는 중입니다...
            </p>
        </div>
    );
}
