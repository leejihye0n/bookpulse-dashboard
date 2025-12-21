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

function topNWithOther(data: { name: string; value: number }[], topN: number) {
    const sorted = [...data].sort((a, b) => b.value - a.value);

    const top = sorted.slice(0, topN);
    const rest = sorted.slice(topN);

    const restSum = rest.reduce((s, x) => s + x.value, 0);

    const idx = top.findIndex((x) => x.name === "기타");
    if (idx >= 0) {
        top[idx] = { ...top[idx], value: top[idx].value + restSum };
        return top;
    }

    if (restSum > 0) return [...top, { name: "기타", value: restSum }];
    return top;
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

        const data = [...map.entries()].map(([name, value]) => ({ name, value }));
        return topNWithOther(data, 5);
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
                        outerRadius={80}
                        labelLine={false}
                        label={renderSmallPercent}
                        stroke="#ffffff"
                        strokeWidth={2}
                    >
                    {genreTop5WithOther.map((d, i) => (
                    <Cell
                        key={`${d.name}-${i}`}
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
