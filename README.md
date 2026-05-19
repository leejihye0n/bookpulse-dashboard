# 📚 BookPulse: 2030 세대를 위한 독서 트렌드 대시보드

> "2025년, 2030은 무슨 책을 읽었을까?"<br/>
> 도서관 정보누리 빅데이터와 알라딘 API를 결합하여 2030 세대의 독서 취향을 시각적으로 분석한 웹 대시보드입니다.

## 배포 링크

🔗 [https://leejihye0n.github.io/bookpulse-dashboard/](https://leejihye0n.github.io/bookpulse-dashboard/)

## 기획 배경 및 목표

- **Target:** 독서 트렌드에 민감한 20~30대 청년층
- **Goal:** 도서관 대출 데이터를 분석하여 '지금 뜨는 책'과 '인기 카테고리/작가'를 한눈에 파악
- **Insight:** 텍스트 기반의 CSV 데이터를 시각화하여 정보 습득 효율 향상

## 개요

- 도서관 정보나루 인기 대출 도서 CSV 직접 다운로드
- CSV -> JSON 전처리 후 프로젝트 내부 데이터로 사용
- 알라딘 API를 통해 도서 상세 정보(표지, 출판사 등) 보완
- 2030 세대 인기 대출 도서 TOP 500 분석
- 검색, 차트, 상세 페이지를 갖춘 데이터 시각화 대시보드 구현

## 주요 기능

### 1. 도서 검색

- **기능:** 제목, 작가, 출판사, ISBN을 기준으로 실시간 필터링 검색 지원
- **구현:** Client Component(`use client`)와 `useState`를 활용하여 입력 즉시 결과 반응

### 2. 데이터 시각화

- **카테고리별 분포 (Pie Chart):** 2030 세대가 선호하는 도서 카테고리 비율 분석
- **인기 작가 순위 (Bar Chart):** 대출 상위권 도서의 작가 빈도 분석
- Recharts 라이브러리를 사용하여 반응형 차트 구현

### 3. 2030 인기 대출 TOP 500

- 도서관 정보나루 데이터를 전처리하여 20대/30대 대출 빈도순 랭킹 제공
- 그리드 레이아웃을 활용한 카드형 UI

### 4. 도서 상세 페이지

- **Dynamic Routing:** `/detail/[isbn]` 경로를 통해 개별 도서 페이지 재활용
- **Data Enriching:** 알라딘 API를 연동하여 고화질 표지와 상세 정보 보완
- **연관 도서 추천:** 같은 카테고리의 인기 도서를 가로 스크롤 UI로 제공

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Visualization** | Recharts |
| **Data** | Node.js |

## 데이터 출처

- 인기 대출 도서 데이터: [도서관 정보나루 인기 대출 도서 CSV](https://www.data4library.kr/loanDataL)
- 도서 상세 정보: [알라딘 Open API](https://blog.aladin.co.kr/openapi/popup/6695306)

## 프로젝트 폴더 구조

```
app/
 ├─ about/
 │   └─ page.tsx
 ├─ dashboard/
 │   ├─ page.tsx
 │   ├─ loading.tsx
 │   └─ error.tsx
 ├─ detail/[isbn]/
 │   ├─ page.tsx
 │   └─ error.tsx
 ├─ layout.tsx
 ├─ page.tsx
 ├─ globals.css
 └─ favicon.ico

components/
 ├─ common/
 │   ├─ Header.tsx
 │   └─ Footer.tsx
 ├─ dashboard/
 │   ├─ DashboardClient.tsx
 │   ├─ ChartsSection.tsx
 │   └─ TopBooksGrid.tsx
 ├─ detail/
 │   ├─ DetailHero.tsx
 │   ├─ DetailDescription.tsx
 │   ├─ DetailMetaList.tsx
 │   ├─ DetailStatGrid.tsx
 │   ├─ RelatedBooksRow.tsx
 │   ├─ DetailBackLink.tsx
 │   └─ DetailEmptyState.tsx
 └─ home/
     ├─ HomeHeroSection.tsx
     └─ HomeFeatureSection.tsx

lib/
 ├─ data/
 │   ├─ books.ts
 │   └─ details.ts
 └─ utils/
     ├─ decodeHtml.ts
     ├─ formatNumber.ts
     └─ splitTitle.ts

public/
 ├─ data/
 │   ├─ books.json
 │   └─ details/
 ├─ scripts/
 │   ├─ build-details-from-aladin.js
 │   └─ merge-cover-into-books.js
 └─ *.svg

types/
 ├─ book.ts
 └─ bookDetail.ts

```

## 실행 방법

### 1. 레포지토리 클론

```bash
git clone https://github.com/your-username/bookpulse.git
cd bookpulse

```

### 2. 패키지 설치

```bash
npm install

```

### 3. 환경 변수 설정 (선택)

본 프로젝트는 `public/data`에 미리 생성된 JSON 데이터를 사용하므로 일반 실행(`npm run dev`)에는 API 키가 필요하지 않습니다. 
다만 알라딘 API를 이용해 도서 상세 데이터를 다시 생성하거나 업데이트하려면 `.env.local` 파일을 생성하고 아래 값을 설정해야 합니다.

```env
ALADIN_TTBKEY=발급받은_API_KEY
```

### 4. 개발 서버 실행

```bash
npm run dev

```

접속 주소

```
http://localhost:3000

```

