"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/types/book";
import ChartsSection from "@/components/dashboard/ChartsSection";
import TopBooksGrid from "@/components/dashboard/TopBooksGrid";

export default function DashboardClient({ books }: { books: Book[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return books;
    return books.filter((b) =>
      `${b.title} ${b.author} ${b.publisher} ${b.isbn} ${b.kdc}`
        .toLowerCase()
        .includes(query)
    );
  }, [books, q]);

  return (
    <main className="min-h-screen bg-[#f6f2e8]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 검색바 */}
        <div className="rounded-full bg-white shadow-sm border border-black/5 px-4 py-3 flex items-center gap-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-400"
          >
            <path
              d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm6.5 1 4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="제목, 저자, 출판사, isbn으로 검색하세요"
            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* 차트 */}
        <ChartsSection books={filtered} />

        {/* 인기 대출 도서 */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-black/5">
          <h3 className="text-xl font-semibold text-gray-900">2030 인기 대출 도서</h3>
          <div className="mt-6">
            <TopBooksGrid books={filtered.slice(0, 500)} />
          </div>
        </div>
      </div>
    </main>
  );
}
