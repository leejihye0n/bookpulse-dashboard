import { BookOpen, Building2, CalendarDays, Tag } from "lucide-react";

function Row({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex gap-4">
			<div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-green-100">
				{icon}
			</div>

			<div>
				<p className="text-sm text-gray-500">{label}</p>
				<p className="text-gray-900 leading-tight">
					{value || "-"}
				</p>
			</div>
		</div>
	);
}

export default function DetailMetaList({
	author,
	publisher,
	year,
	category,
}: {
	author: string;
	publisher: string;
	year: string;
	category: string;
}) {
	return (
		<div className="space-y-5">
			<Row
				icon={<BookOpen className="h-5 w-5 text-green-800" />}
				label="저자"
				value={author}
			/>

			<Row
				icon={<Building2 className="h-5 w-5 text-green-800" />}
				label="출판사"
				value={publisher}
			/>

			<Row
				icon={<CalendarDays className="h-5 w-5 text-green-800" />}
				label="출판년도"
				value={year}
			/>

			<Row
				icon={<Tag className="h-5 w-5 text-green-800" />}
				label="카테고리"
				value={category}
			/>
		</div>
	);
}
