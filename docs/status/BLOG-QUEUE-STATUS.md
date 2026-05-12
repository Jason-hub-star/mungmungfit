# 블로그 발행 큐 상태판

> `content/blog/*.mdx` 파일 = 정본. 본 문서는 발행 워크플로우 추적용 한 줄 요약.
> Status flow: `Idea -> Drafting -> InReview -> Approved -> Published -> Indexed`

Last Updated: 2026-05-12

---

## 📋 다음 발행 (Pipeline)

### Priority 1 — 시리즈/메인 발행 슬롯

| Slug | 제목 | 카테고리 | 상태 | 담당 | 비고 |
|------|------|----------|------|------|------|
| `dog-fitness-intro` | 독피트니스란? 강아지 코어와 균형을 키우는 운동 | 독피트니스 기초 | 🟢 Published | Claude | featured · cover=main.jpg |
| `dog-core-muscle-guide` | 강아지 근육 도감 #1 — 척추기립근 (Erector Spinae) | 강아지 근육 도감 | 🟢 Published | Claude/Manus | 시리즈 #1 · Supabase manus-generated 4장 활용 |
| `dog-muscle-rectus-abdominis` | 강아지 근육 도감 #2 — 복근 (Rectus Abdominis) | 강아지 근육 도감 | 🔵 Backlog | Manus 이미지 대기 | 시리즈 #2 |
| `dog-muscle-gluteus` | 강아지 근육 도감 #3 — 둔근·뒷다리 (Gluteus) | 강아지 근육 도감 | 🔵 Backlog | Manus 이미지 대기 | 시리즈 #3 |
| `dog-muscle-shoulder` | 강아지 근육 도감 #4 — 어깨·앞다리 (Shoulder) | 강아지 근육 도감 | 🔵 Backlog | Manus 이미지 대기 | 시리즈 #4 |
| `dog-muscle-proprioception` | 강아지 근육 도감 #5 — 발바닥·고유감각 | 강아지 근육 도감 | 🔵 Backlog | Manus 이미지 대기 | 시리즈 #5 |

### Priority 2 — 평일 콘텐츠 (목/금)

| Slug | 카테고리 | 상태 |
|------|----------|------|
| `pomeranian-core-tips` | 견종별 팁 (포메라니안) | 🔵 Backlog |
| `dog-treadmill-tech-review-2026` | 펫테크 리뷰 | 🔵 Backlog |
| `senior-dog-rehab-routine` | 노령견 재활 | 🔵 Backlog |

### Priority 3 — 해외 유튜브 가공 시리즈 (출처 표기 필수)

| Slug | 원본 채널 | 상태 |
|------|----------|------|
| `zak-george-leash-method` | Zak George's Dog Training Revolution | 🔵 Backlog |
| `mccann-handler-focus` | McCann Dog Training | 🔵 Backlog |
| `susan-garrett-recall-game` | Susan Garrett | 🔵 Backlog |

---

## ✅ 발행 완료

> 첫 글 발행 후 여기로 이동. 슬러그·발행일·도달 인사이트 추적.

| Slug | 발행일 | 인스타 연동 | 스레드 연동 | 도달 (7일) | 비고 |
|------|--------|------------|------------|------------|------|
| `dog-fitness-intro` | 2026-05-12 | — | — | — | featured 글 · cover=`/images/training/main.jpg` |
| `dog-core-muscle-guide` | 2026-05-14 | — | — | — | 시리즈 #1 척추기립근 · Supabase manus-generated 4장 |

---

## 🚧 검수 대기 (drafts)

> `content/blog/drafts/` 에 작성된 글. `/검수 [slug]` 명령으로 확인.

| Slug | 작성일 | 검수 진행도 |
|------|--------|------------|
| — | — | — |

---

## ❌ 폐기

| Slug | 폐기일 | 사유 |
|------|--------|------|
| `pull-on-leash-core-first` | 2026-05-12 | 시리즈 재구성. 줄당김 주제는 추후 다른 각도(예: 산책 핸들링 #1)로 재작성 |

---

## 🔢 통계

| 지표 | 값 |
|------|-----|
| Backlog | 10 (시리즈 #2~#5 + 펫테크/노령견/해외 가공 5종) |
| Drafting | 0 |
| InReview | 0 |
| Published | 2 (dog-fitness-intro, dog-core-muscle-guide) |
| Discarded | 1 (pull-on-leash-core-first) |
| 목표 (이번 달) | 12편 (주 3편) |

---

## 🔄 워크플로우

```
Idea → /블로그 [slug] 명령 → Drafting (drafts/ 폴더)
     → /검수 [slug] → InReview
     → 주인님 OK → /발행 [slug] → Approved
     → git push → Vercel 빌드 → Published
     → 24h 후 Search Console 등록 → Indexed
```

## 절대 룰

1. **수요일 = 메인 발행일** (Priority 1만 수요일에)
2. **출처 표기 누락 시 발행 금지** (유튜브 가공 글)
3. **시저밀란 인용 금지**
4. **쿠팡 파트너스 링크 금지**
5. **메이 단독 콘텐츠 금지** (참여 언급만 OK)
