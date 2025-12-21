// 기존 book.json에 알라딘 API의 표지 사진 추가
import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const BOOKS_PATH = path.join(ROOT, "public", "data", "books.json");
const DETAILS_DIR = path.join(ROOT, "public", "data", "details");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const books = JSON.parse(await fs.readFile(BOOKS_PATH, "utf-8"));

  let updated = 0;
  for (const b of books) {
    const isbn = String(b.isbn ?? "").trim();
    if (!isbn) continue;

    const detailPath = path.join(DETAILS_DIR, `${isbn}.json`);
    if (!(await exists(detailPath))) continue;

    const detail = JSON.parse(await fs.readFile(detailPath, "utf-8"));
    const cover = String(detail?.cover ?? "").trim();

    // cover가 있으면 books에 주입
    if (cover) {
      if (b.cover !== cover) updated++;
      b.cover = cover;
    } else {
      b.cover = b.cover ?? "";
    }
  }

  await fs.writeFile(BOOKS_PATH, JSON.stringify(books, null, 2), "utf-8");
  console.log(`books.json cover 병합 완료 (업데이트 ${updated}권)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
