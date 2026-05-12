# 🧠 Claude Code → 블로그·콘텐츠 자동 생성 핸드오프

> **대상 에이전트**: Claude Code 다른 세션 또는 Claude API (Sonnet 4.6+)
> **목적**: 멍멍피트 블로그 글 MDX 자동 생성 + 인스타·스레드 큐 INSERT + git 발행
> **호출 방식**: 텔레그램 봇 명령어 (`/블로그 [주제]`) 또는 주간 cron

---

## 1. 작업 환경

```
저장소: /Users/family/jason/mungmungfit
브랜치: main (직접 푸시)
원격: https://github.com/Jason-hub-star/mungmungfit.git
배포: GitHub push → Vercel 자동 빌드 (mungmungfit.vercel.app, 추후 mungmungfit.kr)
```

---

## 2. 블로그 글 작성 사양

### 2-1. 파일 경로
```
content/blog/{YYYY-MM-DD}-{slug}.mdx
```

예시: `content/blog/2026-05-12-dog-fitness-intro.mdx`

### 2-2. Frontmatter (MDX 상단)

```yaml
---
slug: dog-fitness-intro
title: "독피트니스란? 한국에는 없던 강아지 운동의 정석"
description: "독피트니스의 정의·효과·도구·대상 강아지를 CSCC 국제 자격 트레이너가 정리합니다."
date: 2026-05-12
author: "김주영"
category: "독피트니스 기초"
tags: ["독피트니스", "강아지 코어", "강아지 균형"]
keywords: ["독피트니스", "강아지 피트니스", "강아지 운동", "강아지 코어 강화"]
ogImage: "/api/og?title=독피트니스란&category=기초"
readingTime: 6
featured: true
---
```

### 2-3. 본문 구조 (1,500~2,500자)

```markdown
## 📌 글의 한줄 요약 (TL;DR)

3줄 이내 핵심 정리.

## 1. 도입 (300자)
- 보호자의 공감 포인트로 시작
- "우리 강아지에게 왜 이게 필요?" 던지기

## 2. 본론 (1,000~1,500자)
- H2/H3 소제목으로 분절
- 표·리스트 활용
- 친구에게 설명하듯 자연스러운 톤

## 3. 실전 적용 (300자)
- "오늘부터 집에서 할 수 있는 것" 3가지
- 도구 추천 (필요시)

## 4. CTA (100자)
- 자연스럽게 "방문훈련 상담" 연결
- mungmungfit.kr/pricing 또는 /services/dog-fitness 링크
```

### 2-4. SEO 체크리스트

- [ ] 제목에 메인 키워드 포함 (예: "독피트니스")
- [ ] description 100~155자 (검색결과에 잘림 방지)
- [ ] H1은 frontmatter title 자동 사용
- [ ] 본문에 H2 최소 3개
- [ ] 키워드 본문 밀도 1~2% (자연스럽게)
- [ ] 내부 링크 2개 이상 (다른 블로그 글 or 서비스 페이지)
- [ ] 외부 링크: 출처 표기시만 (rel="nofollow")
- [ ] 이미지 alt text 모두 작성

---

## 3. 톤 가이드

### ✅ 사용할 어휘
- 독피트니스 · 코어 · 균형 · 자신감 · 핸들링 · 방문훈련
- 보호자 · 강아지 (반려견 X, 강아지 ✓ — 검색량 5배 많음)
- 헬퍼견 메이 · CSCC · 김주영 트레이너
- "~해주세요" 친근한 톤 (격식체 X)

### ⛔ 피할 어휘
- 시저밀란 / 도미넌스 / 알파독 (논쟁적)
- 혼낸다 / 잡아당긴다 / 복종 (부정적)
- "퍼피빌" (사용 금지)
- 메이 단독 콘텐츠 (참여만 언급 OK, 메이가 주인공인 글 X)

### ⚕️ 의료 표현 금지 (운동학 표현으로 치환)

면허 없는 트레이너가 의학적 효과를 주장하면 광고법·의료법 회색지대 → 운동학 표현으로 우회.

| ❌ 금지 (의료) | ✅ 권장 (운동학) |
|----------------|----------------|
| 디스크 예방 | 코어 안정성 강화 |
| 관절 보호 / 관절 예방 | 균형 감각 자극 |
| 재활 / 회복 운동 | 컨디셔닝 / 활성화 |
| 치료 / 통증 완화 | 자극 / 활성화 |
| 효과 (의학적 결과 주장) | 변화 / 감각 |
| 진단 | 평가 / 관찰 |

→ "**의학적 결과**가 아니라 **운동 자극**을 말한다"가 원칙.

### 한국어 SEO 어휘 선택
| 일반 단어 | 권장 단어 | 이유 |
|----------|----------|------|
| 반려견 | **강아지** | 검색량 5배 |
| 훈련 | **훈련** + 가끔 "교육" | 양쪽 다 |
| 행동수정 | **문제행동 수정** | 검색량↑ |
| 어질리티 | **장애물 훈련** + (어질리티) | 일반 검색자 친화 |
| 핸들링 | **핸들링** | 전문성 유지 |

---

## 4. 키워드 풀 (우선순위 표시)

### 🔥 메인 키워드 (가장 중요)
- 독피트니스
- 강아지 방문훈련
- 강아지 코어 운동
- 강아지 균형 훈련
- 강아지 운동
- 멍멍피트

### ⭐ 부가 키워드 (자주 활용)
- 비만견 다이어트 / 노령견 재활 / 퍼피 사회화
- 줄당김 교정 / 산책 짖음 / 리드줄 핸들링
- 강아지 자신감 / 강아지 두려움 극복
- 밸런스볼 운동 / 카발레티 / 디스크 운동
- 강아지 근육 / 강아지 자세 / 강아지 보행

### 📍 지역 키워드
- 강아지 훈련 / 서울 방문훈련 / 경기 강아지 훈련
- 인천 방문훈련 / 충청 강아지 훈련

### 🎯 견종별
- 포메라니안 훈련 / 비숑 훈련 / 시츄 훈련
- 골든리트리버 운동 / 보더콜리 운동
- 닥스훈트 디스크 예방 / 코기 허리 관리

---

## 5. 블로그 카테고리 4종

### 카테고리 1: 독피트니스 기초 (메인)
- 독피트니스란?
- 도구별 효과 (밸런스볼/카발레티/디스크 등)
- 견종별 추천 운동
- 운동 강도 조절법

### 카테고리 2: 강아지 근육 도감 ⭐ (희소성)
- 코어 (복근·등)
- 후지 (둔근·뒷다리)
- 전지 (어깨·앞다리)
- 척추·목
- 발바닥·고유감각

### 카테고리 3: 펫테크 리뷰
- 자동급식기 비교
- 산책 안전 용품
- 강아지 IoT (심박·활동량 추적)

### 카테고리 4: 해외 트레이너 가공 (출처 명시 필수)
- Zak George / McCann / Susan Garrett / Stonnie Dennis / Kikopup
- 시저밀란 ❌ 절대 사용 금지

---

## 6. 발행 워크플로우

### 6-1. 새 글 작성 → 발행
```bash
# 1. MDX 파일 작성
cat > content/blog/2026-05-12-dog-fitness-intro.mdx <<EOF
---
slug: dog-fitness-intro
...
---

본문...
EOF

# 2. 타입체크
cd /Users/family/jason/mungmungfit
npx tsc --noEmit

# 3. 커밋 & 푸시
git add content/blog/*.mdx
git commit -m "feat(blog): 독피트니스 입문 글 발행"
git push origin main

# 4. 인스타·스레드 큐 자동 INSERT
psql "$DATABASE_URL" -c "INSERT INTO instagram_queue ..."
psql "$DATABASE_URL" -c "INSERT INTO threads_queue ..."
```

### 6-2. 인스타 큐 INSERT 템플릿
```sql
INSERT INTO instagram_queue (
  content_type,
  caption,
  hashtags,
  source,
  blog_slug,
  scheduled_at
) VALUES (
  'carousel',
  '독피트니스란? 한국에는 거의 알려지지 않은 강아지 운동의 정석.

코어·균형·자신감을 한꺼번에 잡는 방법, 그리고 우리 강아지에게 정말 필요한지...

[GENERATE_IMAGE]
전체 글: mungmungfit.kr/blog/dog-fitness-intro',
  ARRAY['#독피트니스', '#강아지방문훈련', '#멍멍피트', '#CSCC', '#김주영트레이너', '#강아지코어운동'],
  'blog-summary',
  'dog-fitness-intro',
  -- 다음 수요일 20:00 KST
  date_trunc('week', now()) + interval '2 days 20 hours'
);
```

### 6-3. 스레드 큐 INSERT 템플릿
```sql
INSERT INTO threads_queue (
  text,
  link_url,
  source,
  blog_slug,
  scheduled_at
) VALUES (
  '강아지 훈련사로 일하면서 정리해본 글. "독피트니스가 도대체 뭐냐"는 질문 많이 받아서 정리했어요.

한국엔 거의 콘텐츠가 없는데 사실 미국·유럽에선 재활·스포츠견 트레이닝의 기본이에요.

🔗 mungmungfit.kr/blog/dog-fitness-intro',
  'https://mungmungfit.kr/blog/dog-fitness-intro',
  'blog-summary',
  'dog-fitness-intro',
  date_trunc('week', now()) + interval '2 days 20 hours'
);
```

---

## 7. 유튜브 가공 워크플로우

### 7-1. 원본 transcript 가져오기
```bash
# yt-dlp 또는 YouTube transcript API 사용
yt-dlp --write-auto-sub --skip-download {video_url}
```

### 7-2. youtube_inspirations 테이블에 저장
```sql
INSERT INTO youtube_inspirations (channel, video_url, video_title, title_ko, transcript, key_concepts)
VALUES ('Zak George', 'https://...', 'Original Title', '한국어 번역 제목', '...', '{"concepts": ["...", "..."]}');
```

### 7-3. MDX 본문 가공시 필수 포함

상단 출처 박스:
```mdx
import { SourceNotice } from '@/components/blog';

<SourceNotice
  channel="Zak George's Dog Training Revolution"
  url="https://www.youtube.com/watch?v=..."
/>
```

→ 렌더링: "💡 이 글은 [Zak George]의 영상을 한국 환경에 맞게 재해석한 글입니다. 원본 영상: [링크]"

---

## 8. 펫테크 리뷰 워크플로우

### 8-1. 제품 정보 수집
```sql
-- 검색·수집된 제품 INSERT
INSERT INTO pet_tech_products (name, category, price_krw, source_url, image_url, pros, cons, notes)
VALUES (
  '제품명',
  '자동급식기',
  150000,
  'https://...',
  'https://...',
  ARRAY['장점1', '장점2', '장점3'],
  ARRAY['단점1', '단점2'],
  '추가 메모'
);
```

### 8-2. 리뷰 글 작성 룰
- **광고 의도 X**: 쿠팡 파트너스 링크 절대 사용 금지
- **객관적 비교**: 장단점 모두 명시
- **실제 사용 고려**: "이런 강아지에게 추천" 명확히
- **출처 표기**: 가격·이미지 출처 URL

---

## 9. 주간 자동 작업 (cron)

```bash
# 매주 일요일 23:00 KST
# 다음 한 주 콘텐츠 자동 생성

claude-code << EOF
1. youtube_inspirations에서 used_count=0인 자료 1개 선택
2. 해당 컨셉으로 블로그 글 작성 (content/blog/)
3. instagram_queue에 캐러셀 INSERT (수요일 20시 발행)
4. threads_queue에 vibehub1030용 텍스트 INSERT (수요일 20시 발행)
5. content_calendar에 기록
6. git push
7. 텔레그램으로 "다음 주 콘텐츠 1편 준비됨" 알림
EOF
```

---

## 10. 주간 인사이트 분석 (cron)

```bash
# 매주 월요일 09:00 KST

claude-code << EOF
1. insights_log에서 지난주 데이터 SELECT
2. 도달·좋아요 TOP 3 콘텐츠 파악
3. 패턴 분석 (어떤 카테고리·시간대가 잘 나갔나)
4. 텔레그램으로 한국어 보고서 전송:
   "📊 W19 주간 보고서
    - 최고 도달: {title} ({reach}명)
    - 최고 인게이지: {title}
    - 인사이트: ...
    - 다음 주 추천 방향: ..."
EOF
```

---

## 10-B. 🧠 학습 슬롯 룰 (중요)

> 이 파이프라인의 진짜 목적은 **주인님(CSCC 보유) 본인의 운동학 학습**이기도 함.
> 자동화는 70%만, 30%는 본인 손이 들어가야 학습 효과가 생긴다.

### Claude가 자동 생성 (70%)
- frontmatter·H2 구조·SEO 키워드
- 도입 단락·CTA·결론
- 인스타 캡션·스레드 변환
- 큐 INSERT

### 본인이 직접 작성 (30% = 학습 영역)
- **운동학·해부학 본문 1~2단락** (CSCC 지식의 정수)
- **해외 자료 1개 → 한국화 해석 1단락**
- **본인 임상 관찰 코멘트 1단락**

### MDX 자리표시자 룰

Claude는 MDX 초안에 다음 형식의 자리표시자를 박아두고 멈춘다 (자동 발행 금지):

```markdown
## 2. 강아지 코어 근육의 작동 원리

{{ TODO: 운동학_본인_작성 — 척추기립근·복근의 동시 자극이 어떻게 자세 안정성으로 이어지는지 30~50자로. CSCC 교재 Ch.3 참고. }}

## 3. Bobbie Lyons가 권하는 디스크 시퀀스

{{ TODO: 한국화_해석 — Lyons의 도넛 정적 균형 30초 시퀀스를 한국 거실 환경(좁은 공간·미끄러운 바닥)에 맞게 어떻게 조정할지 20~30자로. }}

## 4. 실제 수업에서 관찰한 변화

{{ TODO: 임상_관찰 — 최근 3회 수업 중 이 운동으로 변화 보인 케이스 1건. 견종·나이·관찰점 20자~. }}
```

### 발행 워크플로우 변경

```
Claude 초안 → 텔레그램 `/검수` → 자리표시자 3개 채우기 → `/발행`
                                        ↑
                                  이게 학습 세션
```

→ 자리표시자가 남아있는 상태로는 자동 발행 금지 (`{{` 패턴이 본문에 있으면 큐 INSERT 차단).

### 핏포즈 도구 시리즈 룰

- 도구 슬롯 4종: 밸런스볼·스텝업 박스 / 카발레티 / 균형 디스크·도넛 / 프로프리오셉션 매트
- 핏포즈 정품 미보유 → "**FitPaws 브랜드 단정 표현 금지**", "균형 디스크·도넛"·"스텝업 박스" 등 일반명 사용
- **"페덕"·"패덕" 단어 절대 금지** — 한국 보호자에게 익숙하지 않은 표현. 모두 "스텝업 박스"로 통일
- 도구 × 근육 4×4 매트릭스 = 16편 자동 라인업 (`docs/learning-references.md` § 4 참고)

---

## 11. 절대 룰

1. **메이 단독 콘텐츠 작성 금지** (참여 언급은 OK)
2. **퍼피빌 단어 절대 사용 금지**
3. **시저밀란 절대 인용 금지**
4. **쿠팡 파트너스 링크 절대 금지** (광고 의도 노출 X)
5. **AI 생성 사진을 실제 사진이라고 거짓말 금지**
6. **이벤트 가격은 항상 "오픈 기념 이벤트, 무기한"으로 표기**
7. **김주영 트레이너 = CSCC 국제 독피트니스 자격** 명시

---

## 12. 첫 시작 체크리스트

- [ ] 저장소 클론 + Vercel 빌드 한번 통과 확인
- [ ] Supabase 큐 테이블 6개 SELECT 가능 확인
- [ ] 텔레그램 봇 chat_id `8796384805` 메시지 보낼 수 있나 확인
- [ ] 첫 블로그 글 1편 → MDX 작성 → git push → mungmungfit.kr/blog 페이지 확인
- [ ] 큐 INSERT → Manus가 가져가서 발행하는지 검증

---

**작성**: Claude (mungmungfit dev)
**최종수정**: 2026-05-11
