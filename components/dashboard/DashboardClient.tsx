"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/types/book";
import ChartsSection from "@/components/dashboard/ChartsSection";
import TopBooksGrid from "@/components/dashboard/TopBooksGrid";

const PAGE_SIZE = 4;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getDotPages(totalPages: number, page: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i);

  const last = totalPages - 1;
  const set = new Set<number>([0, last, page]);

  for (let d = 1; d <= 2; d++) {
    if (page - d > 0) set.add(page - d);
    if (page + d < last) set.add(page + d);
  }

  return Array.from(set).sort((a, b) => a - b);
}

export default function DashboardClient({ books }: { books: Book[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);

  const hasQuery = q.trim().length > 0;

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return books.filter((b) =>
      `${b.title} ${b.author} ${b.publisher} ${b.isbn} ${b.kdc}`
        .toLowerCase()
        .includes(query)
    );
  }, [books, q]);

  const totalPages = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.ceil(results.length / PAGE_SIZE);
  }, [results.length]);

  useEffect(() => {
    setPage(0);
  }, [q]);

  useEffect(() => {
    if (totalPages === 0) return;
    setPage((p) => clamp(p, 0, totalPages - 1));
  }, [totalPages]);

  const pageItems = useMemo(() => {
    if (totalPages === 0) return [];
    const start = page * PAGE_SIZE;
    return results.slice(start, start + PAGE_SIZE);
  }, [results, page, totalPages]);

  const canPrev = totalPages > 0 && page > 0;
  const canNext = totalPages > 0 && page < totalPages - 1;

  const dotPages = useMemo(() => {
    if (totalPages <= 1) return [];
    return getDotPages(totalPages, page);
  }, [totalPages, page]);

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

        {/* 검색 결과창 */}
        {hasQuery && (
          <div className="mt-3 rounded-2xl bg-white shadow-sm border border-black/5 overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-black/5">
              <div className="text-sm font-semibold text-gray-900">
                검색 결과
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {results.length}개
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="이전 검색 결과"
                  disabled={!canPrev}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="h-8 w-8 rounded-full border border-black/10 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f6f2e8]"
                >
                  ‹
                </button>

                <div className="text-xs text-gray-500 w-[64px] text-center">
                  {totalPages === 0 ? "- / -" : `${page + 1} / ${totalPages}`}
                </div>

                <button
                  type="button"
                  aria-label="다음 검색 결과"
                  disabled={!canNext}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  className="h-8 w-8 rounded-full border border-black/10 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f6f2e8]"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="p-4 min-h-[220px]">
              {results.length === 0 ? (
                <div className="text-sm text-gray-500">
                  검색 결과가 없습니다.
                </div>
              ) : (
                <>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pageItems.map((b) => (
                      <li key={b.isbn}>
                        <button
                          type="button"
                          onClick={() => router.push(`/detail/${b.isbn}`)}
                          className="w-full text-left rounded-xl border border-black/5 p-3 hover:bg-[#f6f2e8] transition flex gap-3"
                        >
                          <div className="shrink-0 w-14 h-20 rounded-lg overflow-hidden border border-black/5 bg-gray-100">
                            {b.cover ? (
                              <img
                                src={b.cover}
                                alt={`${b.title} 표지`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                                NO IMAGE
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {b.title}
                            </div>
                            <div className="mt-1 text-xs text-gray-600 line-clamp-1">
                              {b.author} · {b.publisher}
                            </div>
                            <div className="mt-1 text-[11px] text-gray-500 line-clamp-1">
                              ISBN {b.isbn}
                              {b.kdc ? ` · KDC ${b.kdc}` : ""}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* 페이지 인디케이터 */}
                  {dotPages.length > 0 && (
                    <div className="mt-4 flex items-center justify-center gap-1">
                      {dotPages.map((p, idx) => {
                        const isActive = p === page;

                        const prev = dotPages[idx - 1];
                        const showEllipsis = idx > 0 && prev != null && p - prev > 1;

                        return (
                          <span key={p} className="flex items-center gap-1">
                            {showEllipsis && (
                              <span className="mx-1 text-xs text-gray-400">
                                …
                              </span>
                            )}
                            <button
                              type="button"
                              aria-label={`${p + 1}페이지로 이동`}
                              onClick={() => setPage(p)}
                              className={`h-2.5 w-2.5 rounded-full transition ${
                                isActive
                                  ? "bg-[#1e3a5f]"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                            />
                          </span>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <ChartsSection books={books} />

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-black/5">
          <h3 className="text-xl font-semibold text-gray-900">
            2030 인기 대출 도서
          </h3>
          <div className="mt-6">
            <TopBooksGrid books={books.slice(0, 500)} />
          </div>
        </div>
      </div>
    </main>
  );
}
