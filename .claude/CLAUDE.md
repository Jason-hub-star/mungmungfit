# 멍멍피트 .claude 디렉토리 — 작업 인프라

> 자동화·슬래시 커맨드·훅·MCP 설정의 인덱스.
> 정본 1곳 원칙: 각 파일 상세는 그 파일 안에. 본 문서는 포인터만.

---

## 디렉토리 구조

```
.claude/
├── settings.json                    # 권한·훅 등록 (정본 1곳)
├── commands/                         # 슬래시 커맨드 (수동 트리거)
│   ├── learn.md                      # /learn — feedback memory 저장
│   ├── doc-update.md                 # /doc-update — 문서 자동 갱신
│   ├── blog-lint.md                  # /blog-lint — MDX 품질 검사
│   └── publish-readiness.md          # /publish-readiness — 푸시 전 통합 체크
├── skills/                            # 반복 작업 절차 (필요 시 로드)
│   ├── photo-slot-replacement/        # 번호 기반 사진 슬롯 교체
│   ├── docs-status-sync/              # 상태·참조 문서 동기화
│   ├── seo-submit-monitor/            # 배포 후 SEO 제출·색인 모니터
│   ├── media-performance-budget/      # 이미지/영상 성능 예산 점검
│   └── release-qa/                    # 릴리즈 전 P0/P1 QA
├── automations/                      # Nightly 자동화 (cron 트리거)
│   ├── blog-publish-nightly.prompt.md       # 매일 22:00
│   ├── bot-dispatch-tracker.prompt.md       # 매일 20:00
│   ├── content-metrics-weekly.prompt.md     # 매주 일요일 21:00 (opus)
│   ├── instagram-publishing-cycle.prompt.md # 화 18·토 18·목 09·일 09 (마누스 짝)
│   ├── seo-health-check.prompt.md           # 매주 월 09:00 (sonnet)
│   ├── seo-submit-monitor.prompt.md         # 배포 후 제출·색인 모니터
│   └── schema-validator.prompt.md           # 매주 화 09:00 (haiku)
└── hooks/                            # 자동 검사 훅 (PostToolUse)
    ├── post-edit-typecheck.sh        # .ts/.tsx 편집 후 tsc --noEmit
    └── post-edit-mdx-validate.sh     # .mdx 편집 후 frontmatter + 정책 검증
```

---

## 모델 정책 정본 (Single Source of Truth)

> 글로벌 `~/.claude/CLAUDE.md`의 "에이전트 모델 규칙"을 따르되, 본 프로젝트의 슬래시 커맨드·자동화별 모델은 아래 표가 정본.
> 각 `.md`·`.prompt.md` 파일에도 frontmatter / 본문 메모로 모델을 명시한다.

### 슬래시 커맨드별 모델 (`.claude/commands/`)

| Command | 호출 시점 | 모델 | 근거 |
|---------|----------|------|------|
| `/learn` | 사용자 교정 후 | `claude-haiku-4-5` | 단순 분류·저장. 최저비용 |
| `/doc-update` | 코드 변경 후 | `claude-sonnet-4-6` | 변경 분석 + 다중 문서 갱신 |
| `/blog-lint` | 블로그 글 작성 후 | `claude-sonnet-4-6` | SEO·톤·정책 룰 적용 |
| `/publish-readiness` | git push 전 | `claude-opus-4-7` | 통합 위험 판단·발행 가부 결정 |

각 커맨드 `.md` 파일 상단 YAML frontmatter (`model:` 필드)가 1차 정본.

### 스킬별 사용 시점 (`.claude/skills/`)

| Skill | 호출 시점 | 결과 |
|-------|----------|------|
| `photo-slot-replacement` | 주인님이 `#5`, `5번`처럼 번호로 사진 교체 요청 | 슬롯 ID 매핑 → 이미지 저장 → `placeholders.ts` 반영 → 화면 번호 확인 |
| `docs-status-sync` | 슬롯·자동화·콘텐츠 상태가 바뀐 뒤 | `PROJECT-STATUS.md`/관련 status/ref 문서 정합성 유지 |
| `seo-submit-monitor` | 배포 후 SEO health·제출·색인 모니터 점검 | DNS/배포 보호/앱 라우트/공급자 인증 분리 |
| `media-performance-budget` | 사진·후기·hero 이미지 교체 후 | public media 용량과 LCP 위험 점검 |
| `release-qa` | 배포 전 또는 큰 프론트 변경 후 | P0/P1 시나리오 + responsive smoke |

### 자동화별 모델 (`.claude/automations/`)

| 시간 | 자동화 | 모델 | 근거 |
|------|--------|------|------|
| 매일 20:00 | bot-dispatch-tracker | `sonnet` | 큐 상태 추적·매트릭스 갱신 |
| 매일 22:00 | blog-publish-nightly | `sonnet` | 발행 큐 요약·아카이브 |
| 매주 월 09:00 | seo-health-check | `sonnet` | 라우트·schema·Lighthouse 회귀 점검 |
| 배포 후/수동 | seo-submit-monitor | `sonnet` | sitemap·IndexNow 제출 + Google 색인 모니터 |
| 매주 화 09:00 | schema-validator | `haiku` | JSON-LD 필수 필드 검증 (단순 분류) |
| 매주 일 21:00 | content-metrics-weekly | `opus` | 인사이트 분석·다음 주 방향 제안 |
| 화 18·토 18·목 09·일 09 | instagram-publishing-cycle | `sonnet` | 마누스 발행 짝 — 시드 생성·결과 점검 |

각 prompt `.md` 파일 상단 "모델:" 메모가 1차 정본.

### 에이전트 호출 시 모델 규칙 (글로벌 규칙 재확인)

| 작업 종류 | 호출 방식 |
|----------|----------|
| 리뷰·자기리뷰·아키텍처 검토 | `Agent(model="opus")` (Sonnet 직접 금지) |
| 설계·플랜 | `Agent(subagent_type="Plan", model="opus")` |
| 그 외 일반 코딩 | Sonnet 직접 수행 |

자동화 실행 방법:
- 수동: `claude --automation .claude/automations/{name}.prompt.md`
- cron: 추후 GitHub Actions 또는 launchd 등록

## 훅 동작

`.ts`, `.tsx`, `.mts`, `.cts` 편집·작성 시 → `post-edit-typecheck.sh` 자동 실행
`.mdx` 편집·작성 시 → `post-edit-mdx-validate.sh` 자동 실행 (frontmatter + 정책 검사)

훅 결과는 stderr로 Claude 컨텍스트에 전달됨.

---

## 관련 정본 문서

- **프로젝트 상태**: `docs/status/PROJECT-STATUS.md`
- **블로그 큐**: `docs/status/BLOG-QUEUE-STATUS.md`
- **봇 명령어**: `docs/status/BOT-COMMAND-MATRIX.md`
- **인스타·스레드 큐**: `docs/status/INSTAGRAM-THREAD-QUEUE.md`
- **사진 슬롯**: `docs/status/PHOTO-SLOTS-STATUS.md`
- **마누스 핸드오프**: `docs/manus-{instagram,threads,image-prompts}-handoff.md`
- **Claude 콘텐츠 핸드오프**: `docs/claude-content-handoff.md`
- **사진 슬롯 가이드**: `docs/photo-slots-reference.md`
- **자동화 런북** (막혔을 때 1순위): `docs/automation-runbook.md`
- **마누스 Drive 워크플로우**: `docs/MANUS-DRIVE-INSTRUCTIONS.md`
- **학습 레퍼런스**: `docs/learning-references.md`
- **SEO 로드맵 (정본)**: `docs/seo-roadmap.md`
- **SEO Health 정본**: `docs/status/SEO-HEALTH-STATUS.md`
- **로컬 SEO 플레이북**: `docs/local-seo-playbook.md`
