# 블로그 발행 큐 상태판

> `content/blog/*.mdx` 파일이 발행 정본이다.
> 본 문서는 다음 발행·검수·인사이트 추적용 요약이다.

Last Updated: 2026-05-27 (KST)

---

## 현재 발행 상태

| 지표 | 값 |
|------|-----|
| Published | 2 |
| Drafting | 0 |
| InReview | 0 |
| Backlog | 10 |
| Discarded | 1 |
| Draft 폴더 | 실제 초안 없음. `_archived-blog-not-instagram.mdx`만 보관 |

---

## 발행 완료

| Slug | 파일 | 발행일 | 카테고리 | 상태 | 비고 |
|------|------|--------|----------|------|------|
| `dog-fitness-intro` | `content/blog/2026-05-12-dog-fitness-intro.mdx` | 2026-05-12 | 독피트니스 기초 | Published | featured, cover=`/images/training/main.jpg` |
| `dog-core-muscle-guide` | `content/blog/2026-05-14-dog-core-muscle-guide.mdx` | 2026-05-14 | 강아지 근육 도감 | Published | 시리즈 #1 척추기립근, Supabase manus-generated 4장 |

---

## 다음 발행 큐

### Priority 1 — 근육 도감 시리즈

| Slug | 제목 | 상태 | 담당/대기 |
|------|------|------|-----------|
| `dog-muscle-rectus-abdominis` | 강아지 근육 도감 #2 — 복근 (Rectus Abdominis) | Backlog | Manus 이미지 대기 |
| `dog-muscle-gluteus` | 강아지 근육 도감 #3 — 둔근·뒷다리 (Gluteus) | Backlog | Manus 이미지 대기 |
| `dog-muscle-shoulder` | 강아지 근육 도감 #4 — 어깨·앞다리 (Shoulder) | Backlog | Manus 이미지 대기 |
| `dog-muscle-proprioception` | 강아지 근육 도감 #5 — 발바닥·고유감각 | Backlog | Manus 이미지 대기 |

### Priority 2 — 평일 콘텐츠

| Slug | 카테고리 | 상태 |
|------|----------|------|
| `pomeranian-core-tips` | 견종별 팁 (포메라니안) | Backlog |
| `dog-treadmill-tech-review-2026` | 펫테크 리뷰 | Backlog |
| `senior-dog-rehab-routine` | 노령견 재활 | Backlog |

### Priority 3 — 해외 유튜브 가공 시리즈

| Slug | 원본 채널 | 상태 |
|------|----------|------|
| `zak-george-leash-method` | Zak George's Dog Training Revolution | Backlog |
| `mccann-handler-focus` | McCann Dog Training | Backlog |
| `susan-garrett-recall-game` | Susan Garrett | Backlog |

---

## 검수 대기

| Slug | 파일 | 상태 |
|------|------|------|
| — | — | 없음 |

---

## 폐기/보관

| Slug | 위치 | 사유 |
|------|------|------|
| `pull-on-leash-core-first` | 기록만 유지 | 시리즈 재구성. 줄당김 주제는 추후 산책 핸들링 각도로 재작성 |
| `_archived-blog-not-instagram` | `content/blog/drafts/_archived-blog-not-instagram.mdx` | 블로그가 아닌 인스타용 초안 보관 |

---

## 워크플로우

```text
Idea -> Drafting -> InReview -> Approved -> Published -> Indexed
```

1. 새 글은 `content/blog/drafts/{slug}.mdx`에 작성한다.
2. 주인님 검수 후 `content/blog/YYYY-MM-DD-{slug}.mdx`로 이동한다.
3. `coverImage`, `coverAlt`, `description`, `category`, `tags`, `keywords`를 채운다.
4. `npm run typecheck` 후 발행한다.
5. 발행 후 본 문서의 상태와 `docs/status/PROJECT-STATUS.md`의 최근 변경이 필요한지 확인한다.

## 절대 룰

1. 수요일은 메인 발행일이며 Priority 1을 우선한다.
2. 유튜브 가공 글은 출처 표기 없으면 발행하지 않는다.
3. 시저밀란 인용 금지.
4. 쿠팡 파트너스 링크 금지.
5. 메이 단독 콘텐츠 금지. 수업 참여 언급만 허용.
