# 멍멍피트 Project Status

> 목적: 새 에이전트가 현재 상태를 빠르게 복원하기 위한 최상위 상태판.
> 세부 정본은 아래 문서 맵을 따른다.

Last Updated: 2026-06-30 (KST)

---

## 현재 스냅샷

| 영역 | 상태 | 정본 |
|------|------|------|
| 사이트 런타임 | Next.js 16.2.6, React 19, `npm run dev`/`npm run typecheck` | `package.json` |
| 핵심 콘텐츠 | 홈페이지·가격·후기·지역·서비스·블로그·자가진단·약관/개인정보 라우트 구성 | `app/`, `content/site-content.json` |
| 사업자/NAP | Footer·법적 페이지·JSON-LD가 `businessInfo` 공유 | `content/site-content.json` |
| 사진 슬롯 | 화면 번호 기반 교체 가능. 총 29개 중 19개 채워짐, 10개 대기 | `content/placeholders.ts`, `docs/status/PHOTO-SLOTS-STATUS.md` |
| 블로그 | 발행 2편, draft 없음, 다음은 근육 도감 #2~#5 이미지 대기 | `content/blog/*.mdx`, `docs/status/BLOG-QUEUE-STATUS.md` |
| SEO | Phase 0~3 코드 반영, Search Console/Naver 값 입력 및 weekly 실측 대기 | `docs/seo-roadmap.md`, `docs/status/SEO-HEALTH-STATUS.md` |
| 자동화 | Claude commands/automations가 정본. Codex는 로컬 MCP/hook만 유지 | `.claude/CLAUDE.md`, `AGENTS.md` |
| 스킬 | 사진 슬롯·문서 동기화·SEO 제출 모니터·미디어 예산·릴리즈 QA 절차 이식 완료 | `.claude/skills/` |

---

## 최근 변경

| 날짜 | 변경 | 검증 |
|------|------|------|
| 2026-06-30 | 모바일 반응형·폰트·디자인 프로덕션 안정화. `snack-web` 참고해 Pretendard Variable 동적 서브셋 로딩, safe-area(inset) 적용, 뷰포트 `viewport-fit=cover`, 터치 타겟/ focus-visible 개선, `text-wrap: balance`, `100dvh` 적용 | `npm run typecheck` 통과, `npm run build` 통과, `npm run qa:responsive` 45건 통과 |
| 2026-06-01 | `jason-agent-harness-template`에서 SEO 제출 모니터, 미디어 성능 예산, 릴리즈 QA 하네스 이식. `/cases` 태그 필터와 media budget script 추가 | `npm run typecheck` 통과, `npm run qa:responsive` 45건 통과, `npm run media:budget` WARN |
| 2026-05-27 | `jason-agent-harness-template` 참고해 `photo-slot-replacement`, `docs-status-sync` 스킬 이식 | 스킬 파일 생성 확인 |
| 2026-05-27 | `PhotoSlot`이 빈 슬롯과 채워진 사진 모두 `#N`/`교체 #N` 표시 | Playwright snapshot에서 `#1`, `#4`, `#5`, `#11~#17` 확인 |
| 2026-05-27 | 문서관리 정리: `AGENTS.md` 실제 구조 반영, 프로젝트/블로그 상태 최신화 | 문서 링크 검사, `npm run typecheck` |
| 2026-05-27 | #1 hero 사진 교체, #4/#17 사진 슬롯 삭제, 프로세스 단계형 UI 전환, 오픈기념 3회 패키지 187,000원 반영 | typecheck 및 브라우저 확인 |
| 2026-05-13 | Phase 0~3 SEO·신뢰·법적 페이지·모바일 메뉴·쿠키·sitemap·alt 메타 슬롯 반영 | responsive check 30건 통과 기록 |
| 2026-05-12 | 홈 카피/가격/리뷰/블로그 이미지 구조 정리, 척추기립근 시리즈 #1 발행 | `next build` 통과 기록 |

---

## 다음 우선순위

1. 사진 슬롯 대기분 채우기: #18~#23, #29~#32.
2. 배포 전 `npm run media:budget`, `npm run qa:responsive`, `npm run seo:dry-run -- --no-write` 루틴화.
3. Search Console/Naver Webmaster 인증값 운영 환경에 입력.
4. `trainingPhotosMeta`·`reviewPhotosMeta` 라벨링 채우기.
5. 근육 도감 #2~#5용 Manus 이미지 발주 후 블로그 큐 진행.
6. 사업자 등록 종목 추가 신청 여부 확인.

---

## 문서 정본 맵

| 질문 | 먼저 볼 문서 |
|------|--------------|
| 전체 상태가 뭔가? | `docs/status/PROJECT-STATUS.md` |
| 사진 번호 교체는 어떻게 하나? | `.claude/skills/photo-slot-replacement/SKILL.md`, `docs/photo-slots-reference.md` |
| 사진 슬롯 진행률은? | `docs/status/PHOTO-SLOTS-STATUS.md` |
| 블로그 다음 글은? | `docs/status/BLOG-QUEUE-STATUS.md` |
| 인스타/스레드 운영은? | `docs/status/INSTAGRAM-THREAD-QUEUE.md` |
| 자동화가 막히면? | `docs/automation-runbook.md` |
| 배포 전 QA는? | `.claude/skills/release-qa/SKILL.md` |
| 이미지가 무거운지 보려면? | `.claude/skills/media-performance-budget/SKILL.md` |
| 배포 후 SEO 제출은? | `.claude/skills/seo-submit-monitor/SKILL.md`, `docs/status/SEO-HEALTH-STATUS.md` |
| SEO Phase 기록은? | `docs/seo-roadmap.md` |
| SEO 자동 점검 상태는? | `docs/status/SEO-HEALTH-STATUS.md` |
| NAP/로컬 SEO는? | `docs/local-seo-playbook.md` |
| 콘텐츠 작성 룰은? | `docs/claude-content-handoff.md` |

---

## 히스토리 요약

- 2026-05-13: 법적 페이지, 사업자 정보, 모바일 메뉴, skip link, error/loading, 자가진단 공유, 쿠키 배너, JSON-LD logo, verification env 슬롯, 이미지 sitemap, 블로그 카테고리 JSON-LD, alt 메타 슬롯, responsive check 반영.
- 2026-05-12: 홈 섹션 대수술, Pricing 패키지 카드, ReviewsPreview 개선, BlogImage placeholder 제거, coverImage/coverAlt 구조, 척추기립근 시리즈 #1 발행.
- 이전: 독피트니스 리포지셔닝, Supabase 큐/사진 파이프라인, 23개 사진 슬롯 도입, Vercel 배포, 콘텐츠/마케팅 자동화 방향 확정.
