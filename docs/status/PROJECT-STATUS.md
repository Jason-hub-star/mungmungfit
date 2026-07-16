# 멍멍피트 Project Status

> 목적: 새 에이전트가 현재 상태를 빠르게 복원하기 위한 최상위 상태판.
> 세부 정본은 아래 문서 맵을 따른다.

Last Updated: 2026-07-16 (KST)

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
| 2026-07-17 (2차) | **커스텀 도메인 연결: https://fit.tailog.kr** — 가비아 DNS에 `fit CNAME cname.vercel-dns.com` 추가, Vercel 프로젝트 도메인 등록·검증·인증서 발급 완료. tailog.kr 본체는 기존 Tailog 토스 코칭 페이지 유지(교체 원하면 도메인만 옮기면 됨) | Gabia NS에서 CNAME 응답 확인, HTTPS 200 + SSL 유효, 타이틀·릴스 섹션·배지 0건 확인 |
| 2026-07-17 | **첫 프로덕션 배포**: Vercel 프로젝트 `mungmungfit` 생성, https://mungmungfit.vercel.app 라이브. GitHub(Jason-hub-star/mungmungfit) 연동 완료 — 이후 main 푸시 = 자동 배포. 사진 슬롯 번호 배지(#N·교체 #N)는 development 전용으로 전환(운영 숨김, 교체 워크플로는 로컬 유지). **주의: mungmungfit.kr 도메인은 미등록(NXDOMAIN)** — 도메인 구매·DNS 연결 필요 | `next build` 통과, 프로덕션 SSR HTML 배지 0건, 배포 후 mungmungfit.vercel.app HTTP 200·릴스 섹션 확인, 런타임 에러 스캔 0건 |
| 2026-07-16 (3차) | 사진 홀더 = 원본 비율 체제: 갤러리 9:16 균일 그리드(3×2, 크롭·여백 0 — 소스 전부 1080×1920, 유사컷 1장 제외해 6장), 마퀴 높이 고정·자연 너비 스트립, 스토리 카드 원본 비율 폴라로이드(3:4+4:3). 마퀴·스토리는 fill → width/height 자연 렌더 전환, JSON에 치수 필드 추가 | 실브라우저 마퀴·갤러리·스토리 확대 검수(사진 전체 노출 확인), typecheck 통과 |
| 2026-07-16 (2차) | 사용자 피드백 반영: 스토리 카드 사진 교체(돌고래 셀피·경사로 포메, `?v=` 캐시버스트), 보행 밸런스 릴스 제거(3개 체제·3열 중앙 그리드), 프렌치불독 사진 2곳 제거(#11 슬롯→살구 푸들, 갤러리→비숑 플랫폼), 갤러리 첫 타일 상단 크롭(머리 잘림 수정), 수업 4단계 아코디언 인터랙션(+/− 회전·배지 반전 팝·열림 슬라이드·스태거) | typecheck 통과, qa:responsive 홈 에러 0·햄버거 14/14, 실브라우저 클릭 검증(02 평가 열림 애니메이션), 스토리·갤러리·타깃 확대 재검수 |
| 2026-07-16 | 홈 모션·미디어 개편: `FitnessReels`(9초 수업 영상 4개, IO 자동재생)·`PhotoMarquee`(현장 사진 무한 띠) 섹션 신설, 트레이너 돌고래 스토리 카드, 스크롤 리빌·스탯 카운트업·히어로 Ken Burns·버튼/카드 마이크로 인터랙션(`components/motion.tsx`, 의존성 0, reduced-motion·webdriver 폴백). 신뢰지표 4열 깨짐(3+1) 회귀 수정, 갤러리 `object-fit: cover` 전환, 릴스 영상 라벨 실프레임 검증(콘 허들 코스), QA 캡처 `scale:"css"` 수정 | `npm run typecheck` 통과, `npm run qa:responsive` 45건 중 홈 에러 0·햄버거 14/14 (블로그 500은 기존 Supabase 원격 이미지 이슈), `npm run media:budget` 신규 자산 전부 예산 내, 390/768/1440 뷰포트 워커(`tmp/viewport-walk.mjs`) 실렌더 검수 |
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
