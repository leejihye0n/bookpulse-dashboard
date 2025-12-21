"use client";

import { memo, useMemo } from "react";
import type { Book } from "@/types/book";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
    type PieLabelRenderProps,
} from "recharts";

const KDC_MAIN: Record<string, string> = {
    "0": "총류",
    "1": "철학",
    "2": "종교",
    "3": "사회과학",
    "4": "자연과학",
    "5": "기술과학",
    "6": "예술",
    "7": "언어",
    "8": "문학",
    "9": "역사",
};

function kdcMainLabel(kdc: string) {
    const s = String(kdc ?? "").trim();
    const d = s.match(/[0-9]/)?.[0];
    if (!d) return "기타";
    return KDC_MAIN[d] ?? "기타";
}

function normalizeAuthor(author: string) {
    const s = String(author ?? "").trim();
    if (!s) return "Unknown";
    const cleaned = s.replace(/\(지은이\)/g, "").replace(/지음/g, "").trim();
    return cleaned.split(/[,;|/]/)[0]?.trim() || "Unknown";
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <div className="mt-4 h-[260px]">{children}</div>
        </div>
    );
}

const PIE_COLORS = ["#516453", "#8BA89C", "#69887A", "#2A3A5C", "#465950"];
const OTHER_COLOR = "#9CA3AF";

const BAR_COLOR = "#2A3A5C";

function ChartsSection({ books }: { books: Book[] }) {
    const genreTop5WithOther = useMemo(() => {
        const map = new Map<string, number>();
        for (const b of books) {
        const label = kdcMainLabel(b.kdc);
        map.set(label, (map.get(label) ?? 0) + 1);
    }

        const sorted = [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({ name, value }));

        const top5 = sorted.slice(0, 5);
        const rest = sorted.slice(5);

        const otherValue = rest.reduce((sum, it) => sum + it.value, 0);

        return otherValue > 0 ? [...top5, { name: "기타", value: otherValue }] : top5;
    }, [books]);

  const authorTop5 = useMemo(() => {
    const map = new Map<string, number>();

    for (const b of books) {
        const name = normalizeAuthor(b.author);
        map.set(name, (map.get(name) ?? 0) + (Number(b.loanCount) || 0));
    }
    return [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }));
    }, [books]);

    const renderSmallPercent = (props: PieLabelRenderProps) => {
        const { cx, cy, midAngle, outerRadius, percent } = props;
        if (typeof percent !== "number" || !Number.isFinite(percent)) return null;

        const angle = midAngle ?? 0;
        const RADIAN = Math.PI / 180;
        const r = (outerRadius ?? 0) + 18;
    
        const x = (cx ?? 0) + r * Math.cos(-angle * RADIAN);
        const y = (cy ?? 0) + r * Math.sin(-angle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                textAnchor={x > (cx ?? 0) ? "start" : "end"}
                dominantBaseline="central"
                fontSize={14}
                fill="#374151"
            >
                {(percent * 100).toFixed(1)}%
            </text>
        );
    };

    return (
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="장르 순위">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={genreTop5WithOther}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={95}
                        labelLine={false}
                        label={renderSmallPercent}
                        stroke="#ffffff"
                        strokeWidth={2}
                    >
                    {genreTop5WithOther.map((d, i) => (
                    <Cell
                        key={d.name}
                        fill={d.name === "기타" ? OTHER_COLOR : PIE_COLORS[i % PIE_COLORS.length]}
                    />
                    ))}
                </Pie>

                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="square"
                    wrapperStyle={{ fontSize: 14, paddingTop: 25 }}
                />
                </PieChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="작가 순위">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={authorTop5} margin={{ top: 8, right: 10, bottom: 8, left: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="0 0" />
                    <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill={BAR_COLOR} radius={[10, 10, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </section>
    );
    }

export default memo(ChartsSection);
