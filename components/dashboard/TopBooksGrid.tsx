"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Book } from "@/types/book";
import { splitTitle } from "@/lib/utils/splitTitle"

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const PLACEHOLDER = `${base}/images/cover-placeholder.svg`;

export default function TopBooksGrid({ books }: { books: Book[] }) {
  const [visible, setVisible] = useState(10);

  const top = useMemo(() => books.slice(0, 500), [books]);
  const shown = top.slice(0, visible);

  return (
    <div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-10">
            {shown.map((b, idx) => {

                const { title, subTitle } = splitTitle(b.title);

                return (
                    <li key={b.isbn} className="text-center">
                        <Link href={`/detail/${b.isbn}`} className="block">
                            <div className="relative mx-auto w-[150px] h-[230px]">
                                <span className="absolute -left-3 -top-3 z-10 h-10 w-10
                                    rounded-full bg-[#f6f2e8] shadow
                                    flex items-center justify-center
                                    text-sm font-semibold text-gray-900
                                    border-[1px] border-gray-300"
                                >
                                    {idx + 1}
                                </span>
                            
                                <div className="relative mx-auto w-[150px] h-[230px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/15">
                                    <img
                                        src={b.cover || PLACEHOLDER}
                                        alt={b.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 text-sm font-medium text-gray-900 line-clamp-2">
                                <span>{title}</span>
                                {subTitle && (
                                    <span className="block text-gray-700 font-normal mt-0.5">
                                        : {subTitle}
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                                {b.author}
                            </p>
                        </Link>
                    </li>
                );
            })}
        </ul>

        {visible < top.length && (
            <div className="mt-10 flex justify-center">
            <button
                onClick={() => setVisible((v) => Math.min(v + 10, top.length))}
                className="rounded-full border border-gray-500 px-10 py-3 text-sm text-gray-900 hover:bg-gray-50"
            >
                더보기
            </button>
            </div>
        )}
        </div>
    );
}
