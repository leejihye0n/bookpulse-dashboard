type Stat = {
	label: string;
	value: string;
};

export default function DetailStatGrid({ stats }: { stats: Stat[] }) {
	return (
		<div className="mt-6 rounded-2xl bg-[#f6f2e8] border border-[#e0d9c8] p-5">
			<div className="grid grid-cols-2 gap-y-6">
				{stats.map((s) => (
					<div key={s.label}>
						<p className="text-sm text-gray-500">{s.label}</p>
						<p className="mt-1 font-medium text-gray-800">{s.value || "-"}</p>
					</div>
				))}
			</div>
		</div>
	);
}
