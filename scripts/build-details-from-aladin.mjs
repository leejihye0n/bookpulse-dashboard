// 알라딘 API를 한 번만 호출 -> details/*.json 자동 생성하는 스크립트
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();

const BOOKS_PATH = path.join(ROOT, "public", "data", "books.json");
const OUT_DIR = path.join(ROOT, "public", "data", "details");

const TTB_KEY = process.env.ALADIN_TTBKEY;
if (!TTB_KEY) {
  console.error("ALADIN_TTBKEY가 없습니다. .env.local에 ALADIN_TTBKEY=... 추가하세요.");
  process.exit(1);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function pickYear(pubDate) {
  const m = String(pubDate ?? "").match(/\d{4}/);
  return m ? Number(m[0]) : 0;
}

function safeJsonParse(text) {
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first >= 0 && last >= 0) {
    return JSON.parse(text.slice(first, last + 1));
  }
  return JSON.parse(text);
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function lookupAladin(isbn13) {
  const url =
    "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx" +
    `?ttbkey=${encodeURIComponent(TTB_KEY)}` +
    `&itemIdType=ISBN13` +
    `&ItemId=${encodeURIComponent(isbn13)}` +
    `&output=js` +
    `&Version=20131101`;

  const res = await fetch(url);
  const text = await res.text();
  const data = safeJsonParse(text);

  const item = data?.item?.[0];
  if (!item) return null;

  // subInfo 쪽에 페이지수/평점이 있을 때가 많음(없으면 0 처리)
  const itemPage = item?.subInfo?.itemPage ?? 0;
  const ratingScore = item?.subInfo?.ratingInfo?.ratingScore ?? 0;
  const cover = await resolveCover(item?.cover ?? "");

  return {
    cover,
    title: item?.title ?? "",
    author: item?.author ?? "",
    publisher: item?.publisher ?? "",
    year: pickYear(item?.pubDate),
    description: item?.description ?? "",
    categoryName: item?.categoryName ?? "",
    itemPage: Number(itemPage) || 0,
    ratingScore: Number(ratingScore) || 0,
    priceStandard: Number(item?.priceStandard) || 0,
    link: item?.link ?? "",
  };
}

function candidates(url) {
  if (!url) return [];
  const c500 = url.replace("/coversum/", "/cover500/").replace("/cover200/", "/cover500/");
  const c200 = url.replace("/coversum/", "/cover200/").replace("/cover500/", "/cover200/");
  return Array.from(new Set([c500, c200, url]));
}

async function resolveCover(url) {
  for (const u of candidates(url)) {
    try {
      const head = await fetch(u, { method: "HEAD" });
      if (head.ok) return u;
    } catch {}

    try {
      const get = await fetch(u, { headers: { Range: "bytes=0-0" } });
      if (get.ok) return u;
    } catch {}
  }
  return url || "";
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const books = JSON.parse(await fs.readFile(BOOKS_PATH, "utf-8"));

  const target = books.slice(0, 500);

  let ok = 0;
  let fail = 0;
  let skip = 0;

  for (let i = 0; i < target.length; i++) {
    const b = target[i];
    const isbn = String(b.isbn ?? "").trim();
    if (!isbn) continue;

    const outPath = path.join(OUT_DIR, `${isbn}.json`);

    // 이미 있으면 재생성 스킵
    if (await exists(outPath)) {
      skip++;
      continue;
    }

    process.stdout.write(`(${i + 1}/${target.length}) ${isbn} 조회... `);

    let detail = null;
    try {
      detail = await lookupAladin(isbn);
    } catch (e) {
      detail = null;
    }

    if (!detail) {
      console.log("FAIL");
      fail++;

      // 최소 fallback: books.json 기반으로라도 파일 생성(페이지가 깨지지 않게)
      detail = {
        cover: "",
        title: b.title ?? "",
        author: b.author ?? "",
        publisher: b.publisher ?? "",
        year: Number(b.year) || 0,
        description: "",
        categoryName: "",
        itemPage: 0,
        ratingScore: 0,
        priceStandard: 0,
        link: "",
      };
    } else {
      console.log("OK");
      ok++;
    }

    await fs.writeFile(outPath, JSON.stringify(detail, null, 2), "utf-8");

    await sleep(120);
  }

  console.log(`\n완료: OK ${ok}, FAIL ${fail}, SKIP ${skip}`);
  console.log(`생성 위치: public/data/details/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
