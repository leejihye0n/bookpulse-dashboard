"use client";

import { useMemo } from "react";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";

export default function DetailDescription({ text }: { text: string }) {
  const decoded = useMemo(() => decodeHtmlEntities(text || ""), [text]);

  return (
    <section className="mt-6 rounded-2xl border border-[#e0d9c8] bg-white p-8">
      <h2 className="text-2xl font-semibold text-[#1e3a5f]">책 소개</h2>
      <p className="mt-5 text-base leading-8 text-[#1e3a5f] whitespace-pre-line">
        {decoded || "설명이 없습니다."}
      </p>
    </section>
  );
}
