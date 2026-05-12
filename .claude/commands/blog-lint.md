---
description: content/blog/*.mdx 글의 SEO·톤·구조 품질 검사
argument-hint: "[slug] | drafts/"
model: claude-sonnet-4-6
---

# /blog-lint — MDX 블로그 글 품질 검사

`content/blog/*.mdx` 또는 `content/blog/drafts/*.mdx` 파일을 SEO·톤·구조 측면에서 검사한다.

## 사용법

```
/blog-lint                          # 모든 mdx 검사
/blog-lint [slug]                   # 특정 글만 검사
/blog-lint drafts/                  # drafts 폴더만 검사
```

## 검사 항목

### 1. Frontmatter 필수 필드

```yaml
---
slug:           # 필수, 영문 kebab-case, content/blog/{date}-{slug}.mdx와 일치
title:          # 필수, 60자 이내, 메인 키워드 포함
description:    # 필수, 100~155자, 검색결과 잘림 방지
date:           # 필수, YYYY-MM-DD
author:         # 필수
category:       # 필수, BLOG-QUEUE-STATUS.md 카테고리 중 하나
tags:           # 필수, 3개 이상
keywords:       # 필수, 5개 이상
ogImage:        # 필수, /api/og?... 또는 절대 URL
readingTime:    # 필수, 분 단위 정수
featured:       # 선택, boolean
---
```

### 2. SEO 체크

- [ ] 제목에 메인 키워드 포함 ("독피트니스", "강아지 운동" 등)
- [ ] description 길이 100~155자
- [ ] H2 최소 3개
- [ ] H1은 frontmatter title 자동 사용 (본문에 # 금지)
- [ ] 키워드 본문 밀도 1~2%
- [ ] 내부 링크 2개 이상
- [ ] 외부 링크: 있다면 rel="nofollow"
- [ ] 이미지 alt text 모두 존재

### 3. 톤·정책 (정책 위반은 ❌ 차단)

- [ ] ❌ "시저밀란" 인용 없음
- [ ] ❌ "퍼피빌" 단어 없음
- [ ] ❌ 쿠팡 파트너스 링크 없음
- [ ] ❌ 메이 단독 콘텐츠 아님 (메이가 주인공이면 ❌)
- [ ] ⚠️ "혼낸다", "복종", "잡아당긴다" 부정 표현 (경고만)
- [ ] ✅ "반려견" 대신 "강아지" 사용 (경고만, 일관성 권장)

### 4. 출처 표기 (유튜브 가공 글)

frontmatter `category: "해외 트레이너 가공"` 이면:
- [ ] 본문 상단에 `<SourceNotice>` 컴포넌트 존재
- [ ] 원본 URL이 본문에 명시
- [ ] 채널명 명시

### 5. 본문 구조

- [ ] TL;DR (글의 한줄 요약) 섹션 있음
- [ ] 1,500~2,500자 (너무 짧거나 길면 경고)
- [ ] CTA 섹션 (마지막에 mungmungfit.kr 링크)

## 출력 형식

```
📝 Blog Lint Report

검사: content/blog/2026-05-12-dog-fitness-intro.mdx

✅ Frontmatter: 11/11 필드 OK
✅ SEO 체크: 8/8 통과
✅ 톤·정책: 5/5 통과
✅ 출처 표기: N/A (해외 가공 아님)
⚠️ 본문 구조: 1,200자 (1,500자 미만)

종합: PASS with warnings

추천:
- 본문 300자 추가 보강 권장
```

## 자동 수정 옵션

`/blog-lint [slug] --fix` 옵션 추가 시:
- 누락된 frontmatter 필드 자동 채움 (description 자동 생성 등)
- 정책 위반 단어 자동 치환 ("시저밀란" → 발견 시 발행 차단)

## 규칙

- `❌ FAIL` 항목이 하나라도 있으면 `/발행` 명령 차단
- `⚠️ WARN` 항목은 사용자 확인 후 진행 가능
- 본 커맨드는 보고만 함 (자동 수정은 `--fix` 옵션 필요)
