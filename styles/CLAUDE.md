# styles/ — 디자인 토큰 중앙 관리

> mungmungfit의 색·타이포·간격 토큰. **하드코딩 금지**, 항상 토큰 경유.
>
> TaillogToss `src/styles/tokens.ts` 패턴을 Next.js 환경에 맞게 이식.

## 정본 (Single Source of Truth)

| 레이어 | 정본 위치 | 사용 시점 |
|--------|----------|----------|
| **CSS 변수** | `app/globals.css :root` | 브라우저 런타임 정본 — CSS `color`, `background` 등 |
| **TypeScript 토큰** | `styles/tokens.ts` | 인라인 스타일·동적 스타일·JS 로직 |

두 곳은 **항상 동기화 유지**. 색 추가/변경 시 둘 다 갱신.

## 파일

| 파일 | 용도 |
|------|------|
| `tokens.ts` | `colors`, `alpha`, `font`, `weight`, `space`, `radius`, `shadow`, `z` export |

## 규칙

### ✅ Do

```tsx
import { colors, font, space } from "@/styles/tokens";

<div style={{ color: colors.green, fontSize: font.h2, marginTop: space.lg }}>
```

또는 CSS 변수로:

```tsx
<div style={{ color: "var(--green)", fontSize: "var(--font-h2)" }}>
```

### ⛔ Don't

```tsx
<div style={{ color: "#1c4032" }}>         // ❌ 하드코딩 금지
<div style={{ color: "#1f3a2e" }}>         // ❌ 구 토큰값 직접 사용
<div style={{ fontSize: "1.5rem" }}>       // ❌ 임의값
<div style={{ marginTop: "20px" }}>        // ❌ space 토큰 사용
```

## 토큰 카테고리

### colors (의미 기반)

- `ink` / `inkSoft` / `inkMuted` — 텍스트
- `paper` / `paperStrong` / `paperDeep` — 배경
- `line` — 경계선
- `green` — 브랜드 메인
- `greenSoft` / `sage` — 보조
- `orange` / `orangeSoft` / `kakao` / `honey` — 액센트

### font (반응형 clamp)

- `display` — Hero wordmark (56~140px)
- `h1` ~ `h3` — 헤딩
- `lead` — 리드 텍스트
- `body` / `small` — 본문

### space

- `xs(4) sm(8) md(12) lg(16) xl(24) xxl(32) xxxl(48)`
- `section` / `sectionGap` — 반응형

### weight, radius, shadow, z, alpha

각 항목 토큰 사용. `tokens.ts` 참고.

### card system (CSS only, `:root`에 정의)

**페이지간 카드 통일감을 위해 모든 카드 클래스에서 공통 사용**.
TS 토큰엔 없고 `app/globals.css :root` 변수로만 존재 → CSS 클래스 작성 시 직접 `var(--...)` 호출.

| 변수 | 값 | 용도 |
|------|-----|------|
| `--card-radius` | 14px | 일반 카드 (.card, .guarantee-card, .tool-card 등) |
| `--card-radius-lg` | 18px | 큰 컨테이너 (.comparison-table, .cta) |
| `--card-radius-pill` | 999px | 버튼·뱃지 |
| `--card-pad` | clamp(20px,2.6vw,28px) | 일반 카드 내부 padding |
| `--card-pad-sm` | clamp(16px,2vw,22px) | 소형 카드 |
| `--card-pad-lg` | clamp(28px,3.2vw,40px) | 큰 컨테이너 |
| `--card-gap` | clamp(16px,1.6vw,22px) | 카드 내부 요소 간격 |
| `--grid-gap` | clamp(18px,2vw,26px) | 카드 그리드 간격 |
| `--card-bg` | rgba(255,254,250,0.94) | 일반 카드 배경 |
| `--card-bg-strong` | rgba(251,250,245,0.98) | 강조 카드 배경 |
| `--card-border` | 1px solid var(--line) | 표준 보더 |
| `--card-border-soft` | 1px solid rgba(28,64,50,0.08) | 부드러운 보더 |
| `--card-lift` | 0 18px 44px rgba(24,30,24,0.10) | hover 그림자 |
| `--card-lift-strong` | 0 28px 70px rgba(28,64,50,0.18) | 강조 그림자 (CTA·BeforeAfter) |

### gradient accents (조미료)

| 변수 | 용도 |
|------|------|
| `--grad-green` | 그린 그라데이션 (CTA 배경·guarantee 아이콘) |
| `--grad-stat` | 숫자 강조 (트러스트 스탯 `strong`에 `background-clip: text`) |
| `--grad-paper` | 페이퍼 그라데이션 |
| `--accent-honey` `#ffb84d` | 강조 포인트 |
| `--accent-gold` `#c8923a` | 골드 포인트 |

### 일관 hover 패턴

```css
.your-card {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s ease,
              border-color 0.35s ease;
}
.your-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-lift);
}
```

새 카드 만들 때도 이 패턴 따라가야 페이지간 통일감 유지됨.

## 마이그레이션

기존 코드에서 하드코딩 발견시 즉시 교체:

```diff
- color: "rgba(31,58,46,0.6)"
+ color: alpha.inkSoft60
```

```diff
- fontSize: "0.85rem"
+ fontSize: font.small
```

## 호환성

CSS 변수와 TS 토큰 값이 일치하는지 검증:

```bash
# globals.css :root 의 변수와 tokens.ts 의 키가 매칭되는지 점검
grep -E "^\s+--" app/globals.css | head -20
```
