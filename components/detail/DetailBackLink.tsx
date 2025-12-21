import Link from "next/link";

export default function DetailBackLink() {
	return (
		<div className="mb-4">
			<Link
				href="/dashboard"
				className="rounded-2xl border border-[#e0d9c8]
                bg-[#1e3a5f] text-white text-sm px-5 py-2
                inline-flex items-center gap-2
                shadow-md shadow-black/10
                hover:bg-[#efe6d6] hover:text-[#1e3a5f]"
			>
				대시보드로 이동
			</Link>
		</div>
	);
}