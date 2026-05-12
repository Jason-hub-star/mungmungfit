# 블로그 이미지 자동 생성 파이프라인

> MDX 본문의 `<BlogImage placeholder id="..." caption="..." />` 슬롯에
> Manus Nano Banana Pro가 자동 생성한 이미지를 채워주는 파이프라인.

---

## 1. 현재 흐름 (수동)

```
1) Claude가 MDX 작성 (BlogImage placeholder 포함)
2) git push → Vercel 빌드 (placeholder UI 노출)
3) 주인님이 사진 준비 또는 Manus에 이미지 생성 요청
4) src 채우거나 frontmatter contentImages 추가
5) git push → 실제 이미지 노출
```

---

## 2. 자동화 흐름 (목표)

```
1) Claude가 블로그 글 작성 (drafts/)
   ├─ 본문에 <BlogImage placeholder id="..." caption="..." /> N개
   └─ frontmatter는 contentImages 없음

2) /검수 [slug] → 검수 완료 → /발행 [slug]
   ↓
3) 봇이 글 분석:
   ├─ <BlogImage> 태그에서 id, caption 추출
   ├─ 각각에 대해 Nano Banana 프롬프트 생성
   └─ Manus(Supabase 큐)에 이미지 생성 요청 INSERT
   ↓
4) Manus가 큐 pull → Nano Banana 호출 → Supabase Storage 업로드
   ↓
5) 봇이 frontmatter에 contentImages 자동 추가:
   contentImages:
     - id: dog-fitness-hero
       src: https://qufjlveukaoiokhpkhwj.supabase.co/.../blog/dog-fitness-hero.webp
   ↓
6) git push → Vercel 배포 → 실제 이미지 자동 반영
```

---

## 3. Supabase 신규 테이블 (필요시)

```sql
-- 블로그 이미지 생성 큐
CREATE TABLE IF NOT EXISTS blog_image_queue (
  id BIGSERIAL PRIMARY KEY,
  status TEXT CHECK (status IN ('pending','generating','done','failed')) DEFAULT 'pending',
  blog_slug TEXT NOT NULL,
  image_id TEXT NOT NULL,        -- BlogImage id
  caption TEXT,
  prompt TEXT,                    -- Nano Banana용 자동 생성 프롬프트
  aspect TEXT DEFAULT '16/9',
  generated_url TEXT,             -- Supabase Storage URL
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(blog_slug, image_id)
);
```

---

## 4. Frontmatter 확장 스펙

```yaml
---
slug: dog-fitness-intro
title: "..."
# 신규
contentImages:
  - id: dog-fitness-hero
    src: "/images/blog/dog-fitness-hero.webp"  # 또는 Supabase URL
    alt: "밸런스볼 위에서 코어를 자극하는 강아지"
  - id: dog-fitness-tools-diagram
    src: "/images/blog/dog-fitness-tools.webp"
    alt: "독피트니스 5대 영역 다이어그램"
---
```

본문에서 자동 매칭:
```mdx
<BlogImage id="dog-fitness-hero" caption="..." />
```

→ `BlogImage` 컴포넌트가 frontmatter contentImages를 lookup해서 src 렌더 (TBD).

---

## 5. Nano Banana 프롬프트 자동 생성 룰

각 `<BlogImage id="..." caption="..." />` 에 대해:

```ts
function buildPrompt(blogSlug: string, imageId: string, caption: string) {
  const styleBase = `
Style: Clean minimalist Korean infographic / editorial photography.
Brand: 멍멍피트 (Mungmungfit) — dog fitness home training.
Colors: Primary #1c4032 (deep green), Accent #d97742 (orange), Cream #faf9f5.
Korean text MUST render perfectly (no garbled hangul).
NO copyrighted imagery, NO Cesar Millan style, NO stock-photo look.
  `.trim();

  const intentMap: Record<string, string> = {
    "hero": "Hyperrealistic editorial photo, soft natural lighting.",
    "diagram": "Clean infographic with dog silhouettes and labeled muscle areas.",
    "comparison": "Side-by-side before/after comparison with arrows.",
    "routine": "Step-by-step illustrated guide, 5 panels.",
  };

  const intent = Object.keys(intentMap).find(k => imageId.includes(k))
    ?? "editorial";

  return `
${styleBase}

Topic: ${caption}
Image purpose: ${intentMap[intent] ?? "Editorial blog hero image."}
Aspect ratio: per spec.
  `.trim();
}
```

---

## 6. 봇 명령어 (구현 예정)

| 명령어 | 동작 |
|--------|------|
| `/이미지 [blog-slug]` | 해당 글의 placeholder BlogImage 모두 큐에 INSERT |
| `/이미지상태 [blog-slug]` | 생성 진행 상황 확인 |
| `/이미지재시도 [blog-slug] [image-id]` | 특정 이미지 재생성 |

---

## 7. 임시 운영 (자동화 전)

1. 블로그 글 발행 시 placeholder UI 노출 (지금 상태)
2. 주인님이 봐서 어떤 이미지가 필요한지 확인
3. Manus에 수동으로 Nano Banana 프롬프트 전달 → 생성 → Supabase 업로드
4. frontmatter에 contentImages 추가하고 git push

자동화는 나중에 봇 명령어와 통합되면 1줄로 끝남.

---

**작성**: Claude (mungmungfit dev)
**최종수정**: 2026-05-11
